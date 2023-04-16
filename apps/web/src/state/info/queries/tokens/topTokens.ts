import { gql } from 'graphql-request'
import { useCallback, useState, useEffect } from 'react'
import { getDeltaTimestamps } from 'utils/getDeltaTimestamps'
import union from 'lodash/union'
import { useGetChainName } from '../../hooks'
import {
  MultiChainName,
  getMultiChainQueryEndPointWithStableSwap,
  checkIsStableSwap,
  multiChainTokenBlackList,
  multiChainTokenWhiteList,
} from '../../constant'

interface TopTokensResponse {
  tokenDayDatas: {
    id: string
  }[]
}

/**
 * Tokens to display on Home page
 * The actual data is later requested in tokenData.ts
 * Note: dailyTxns_gt: 300 is there to prevent fetching incorrectly priced tokens with high dailyVolumeUSD
 */
const fetchTopTokens = async (chainName: MultiChainName, timestamp24hAgo: number): Promise<string[]> => {
  const whereCondition =
    chainName === 'ETH'
      ? `where: { date_gt: ${timestamp24hAgo}, token_not_in: $blacklist, dailyVolumeUSD_gt:2000 }`
      : checkIsStableSwap()
      ? ''
      : `where: { dailyTxns_gt: 300, id_not_in: $blacklist, date_gt: ${timestamp24hAgo}}`
  const firstCount = 50
  try {
    const query = gql`
      query topTokens($blacklist: [ID!]) {
        tokenDayDatas(
          first: ${firstCount}
          ${whereCondition}
          orderBy: dailyVolumeUSD
          orderDirection: desc
        ) {
          id
        }
      }
    `
    const data = await getMultiChainQueryEndPointWithStableSwap(chainName).request<TopTokensResponse>(query, {
      blacklist: multiChainTokenBlackList[chainName],
    })
    // tokenDayDatas id has compound id "0xTOKENADDRESS-NUMBERS", extracting token address with .split('-')
    return union(
      data.tokenDayDatas.map((t) => t.id.split('-')[0]),
      multiChainTokenWhiteList[chainName],
    )
  } catch (error) {
    console.warn('fetchTopTokens', { chainName, timestamp24hAgo })
    console.error('Failed to fetch top tokens', error)
    return []
  }
}

/**
 * Fetch top addresses by volume
 */
const useTopTokenAddresses = (): string[] => {
  const [topTokenAddresses, setTopTokenAddresses] = useState([])
  const [timestamp24hAgo] = getDeltaTimestamps()
  const chainName = useGetChainName()

  const fetch = useCallback(async () => {
    const addresses = await fetchTopTokens(chainName, timestamp24hAgo)
    if (addresses.length > 0) setTopTokenAddresses(addresses)
  }, [timestamp24hAgo, chainName])

  useEffect(() => {
    fetch()
  }, [chainName, fetch])

  return topTokenAddresses
}

export const fetchTokenAddresses = async (chainName: MultiChainName) => {
  const [timestamp24hAgo] = getDeltaTimestamps()

  const addresses = await fetchTopTokens(chainName, timestamp24hAgo)

  return addresses
}

export default useTopTokenAddresses
