import { ChainId } from '@pancakeswap/sdk'
import { TokenAddressMap as TTokenAddressMap, WrappedTokenInfo, TokenList, TokenInfo } from '@pancakeswap/token-lists'
import { ListsState } from '@pancakeswap/token-lists/react'
import {
  DEFAULT_LIST_OF_LISTS,
  OFFICIAL_LISTS,
  UNSUPPORTED_LIST_URLS,
  WARNING_LIST_URLS,
  ETH_URLS,
  BSC_URLS,
} from 'config/constants/lists'
import { atom, useAtomValue } from 'jotai'
import mapValues from 'lodash/mapValues'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import _pickBy from 'lodash/pickBy'
import { EMPTY_LIST } from '@pancakeswap/tokens'
import uniqBy from 'lodash/uniqBy'
import { useMemo } from 'react'
import { useActiveChainId } from 'hooks/useActiveChainId'
import DEFAULT_TOKEN_LIST from '../../config/constants/tokenLists/pancake-default.tokenlist.json'
import UNSUPPORTED_TOKEN_LIST from '../../config/constants/tokenLists/pancake-unsupported.tokenlist.json'
import WARNING_TOKEN_LIST from '../../config/constants/tokenLists/pancake-warning.tokenlist.json'
import { listsAtom } from './lists'

type TokenAddressMap = TTokenAddressMap<ChainId>

// use ordering of default list of lists to assign priority
function sortByListPriority(urlA: string, urlB: string) {
  const first = DEFAULT_LIST_OF_LISTS.includes(urlA) ? DEFAULT_LIST_OF_LISTS.indexOf(urlA) : Number.MAX_SAFE_INTEGER
  const second = DEFAULT_LIST_OF_LISTS.includes(urlB) ? DEFAULT_LIST_OF_LISTS.indexOf(urlB) : Number.MAX_SAFE_INTEGER

  // need reverse order to make sure mapping includes top priority last
  if (first < second) return 1
  if (first > second) return -1
  return 0
}

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[]
}

// -------------------------------------
//   Selectors
// -------------------------------------
const selectorActiveUrlsAtom = atom((get) => get(listsAtom)?.activeListUrls ?? [])
export const selectorByUrlsAtom = atom((get) => get(listsAtom)?.byUrl ?? {})

const activeListUrlsAtom = atom((get) => {
  const urls = get(selectorActiveUrlsAtom)
  return urls?.filter((url) => !UNSUPPORTED_LIST_URLS.includes(url))
})

const combineTokenMapsWithDefault = (lists: ListsState['byUrl'], urls: string[]) => {
  const defaultTokenMap = listToTokenMap(DEFAULT_TOKEN_LIST)

  if (!urls) return defaultTokenMap

  return combineMaps(combineTokenMaps(lists, urls), defaultTokenMap)
}

const combineTokenMaps = (lists: ListsState['byUrl'], urls: string[]) => {
  if (!urls) return EMPTY_LIST
  return (
    urls
      .slice()
      // sort by priority so top priority goes last
      .sort(sortByListPriority)
      .reduce((allTokens, currentUrl) => {
        const current = lists[currentUrl]?.current
        if (!current) return allTokens
        try {
          const newTokens = Object.assign(listToTokenMap(current))
          return combineMaps(allTokens, newTokens)
        } catch (error) {
          console.error('Could not show token list due to error', error)
          return allTokens
        }
      }, EMPTY_LIST)
  )
}

export const combinedTokenMapFromActiveUrlsAtom = atom((get) => {
  const [selectorByUrls, selectorActiveUrls] = [get(selectorByUrlsAtom), get(selectorActiveUrlsAtom)]
  return combineTokenMapsWithDefault(selectorByUrls, selectorActiveUrls)
})

const inactiveUrlAtom = atom((get) => {
  const [lists, urls] = [get(selectorByUrlsAtom), get(selectorActiveUrlsAtom)]
  return Object.keys(lists).filter((url) => !urls?.includes(url) && !UNSUPPORTED_LIST_URLS.includes(url))
})

export const combinedTokenMapFromInActiveUrlsAtom = atom((get) => {
  const [lists, inactiveUrl] = [get(selectorByUrlsAtom), get(inactiveUrlAtom)]
  return combineTokenMaps(lists, inactiveUrl)
})

export const combinedTokenMapFromOfficialsUrlsAtom = atom((get) => {
  const lists = get(selectorByUrlsAtom)
  return combineTokenMapsWithDefault(lists, OFFICIAL_LISTS)
})

export const tokenListFromOfficialsUrlsAtom = atom((get) => {
  const lists: ListsState['byUrl'] = get(selectorByUrlsAtom)

  const mergedTokenLists: TokenInfo[] = OFFICIAL_LISTS.reduce((acc, url) => {
    if (lists?.[url]?.current?.tokens) {
      acc.push(...lists?.[url]?.current.tokens)
    }
    return acc
  }, [])

  const mergedList =
    mergedTokenLists.length > 0 ? [...DEFAULT_TOKEN_LIST.tokens, ...mergedTokenLists] : DEFAULT_TOKEN_LIST.tokens
  return mapValues(
    groupBy(
      uniqBy(mergedList, (tokenInfo) => `${tokenInfo.chainId}#${tokenInfo.address}`),
      'chainId',
    ),
    (tokenInfos) => keyBy(tokenInfos, 'address'),
  )
})

export const combinedTokenMapFromUnsupportedUrlsAtom = atom((get) => {
  const lists = get(selectorByUrlsAtom)
  // get hard coded unsupported tokens
  const localUnsupportedListMap = listToTokenMap(UNSUPPORTED_TOKEN_LIST)
  // get any loaded unsupported tokens
  const loadedUnsupportedListMap = combineTokenMaps(lists, UNSUPPORTED_LIST_URLS)

  return combineMaps(localUnsupportedListMap, loadedUnsupportedListMap)
})

export const combinedTokenMapFromWarningUrlsAtom = atom((get) => {
  const lists = get(selectorByUrlsAtom)
  // get hard coded unsupported tokens
  const localUnsupportedListMap = listToTokenMap(WARNING_TOKEN_LIST)
  // get any loaded unsupported tokens
  const loadedUnsupportedListMap = combineTokenMaps(lists, WARNING_LIST_URLS)

  return combineMaps(localUnsupportedListMap, loadedUnsupportedListMap)
})

const listCache: WeakMap<TokenList, TokenAddressMap> | null =
  typeof WeakMap !== 'undefined' ? new WeakMap<TokenList, TokenAddressMap>() : null

export function listToTokenMap(list: TokenList): TokenAddressMap {
  const result = listCache?.get(list)
  if (result) return result

  const tokenMap: WrappedTokenInfo[] = uniqBy(
    list.tokens,
    (tokenInfo) => `${tokenInfo.chainId}#${tokenInfo.address}`,
  ).map((tokenInfo) => new WrappedTokenInfo(tokenInfo))

  const groupedTokenMap: { [chainId: string]: WrappedTokenInfo[] } = groupBy(tokenMap, 'chainId')

  const tokenAddressMap = mapValues(groupedTokenMap, (tokenInfoList) =>
    mapValues(keyBy(tokenInfoList, 'address'), (tokenInfo) => ({ token: tokenInfo, list })),
  ) as TokenAddressMap

  // add chain id item if not exist
  enumKeys(ChainId).forEach((chainId) => {
    if (!(ChainId[chainId] in tokenAddressMap)) {
      Object.defineProperty(tokenAddressMap, ChainId[chainId], {
        value: {},
      })
    }
  })

  listCache?.set(list, tokenAddressMap)
  return tokenAddressMap
}

// -------------------------------------
//   Hooks
// -------------------------------------
export function useAllLists(): {
  readonly [url: string]: {
    readonly current: TokenList | null
    readonly pendingUpdate: TokenList | null
    readonly loadingRequestId: string | null
    readonly error: string | null
  }
} {
  const { chainId } = useActiveChainId()

  const urls = useAtomValue(selectorByUrlsAtom)

  return useMemo(
    () =>
      _pickBy(
        urls,
        (_, url) =>
          (chainId === ChainId.ETHEREUM && ETH_URLS.includes(url)) ||
          (chainId === ChainId.BSC && BSC_URLS.includes(url)),
      ),
    [chainId, urls],
  )
}

function combineMaps(map1: TokenAddressMap, map2: TokenAddressMap): TokenAddressMap {
  return {
    [ChainId.ETHEREUM]: { ...map1[ChainId.ETHEREUM], ...map2[ChainId.ETHEREUM] },
    [ChainId.GOERLI]: { ...map1[ChainId.GOERLI], ...map2[ChainId.GOERLI] },
    [ChainId.BSC]: { ...map1[ChainId.BSC], ...map2[ChainId.BSC] },
    [ChainId.BSC_TESTNET]: { ...map1[ChainId.BSC_TESTNET], ...map2[ChainId.BSC_TESTNET] },
  }
}

// filter out unsupported lists
export function useActiveListUrls(): string[] | undefined {
  const { chainId } = useActiveChainId()
  const urls = useAtomValue(activeListUrlsAtom)

  return useMemo(
    () =>
      urls.filter(
        (url) =>
          (chainId === ChainId.ETHEREUM && ETH_URLS.includes(url)) ||
          (chainId === ChainId.BSC && BSC_URLS.includes(url)),
      ),
    [urls, chainId],
  )
}

export function useInactiveListUrls() {
  return useAtomValue(inactiveUrlAtom)
}

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): TokenAddressMap {
  const activeTokens = useAtomValue(combinedTokenMapFromActiveUrlsAtom)
  return activeTokens
}

// all tokens from inactive lists
export function useCombinedInactiveList(): TokenAddressMap {
  return useAtomValue(combinedTokenMapFromInActiveUrlsAtom)
}

// list of tokens not supported on interface, used to show warnings and prevent swaps and adds
export function useUnsupportedTokenList(): TokenAddressMap {
  return useAtomValue(combinedTokenMapFromUnsupportedUrlsAtom)
}

// list of warning tokens on interface, used to show warnings and prevent adds
export function useWarningTokenList(): TokenAddressMap {
  return useAtomValue(combinedTokenMapFromWarningUrlsAtom)
}

export function useIsListActive(url: string): boolean {
  const activeListUrls = useActiveListUrls()
  return useMemo(() => Boolean(activeListUrls?.includes(url)), [activeListUrls, url])
}
