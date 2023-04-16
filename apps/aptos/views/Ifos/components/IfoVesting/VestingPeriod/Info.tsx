import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text, Progress, Tag } from '@pancakeswap/uikit'
import { getFullDisplayBalance } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { PoolIds } from 'config/constants/types'
import { useMemo } from 'react'
import styled from 'styled-components'
import type { VestingData } from 'views/Ifos/hooks/vesting/useFetchUserWalletIfoData'
import Claim from './Claim'

const WhiteCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 12px;
  border-radius: 12px;
  margin: 8px 0 20px 0;
`

const StyleTag = styled(Tag)<{ isPrivate: boolean }>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme, isPrivate }) => (isPrivate ? theme.colors.gradientBlue : theme.colors.gradientViolet)};
`

interface InfoProps {
  poolId: PoolIds
  data: VestingData
  fetchUserVestingData: () => void
}

const Info: React.FC<React.PropsWithChildren<InfoProps>> = ({ poolId, data, fetchUserVestingData }) => {
  const { t } = useTranslation()
  const { token } = data.ifo
  const {
    vestingComputeReleasableAmount,
    vestingAmountTotal,
    vestingInformationPercentage,
    vestingReleased,
    offeringAmountInToken,
  } = data.userVestingData[poolId]

  const labelText = poolId === PoolIds.poolUnlimited ? t('Public Sale') : t('Private Sale')

  const vestingPercentage = useMemo(
    () => new BigNumber(vestingInformationPercentage).times(0.01),
    [vestingInformationPercentage],
  )

  const totalPurchased = useMemo(() => {
    return vestingAmountTotal.gt(0) ? vestingAmountTotal.times(1).div(vestingPercentage) : offeringAmountInToken
  }, [offeringAmountInToken, vestingAmountTotal, vestingPercentage])

  const releasedAtSaleEnd = useMemo(() => {
    return totalPurchased.times(new BigNumber(1).minus(vestingPercentage))
  }, [totalPurchased, vestingPercentage])

  const received = useMemo(() => {
    const alreadyClaimed = new BigNumber(releasedAtSaleEnd).plus(vestingReleased)
    return alreadyClaimed.gt(0) ? getFullDisplayBalance(alreadyClaimed, token.decimals, token.decimals) : '0'
  }, [token, releasedAtSaleEnd, vestingReleased])

  const claimable = useMemo(() => {
    return vestingComputeReleasableAmount.gt(0)
      ? getFullDisplayBalance(vestingComputeReleasableAmount, token.decimals, token.decimals)
      : '0'
  }, [token, vestingComputeReleasableAmount])

  const remaining = useMemo(() => {
    const remain = totalPurchased.minus(releasedAtSaleEnd).minus(vestingReleased).minus(vestingComputeReleasableAmount)

    return remain.gt(0) ? getFullDisplayBalance(remain, token.decimals, token.decimals) : '0'
  }, [totalPurchased, releasedAtSaleEnd, vestingReleased, vestingComputeReleasableAmount, token.decimals])

  const percentage = useMemo(() => {
    const total = new BigNumber(received).plus(claimable).plus(remaining)
    const receivedPercentage = new BigNumber(received).div(total).times(100).toNumber()
    const amountAvailablePercentage = new BigNumber(claimable).div(total).times(100).toNumber()
    return {
      receivedPercentage,
      amountAvailablePercentage: receivedPercentage + amountAvailablePercentage,
    }
  }, [received, claimable, remaining])

  if (claimable === '0' && remaining === '0') {
    return null
  }

  return (
    <>
      <Flex justifyContent="space-between">
        <Text style={{ alignSelf: 'center' }} fontSize="12px" bold color="secondary" textTransform="uppercase">
          {t('Vesting Schedule')}
        </Text>
        <StyleTag isPrivate={poolId === PoolIds.poolBasic}>{labelText}</StyleTag>
      </Flex>
      <WhiteCard>
        <Progress primaryStep={percentage.receivedPercentage} secondaryStep={percentage.amountAvailablePercentage} />
        <Flex>
          <Flex flexDirection="column" mr="8px">
            <Text fontSize="14px">{received}</Text>
            <Text fontSize="14px" color="textSubtle">
              {t('Received')}
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize="14px">{claimable}</Text>
            <Text fontSize="14px" color="textSubtle">
              {t('Claimable')}
            </Text>
          </Flex>
          <Flex flexDirection="column" ml="auto">
            <Text fontSize="14px" textAlign="right">
              {remaining}
            </Text>
            <Text fontSize="14px" color="textSubtle">
              {t('Remaining')}
            </Text>
          </Flex>
        </Flex>
        <Claim poolId={poolId} data={data} claimableAmount={claimable} fetchUserVestingData={fetchUserVestingData} />
      </WhiteCard>
    </>
  )
}

export default Info
