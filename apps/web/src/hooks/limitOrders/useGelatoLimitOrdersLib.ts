import { useMemo } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import { ChainId as ChainIdType, GelatoLimitOrders } from '@gelatonetwork/limit-orders-lib'
import { GELATO_HANDLER } from 'config/constants/exchange'
import { useProviderOrSigner } from 'hooks/useProviderOrSigner'
import { useActiveChainId } from '../useActiveChainId'

const useGelatoLimitOrdersLib = (): GelatoLimitOrders | undefined => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(true, true)

  return useMemo(() => {
    if (!chainId || !providerOrSigner) {
      console.error('Could not instantiate GelatoLimitOrders: missing chainId or library')
      return undefined
    }
    if (chainId !== ChainId.BSC) return undefined
    try {
      return new GelatoLimitOrders(chainId as ChainIdType, providerOrSigner, GELATO_HANDLER, false)
    } catch (error: any) {
      console.error(`Could not instantiate GelatoLimitOrders: ${error.message}`)
      return undefined
    }
  }, [chainId, providerOrSigner])
}

export default useGelatoLimitOrdersLib
