import {
  InsufficientInputAmountError,
  InsufficientReservesError,
  sqrt,
  CurrencyAmount,
  Price,
  FIVE,
  ONE,
  ZERO,
  _10000,
  _9975,
  BigintIsh,
  MINIMUM_LIQUIDITY,
} from '@pancakeswap/swap-sdk-core'
import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'

import { FACTORY_ADDRESS_MAP, INIT_CODE_HASH_MAP } from '../constants'
import { ERC20Token } from './token'

let PAIR_ADDRESS_CACHE: { [key: string]: string } = {}

const composeKey = (token0: ERC20Token, token1: ERC20Token) => `${token0.chainId}-${token0.address}-${token1.address}`

export const computePairAddress = ({
  factoryAddress,
  tokenA,
  tokenB,
}: {
  factoryAddress: string
  tokenA: ERC20Token
  tokenB: ERC20Token
}): string => {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  const key = composeKey(token0, token1)

  if (PAIR_ADDRESS_CACHE?.[key] === undefined) {
    PAIR_ADDRESS_CACHE = {
      ...PAIR_ADDRESS_CACHE,
      [key]: getCreate2Address(
        factoryAddress,
        keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
        INIT_CODE_HASH_MAP[token0.chainId]
      ),
    }
  }

  return PAIR_ADDRESS_CACHE[key]
}

export class Pair {
  public readonly liquidityToken: ERC20Token

  private readonly tokenAmounts: [CurrencyAmount<ERC20Token>, CurrencyAmount<ERC20Token>]

  public static getAddress(tokenA: ERC20Token, tokenB: ERC20Token): string {
    return computePairAddress({ factoryAddress: FACTORY_ADDRESS_MAP[tokenA.chainId], tokenA, tokenB })
  }

  public constructor(currencyAmountA: CurrencyAmount<ERC20Token>, tokenAmountB: CurrencyAmount<ERC20Token>) {
    const tokenAmounts = currencyAmountA.currency.sortsBefore(tokenAmountB.currency) // does safety checks
      ? [currencyAmountA, tokenAmountB]
      : [tokenAmountB, currencyAmountA]
    this.liquidityToken = new ERC20Token(
      tokenAmounts[0].currency.chainId,
      Pair.getAddress(tokenAmounts[0].currency, tokenAmounts[1].currency),
      18,
      'Cake-LP',
      'Pancake LPs'
    )
    this.tokenAmounts = tokenAmounts as [CurrencyAmount<ERC20Token>, CurrencyAmount<ERC20Token>]
  }

  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  public involvesToken(token: ERC20Token): boolean {
    return token.equals(this.token0) || token.equals(this.token1)
  }

  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  public get token0Price(): Price<ERC20Token, ERC20Token> {
    const result = this.tokenAmounts[1].divide(this.tokenAmounts[0])
    return new Price(this.token0, this.token1, result.denominator, result.numerator)
  }

  /**
   * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
   */
  public get token1Price(): Price<ERC20Token, ERC20Token> {
    const result = this.tokenAmounts[0].divide(this.tokenAmounts[1])
    return new Price(this.token1, this.token0, result.denominator, result.numerator)
  }

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  public priceOf(token: ERC20Token): Price<ERC20Token, ERC20Token> {
    invariant(this.involvesToken(token), 'TOKEN')
    return token.equals(this.token0) ? this.token0Price : this.token1Price
  }

  /**
   * Returns the chain ID of the tokens in the pair.
   */
  public get chainId(): number {
    return this.token0.chainId
  }

  public get token0(): ERC20Token {
    return this.tokenAmounts[0].currency
  }

  public get token1(): ERC20Token {
    return this.tokenAmounts[1].currency
  }

  public get reserve0(): CurrencyAmount<ERC20Token> {
    return this.tokenAmounts[0]
  }

  public get reserve1(): CurrencyAmount<ERC20Token> {
    return this.tokenAmounts[1]
  }

  public reserveOf(token: ERC20Token): CurrencyAmount<ERC20Token> {
    invariant(this.involvesToken(token), 'TOKEN')
    return token.equals(this.token0) ? this.reserve0 : this.reserve1
  }

  public getOutputAmount(inputAmount: CurrencyAmount<ERC20Token>): [CurrencyAmount<ERC20Token>, Pair] {
    invariant(this.involvesToken(inputAmount.currency), 'TOKEN')
    if (JSBI.equal(this.reserve0.quotient, ZERO) || JSBI.equal(this.reserve1.quotient, ZERO)) {
      throw new InsufficientReservesError()
    }
    const inputReserve = this.reserveOf(inputAmount.currency)
    const outputReserve = this.reserveOf(inputAmount.currency.equals(this.token0) ? this.token1 : this.token0)
    const inputAmountWithFee = JSBI.multiply(inputAmount.quotient, _9975)
    const numerator = JSBI.multiply(inputAmountWithFee, outputReserve.quotient)
    const denominator = JSBI.add(JSBI.multiply(inputReserve.quotient, _10000), inputAmountWithFee)
    const outputAmount = CurrencyAmount.fromRawAmount(
      inputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
      JSBI.divide(numerator, denominator)
    )
    if (JSBI.equal(outputAmount.quotient, ZERO)) {
      throw new InsufficientInputAmountError()
    }
    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))]
  }

  public getInputAmount(outputAmount: CurrencyAmount<ERC20Token>): [CurrencyAmount<ERC20Token>, Pair] {
    invariant(this.involvesToken(outputAmount.currency), 'TOKEN')
    if (
      JSBI.equal(this.reserve0.quotient, ZERO) ||
      JSBI.equal(this.reserve1.quotient, ZERO) ||
      JSBI.greaterThanOrEqual(outputAmount.quotient, this.reserveOf(outputAmount.currency).quotient)
    ) {
      throw new InsufficientReservesError()
    }

    const outputReserve = this.reserveOf(outputAmount.currency)
    const inputReserve = this.reserveOf(outputAmount.currency.equals(this.token0) ? this.token1 : this.token0)
    const numerator = JSBI.multiply(JSBI.multiply(inputReserve.quotient, outputAmount.quotient), _10000)
    const denominator = JSBI.multiply(JSBI.subtract(outputReserve.quotient, outputAmount.quotient), _9975)
    const inputAmount = CurrencyAmount.fromRawAmount(
      outputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
      JSBI.add(JSBI.divide(numerator, denominator), ONE)
    )
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))]
  }

  public getLiquidityMinted(
    totalSupply: CurrencyAmount<ERC20Token>,
    tokenAmountA: CurrencyAmount<ERC20Token>,
    tokenAmountB: CurrencyAmount<ERC20Token>
  ): CurrencyAmount<ERC20Token> {
    invariant(totalSupply.currency.equals(this.liquidityToken), 'LIQUIDITY')
    const tokenAmounts = tokenAmountA.currency.sortsBefore(tokenAmountB.currency) // does safety checks
      ? [tokenAmountA, tokenAmountB]
      : [tokenAmountB, tokenAmountA]
    invariant(tokenAmounts[0].currency.equals(this.token0) && tokenAmounts[1].currency.equals(this.token1), 'TOKEN')

    let liquidity: JSBI
    if (JSBI.equal(totalSupply.quotient, ZERO)) {
      liquidity = JSBI.subtract(
        sqrt(JSBI.multiply(tokenAmounts[0].quotient, tokenAmounts[1].quotient)),
        MINIMUM_LIQUIDITY
      )
    } else {
      const amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].quotient, totalSupply.quotient), this.reserve0.quotient)
      const amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].quotient, totalSupply.quotient), this.reserve1.quotient)
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1
    }
    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError()
    }
    return CurrencyAmount.fromRawAmount(this.liquidityToken, liquidity)
  }

  public getLiquidityValue(
    token: ERC20Token,
    totalSupply: CurrencyAmount<ERC20Token>,
    liquidity: CurrencyAmount<ERC20Token>,
    feeOn = false,
    kLast?: BigintIsh
  ): CurrencyAmount<ERC20Token> {
    invariant(this.involvesToken(token), 'TOKEN')
    invariant(totalSupply.currency.equals(this.liquidityToken), 'TOTAL_SUPPLY')
    invariant(liquidity.currency.equals(this.liquidityToken), 'LIQUIDITY')
    invariant(JSBI.lessThanOrEqual(liquidity.quotient, totalSupply.quotient), 'LIQUIDITY')

    let totalSupplyAdjusted: CurrencyAmount<ERC20Token>
    if (!feeOn) {
      totalSupplyAdjusted = totalSupply
    } else {
      invariant(!!kLast, 'K_LAST')
      const kLastParsed = JSBI.BigInt(kLast)
      if (!JSBI.equal(kLastParsed, ZERO)) {
        const rootK = sqrt(JSBI.multiply(this.reserve0.quotient, this.reserve1.quotient))
        const rootKLast = sqrt(kLastParsed)
        if (JSBI.greaterThan(rootK, rootKLast)) {
          const numerator = JSBI.multiply(totalSupply.quotient, JSBI.subtract(rootK, rootKLast))
          const denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast)
          const feeLiquidity = JSBI.divide(numerator, denominator)
          totalSupplyAdjusted = totalSupply.add(CurrencyAmount.fromRawAmount(this.liquidityToken, feeLiquidity))
        } else {
          totalSupplyAdjusted = totalSupply
        }
      } else {
        totalSupplyAdjusted = totalSupply
      }
    }

    return CurrencyAmount.fromRawAmount(
      token,
      JSBI.divide(JSBI.multiply(liquidity.quotient, this.reserveOf(token).quotient), totalSupplyAdjusted.quotient)
    )
  }
}
