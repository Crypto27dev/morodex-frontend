import { useContext } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { FarmsPageLayout, FarmsContext } from 'components/Farms/components/index'
import FarmCard from 'components/Farms/components/FarmCard/FarmCard'
import { usePriceCakeUsdc } from 'hooks/useStablePrice'
import { getDisplayApr } from 'components/Farms/components/getDisplayApr'
import { FarmWithStakedValue } from '@pancakeswap/farms'

const FarmsHistoryPage = () => {
  const { account } = useActiveWeb3React()
  const { chosenFarmsMemoized } = useContext(FarmsContext)
  const cakePrice = usePriceCakeUsdc()

  return (
    <>
      {chosenFarmsMemoized?.map((farm: FarmWithStakedValue) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr) as string}
          cakePrice={cakePrice}
          account={account}
          removed
        />
      ))}
    </>
  )
}

FarmsHistoryPage.Layout = FarmsPageLayout

export default FarmsHistoryPage
