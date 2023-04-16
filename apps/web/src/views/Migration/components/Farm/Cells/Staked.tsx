import React, { useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, Text, useMatchBreakpoints, Pool } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { formatLpBalance } from '@pancakeswap/utils/formatBalance'

const StyledCell = styled(Pool.BaseCell)`
  flex: 0;
  padding: 0 0 24px 0;
  margin-left: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 3;
    padding: 24px 8px;
    margin-left: 30px;
  }
`

export interface StakedProps {
  label: string
  pid: number
  stakedBalance: BigNumber
}

const Staked: React.FC<React.PropsWithChildren<StakedProps>> = ({ label, stakedBalance }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const labelText = t('%asset% Staked', { asset: label })

  const displayBalance = useMemo(() => {
    return formatLpBalance(stakedBalance, 18)
  }, [stakedBalance])

  return (
    <StyledCell role="cell">
      <Pool.CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {labelText}
        </Text>
        <Flex mt="4px">
          <Text fontSize={isMobile ? '14px' : '16px'} color={stakedBalance.gt(0) ? 'text' : 'textDisabled'}>
            {displayBalance}
          </Text>
        </Flex>
      </Pool.CellContent>
    </StyledCell>
  )
}

export default Staked
