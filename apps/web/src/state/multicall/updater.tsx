import { useDebounce } from '@pancakeswap/hooks'
import { Multicall } from 'config/abi/types'
import { ResultStructOutput } from 'config/abi/types/Multicall'
import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useCurrentBlock } from 'state/block/hooks'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useMulticallContract } from '../../hooks/useContract'
import { AppState, useAppDispatch } from '../index'
import {
  Call,
  errorFetchingMulticallResults,
  fetchingMulticallResults,
  parseCallKey,
  updateMulticallResults,
} from './actions'
import chunkArray from './chunkArray'
import { CancelledError, retry, RetryableError } from './retry'

// chunk calls so we do not exceed the gas limit
const CALL_CHUNK_SIZE = 500

/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * @param multicallContract multicall contract to fetch against
 * @param chunk chunk of calls to make
 * @param minBlockNumber minimum block number of the result set
 */
async function fetchChunk(
  multicallContract: Multicall,
  chunk: Call[],
  minBlockNumber: number,
): Promise<{ results: ResultStructOutput[]; blockNumber: number }> {
  console.debug('Fetching chunk', multicallContract, chunk, minBlockNumber)
  let resultsBlockNumber
  let returnData
  try {
    // prettier-ignore
    [resultsBlockNumber, , returnData] = await multicallContract.callStatic.tryBlockAndAggregate(
      false,
      chunk.map((obj) => ({
        callData: obj.callData,
        target: obj.address,
      })),
      {
        blockTag: minBlockNumber,
      }
    )
  } catch (err) {
    const error = err as any
    if (
      error.code === -32000 ||
      (error?.data?.message && error?.data?.message?.indexOf('header not found') !== -1) ||
      error.message?.indexOf('header not found') !== -1
    ) {
      throw new RetryableError(`header not found for block number ${minBlockNumber}`)
    } else if (error.code === -32603 || error.message?.indexOf('execution ran out of gas') !== -1) {
      if (chunk.length > 1) {
        if (process.env.NODE_ENV === 'development') {
          console.debug('Splitting a chunk in 2', chunk)
        }
        const half = Math.floor(chunk.length / 2)
        const [c0, c1] = await Promise.all([
          fetchChunk(multicallContract, chunk.slice(0, half), minBlockNumber),
          fetchChunk(multicallContract, chunk.slice(half, chunk.length), minBlockNumber),
        ])
        return {
          results: c0.results.concat(c1.results),
          blockNumber: c1.blockNumber,
        }
      }
    }
    console.debug('Failed to fetch chunk inside retry', error)
    throw error
  }
  if (resultsBlockNumber?.toNumber() < minBlockNumber) {
    console.debug(`Fetched results for old block number: ${resultsBlockNumber.toString()} vs. ${minBlockNumber}`)
  }
  return { results: returnData, blockNumber: resultsBlockNumber?.toNumber() }
}

/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * @param allListeners the all listeners state
 * @param chainId the current chain id
 */
export function activeListeningKeys(
  allListeners: AppState['multicall']['callListeners'],
  chainId?: number,
): { [callKey: string]: number } {
  if (!allListeners || !chainId) return {}
  const listeners = allListeners[chainId]
  if (!listeners) return {}

  return Object.keys(listeners).reduce<{ [callKey: string]: number }>((memo, callKey) => {
    const keyListeners = listeners[callKey]

    memo[callKey] = Object.keys(keyListeners)
      .filter((key) => {
        const blocksPerFetch = parseInt(key)
        if (blocksPerFetch <= 0) return false
        return keyListeners[blocksPerFetch] > 0
      })
      .reduce((previousMin, current) => {
        return Math.min(previousMin, parseInt(current))
      }, Infinity)
    return memo
  }, {})
}

/**
 * Return the keys that need to be refetched
 * @param callResults current call result state
 * @param listeningKeys each call key mapped to how old the data can be in blocks
 * @param chainId the current chain id
 * @param currentBlock the latest block number
 */
export function outdatedListeningKeys(
  callResults: AppState['multicall']['callResults'],
  listeningKeys: { [callKey: string]: number },
  chainId: number | undefined,
  currentBlock: number | undefined,
): string[] {
  if (!chainId || !currentBlock) return []
  const results = callResults[chainId]
  // no results at all, load everything
  if (!results) return Object.keys(listeningKeys)

  return Object.keys(listeningKeys).filter((callKey) => {
    const data = callResults[chainId][callKey]
    // no data, must fetch
    if (!data) return true

    const blocksPerFetch = listeningKeys[callKey]
    const minDataBlockNumber = currentBlock - (blocksPerFetch - 1)

    // already fetching it for a recent enough block, don't refetch it
    if (data.fetchingBlockNumber && data.fetchingBlockNumber >= minDataBlockNumber) return false

    // if data is older than minDataBlockNumber, fetch it
    return !data.blockNumber || data.blockNumber < minDataBlockNumber
  })
}

export default function Updater(): null {
  const dispatch = useAppDispatch()
  const state = useSelector<AppState, AppState['multicall']>((s) => s.multicall)
  // wait for listeners to settle before triggering updates
  const debouncedListeners = useDebounce(state.callListeners, 100)
  const currentBlock = useCurrentBlock()
  const { chainId } = useActiveChainId()
  const multicallContract = useMulticallContract()
  const cancellations = useRef<{ blockNumber: number; cancellations: (() => void)[] }>()

  const listeningKeys: { [callKey: string]: number } = useMemo(() => {
    return activeListeningKeys(debouncedListeners, chainId)
  }, [debouncedListeners, chainId])

  const unserializedOutdatedCallKeys = useMemo(() => {
    return outdatedListeningKeys(state.callResults, listeningKeys, chainId, currentBlock)
  }, [chainId, state.callResults, listeningKeys, currentBlock])

  const serializedOutdatedCallKeys = useMemo(
    () => JSON.stringify(unserializedOutdatedCallKeys.sort()),
    [unserializedOutdatedCallKeys],
  )

  useEffect(() => {
    if (!currentBlock || !chainId || !multicallContract) return

    const outdatedCallKeys: string[] = JSON.parse(serializedOutdatedCallKeys)
    if (outdatedCallKeys.length === 0) return
    const calls = outdatedCallKeys.map((key) => parseCallKey(key))

    const chunkedCalls = chunkArray(calls, CALL_CHUNK_SIZE)

    if (cancellations.current?.blockNumber !== currentBlock) {
      cancellations.current?.cancellations?.forEach((c) => c())
    }

    dispatch(
      fetchingMulticallResults({
        calls,
        chainId,
        fetchingBlockNumber: currentBlock,
      }),
    )

    cancellations.current = {
      blockNumber: currentBlock,
      cancellations: chunkedCalls.map((chunk, index) => {
        const { cancel, promise } = retry(() => fetchChunk(multicallContract, chunk, currentBlock), {
          n: Infinity,
          minWait: 2500,
          maxWait: 3500,
        })
        promise
          .then(({ results: returnData, blockNumber: fetchBlockNumber }) => {
            cancellations.current = { cancellations: [], blockNumber: currentBlock }

            // accumulates the length of all previous indices
            const firstCallKeyIndex = chunkedCalls.slice(0, index).reduce<number>((memo, curr) => memo + curr.length, 0)
            const lastCallKeyIndex = firstCallKeyIndex + returnData.length

            const { erroredCalls, results } = outdatedCallKeys.slice(firstCallKeyIndex, lastCallKeyIndex).reduce<{
              erroredCalls: Call[]
              results: { [callKey: string]: string | null }
            }>(
              (memo, callKey, i) => {
                if (returnData[i].success) {
                  memo.results[callKey] = returnData[i].returnData ?? null
                } else {
                  memo.erroredCalls.push(parseCallKey(callKey))
                }
                return memo
              },
              { erroredCalls: [], results: {} },
            )

            if (Object.keys(results).length > 0) {
              dispatch(
                updateMulticallResults({
                  chainId,
                  results,
                  blockNumber: fetchBlockNumber,
                }),
              )
            }

            if (erroredCalls.length > 0) {
              dispatch(
                errorFetchingMulticallResults({
                  calls: erroredCalls,
                  chainId,
                  fetchingBlockNumber: fetchBlockNumber,
                }),
              )
            }
          })
          .catch((error: any) => {
            if (error instanceof CancelledError) {
              console.debug('Cancelled fetch for blockNumber', currentBlock)
              return
            }
            console.error('Failed to fetch multicall chunk', chunk, chainId, error, currentBlock)
            dispatch(
              errorFetchingMulticallResults({
                calls: chunk,
                chainId,
                fetchingBlockNumber: currentBlock,
              }),
            )
          })
        return cancel
      }),
    }
  }, [chainId, multicallContract, dispatch, serializedOutdatedCallKeys, currentBlock])

  return null
}
