import { SwapCall } from 'hooks/useSwapCallArguments'
import { useContext, useMemo } from 'react'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { basisPointsToPercent } from 'utils/exchange'

import { StableConfigContext } from './useStableConfig'

export default function useStableSwapCallArgs(trade): SwapCall[] {
  const stableConfig = useContext(StableConfigContext)
  const swapContract = stableConfig?.stableSwapContract
  const [allowedSlippage] = useUserSlippageTolerance()

  const swapCalls = useMemo(() => {
    if (!trade) return []
    const inputAmountAddress = trade?.inputAmount?.currency?.address
    const outputAmountAddress = trade?.outputAmount?.currency?.address
    const token0Address = stableConfig?.stableSwapConfig?.token0?.address
    const token1Address = stableConfig?.stableSwapConfig?.token1?.address

    const pct = basisPointsToPercent(allowedSlippage)

    const tokenAmounts = {
      [inputAmountAddress]: trade?.maximumAmountIn(pct)?.quotient?.toString(),
      [outputAmountAddress]: trade?.minimumAmountOut(pct)?.quotient?.toString(),
    }

    const token0Amount = tokenAmounts[token0Address]
    const token1Amount = tokenAmounts[token1Address]

    const args =
      inputAmountAddress === token0Address
        ? ['0', '1', token0Amount, token1Amount]
        : ['1', '0', token1Amount, token0Amount]

    return [
      {
        parameters: {
          methodName: 'exchange',
          args,
          value: '',
        },
        contract: swapContract,
      },
    ]
  }, [
    swapContract,
    trade,
    stableConfig?.stableSwapConfig?.token0?.address,
    stableConfig?.stableSwapConfig?.token1?.address,
    allowedSlippage,
  ])

  return swapCalls
}
