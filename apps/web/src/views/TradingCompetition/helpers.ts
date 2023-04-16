import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import { easterPrizes, PrizesConfig } from 'config/constants/trading-competition/prizes'
import BigNumber from 'bignumber.js'
import useBUSDPrice, { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import { bscTokens } from '@pancakeswap/tokens'
import { multiplyPriceByAmount } from 'utils/prices'

export const localiseTradingVolume = (value: number, decimals = 0) => {
  return value.toLocaleString('en-US', { maximumFractionDigits: decimals })
}

export const useCompetitionCakeRewards = (userCakeReward: string | number) => {
  const cakeAsBigNumber = new BigNumber(userCakeReward as string)
  const cakeBalance = getBalanceNumber(cakeAsBigNumber)
  const cakePriceBusd = useCakeBusdPrice()
  return {
    cakeReward: cakeBalance,
    dollarValueOfCakeReward: multiplyPriceByAmount(cakePriceBusd, cakeBalance),
  }
}

export const useFanTokenCompetitionRewards = ({
  userCakeRewards,
  userLazioRewards,
  userPortoRewards,
  userSantosRewards,
}: {
  userCakeRewards: string | number
  userLazioRewards: string | number
  userPortoRewards: string | number
  userSantosRewards: string | number
}) => {
  const lazioPriceBUSD = useBUSDPrice(bscTokens.lazio)
  const portoPriceBUSD = useBUSDPrice(bscTokens.porto)
  const santosPriceBUSD = useBUSDPrice(bscTokens.santos)
  const cakeAsBigNumber = new BigNumber(userCakeRewards as string)
  const lazioAsBigNumber = new BigNumber(userLazioRewards as string)
  const portoAsBigNumber = new BigNumber(userPortoRewards as string)
  const santosAsBigNumber = new BigNumber(userSantosRewards as string)
  const cakeBalance = getBalanceNumber(cakeAsBigNumber)
  const lazioBalance = getBalanceNumber(lazioAsBigNumber, 8)
  const portoBalance = getBalanceNumber(portoAsBigNumber, 8)
  const santosBalance = getBalanceNumber(santosAsBigNumber, 8)
  const cakePriceBusd = useCakeBusdPrice()

  const dollarValueOfTokensReward =
    cakePriceBusd && lazioPriceBUSD && portoPriceBUSD && santosPriceBUSD
      ? multiplyPriceByAmount(cakePriceBusd, cakeBalance) +
        multiplyPriceByAmount(lazioPriceBUSD, lazioBalance, 8) +
        multiplyPriceByAmount(portoPriceBUSD, portoBalance, 8) +
        multiplyPriceByAmount(santosPriceBUSD, santosBalance, 8)
      : null

  return {
    cakeReward: cakeBalance,
    lazioReward: lazioBalance,
    portoReward: portoBalance,
    santosReward: santosBalance,
    dollarValueOfTokensReward,
  }
}

export const useMoboxCompetitionRewards = ({
  userCakeRewards,
  userMoboxRewards,
}: {
  userCakeRewards: string | number
  userMoboxRewards: string | number
}) => {
  const moboxPriceBUSD = useBUSDPrice(bscTokens.mbox)
  const cakeAsBigNumber = new BigNumber(userCakeRewards as string)
  const moboxAsBigNumber = new BigNumber(userMoboxRewards as string)
  const cakeBalance = getBalanceNumber(cakeAsBigNumber)
  const moboxBalance = getBalanceNumber(moboxAsBigNumber)
  const cakePriceBusd = useCakeBusdPrice()

  const dollarValueOfTokensReward =
    cakePriceBusd && moboxPriceBUSD
      ? multiplyPriceByAmount(cakePriceBusd, cakeBalance) + multiplyPriceByAmount(moboxPriceBUSD, moboxBalance, 8)
      : null

  return {
    cakeReward: cakeBalance,
    moboxReward: moboxBalance,
    dollarValueOfTokensReward,
  }
}

export const useModCompetitionRewards = ({
  userCakeRewards,
  userDarRewards,
}: {
  userCakeRewards: string | number
  userDarRewards: string | number
}) => {
  const darPriceBUSD = useBUSDPrice(bscTokens.dar)
  const cakeAsBigNumber = new BigNumber(userCakeRewards as string)
  const darAsBigNumber = new BigNumber(userDarRewards as string)
  const cakeBalance = getBalanceNumber(cakeAsBigNumber)
  const darBalance = getBalanceNumber(darAsBigNumber, bscTokens.dar.decimals)
  const cakePriceBusd = useCakeBusdPrice()

  const dollarValueOfTokensReward =
    cakePriceBusd && darPriceBUSD
      ? multiplyPriceByAmount(cakePriceBusd, cakeBalance) +
        multiplyPriceByAmount(darPriceBUSD, darBalance, bscTokens.dar.decimals)
      : null

  return {
    cakeReward: cakeBalance,
    darReward: darBalance,
    dollarValueOfTokensReward,
  }
}

// 1 is a reasonable teamRank default: accessing the first team in the config.
// We use the smart contract userPointReward to get a users' points
// Achievement keys are consistent across different teams regardless of team team rank
// If a teamRank value isn't passed, this helper can be used to return achievement keys for a given userRewardGroup
export const getEasterRewardGroupAchievements = (userRewardGroup: string, teamRank = 1) => {
  const userGroup = easterPrizes[teamRank].filter((prizeGroup) => {
    return prizeGroup.group === userRewardGroup
  })[0]
  return userGroup?.achievements || {}
}

// given we have userPointReward and userRewardGroup, we can find the specific reward because no Rank has same two values.
export const getRewardGroupAchievements = (prizes: PrizesConfig, userRewardGroup: string, userPointReward: string) => {
  const prize = Object.values(prizes)
    .flat()
    .find((rank) => rank.achievements.points === Number(userPointReward) && rank.group === userRewardGroup)
  return prize && prize.achievements
}

export default localiseTradingVolume
