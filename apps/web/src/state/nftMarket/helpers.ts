import { gql, request } from 'graphql-request'
import { stringify } from 'querystring'
import { API_NFT, GRAPH_API_NFTMARKET } from 'config/constants/endpoints'
import { multicallv2 } from 'utils/multicall'
import { isAddress } from 'utils'
import erc721Abi from 'config/abi/erc721.json'
import range from 'lodash/range'
import groupBy from 'lodash/groupBy'
import { BigNumber } from '@ethersproject/bignumber'
import { getNftMarketContract } from 'utils/contractHelpers'
import { NOT_ON_SALE_SELLER } from 'config/constants'
import DELIST_COLLECTIONS from 'config/constants/nftsCollections/delist'
import { pancakeBunniesAddress } from 'views/Nft/market/constants'
import { formatBigNumber } from '@pancakeswap/utils/formatBalance'
import { getNftMarketAddress } from 'utils/addressHelpers'
import nftMarketAbi from 'config/abi/nftMarket.json'
import fromPairs from 'lodash/fromPairs'
import pickBy from 'lodash/pickBy'
import lodashSize from 'lodash/size'
import {
  ApiCollection,
  ApiCollections,
  ApiResponseCollectionTokens,
  ApiResponseSpecificToken,
  AskOrderType,
  Collection,
  CollectionMarketDataBaseFields,
  NftActivityFilter,
  NftLocation,
  NftToken,
  TokenIdWithCollectionAddress,
  TokenMarketData,
  Transaction,
  AskOrder,
  ApiSingleTokenData,
  NftAttribute,
  ApiTokenFilterResponse,
  ApiCollectionsResponse,
  MarketEvent,
  UserActivity,
} from './types'
import { baseNftFields, collectionBaseFields, baseTransactionFields } from './queries'

/**
 * API HELPERS
 */

/**
 * Fetch static data from all collections using the API
 * @returns
 */
export const getCollectionsApi = async (): Promise<ApiCollectionsResponse> => {
  const res = await fetch(`${API_NFT}/collections`)
  if (res.ok) {
    const json = await res.json()
    return json
  }
  console.error('Failed to fetch NFT collections', res.statusText)
  return null
}

const fetchCollectionsTotalSupply = async (collections: ApiCollection[]): Promise<number[]> => {
  const totalSupplyCalls = collections
    .filter((collection) => collection?.address)
    .map((collection) => ({
      address: collection.address.toLowerCase(),
      name: 'totalSupply',
    }))
  if (totalSupplyCalls.length > 0) {
    const totalSupplyRaw = await multicallv2({
      abi: erc721Abi,
      calls: totalSupplyCalls,
      options: { requireSuccess: false },
    })
    const totalSupply = totalSupplyRaw.flat()
    return totalSupply.map((totalCount) => (totalCount ? totalCount.toNumber() : 0))
  }
  return []
}

/**
 * Fetch all collections data by combining data from the API (static metadata) and the Subgraph (dynamic market data)
 */
export const getCollections = async (): Promise<Record<string, Collection>> => {
  try {
    const [collections, collectionsMarket] = await Promise.all([getCollectionsApi(), getCollectionsSg()])
    const collectionApiData: ApiCollection[] = collections?.data ?? []
    let collectionsTotalSupply
    try {
      collectionsTotalSupply = await fetchCollectionsTotalSupply(collectionApiData)
    } catch (error) {
      console.error('on chain fetch collections total supply error', error)
    }
    const collectionApiDataCombinedOnChain = collectionApiData.map((collection, index) => {
      const totalSupplyFromApi = Number(collection?.totalSupply) || 0
      const totalSupplyFromOnChain = collectionsTotalSupply[index]
      return {
        ...collection,
        totalSupply: Math.max(totalSupplyFromApi, totalSupplyFromOnChain).toString(),
      }
    })

    return combineCollectionData(collectionApiDataCombinedOnChain, collectionsMarket)
  } catch (error) {
    console.error('Unable to fetch data:', error)
    return null
  }
}

/**
 * Fetch collection data by combining data from the API (static metadata) and the Subgraph (dynamic market data)
 */
export const getCollection = async (collectionAddress: string): Promise<Record<string, Collection> | null> => {
  try {
    const [collection, collectionMarket] = await Promise.all([
      getCollectionApi(collectionAddress),
      getCollectionSg(collectionAddress),
    ])
    let collectionsTotalSupply
    try {
      collectionsTotalSupply = await fetchCollectionsTotalSupply([collection])
    } catch (error) {
      console.error('on chain fetch collections total supply error', error)
    }
    const totalSupplyFromApi = Number(collection?.totalSupply) || 0
    const totalSupplyFromOnChain = collectionsTotalSupply?.[0]
    const collectionApiDataCombinedOnChain = {
      ...collection,
      totalSupply: Math.max(totalSupplyFromApi, totalSupplyFromOnChain).toString(),
    }

    return combineCollectionData([collectionApiDataCombinedOnChain], [collectionMarket])
  } catch (error) {
    console.error('Unable to fetch data:', error)
    return null
  }
}

/**
 * Fetch static data from a collection using the API
 * @returns
 */
export const getCollectionApi = async (collectionAddress: string): Promise<ApiCollection> => {
  const res = await fetch(`${API_NFT}/collections/${collectionAddress}`)
  if (res.ok) {
    const json = await res.json()
    return json.data
  }
  console.error(`API: Failed to fetch NFT collection ${collectionAddress}`, res.statusText)
  return null
}

/**
 * Fetch static data for all nfts in a collection using the API
 * @param collectionAddress
 * @param size
 * @param page
 * @returns
 */
export const getNftsFromCollectionApi = async (
  collectionAddress: string,
  size = 100,
  page = 1,
): Promise<ApiResponseCollectionTokens> => {
  const isPBCollection = isAddress(collectionAddress) === pancakeBunniesAddress
  const requestPath = `${API_NFT}/collections/${collectionAddress}/tokens${
    !isPBCollection ? `?page=${page}&size=${size}` : ``
  }`

  try {
    const res = await fetch(requestPath)
    if (res.ok) {
      const data = await res.json()
      const filteredAttributesDistribution = pickBy(data.attributesDistribution, Boolean)
      const filteredData = pickBy(data.data, Boolean)
      const filteredTotal = lodashSize(filteredData)
      return {
        ...data,
        total: filteredTotal,
        attributesDistribution: filteredAttributesDistribution,
        data: filteredData,
      }
    }
    console.error(`API: Failed to fetch NFT tokens for ${collectionAddress} collection`, res.statusText)
    return null
  } catch (error) {
    console.error(`API: Failed to fetch NFT tokens for ${collectionAddress} collection`, error)
    return null
  }
}

/**
 * Fetch a single NFT using the API
 * @param collectionAddress
 * @param tokenId
 * @returns NFT from API
 */
export const getNftApi = async (
  collectionAddress: string,
  tokenId: string,
): Promise<ApiResponseSpecificToken['data']> => {
  const res = await fetch(`${API_NFT}/collections/${collectionAddress}/tokens/${tokenId}`)
  if (res.ok) {
    const json = await res.json()
    return json.data
  }

  console.error(`API: Can't fetch NFT token ${tokenId} in ${collectionAddress}`, res.status)
  return null
}

/**
 * Fetch a list of NFT from different collections
 * @param from Array of { collectionAddress: string; tokenId: string }
 * @returns Array of NFT from API
 */
export const getNftsFromDifferentCollectionsApi = async (
  from: { collectionAddress: string; tokenId: string }[],
): Promise<NftToken[]> => {
  const promises = from.map((nft) => getNftApi(nft.collectionAddress, nft.tokenId))
  const responses = await Promise.all(promises)
  // Sometimes API can't find some tokens (e.g. 404 response)
  // at least return the ones that returned successfully
  return responses
    .filter((resp) => resp)
    .map((res, index) => ({
      tokenId: res.tokenId,
      name: res.name,
      collectionName: res.collection.name,
      collectionAddress: from[index].collectionAddress,
      description: res.description,
      attributes: res.attributes,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      image: res.image,
    }))
}

/**
 * SUBGRAPH HELPERS
 */

/**
 * Fetch market data from a collection using the Subgraph
 * @returns
 */
export const getCollectionSg = async (collectionAddress: string): Promise<CollectionMarketDataBaseFields> => {
  try {
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getCollectionData($collectionAddress: String!) {
          collection(id: $collectionAddress) {
            ${collectionBaseFields}
          }
        }
      `,
      { collectionAddress: collectionAddress.toLowerCase() },
    )
    return res.collection
  } catch (error) {
    console.error('Failed to fetch collection', error)
    return null
  }
}

/**
 * Fetch market data from all collections using the Subgraph
 * @returns
 */
export const getCollectionsSg = async (): Promise<CollectionMarketDataBaseFields[]> => {
  try {
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        {
          collections {
            ${collectionBaseFields}
          }
        }
      `,
    )
    return res.collections
  } catch (error) {
    console.error('Failed to fetch NFT collections', error)
    return []
  }
}

/**
 * Fetch market data for nfts in a collection using the Subgraph
 * @param collectionAddress
 * @param first
 * @param skip
 * @returns
 */
export const getNftsFromCollectionSg = async (
  collectionAddress: string,
  first = 1000,
  skip = 0,
): Promise<TokenMarketData[]> => {
  // Squad to be sorted by tokenId as this matches the order of the paginated API return. For PBs - get the most recent,
  const isPBCollection = isAddress(collectionAddress) === pancakeBunniesAddress

  try {
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getNftCollectionMarketData($collectionAddress: String!) {
          collection(id: $collectionAddress) {
            id
            nfts(orderBy:${isPBCollection ? 'updatedAt' : 'tokenId'}, skip: $skip, first: $first) {
             ${baseNftFields}
            }
          }
        }
      `,
      { collectionAddress: collectionAddress.toLowerCase(), skip, first },
    )
    return res.collection.nfts
  } catch (error) {
    console.error('Failed to fetch NFTs from collection', error)
    return []
  }
}

/**
 * Fetch market data for PancakeBunnies NFTs by bunny id using the Subgraph
 * @param bunnyId - bunny id to query
 * @param existingTokenIds - tokens that are already loaded into redux
 * @returns
 */
export const getNftsByBunnyIdSg = async (
  bunnyId: string,
  existingTokenIds: string[],
  orderDirection: 'asc' | 'desc',
): Promise<TokenMarketData[]> => {
  try {
    const where =
      existingTokenIds.length > 0
        ? { otherId: bunnyId, isTradable: true, tokenId_not_in: existingTokenIds }
        : { otherId: bunnyId, isTradable: true }
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getNftsByBunnyIdSg($collectionAddress: String!, $where: NFT_filter, $orderDirection: String!) {
          nfts(first: 30, where: $where, orderBy: currentAskPrice, orderDirection: $orderDirection) {
            ${baseNftFields}
          }
        }
      `,
      {
        collectionAddress: pancakeBunniesAddress.toLowerCase(),
        where,
        orderDirection,
      },
    )
    return res.nfts
  } catch (error) {
    console.error(`Failed to fetch collection NFTs for bunny id ${bunnyId}`, error)
    return []
  }
}

/**
 * Fetch market data for PancakeBunnies NFTs by bunny id using the Subgraph
 * @param bunnyId - bunny id to query
 * @param existingTokenIds - tokens that are already loaded into redux
 * @returns
 */
export const getMarketDataForTokenIds = async (
  collectionAddress: string,
  existingTokenIds: string[],
): Promise<TokenMarketData[]> => {
  try {
    if (existingTokenIds.length === 0) {
      return []
    }
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getMarketDataForTokenIds($collectionAddress: String!, $where: NFT_filter) {
          collection(id: $collectionAddress) {
            id
            nfts(first: 1000, where: $where) {
              ${baseNftFields}
            }
          }
        }
      `,
      {
        collectionAddress: collectionAddress.toLowerCase(),
        where: { tokenId_in: existingTokenIds },
      },
    )
    return res.collection.nfts
  } catch (error) {
    console.error(`Failed to fetch market data for NFTs stored tokens`, error)
    return []
  }
}

export const getNftsOnChainMarketData = async (
  collectionAddress: string,
  tokenIds: string[],
): Promise<TokenMarketData[]> => {
  try {
    const nftMarketContract = getNftMarketContract()
    const response = await nftMarketContract.viewAsksByCollectionAndTokenIds(collectionAddress.toLowerCase(), tokenIds)
    const askInfo = response?.askInfo

    if (!askInfo) return []

    return askInfo
      .map((tokenAskInfo, index) => {
        if (!tokenAskInfo.seller || !tokenAskInfo.price) return null
        const currentSeller = tokenAskInfo.seller
        const isTradable = currentSeller.toLowerCase() !== NOT_ON_SALE_SELLER
        const currentAskPrice = tokenAskInfo.price && formatBigNumber(tokenAskInfo.price)

        return {
          collection: { id: collectionAddress.toLowerCase() },
          tokenId: tokenIds[index],
          currentSeller,
          isTradable,
          currentAskPrice,
        }
      })
      .filter(Boolean)
  } catch (error) {
    console.error('Failed to fetch NFTs onchain market data', error)
    return []
  }
}

export const getNftsUpdatedMarketData = async (
  collectionAddress: string,
  tokenIds: string[],
): Promise<{ tokenId: string; currentSeller: string; currentAskPrice: BigNumber; isTradable: boolean }[]> => {
  try {
    const nftMarketContract = getNftMarketContract()
    const response = await nftMarketContract.viewAsksByCollectionAndTokenIds(collectionAddress.toLowerCase(), tokenIds)
    const askInfo = response?.askInfo

    if (!askInfo) return null

    return askInfo.map((tokenAskInfo, index) => {
      const isTradable = tokenAskInfo.seller ? tokenAskInfo.seller.toLowerCase() !== NOT_ON_SALE_SELLER : false

      return {
        tokenId: tokenIds[index],
        currentSeller: tokenAskInfo.seller,
        isTradable,
        currentAskPrice: tokenAskInfo.price,
      }
    })
  } catch (error) {
    console.error('Failed to fetch updated NFT market data', error)
    return null
  }
}

export const getAccountNftsOnChainMarketData = async (
  collections: ApiCollections,
  account: string,
): Promise<TokenMarketData[]> => {
  try {
    const nftMarketAddress = getNftMarketAddress()
    const collectionList = Object.values(collections)
    const askCalls = collectionList.map((collection) => {
      const { address: collectionAddress } = collection
      return {
        address: nftMarketAddress,
        name: 'viewAsksByCollectionAndSeller',
        params: [collectionAddress, account, 0, 1000],
      }
    })

    const askCallsResultsRaw = await multicallv2({
      abi: nftMarketAbi,
      calls: askCalls,
      options: { requireSuccess: false },
    })
    const askCallsResults = askCallsResultsRaw
      .map((askCallsResultRaw, askCallIndex) => {
        if (!askCallsResultRaw?.tokenIds || !askCallsResultRaw?.askInfo || !collectionList[askCallIndex]?.address)
          return null
        return askCallsResultRaw.tokenIds
          .map((tokenId, tokenIdIndex) => {
            if (!tokenId || !askCallsResultRaw.askInfo[tokenIdIndex] || !askCallsResultRaw.askInfo[tokenIdIndex].price)
              return null

            const currentAskPrice = formatBigNumber(askCallsResultRaw.askInfo[tokenIdIndex].price)

            return {
              collection: { id: collectionList[askCallIndex].address.toLowerCase() },
              tokenId: tokenId.toString(),
              account,
              isTradable: true,
              currentAskPrice,
            }
          })
          .filter(Boolean)
      })
      .flat()
      .filter(Boolean)

    return askCallsResults
  } catch (error) {
    console.error('Failed to fetch NFTs onchain market data', error)
    return []
  }
}

export const getNftsMarketData = async (
  where = {},
  first = 1000,
  orderBy = 'id',
  orderDirection: 'asc' | 'desc' = 'desc',
  skip = 0,
): Promise<TokenMarketData[]> => {
  try {
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getNftsMarketData($first: Int, $skip: Int!, $where: NFT_filter, $orderBy: NFT_orderBy, $orderDirection: OrderDirection) {
          nfts(where: $where, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, skip: $skip) {
            ${baseNftFields}
            transactionHistory {
              ${baseTransactionFields}
            }
          }
        }
      `,
      { where, first, skip, orderBy, orderDirection },
    )

    return res.nfts
  } catch (error) {
    console.error('Failed to fetch NFTs market data', error)
    return []
  }
}

export const getAllPancakeBunniesLowestPrice = async (bunnyIds: string[]): Promise<Record<string, number>> => {
  try {
    const singlePancakeBunnySubQueries = bunnyIds.map(
      (
        bunnyId,
      ) => `b${bunnyId}:nfts(first: 1, where: { otherId: ${bunnyId}, isTradable: true }, orderBy: currentAskPrice, orderDirection: asc) {
        currentAskPrice
      }
    `,
    )
    const rawResponse: Record<string, { currentAskPrice: string }[]> = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getAllPancakeBunniesLowestPrice {
          ${singlePancakeBunnySubQueries}
        }
      `,
    )
    return fromPairs(
      Object.keys(rawResponse).map((subQueryKey) => {
        const bunnyId = subQueryKey.split('b')[1]
        return [
          bunnyId,
          rawResponse[subQueryKey].length > 0 ? parseFloat(rawResponse[subQueryKey][0].currentAskPrice) : Infinity,
        ]
      }),
    )
  } catch (error) {
    console.error('Failed to fetch PancakeBunnies lowest prices', error)
    return {}
  }
}

export const getAllPancakeBunniesRecentUpdatedAt = async (bunnyIds: string[]): Promise<Record<string, number>> => {
  try {
    const singlePancakeBunnySubQueries = bunnyIds.map(
      (
        bunnyId,
      ) => `b${bunnyId}:nfts(first: 1, where: { otherId: ${bunnyId}, isTradable: true }, orderBy: updatedAt, orderDirection: desc) {
        updatedAt
      }
    `,
    )
    const rawResponse: Record<string, { updatedAt: string }[]> = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getAllPancakeBunniesLowestPrice {
          ${singlePancakeBunnySubQueries}
        }
      `,
    )
    return fromPairs(
      Object.keys(rawResponse).map((subQueryKey) => {
        const bunnyId = subQueryKey.split('b')[1]
        return [
          bunnyId,
          rawResponse[subQueryKey].length > 0 ? Number(rawResponse[subQueryKey][0].updatedAt) : -Infinity,
        ]
      }),
    )
  } catch (error) {
    console.error('Failed to fetch PancakeBunnies latest market updates', error)
    return {}
  }
}

/**
 * Returns the lowest/highest price of any NFT in a collection
 */
export const getLeastMostPriceInCollection = async (
  collectionAddress: string,
  orderDirection: 'asc' | 'desc' = 'asc',
) => {
  try {
    const response = await getNftsMarketData(
      { collection: collectionAddress.toLowerCase(), isTradable: true },
      1,
      'currentAskPrice',
      orderDirection,
    )

    if (response.length === 0) {
      return 0
    }

    const [nftSg] = response
    return parseFloat(nftSg.currentAskPrice)
  } catch (error) {
    console.error(`Failed to lowest price NFTs in collection ${collectionAddress}`, error)
    return 0
  }
}

/**
 * Fetch user trading data for buyTradeHistory, sellTradeHistory and askOrderHistory from the Subgraph
 * @param where a User_filter where condition
 * @returns a UserActivity object
 */
export const getUserActivity = async (address: string): Promise<UserActivity> => {
  try {
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getUserActivity($address: String!) {
          user(id: $address) {
            buyTradeHistory(first: 250, orderBy: timestamp, orderDirection: desc) {
              ${baseTransactionFields}
              nft {
                ${baseNftFields}
              }
            }
            sellTradeHistory(first: 250, orderBy: timestamp, orderDirection: desc) {
              ${baseTransactionFields}
              nft {
                ${baseNftFields}
              }
            }
            askOrderHistory(first: 500, orderBy: timestamp, orderDirection: desc) {
              id
              block
              timestamp
              orderType
              askPrice
              nft {
                ${baseNftFields}
              }
            }
          }
        }
      `,
      { address },
    )

    return res.user || { askOrderHistory: [], buyTradeHistory: [], sellTradeHistory: [] }
  } catch (error) {
    console.error('Failed to fetch user Activity', error)
    return {
      askOrderHistory: [],
      buyTradeHistory: [],
      sellTradeHistory: [],
    }
  }
}

export const getCollectionActivity = async (
  address: string,
  nftActivityFilter: NftActivityFilter,
  itemPerQuery,
): Promise<{ askOrders?: AskOrder[]; transactions?: Transaction[] }> => {
  const getAskOrderEvent = (orderType: MarketEvent): AskOrderType => {
    switch (orderType) {
      case MarketEvent.CANCEL:
        return AskOrderType.CANCEL
      case MarketEvent.MODIFY:
        return AskOrderType.MODIFY
      case MarketEvent.NEW:
        return AskOrderType.NEW
      default:
        return AskOrderType.MODIFY
    }
  }

  const isFetchAllCollections = address === ''

  const hasCollectionFilter = nftActivityFilter.collectionFilters.length > 0

  const collectionFilterGql = !isFetchAllCollections
    ? `collection: ${JSON.stringify(address)}`
    : hasCollectionFilter
    ? `collection_in: ${JSON.stringify(nftActivityFilter.collectionFilters)}`
    : ``

  const askOrderTypeFilter = nftActivityFilter.typeFilters
    .filter((marketEvent) => marketEvent !== MarketEvent.SELL)
    .map((marketEvent) => getAskOrderEvent(marketEvent))

  const askOrderIncluded = nftActivityFilter.typeFilters.length === 0 || askOrderTypeFilter.length > 0

  const askOrderTypeFilterGql =
    askOrderTypeFilter.length > 0 ? `orderType_in: ${JSON.stringify(askOrderTypeFilter)}` : ``

  const transactionIncluded =
    nftActivityFilter.typeFilters.length === 0 ||
    nftActivityFilter.typeFilters.some(
      (marketEvent) => marketEvent === MarketEvent.BUY || marketEvent === MarketEvent.SELL,
    )

  let askOrderQueryItem = itemPerQuery / 2
  let transactionQueryItem = itemPerQuery / 2

  if (!askOrderIncluded || !transactionIncluded) {
    askOrderQueryItem = !askOrderIncluded ? 0 : itemPerQuery
    transactionQueryItem = !transactionIncluded ? 0 : itemPerQuery
  }

  const askOrderGql = askOrderIncluded
    ? `askOrders(first: ${askOrderQueryItem}, orderBy: timestamp, orderDirection: desc, where:{
            ${collectionFilterGql}, ${askOrderTypeFilterGql}
          }) {
              id
              block
              timestamp
              orderType
              askPrice
              seller {
                id
              }
              nft {
                ${baseNftFields}
              }
          }`
    : ``

  const transactionGql = transactionIncluded
    ? `transactions(first: ${transactionQueryItem}, orderBy: timestamp, orderDirection: desc, where:{
            ${collectionFilterGql}
          }) {
            ${baseTransactionFields}
              nft {
                ${baseNftFields}
              }
          }`
    : ``

  try {
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getCollectionActivity {
          ${askOrderGql}
          ${transactionGql}
        }
      `,
    )

    return res || { askOrders: [], transactions: [] }
  } catch (error) {
    console.error('Failed to fetch collection Activity', error)
    return {
      askOrders: [],
      transactions: [],
    }
  }
}

export const getTokenActivity = async (
  tokenId: string,
  collectionAddress: string,
): Promise<{ askOrders: AskOrder[]; transactions: Transaction[] }> => {
  try {
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getCollectionActivity($tokenId: BigInt!, $address: ID!) {
          nfts(where:{tokenId: $tokenId, collection: $address}) {
            transactionHistory(orderBy: timestamp, orderDirection: desc) {
              ${baseTransactionFields}
                nft {
                  ${baseNftFields}
                }
            }
            askHistory(orderBy: timestamp, orderDirection: desc) {
                id
                block
                timestamp
                orderType
                askPrice
                seller {
                  id
                }
                nft {
                  ${baseNftFields}
                }
            }
          }
        }
      `,
      { tokenId, address: collectionAddress },
    )

    if (res.nfts.length > 0) {
      return { askOrders: res.nfts[0].askHistory, transactions: res.nfts[0].transactionHistory }
    }
    return { askOrders: [], transactions: [] }
  } catch (error) {
    console.error('Failed to fetch token Activity', error)
    return {
      askOrders: [],
      transactions: [],
    }
  }
}

/**
 * Get the most recently listed NFTs
 * @param first Number of nfts to retrieve
 * @returns NftTokenSg[]
 */
export const getLatestListedNfts = async (first: number): Promise<TokenMarketData[]> => {
  try {
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getLatestNftMarketData($first: Int) {
          nfts(where: { isTradable: true }, orderBy: updatedAt , orderDirection: desc, first: $first) {
            ${baseNftFields}
            collection {
              id
            }
          }
        }
      `,
      { first },
    )

    return res.nfts
  } catch (error) {
    console.error('Failed to fetch NFTs market data', error)
    return []
  }
}

/**
 * Filter NFTs from a collection
 * @param collectionAddress
 * @returns
 */
export const fetchNftsFiltered = async (
  collectionAddress: string,
  filters: Record<string, string | number>,
): Promise<ApiTokenFilterResponse> => {
  const res = await fetch(`${API_NFT}/collections/${collectionAddress}/filter?${stringify(filters)}`)

  if (res.ok) {
    const data = await res.json()
    return data
  }

  console.error(`API: Failed to fetch NFT collection ${collectionAddress}`, res.statusText)
  return null
}

/**
 * OTHER HELPERS
 */

export const getMetadataWithFallback = (apiMetadata: ApiResponseCollectionTokens['data'], bunnyId: string) => {
  // The fallback is just for the testnet where some bunnies don't exist
  return (
    apiMetadata[bunnyId] ?? {
      name: '',
      description: '',
      collection: { name: 'Pancake Bunnies' },
      image: {
        original: '',
        thumbnail: '',
      },
    }
  )
}

export const getPancakeBunniesAttributesField = (bunnyId: string) => {
  // Generating attributes field that is not returned by API
  // but can be "faked" since objects are keyed with bunny id
  return [
    {
      traitType: 'bunnyId',
      value: bunnyId,
      displayType: null,
    },
  ]
}

export const combineApiAndSgResponseToNftToken = (
  apiMetadata: ApiSingleTokenData,
  marketData: TokenMarketData,
  attributes: NftAttribute[],
) => {
  return {
    tokenId: marketData.tokenId,
    name: apiMetadata.name,
    description: apiMetadata.description,
    collectionName: apiMetadata.collection.name,
    collectionAddress: pancakeBunniesAddress,
    image: apiMetadata.image,
    marketData,
    attributes,
  }
}

export const fetchWalletTokenIdsForCollections = async (
  account: string,
  collections: ApiCollections,
): Promise<TokenIdWithCollectionAddress[]> => {
  const balanceOfCalls = Object.values(collections).map((collection) => {
    const { address: collectionAddress } = collection
    return {
      address: collectionAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const balanceOfCallsResultRaw = await multicallv2({
    abi: erc721Abi,
    calls: balanceOfCalls,
    options: { requireSuccess: false },
  })
  const balanceOfCallsResult = balanceOfCallsResultRaw.flat()

  const tokenIdCalls = Object.values(collections)
    .map((collection, index) => {
      const balanceOf = balanceOfCallsResult[index]?.toNumber() ?? 0
      const { address: collectionAddress } = collection

      return range(balanceOf).map((tokenIndex) => {
        return {
          address: collectionAddress,
          name: 'tokenOfOwnerByIndex',
          params: [account, tokenIndex],
        }
      })
    })
    .flat()

  const tokenIdResultRaw = await multicallv2({
    abi: erc721Abi,
    calls: tokenIdCalls,
    options: { requireSuccess: false },
  })
  const tokenIdResult = tokenIdResultRaw.flat()

  const nftLocation = NftLocation.WALLET

  const walletNfts = tokenIdResult.reduce((acc, tokenIdBn, index) => {
    if (tokenIdBn) {
      const { address: collectionAddress } = tokenIdCalls[index]
      acc.push({ tokenId: tokenIdBn.toString(), collectionAddress, nftLocation })
    }
    return acc
  }, [])

  return walletNfts
}

/**
 * Helper to combine data from the collections' API and subgraph
 */
export const combineCollectionData = (
  collectionApiData: ApiCollection[],
  collectionSgData: CollectionMarketDataBaseFields[],
): Record<string, Collection> => {
  const collectionsMarketObj: Record<string, CollectionMarketDataBaseFields> = fromPairs(
    collectionSgData.filter(Boolean).map((current) => [current.id, current]),
  )

  return fromPairs(
    collectionApiData
      .filter((collection) => collection?.address)
      .map((current) => {
        const collectionMarket = collectionsMarketObj[current.address.toLowerCase()]
        const collection: Collection = {
          ...current,
          ...collectionMarket,
        }

        if (current.name) {
          collection.name = current.name
        }

        return [current.address, collection]
      }),
  )
}

/**
 * Evaluate whether a market NFT is in a users wallet, their profile picture, or on sale
 * @param tokenId string
 * @param tokenIdsInWallet array of tokenIds in wallet
 * @param tokenIdsForSale array of tokenIds on sale
 * @param profileNftId Optional tokenId of users' profile picture
 * @returns NftLocation enum value
 */
export const getNftLocationForMarketNft = (
  tokenId: string,
  tokenIdsInWallet: string[],
  tokenIdsForSale: string[],
  profileNftId?: string,
): NftLocation => {
  if (tokenId === profileNftId) {
    return NftLocation.PROFILE
  }
  if (tokenIdsForSale.includes(tokenId)) {
    return NftLocation.FORSALE
  }
  if (tokenIdsInWallet.includes(tokenId)) {
    return NftLocation.WALLET
  }
  console.error(`Cannot determine location for tokenID ${tokenId}, defaulting to NftLocation.WALLET`)
  return NftLocation.WALLET
}

/**
 * Construct complete TokenMarketData entities with a users' wallet NFT ids and market data for their wallet NFTs
 * @param walletNfts TokenIdWithCollectionAddress
 * @param marketDataForWalletNfts TokenMarketData[]
 * @returns TokenMarketData[]
 */
export const attachMarketDataToWalletNfts = (
  walletNfts: TokenIdWithCollectionAddress[],
  marketDataForWalletNfts: TokenMarketData[],
): TokenMarketData[] => {
  const walletNftsWithMarketData = walletNfts.map((walletNft) => {
    const marketData = marketDataForWalletNfts.find(
      (marketNft) =>
        marketNft.tokenId === walletNft.tokenId &&
        marketNft.collection.id.toLowerCase() === walletNft.collectionAddress.toLowerCase(),
    )
    return (
      marketData ?? {
        tokenId: walletNft.tokenId,
        collection: {
          id: walletNft.collectionAddress.toLowerCase(),
        },
        nftLocation: walletNft.nftLocation,
        metadataUrl: null,
        transactionHistory: null,
        currentSeller: null,
        isTradable: null,
        currentAskPrice: null,
        latestTradedPriceInBNB: null,
        tradeVolumeBNB: null,
        totalTrades: null,
        otherId: null,
      }
    )
  })
  return walletNftsWithMarketData
}

/**
 * Attach TokenMarketData and location to NftToken
 * @param nftsWithMetadata NftToken[] with API metadata
 * @param nftsForSale  market data for nfts that are on sale (i.e. not in a user's wallet)
 * @param walletNfts market data for nfts in a user's wallet
 * @param tokenIdsInWallet array of token ids in user's wallet
 * @param tokenIdsForSale array of token ids of nfts that are on sale
 * @param profileNftId profile picture token id
 * @returns NFT[]
 */
export const combineNftMarketAndMetadata = (
  nftsWithMetadata: NftToken[],
  nftsForSale: TokenMarketData[],
  walletNfts: TokenMarketData[],
  tokenIdsInWallet: string[],
  tokenIdsForSale: string[],
  profileNftId?: string,
): NftToken[] => {
  const completeNftData = nftsWithMetadata.map<NftToken>((nft) => {
    // Get metadata object
    let marketData = nftsForSale.find(
      (forSaleNft) =>
        forSaleNft.tokenId === nft.tokenId &&
        forSaleNft.collection &&
        forSaleNft.collection.id === nft.collectionAddress,
    )
    if (!marketData) {
      marketData = walletNfts.find(
        (marketNft) =>
          marketNft.collection &&
          marketNft.collection.id === nft.collectionAddress &&
          marketNft.tokenId === nft.tokenId,
      )
    }
    const location = getNftLocationForMarketNft(nft.tokenId, tokenIdsInWallet, tokenIdsForSale, profileNftId)
    return { ...nft, marketData, location }
  })
  return completeNftData
}

const fetchWalletMarketData = async (walletNftsByCollection: {
  [collectionAddress: string]: TokenIdWithCollectionAddress[]
}): Promise<TokenMarketData[]> => {
  const walletMarketDataRequests = Object.entries(walletNftsByCollection).map(
    async ([collectionAddress, tokenIdsWithCollectionAddress]) => {
      const tokenIdIn = tokenIdsWithCollectionAddress.map((walletNft) => walletNft.tokenId)
      const [nftsOnChainMarketData, nftsMarketData] = await Promise.all([
        getNftsOnChainMarketData(collectionAddress.toLowerCase(), tokenIdIn),
        getNftsMarketData({
          tokenId_in: tokenIdIn,
          collection: collectionAddress.toLowerCase(),
        }),
      ])

      return tokenIdIn
        .map((tokenId) => {
          const nftMarketData = nftsMarketData.find((tokenMarketData) => tokenMarketData.tokenId === tokenId)
          const onChainMarketData = nftsOnChainMarketData.find(
            (onChainTokenMarketData) => onChainTokenMarketData.tokenId === tokenId,
          )

          if (!nftMarketData && !onChainMarketData) return null

          return { ...nftMarketData, ...onChainMarketData }
        })
        .filter(Boolean)
    },
  )

  const walletMarketDataResponses = await Promise.all(walletMarketDataRequests)
  return walletMarketDataResponses.flat()
}

/**
 * Get in-wallet, on-sale & profile pic NFT metadata, complete with market data for a given account
 * @param account
 * @param collections
 * @param profileNftWithCollectionAddress
 * @returns Promise<NftToken[]>
 */
export const getCompleteAccountNftData = async (
  account: string,
  collections: ApiCollections,
  profileNftWithCollectionAddress?: TokenIdWithCollectionAddress,
): Promise<NftToken[]> => {
  // Add delist collections to allow user reclaim their NFTs
  const collectionsWithDelist = { ...collections, ...DELIST_COLLECTIONS }

  const [walletNftIdsWithCollectionAddress, onChainForSaleNfts] = await Promise.all([
    fetchWalletTokenIdsForCollections(account, collectionsWithDelist),
    getAccountNftsOnChainMarketData(collectionsWithDelist, account),
  ])

  if (profileNftWithCollectionAddress?.tokenId) {
    walletNftIdsWithCollectionAddress.unshift(profileNftWithCollectionAddress)
  }

  const walletNftsByCollection = groupBy(
    walletNftIdsWithCollectionAddress,
    (walletNftId) => walletNftId.collectionAddress,
  )

  const walletMarketData = await fetchWalletMarketData(walletNftsByCollection)

  const walletNftsWithMarketData = attachMarketDataToWalletNfts(walletNftIdsWithCollectionAddress, walletMarketData)

  const walletTokenIds = walletNftIdsWithCollectionAddress
    .filter((walletNft) => {
      // Profile Pic NFT is no longer wanted in this array, hence the filter
      return profileNftWithCollectionAddress?.tokenId !== walletNft.tokenId
    })
    .map((nft) => nft.tokenId)

  const tokenIdsForSale = onChainForSaleNfts.map((nft) => nft.tokenId)

  const forSaleNftIds = onChainForSaleNfts.map((nft) => {
    return { collectionAddress: nft.collection.id, tokenId: nft.tokenId }
  })

  const metadataForAllNfts = await getNftsFromDifferentCollectionsApi([
    ...forSaleNftIds,
    ...walletNftIdsWithCollectionAddress,
  ])

  const completeNftData = combineNftMarketAndMetadata(
    metadataForAllNfts,
    onChainForSaleNfts,
    walletNftsWithMarketData,
    walletTokenIds,
    tokenIdsForSale,
    profileNftWithCollectionAddress?.tokenId,
  )

  return completeNftData
}

/**
 * Fetch distribution information for a collection
 * @returns
 */
export const getCollectionDistributionApi = async <T>(collectionAddress: string): Promise<T> => {
  const res = await fetch(`${API_NFT}/collections/${collectionAddress}/distribution`)
  if (res.ok) {
    const data = await res.json()
    return data
  }
  console.error(`API: Failed to fetch NFT collection ${collectionAddress} distribution`, res.statusText)
  return null
}
