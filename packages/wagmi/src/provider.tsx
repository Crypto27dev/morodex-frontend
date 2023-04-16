import { Web3Provider } from '@ethersproject/providers'
import React from 'react'
import useSWRImmutable from 'swr/immutable'
import { useAccount, WagmiConfig, WagmiConfigProps, useNetwork } from 'wagmi'
import { Provider, WebSocketProvider } from '@wagmi/core'

export function WagmiProvider<TProvider extends Provider, TWebSocketProvider extends WebSocketProvider>(
  props: React.PropsWithChildren<WagmiConfigProps<TProvider, TWebSocketProvider>>,
) {
  return (
    <WagmiConfig client={props.client}>
      <Web3LibraryProvider>{props.children}</Web3LibraryProvider>
    </WagmiConfig>
  )
}

const Web3LibraryContext = React.createContext<Web3Provider | undefined>(undefined)

export const useWeb3LibraryContext = () => {
  return React.useContext(Web3LibraryContext)
}

const Web3LibraryProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { connector } = useAccount()
  const { chain } = useNetwork()
  const { data: library } = useSWRImmutable(connector && ['web3-library', connector, chain], async () => {
    const provider = await connector?.getProvider()
    return new Web3Provider(provider)
  })

  return <Web3LibraryContext.Provider value={library}>{props.children}</Web3LibraryContext.Provider>
}
