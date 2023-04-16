import { Activity, AskOrder, AskOrderType, MarketEvent, Transaction } from 'state/nftMarket/types'
import orderBy from 'lodash/orderBy'

export const sortActivity = ({
  askOrders = [],
  transactions = [],
}: {
  askOrders?: AskOrder[]
  transactions?: Transaction[]
}): Activity[] => {
  const getAskOrderEvent = (orderType: AskOrderType): MarketEvent => {
    switch (orderType) {
      case AskOrderType.CANCEL:
        return MarketEvent.CANCEL
      case AskOrderType.MODIFY:
        return MarketEvent.MODIFY
      case AskOrderType.NEW:
        return MarketEvent.NEW
      default:
        return MarketEvent.MODIFY
    }
  }

  const transformTransactions = (transactionsHistory: Transaction[]): Activity[] => {
    const transformedTransactions = transactionsHistory.map((transactionHistory) => {
      const marketEvent = MarketEvent.SELL
      const { timestamp, nft } = transactionHistory
      const price = transactionHistory.askPrice
      const tx = transactionHistory.id
      const buyer = transactionHistory.buyer.id
      const seller = transactionHistory.seller.id
      return { marketEvent, price, timestamp, nft, tx, buyer, seller }
    })

    return transformedTransactions
  }

  const transformAskOrders = (askOrdersHistory: AskOrder[]): Activity[] => {
    const transformedAskOrders = askOrdersHistory.map((askOrderHistory) => {
      const marketEvent = getAskOrderEvent(askOrderHistory.orderType)
      const price = askOrderHistory.askPrice
      const { timestamp, nft } = askOrderHistory
      const tx = askOrderHistory.id
      const seller = askOrderHistory?.seller.id
      return { marketEvent, price, timestamp, nft, tx, seller }
    })

    return transformedAskOrders
  }

  const allActivity = [...transformAskOrders(askOrders), ...transformTransactions(transactions)]
  if (allActivity.length > 0) {
    const sortedByMostRecent = orderBy(allActivity, (activity) => parseInt(activity.timestamp, 10), 'desc')

    return sortedByMostRecent
  }
  return []
}
