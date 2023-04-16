import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Pool } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { useVaultPoolByKey } from 'state/pools/hooks'
import Apr from 'views/Pools/components/Apr'
import { Token } from '@pancakeswap/sdk'

const Containter = styled(Flex)`
  margin: 12px 0 0 0;
  padding: 0;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 12px;
    padding: 0 12px;
  }
`

interface AprRowProps {
  pool: Pool.DeserializedPool<Token>
}

const AprRow: React.FunctionComponent<React.PropsWithChildren<AprRowProps>> = ({ pool }) => {
  const { vaultKey, userData } = pool
  const { t } = useTranslation()

  const {
    userData: {
      balance: { cakeAsBigNumber },
    },
    fees: { performanceFeeAsDecimal },
  } = useVaultPoolByKey(vaultKey)

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const poolStakingTokenBalance = vaultKey
    ? cakeAsBigNumber.plus(stakingTokenBalance)
    : stakedBalance.plus(stakingTokenBalance)

  return (
    <Containter>
      <Text>{vaultKey ? t('APY') : t('APR')}</Text>
      <Apr
        pool={pool}
        showIcon
        stakedBalance={poolStakingTokenBalance}
        performanceFee={vaultKey ? performanceFeeAsDecimal : 0}
      />
    </Containter>
  )
}

export default AprRow
