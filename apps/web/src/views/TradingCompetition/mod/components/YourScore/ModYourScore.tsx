import { Skeleton, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import ScoreHeader from '../../../components/YourScore/ScoreHeader'
import RibbonWithImage from '../../../components/RibbonWithImage'
import { UserLeaderboardSharedInformation, CompetitionProps } from '../../../types'
import FlippersShare from '../../../pngs/MoD-flippers-share.png'
import StormShare from '../../../pngs/MoD-storm-share.png'
import CakersShare from '../../../pngs/MoD-cakers-share.png'
import ScoreCard from '../../../components/YourScore/ScoreCard'
import UserRankBox from '../../../components/YourScore/UserRankBox'
import { LIVE } from '../../../../../config/constants/trading-competition/phases'
import ModUserPrizeGrid from './ModUserPrizeGrid'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 24px auto 0;
  max-width: 768px;
`

export interface MoDYourScoreProps extends CompetitionProps {
  hasRegistered?: boolean
  userLeaderboardInformation?: UserLeaderboardSharedInformation & {
    darVolumeRank?: string
    darVolume?: string
  }
}

const ModYourScore: React.FC<React.PropsWithChildren<MoDYourScoreProps>> = ({
  hasRegistered = false,
  account,
  userTradingInformation,
  profile,
  isLoading,
  userLeaderboardInformation,
  currentPhase,
  userCanClaimPrizes,
  finishedAndPrizesClaimed,
  finishedAndNothingToClaim,
  onClaimSuccess,
}) => {
  const { t } = useTranslation()
  const showRibbon = !account || hasRegistered

  return (
    <Wrapper>
      {showRibbon && (
        <RibbonWithImage
          imageComponent={<ScoreHeader profile={profile} isLoading={isLoading} />}
          ribbonDirection="down"
          isCardHeader
        >
          {t('Your Score')}
        </RibbonWithImage>
      )}
      <ScoreCard
        subgraphName="pancakeswap/trading-competition-v4"
        userPrizeGrid={<ModUserPrizeGrid userTradingInformation={userTradingInformation} />}
        extraUserRankBox={
          <UserRankBox
            flex="2"
            title={t('Your DAR volume rank').toUpperCase()}
            footer={t('Based on your DAR/BNB trading')}
            // Add responsive mr if competition is LIVE
            mr={currentPhase.state === LIVE ? [0, null, null, '8px'] : 0}
          >
            {!userLeaderboardInformation ? (
              <Skeleton height="26px" width="110px" />
            ) : (
              <>
                <Heading textAlign="center" scale="lg">
                  #{userLeaderboardInformation.darVolumeRank}
                </Heading>
                <Text>
                  $
                  {(userLeaderboardInformation.darVolume as unknown as number).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 0,
                  })}
                </Text>
              </>
            )}
          </UserRankBox>
        }
        flippersShareImage={FlippersShare}
        cakersShareImage={CakersShare}
        stormShareImage={StormShare}
        hasRegistered={hasRegistered}
        account={account}
        userTradingInformation={userTradingInformation}
        profile={profile}
        isLoading={isLoading}
        userLeaderboardInformation={userLeaderboardInformation}
        currentPhase={currentPhase}
        userCanClaimPrizes={userCanClaimPrizes}
        finishedAndPrizesClaimed={finishedAndPrizesClaimed}
        finishedAndNothingToClaim={finishedAndNothingToClaim}
        onClaimSuccess={onClaimSuccess}
      />
    </Wrapper>
  )
}

export default ModYourScore
