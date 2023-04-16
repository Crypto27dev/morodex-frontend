import { BalanceWithLoading, Box, ChevronDownIcon, Flex, Text } from '@pancakeswap/uikit'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { TokenImage } from 'components/TokenImage'
import { PoolIds } from 'config/constants/types'
import useStablePrice from 'hooks/useStablePrice'
import { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { multiplyPriceByAmount } from 'utils/prices'
import { useDelayedUnmount } from '@pancakeswap/hooks'
import type { VestingData } from 'views/Ifos/hooks/vesting/useFetchUserWalletIfoData'
import Expand from './Expand'

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 24px;
`

interface TokenInfoProps {
  index: number
  data: VestingData
  fetchUserVestingData: () => void
}

const TokenInfo: React.FC<React.PropsWithChildren<TokenInfoProps>> = ({ index, data, fetchUserVestingData }) => {
  const { vestingTitle, token } = data.ifo
  const { vestingComputeReleasableAmount } = data.userVestingData[PoolIds.poolUnlimited]

  const [expanded, setExpanded] = useState(false)
  const shouldRenderExpand = useDelayedUnmount(expanded, 300)

  useEffect(() => {
    if (index === 0) {
      setExpanded(true)
    }
  }, [index])

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  const amountAvailable = useMemo(() => {
    const totalReleaseAmount = new BigNumber(vestingComputeReleasableAmount)
    return getBalanceNumber(totalReleaseAmount, token.decimals)
  }, [token, vestingComputeReleasableAmount])

  const price = useStablePrice(token)
  const dollarValueOfToken = price ? multiplyPriceByAmount(price, amountAvailable, token.decimals) : 0

  return (
    <Box>
      <Flex p="24px" m="-24px -24px 0 -24px" style={{ cursor: 'pointer' }} onClick={toggleExpanded}>
        <TokenImage width={32} height={32} token={token} />
        <Flex flexDirection="column" ml="8px">
          <Text bold lineHeight="120%">
            {vestingTitle}
          </Text>
          <Flex>
            <BalanceWithLoading color="secondary" value={amountAvailable} decimals={4} bold fontSize="12px" />
            <Text color="textSubtle" textTransform="uppercase" fontSize="12px" margin="0 2px">
              {token.symbol} ~${dollarValueOfToken.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
        <ArrowIcon toggled={expanded} color="primary" ml="auto" />
      </Flex>
      {shouldRenderExpand && <Expand expanded={expanded} data={data} fetchUserVestingData={fetchUserVestingData} />}
    </Box>
  )
}

export default TokenInfo
