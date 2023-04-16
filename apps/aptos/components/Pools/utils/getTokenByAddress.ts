import { ChainId } from '@pancakeswap/aptos-swap-sdk'

import { testnetTokens, mainnetTokens } from 'config/constants/tokens'
import _find from 'lodash/find'

export default function getTokenByAddress({ chainId, address }) {
  const tokenList = chainId === ChainId.MAINNET ? mainnetTokens : testnetTokens

  const coin = _find(tokenList, (token) => token.address === address)

  return coin
}
