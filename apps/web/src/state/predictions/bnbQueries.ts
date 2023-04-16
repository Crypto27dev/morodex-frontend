import { UserResponse, BetResponse, RoundResponse } from './responseType'

export interface UserResponseBNB extends UserResponse<BetResponseBNB> {
  totalBNB: string
  totalBNBBull: string
  totalBNBBear: string
  averageBNB: string
  totalBNBClaimed: string
  netBNB: string
}

export interface BetResponseBNB extends BetResponse {
  claimedBNB: string
  claimedNetBNB: string
  user?: UserResponseBNB
  round?: RoundResponseBNB
}

export type RoundResponseBNB = RoundResponse<BetResponseBNB>

/**
 * Base fields are the all the top-level fields available in the api. Used in multiple queries
 */
export const roundBaseFields = `
  id
  epoch
  position
  failed
  startAt
  startBlock
  startHash
  lockAt
  lockBlock
  lockHash
  lockPrice
  lockRoundId
  closeAt
  closeBlock
  closeHash
  closePrice
  closeRoundId
  totalBets
  totalAmount
  bullBets
  bullAmount
  bearBets
  bearAmount
`

export const betBaseFields = `
 id
 hash  
 amount
 position
 claimed
 claimedAt
 claimedHash
 claimedBlock
 claimedBNB
 claimedNetBNB
 createdAt
 updatedAt
`

export const userBaseFields = `
  id
  createdAt
  updatedAt
  block
  totalBets
  totalBetsBull
  totalBetsBear
  totalBNB
  totalBNBBull
  totalBNBBear
  totalBetsClaimed
  totalBNBClaimed
  winRate
  averageBNB
  netBNB
`
