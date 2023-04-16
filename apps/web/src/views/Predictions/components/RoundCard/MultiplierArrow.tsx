import { BigNumber } from '@ethersproject/bignumber'
import styled, { CSSProperties } from 'styled-components'
import { Box, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { BetPosition } from 'state/types'
import { RoundMultiplierDownArrow, RoundMultiplierUpArrow } from '../../RoundMultiplierArrows'
import EnteredTag from './EnteredTag'

interface MultiplierArrowProps {
  betAmount?: BigNumber
  multiplier?: string
  hasEntered?: boolean
  hasClaimed?: boolean
  betPosition?: BetPosition
  isDisabled?: boolean
  isActive?: boolean
  isHouse?: boolean
}

const ArrowWrapper = styled.div`
  height: 65px;
  margin: 0 auto;
  width: 240px;
`

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  left: 0;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`

const EnteredTagWrapper = styled.div`
  position: absolute;
  z-index: 10;
`

const getTextColor =
  (fallback = 'textSubtle') =>
  (isActive: boolean, isDisabled: boolean, isHouse: boolean) => {
    if (isDisabled || isHouse) {
      return 'textDisabled'
    }

    if (isActive) {
      return 'white'
    }

    return fallback
  }

const MultiplierArrow: React.FC<React.PropsWithChildren<MultiplierArrowProps>> = ({
  betAmount,
  multiplier,
  hasEntered = false,
  hasClaimed = false,
  betPosition = BetPosition.BULL,
  isDisabled = false,
  isActive = false,
  isHouse = false,
}) => {
  const { t } = useTranslation()
  const upColor = getTextColor('success')(isActive, isDisabled, isHouse)
  const downColor = getTextColor('failure')(isActive, isDisabled, isHouse)
  const textColor = getTextColor()(isActive, isDisabled, isHouse)
  const multiplierText = (
    <Box>
      <Flex justifyContent="center" height="14px">
        <Text fontSize="14px" color={textColor} bold lineHeight="14x">
          {multiplier !== undefined ? `${multiplier}x` : '-'}
        </Text>
        <Text fontSize="14px" color={textColor} lineHeight="14x" ml="4px">
          {t('Payout')}
        </Text>
      </Flex>
    </Box>
  )

  const getEnteredTag = (position: CSSProperties) => {
    if (!hasEntered) {
      return null
    }

    return (
      <EnteredTagWrapper style={position}>
        <EnteredTag amount={betAmount} hasClaimed={hasClaimed} multiplier={multiplier} />
      </EnteredTagWrapper>
    )
  }

  if (betPosition === BetPosition.BEAR) {
    return (
      <Box mt="-1px" position="relative">
        <ArrowWrapper>
          <RoundMultiplierDownArrow isActive={isActive} />
          {getEnteredTag({ bottom: 0, right: 0 })}
          <Content>
            {!isDisabled && multiplierText}
            <Text bold fontSize="20px" mb="8px" color={downColor} textTransform="uppercase">
              {t('Down')}
            </Text>
          </Content>
        </ArrowWrapper>
      </Box>
    )
  }

  return (
    <Box mb="-1px" position="relative">
      <ArrowWrapper>
        <RoundMultiplierUpArrow isActive={isActive} />
        {getEnteredTag({ top: 0, left: 0 })}
        <Content>
          <Text bold fontSize="20px" lineHeight="21px" color={upColor} textTransform="uppercase">
            {t('Up')}
          </Text>
          {!isDisabled && multiplierText}
        </Content>
      </ArrowWrapper>
    </Box>
  )
}

export default MultiplierArrow
