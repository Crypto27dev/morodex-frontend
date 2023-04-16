import { Text, Flex, useTooltip, TooltipText } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { VaultKey } from 'state/types'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { secondsToDay } from 'utils/timeHelper'
import { getHasWithdrawFee } from '../../hooks/useWithdrawalFeeTimer'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'

interface FeeSummaryProps {
  stakingTokenSymbol: string
  stakeAmount: string
  vaultKey: VaultKey
}

const FeeSummary: React.FC<React.PropsWithChildren<FeeSummaryProps>> = ({
  stakingTokenSymbol,
  stakeAmount,
  vaultKey,
}) => {
  const { t } = useTranslation()
  const {
    fees: { withdrawalFee, withdrawalFeePeriod },
    userData: { lastDepositedTime },
  } = useVaultPoolByKey(vaultKey)
  const feeAsDecimal = withdrawalFee / 100
  const feeInCake = (parseFloat(stakeAmount) * (feeAsDecimal / 100)).toFixed(4)
  const withdrawalDayPeriod = withdrawalFeePeriod ? secondsToDay(withdrawalFeePeriod) : '-'
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text bold mb="4px">
        {t('Unstaking fee: %fee%%', { fee: feeAsDecimal })}
      </Text>
      <Text>
        {t(
          'Only applies within %num% days of staking. Unstaking after %num% days will not include a fee. Timer resets every time you stake new CAKE in the pool.',
          {
            num: withdrawalDayPeriod,
          },
        )}
      </Text>
    </>,
    { placement: 'top-start' },
  )

  const hasFeeToPay = lastDepositedTime && getHasWithdrawFee(parseInt(lastDepositedTime, 10), withdrawalFeePeriod)

  return (
    <>
      <Flex mt="24px" alignItems="center" justifyContent="space-between">
        {tooltipVisible && tooltip}
        <TooltipText ref={targetRef} small>
          {t('Unstaking Fee')}
        </TooltipText>
        <Text fontSize="14px">
          {stakeAmount && hasFeeToPay ? feeInCake : '-'} {stakingTokenSymbol}
        </Text>
      </Flex>
      <UnstakingFeeCountdownRow vaultKey={vaultKey} />
    </>
  )
}

export default FeeSummary
