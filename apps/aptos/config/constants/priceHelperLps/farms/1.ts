import { ChainId, Pair } from '@pancakeswap/aptos-swap-sdk'
import type { SerializedFarmConfig } from '@pancakeswap/farms'
import { APT, CAKE } from 'config/coins'
import { mainnetTokens } from 'config/constants/tokens'

const priceHelperLps: Omit<SerializedFarmConfig, 'pid'>[] = [
  {
    pid: null,
    lpSymbol: 'APT-stAPT LP',
    quoteToken: APT[ChainId.MAINNET],
    token: mainnetTokens.stapt,
  },
  {
    pid: null,
    lpSymbol: 'APT-CAKE LP',
    quoteToken: APT[ChainId.MAINNET],
    token: CAKE[ChainId.MAINNET],
  },
  {
    pid: null,
    lpSymbol: 'APT-ceBNB LP',
    quoteToken: APT[ChainId.MAINNET],
    token: mainnetTokens.cebnb,
  },
].map((p) => ({
  ...p,
  token: p.token.serialize,
  quoteToken: p.quoteToken.serialize,
  lpAddress: Pair.getAddress(p.token, p.quoteToken),
}))

export default priceHelperLps
