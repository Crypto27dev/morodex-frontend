import { CHAIN_IDS } from 'utils/wagmi'
import PoolFinder from '../views/PoolFinder'

const PoolFinderPage = () => <PoolFinder />

PoolFinderPage.chains = CHAIN_IDS

export default PoolFinderPage
