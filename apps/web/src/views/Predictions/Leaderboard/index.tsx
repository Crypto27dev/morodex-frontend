import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import useLocalDispatch from 'contexts/LocalRedux/useLocalDispatch'
import { useGetLeaderboardFilters, useGetLeaderboardLoadingState } from 'state/predictions/hooks'
import { filterLeaderboard } from 'state/predictions'
import PageLoader from 'components/Loader/PageLoader'
import { PageMeta } from 'components/Layout/Page'
import { FetchStatus } from 'config/constants/types'
import Hero from './components/Hero'
import Results from './components/Results'
import ConnectedWalletResult from './components/Results/ConnectedWalletResult'
import Filters from './components/Filters'

const Leaderboard = () => {
  const leaderboardLoadingState = useGetLeaderboardLoadingState()
  const filters = useGetLeaderboardFilters()
  const { address: account } = useAccount()
  const dispatch = useLocalDispatch()

  useEffect(() => {
    dispatch(filterLeaderboard({ filters }))
  }, [account, filters, dispatch])

  if (leaderboardLoadingState === FetchStatus.Idle) {
    return <PageLoader />
  }

  return (
    <>
      <PageMeta />
      <Hero />
      <Filters />
      <ConnectedWalletResult />
      <Results />
    </>
  )
}

export default Leaderboard
