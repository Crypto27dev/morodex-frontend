import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { Flex, Heading, PocketWatchIcon, Text, Skeleton, Link, TimerIcon } from '@pancakeswap/uikit'
import getTimePeriods from '@pancakeswap/utils/getTimePeriods'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import { getBlockExploreLink } from 'utils'
import { PublicIfoData } from 'views/Ifos/types'
import { useActiveChainId } from 'hooks/useActiveChainId'

interface Props {
  publicIfoData: PublicIfoData
}

const GradientText = styled(Heading)`
  background: -webkit-linear-gradient(#ffd800, #eb8c00);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
`

const FlexGap = styled(Flex)<{ gap: string }>`
  gap: ${({ gap }) => gap};
`

const USE_BLOCK_TIMESTAMP_UNTIL = 3

export const SoonTimer: React.FC<React.PropsWithChildren<Props>> = ({ publicIfoData }) => {
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()
  const { status, secondsUntilStart, startBlockNum } = publicIfoData
  const currentBlockTimestamp = useCurrentBlockTimestamp()
  const hoursLeft =
    publicIfoData.plannedStartTime && currentBlockTimestamp
      ? (publicIfoData.plannedStartTime - currentBlockTimestamp.toNumber()) / 3600
      : 0
  const fallbackToBlockTimestamp = hoursLeft > USE_BLOCK_TIMESTAMP_UNTIL
  let timeUntil
  if (fallbackToBlockTimestamp) {
    timeUntil = getTimePeriods(publicIfoData.plannedStartTime - currentBlockTimestamp.toNumber())
  } else {
    timeUntil = getTimePeriods(secondsUntilStart)
  }

  return (
    <Flex justifyContent="center" position="relative">
      {status === 'idle' ? (
        <Skeleton animation="pulse" variant="rect" width="100%" height="48px" />
      ) : (
        <Link external href={getBlockExploreLink(startBlockNum, 'countdown', chainId)} color="secondary">
          <FlexGap gap="8px" alignItems="center">
            <Heading as="h3" scale="lg" color="secondary">
              {t('Start in')}
            </Heading>
            <FlexGap gap="4px" alignItems="baseline">
              {timeUntil.days ? (
                <>
                  <Heading scale="lg" color="secondary">
                    {timeUntil.days}
                  </Heading>
                  <Text color="secondary">{t('d')}</Text>
                </>
              ) : null}
              {timeUntil.days || timeUntil.hours ? (
                <>
                  <Heading color="secondary" scale="lg">
                    {timeUntil.hours}
                  </Heading>
                  <Text color="secondary">{t('h')}</Text>
                </>
              ) : null}
              <>
                <Heading color="secondary" scale="lg">
                  {!timeUntil.days && !timeUntil.hours && timeUntil.minutes === 0 ? '< 1' : timeUntil.minutes}
                </Heading>
                <Text color="secondary">{t('m')}</Text>
              </>
            </FlexGap>
          </FlexGap>
          <TimerIcon ml="4px" color="secondary" />
        </Link>
      )}
    </Flex>
  )
}

const EndInHeading = styled(Heading)`
  color: white;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.1;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
  }
`

const LiveNowHeading = styled(EndInHeading)`
  color: white;
  ${({ theme }) => theme.mediaQueries.md} {
    background: -webkit-linear-gradient(#ffd800, #eb8c00);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
  }
`

const LiveTimer: React.FC<React.PropsWithChildren<Props>> = ({ publicIfoData }) => {
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()
  const { status, secondsUntilEnd, endBlockNum } = publicIfoData
  const timeUntil = getTimePeriods(secondsUntilEnd)
  return (
    <Flex justifyContent="center" position="relative">
      {status === 'idle' ? (
        <Skeleton animation="pulse" variant="rect" width="100%" height="48px" />
      ) : (
        <Link external href={getBlockExploreLink(endBlockNum, 'countdown', chainId)} color="white">
          <PocketWatchIcon width="42px" mr="8px" />
          <FlexGap gap="8px" alignItems="center">
            <LiveNowHeading textTransform="uppercase" as="h3">{`${t('Live Now')}!`}</LiveNowHeading>
            <EndInHeading as="h3" scale="lg" color="white">
              {t('Ends in')}
            </EndInHeading>
            <FlexGap gap="4px" alignItems="baseline">
              {timeUntil.days ? (
                <>
                  <GradientText scale="lg">{timeUntil.days}</GradientText>
                  <Text color="white">{t('d')}</Text>
                </>
              ) : null}
              {timeUntil.days || timeUntil.hours ? (
                <>
                  <GradientText scale="lg">{timeUntil.hours}</GradientText>
                  <Text color="white">{t('h')}</Text>
                </>
              ) : null}
              <>
                <GradientText scale="lg">
                  {!timeUntil.days && !timeUntil.hours && timeUntil.minutes === 0 ? '< 1' : timeUntil.minutes}
                </GradientText>
                <Text color="white">{t('m')}</Text>
              </>
            </FlexGap>
          </FlexGap>
          <TimerIcon ml="4px" color="white" />
        </Link>
      )}
    </Flex>
  )
}

export default LiveTimer
