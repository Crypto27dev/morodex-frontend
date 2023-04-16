import styled from 'styled-components'
import { Flex, Box, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { LotteryStatus } from 'config/constants/types'
import { useLottery } from 'state/lottery/hooks'
import useTheme from 'hooks/useTheme'
import TicketNumber from '../TicketNumber'
import BuyTicketsButton from '../BuyTicketsButton'

const ScrollBox = styled(Box)`
  max-height: 300px;
  overflow-y: scroll;
  margin-left: -24px;
  margin-right: -24px;
  padding-left: 24px;
  padding-right: 20px;
`

const CurrentRoundTicketsInner = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const {
    isTransitioning,
    currentRound: { status, userTickets },
  } = useLottery()
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning

  return (
    <>
      <Flex flexDirection="column">
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" mb="16px">
          {t('Your tickets')}
        </Text>
        <ScrollBox>
          {userTickets.tickets.map((ticket, index) => {
            return (
              <TicketNumber
                key={ticket.id}
                localId={index + 1}
                id={ticket.id}
                number={ticket.number}
                status={ticket.status}
              />
            )
          })}
        </ScrollBox>
      </Flex>
      <Flex borderTop={`1px solid ${theme.colors.cardBorder}`} alignItems="center" justifyContent="center">
        <BuyTicketsButton disabled={ticketBuyIsDisabled} mt="24px" width="100%" />
      </Flex>
    </>
  )
}

export default CurrentRoundTicketsInner
