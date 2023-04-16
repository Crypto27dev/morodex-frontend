import { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import {
  Modal,
  Text,
  Flex,
  Image,
  Button,
  Slider,
  BalanceInput,
  AutoRenewIcon,
  CalculateIcon,
  IconButton,
  Skeleton,
  Box,
  useToast,
  Pool,
} from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useAppDispatch } from 'state'

import { usePriceCakeBusd } from 'state/farms/hooks'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { useVaultApy } from 'hooks/useVaultApy'
import { useCheckVaultApprovalStatus, useVaultApprove } from 'views/Pools/hooks/useApprove'
import { useVaultPoolContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import useWithdrawalFeeTimer from 'views/Pools/hooks/useWithdrawalFeeTimer'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance, formatNumber, getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import useCatchTxError from 'hooks/useCatchTxError'
import { fetchCakeVaultUserData } from 'state/pools'
import { VaultKey } from 'state/types'
import { getInterestBreakdown } from '@pancakeswap/utils/compoundApyHelpers'
import { ToastDescriptionWithTx } from 'components/Toast'
import { vaultPoolConfig } from 'config/constants/pools'
import { getFullDecimalMultiplier } from '@pancakeswap/utils/getFullDecimalMultiplier'
import { Token } from '@pancakeswap/sdk'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { VaultRoiCalculatorModal } from '../Vault/VaultRoiCalculatorModal'
import ConvertToLock from '../LockedPool/Common/ConvertToLock'
import FeeSummary from './FeeSummary'
import { MIN_LOCK_AMOUNT, convertCakeToShares } from '../../helpers'

interface VaultStakeModalProps {
  pool: Pool.DeserializedPool<Token>
  stakingMax: BigNumber
  performanceFee?: number
  isRemovingStake?: boolean
  onDismiss?: () => void
}

const StyledButton = styled(Button)`
  flex-grow: 1;
`

const AnnualRoiContainer = styled(Flex)`
  cursor: pointer;
`

const AnnualRoiDisplay = styled(Text)`
  width: 72px;
  max-width: 72px;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
`

const VaultStakeModal: React.FC<React.PropsWithChildren<VaultStakeModalProps>> = ({
  pool,
  stakingMax,
  performanceFee,
  isRemovingStake = false,
  onDismiss,
}) => {
  const dispatch = useAppDispatch()
  const { stakingToken, earningTokenPrice, vaultKey } = pool
  const { address: account } = useAccount()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const vaultPoolContract = useVaultPoolContract(pool.vaultKey)
  const { callWithGasPrice } = useCallWithGasPrice()
  const {
    pricePerFullShare,
    userData: {
      lastDepositedTime,
      userShares,
      balance: { cakeAsBigNumber, cakeAsNumberBalance },
    },
  } = useVaultPoolByKey(pool.vaultKey)

  const { t } = useTranslation()
  const { theme } = useTheme()
  const { toastSuccess } = useToast()
  const [stakeAmount, setStakeAmount] = useState('')
  const [percent, setPercent] = useState(0)
  const [showRoiCalculator, setShowRoiCalculator] = useState(false)
  const { hasUnstakingFee } = useWithdrawalFeeTimer(parseInt(lastDepositedTime, 10), userShares)
  const cakePriceBusd = usePriceCakeBusd()
  const usdValueStaked = new BigNumber(stakeAmount).times(cakePriceBusd)
  const formattedUsdValueStaked = cakePriceBusd.gt(0) && stakeAmount ? formatNumber(usdValueStaked.toNumber()) : ''
  const { flexibleApy } = useVaultApy()
  const { allowance, setLastUpdated } = useCheckVaultApprovalStatus(vaultKey)
  const { handleApprove: handleCakeApprove, pendingTx: cakePendingTx } = useVaultApprove(vaultKey, setLastUpdated)

  const needEnable = useMemo(() => {
    if (!isRemovingStake) {
      const amount = getDecimalAmount(new BigNumber(stakeAmount))
      return amount.gt(allowance)
    }
    return false
  }, [allowance, stakeAmount, isRemovingStake])

  const callOptions = {
    gasLimit: vaultPoolConfig[pool.vaultKey].gasLimit,
  }

  const interestBreakdown = getInterestBreakdown({
    principalInUSD: !usdValueStaked.isNaN() ? usdValueStaked.toNumber() : 0,
    apr: +flexibleApy,
    earningTokenPrice,
    performanceFee,
    compoundFrequency: 0,
  })

  const annualRoi = interestBreakdown[3] * pool.earningTokenPrice
  const formattedAnnualRoi = formatNumber(annualRoi, annualRoi > 10000 ? 0 : 2, annualRoi > 10000 ? 0 : 2)

  const getTokenLink = stakingToken.address ? `/swap?outputCurrency=${stakingToken.address}` : '/swap'
  const convertedStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingToken.decimals)

  const handleStakeInputChange = (input: string) => {
    if (input) {
      const convertedInput = new BigNumber(input).multipliedBy(getFullDecimalMultiplier(stakingToken.decimals))
      const percentage = Math.floor(convertedInput.dividedBy(stakingMax).multipliedBy(100).toNumber())
      setPercent(percentage > 100 ? 100 : percentage)
    } else {
      setPercent(0)
    }
    setStakeAmount(input)
  }

  const handleChangePercent = useCallback(
    (sliderPercent: number) => {
      if (sliderPercent > 0) {
        const percentageOfStakingMax = stakingMax.dividedBy(100).multipliedBy(sliderPercent)
        const amountToStake = getFullDisplayBalance(
          percentageOfStakingMax,
          stakingToken.decimals,
          stakingToken.decimals,
        )
        setStakeAmount(amountToStake)
      } else {
        setStakeAmount('')
      }
      setPercent(sliderPercent)
    },
    [stakingMax, stakingToken.decimals],
  )

  const handleWithdrawal = async () => {
    // trigger withdrawAll function if the withdrawal will leave 0.00001 CAKE or less
    const isWithdrawingAll = stakingMax.minus(convertedStakeAmount).lte(MIN_LOCK_AMOUNT)

    const receipt = await fetchWithCatchTxError(() => {
      // .toString() being called to fix a BigNumber error in prod
      // as suggested here https://github.com/ChainSafe/web3.js/issues/2077
      if (isWithdrawingAll) {
        return callWithGasPrice(vaultPoolContract, 'withdrawAll', undefined, callOptions)
      }

      if (pool.vaultKey === VaultKey.CakeFlexibleSideVault) {
        const { sharesAsBigNumber } = convertCakeToShares(convertedStakeAmount, pricePerFullShare)
        return callWithGasPrice(vaultPoolContract, 'withdraw', [sharesAsBigNumber.toString()], callOptions)
      }

      return callWithGasPrice(vaultPoolContract, 'withdrawByAmount', [convertedStakeAmount.toString()], callOptions)
    })

    if (receipt?.status) {
      toastSuccess(
        t('Unstaked!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your earnings have also been harvested to your wallet')}
        </ToastDescriptionWithTx>,
      )
      onDismiss?.()
      dispatch(fetchCakeVaultUserData({ account }))
    }
  }

  const handleDeposit = async (lockDuration = 0) => {
    const receipt = await fetchWithCatchTxError(() => {
      // .toString() being called to fix a BigNumber error in prod
      // as suggested here https://github.com/ChainSafe/web3.js/issues/2077
      const extraArgs = pool.vaultKey === VaultKey.CakeVault ? [lockDuration.toString()] : []
      const methodArgs = [convertedStakeAmount.toString(), ...extraArgs]
      return callWithGasPrice(vaultPoolContract, 'deposit', methodArgs, callOptions)
    })

    if (receipt?.status) {
      toastSuccess(
        t('Staked!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your funds have been staked in the pool')}
        </ToastDescriptionWithTx>,
      )
      onDismiss?.()
      dispatch(fetchCakeVaultUserData({ account }))
    }
  }

  const handleConfirmClick = async () => {
    if (isRemovingStake) {
      // unstaking
      handleWithdrawal()
    } else {
      // staking
      handleDeposit()
    }
  }

  if (showRoiCalculator) {
    return (
      <VaultRoiCalculatorModal
        pool={pool}
        linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
        linkHref={getTokenLink}
        stakingTokenBalance={cakeAsBigNumber.plus(stakingMax)}
        onBack={() => setShowRoiCalculator(false)}
        initialValue={stakeAmount}
        performanceFee={performanceFee}
      />
    )
  }

  return (
    <Modal
      title={isRemovingStake ? t('Unstake') : t('Stake in Pool')}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradientCardHeader}
    >
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>{isRemovingStake ? t('Unstake') : t('Stake')}:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Image src={`/images/tokens/${stakingToken.address}.png`} width={24} height={24} alt={stakingToken.symbol} />
          <Text ml="4px" bold>
            {stakingToken.symbol}
          </Text>
        </Flex>
      </Flex>
      <BalanceInput
        value={stakeAmount}
        isWarning={needEnable}
        onUserInput={handleStakeInputChange}
        currencyValue={cakePriceBusd.gt(0) && `~${formattedUsdValueStaked || 0} USD`}
        decimals={stakingToken.decimals}
      />
      {needEnable && (
        <Text color="failure" textAlign="right" fontSize="12px" mt="8px">
          {t('Insufficient token allowance. Click "Enable" to approve.')}
        </Text>
      )}
      <Text color="textSubtle" textAlign="right" fontSize="12px" m="8px 0">
        {t('Balance: %balance%', { balance: getFullDisplayBalance(stakingMax, stakingToken.decimals) })}
      </Text>
      <Slider
        min={0}
        max={100}
        value={percent}
        onValueChanged={handleChangePercent}
        name="stake"
        valueLabel={`${percent}%`}
        step={1}
      />
      <Flex alignItems="center" justifyContent="space-between" mt="8px">
        <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => handleChangePercent(25)}>
          25%
        </StyledButton>
        <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => handleChangePercent(50)}>
          50%
        </StyledButton>
        <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => handleChangePercent(75)}>
          75%
        </StyledButton>
        <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => handleChangePercent(100)}>
          {t('Max')}
        </StyledButton>
      </Flex>
      {isRemovingStake && hasUnstakingFee && (
        <FeeSummary vaultKey={vaultKey} stakingTokenSymbol={stakingToken.symbol} stakeAmount={stakeAmount} />
      )}
      {!isRemovingStake && (
        <Flex mt="24px" alignItems="center" justifyContent="space-between">
          <Text mr="8px" color="textSubtle">
            {t('Annual ROI at current rates')}:
          </Text>
          {Number.isFinite(annualRoi) ? (
            <AnnualRoiContainer
              alignItems="center"
              onClick={() => {
                setShowRoiCalculator(true)
              }}
            >
              <AnnualRoiDisplay>${formattedAnnualRoi}</AnnualRoiDisplay>
              <IconButton variant="text" scale="sm">
                <CalculateIcon color="textSubtle" width="18px" />
              </IconButton>
            </AnnualRoiContainer>
          ) : (
            <Skeleton width={60} />
          )}
        </Flex>
      )}
      {pool.vaultKey === VaultKey.CakeVault && cakeAsNumberBalance ? (
        <Box mt="8px" maxWidth="370px">
          <ConvertToLock stakingToken={stakingToken} currentStakedAmount={cakeAsNumberBalance} />
        </Box>
      ) : null}
      {needEnable ? (
        <Button
          isLoading={cakePendingTx}
          endIcon={cakePendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleCakeApprove}
          mt="24px"
        >
          {t('Enable')}
        </Button>
      ) : (
        <Button
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleConfirmClick}
          disabled={!stakeAmount || parseFloat(stakeAmount) === 0 || stakingMax.lt(convertedStakeAmount)}
          mt="24px"
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      )}
      {!isRemovingStake && (
        <Button mt="8px" as="a" external href={getTokenLink} variant="secondary">
          {t('Get %symbol%', { symbol: stakingToken.symbol })}
        </Button>
      )}
    </Modal>
  )
}

export default VaultStakeModal
