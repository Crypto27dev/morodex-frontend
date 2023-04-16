import React, { useState } from 'react'
import styled from 'styled-components'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import NameCell from 'views/Pools/components/PoolsTable/Cells/NameCell'
import AprCell from 'views/Pools/components/PoolsTable/Cells/AprCell'
import AutoAprCell from 'views/Pools/components/PoolsTable/Cells/AutoAprCell'
import ActionPanel from 'views/Pools/components/PoolsTable/ActionPanel/ActionPanel'
import AutoEarningsCell from 'views/Pools/components/PoolsTable/Cells/AutoEarningsCell'
import { useMatchBreakpoints, Pool } from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import { useDelayedUnmount } from '@pancakeswap/hooks'
import EarningsCell from '../../Pool/Cells/EarningsCell'
import TotalStakedCell from '../../Pool/Cells/TotalStakedCell'
import StakedCell from './Cells/StakedCell'

interface PoolRowProps {
  pool: Pool.DeserializedPool<Token>
  account: string
}

const StyledRow = styled.div`
  display: flex;
  background-color: transparent;
  cursor: pointer;
`

const PoolRow: React.FC<React.PropsWithChildren<PoolRowProps>> = ({ pool, account }) => {
  const { isXl, isXxl, isLg, isTablet, isDesktop } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const isXLargerScreen = isXl || isXxl
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const { totalCakeInVault } = useVaultPoolByKey(pool.vaultKey)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <NameCell pool={pool} />
        {isXLargerScreen && pool.vaultKey && <StakedCell pool={pool} account={account} />}
        {pool.vaultKey ? (
          isXLargerScreen && pool.vaultKey && <AutoEarningsCell pool={pool} account={account} />
        ) : (
          <EarningsCell pool={pool} account={account} />
        )}
        {pool.vaultKey ? <AutoAprCell pool={pool} /> : <AprCell pool={pool} />}
        {isLargerScreen && <TotalStakedCell pool={pool} totalCakeInVault={totalCakeInVault} cakeInVaults={BIG_ZERO} />}
        <Pool.ExpandActionCell expanded={expanded} isFullLayout={isTablet || isDesktop} />
      </StyledRow>
      {shouldRenderActionPanel && <ActionPanel account={account} pool={pool} expanded={expanded} />}
    </>
  )
}

export default PoolRow
