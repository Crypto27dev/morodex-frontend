/* eslint-disable class-methods-use-this */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import { render as rtlRender } from '@testing-library/react'
import noop from 'lodash/noop'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { NextRouter } from 'next/router'
import Provider from 'Providers'
import { initializeStore, makeStore } from 'state'
import { SWRConfig } from 'swr'
import { vi } from 'vitest'
import { WagmiConfig } from 'wagmi'
import { client } from './utils/wagmi'

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  forward: noop,
  query: {},
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
}

export function renderWithProvider(
  ui,
  { preloadedState = undefined, store = initializeStore(preloadedState), router = {}, ...renderOptions } = {},
) {
  function Wrapper({ children }) {
    return (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <Provider store={store}>{children}</Provider>
      </RouterContext.Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export const createReduxWrapper =
  (initState = undefined) =>
  ({ children }) =>
    <Provider store={makeStore(initState)}>{children}</Provider>

export const createSWRWrapper =
  (fallbackData = undefined) =>
  ({ children }) =>
    (
      <WagmiConfig client={client}>
        <SWRConfig value={{ fallback: fallbackData }}>{children}</SWRConfig>
      </WagmiConfig>
    )

export const createWagmiWrapper =
  () =>
  ({ children }) =>
    <WagmiConfig client={client}>{children}</WagmiConfig>

// re-export everything
export * from '@testing-library/react'
