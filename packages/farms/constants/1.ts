import { ethereumTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [
  {
    pid: 143,
    vaultPid: 5,
    lpSymbol: 'STG-USDC LP',
    lpAddress: '0x6cCA86CC27EB8c7C2d10B0672FE392CFC88e62ff',
    quoteToken: ethereumTokens.usdc,
    token: ethereumTokens.stg,
  },
  {
    pid: 141,
    vaultPid: 4,
    lpSymbol: 'SDAO-WETH LP',
    lpAddress: '0xDA7cF6a0CD5d5e8D10AB55d8bA58257813a239cA',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.sdao,
  },
  {
    pid: 126,
    vaultPid: 3,
    lpSymbol: 'WBTC-ETH LP',
    lpAddress: '0x4AB6702B3Ed3877e9b1f203f90cbEF13d663B0e8',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.wbtc,
  },
  {
    pid: 125,
    vaultPid: 2,
    lpSymbol: 'ETH-USDT LP',
    lpAddress: '0x17C1Ae82D99379240059940093762c5e4539aba5',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.usdt,
  },
  {
    pid: 124,
    vaultPid: 1,
    lpSymbol: 'ETH-USDC LP',
    lpAddress: '0x2E8135bE71230c6B1B4045696d41C09Db0414226',
    quoteToken: ethereumTokens.weth,
    token: ethereumTokens.usdc,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
