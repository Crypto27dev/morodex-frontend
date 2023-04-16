import { useState } from 'react'
import styled from 'styled-components'
import {
  Text,
  Flex,
  Box,
  Input,
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLastIcon,
  IconButton,
  BunnyPlaceholderIcon,
  Spinner,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import AuctionLeaderboardTable from './AuctionLeaderboard/AuctionLeaderboardTable'
import { useFarmAuction } from '../hooks/useFarmAuction'

interface AuctionHistoryProps {
  mostRecentClosedAuctionId: number
}

const StyledIconButton = styled(IconButton)`
  width: 32px;

  :disabled {
    background: none;

    svg {
      fill: ${({ theme }) => theme.colors.textDisabled};

      path {
        fill: ${({ theme }) => theme.colors.textDisabled};
      }
    }
  }
`

const AuctionHistory: React.FC<React.PropsWithChildren<AuctionHistoryProps>> = ({ mostRecentClosedAuctionId }) => {
  const [historyAuctionId, setHistoryAuctionId] = useState(
    mostRecentClosedAuctionId ? mostRecentClosedAuctionId.toString() : '0',
  )
  const historyAuctionIdAsInt = parseInt(historyAuctionId, 10)

  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  const { isXs, isSm, isMd, isLg, isXl, isXxl } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const isSmallerScreen = isXs || isSm || isMd

  const {
    data: { auction, bidders },
  } = useFarmAuction(historyAuctionIdAsInt)

  let auctionTable =
    auction && bidders ? (
      <AuctionLeaderboardTable bidders={bidders} noBidsText="No bids were placed in this auction" />
    ) : (
      <Flex justifyContent="center" alignItems="center" p="24px" height="250px">
        <Spinner />
      </Flex>
    )

  if (Number.isNaN(historyAuctionIdAsInt)) {
    auctionTable = (
      <Flex flexDirection="column" justifyContent="center" alignItems="center" p="24px" height="250px">
        <Text mb="8px">{t('Please specify auction ID')}</Text>
        <BunnyPlaceholderIcon height="64px" width="64px" />
      </Flex>
    )
  }

  const endDate = auction
    ? auction.endDate.toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  const handleHistoryAuctionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valid) {
      const {
        target: { value },
      } = event
      const valueAsNumber = +value
      const newAuctionId =
        valueAsNumber >= mostRecentClosedAuctionId
          ? mostRecentClosedAuctionId.toString()
          : valueAsNumber <= 0
          ? ''
          : value
      setHistoryAuctionId(newAuctionId)
    }
  }

  const handleArrowPress = (auctionId: number) => {
    if (auctionId) {
      setHistoryAuctionId(auctionId.toString())
    } else {
      // auctionId is NaN when the input is empty, the only button press that will trigger this func is 'forward one'
      setHistoryAuctionId('1')
    }
  }

  return (
    <Box py="24px">
      <Flex px={['12px', '24px']} justifyContent="space-between" alignItems="center">
        <Flex flex="3" alignItems="center">
          <Text bold fontSize={isLargerScreen ? '20px' : '16px'} mr={['4px', '8px']}>
            {t('Auction #')}
          </Text>
          <Box width="62px" mr={['4px', '16px']}>
            <Input
              disabled={!mostRecentClosedAuctionId}
              type="text"
              inputMode="numeric"
              pattern="^[0-9]+$"
              value={historyAuctionId}
              onChange={handleHistoryAuctionChange}
            />
          </Box>
          <StyledIconButton
            disabled={!historyAuctionIdAsInt || historyAuctionIdAsInt <= 1}
            variant="text"
            scale="sm"
            mr={['8px', '12px']}
            onClick={() => handleArrowPress(historyAuctionIdAsInt - 1)}
          >
            <ArrowBackIcon />
          </StyledIconButton>
          <StyledIconButton
            disabled={historyAuctionIdAsInt >= mostRecentClosedAuctionId}
            variant="text"
            scale="sm"
            mr={['8px', '12px']}
            onClick={() => handleArrowPress(historyAuctionIdAsInt + 1)}
          >
            <ArrowForwardIcon />
          </StyledIconButton>
          <StyledIconButton
            disabled={historyAuctionIdAsInt >= mostRecentClosedAuctionId}
            variant="text"
            scale="sm"
            onClick={() => handleArrowPress(mostRecentClosedAuctionId)}
          >
            <ArrowLastIcon />
          </StyledIconButton>
        </Flex>
        {isLargerScreen && (
          <Flex flex="2" justifyContent="flex-end">
            {endDate && <Text>{t('Ended %date%', { date: endDate })}</Text>}
          </Flex>
        )}
      </Flex>
      {isSmallerScreen && (
        <Flex px={['12px', '24px']} pt="8px">
          {endDate && <Text>{t('Ended %date%', { date: endDate })}</Text>}
        </Flex>
      )}
      {mostRecentClosedAuctionId ? (
        auctionTable
      ) : (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" p="24px" height="250px">
          <Text mb="8px">{t('No history yet')}</Text>
          <BunnyPlaceholderIcon height="64px" width="64px" />
        </Flex>
      )}
    </Box>
  )
}

export default AuctionHistory
