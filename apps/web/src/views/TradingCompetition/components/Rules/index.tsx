import { Flex, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import RulesCard from './RulesCard'
import FAQs from './FAQs'

const Wrapper = styled(Flex)`
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: flex-start;
  }
`

const StyledCardWrapper = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 40px;
    flex: 1;
  }
`

const Rules = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <StyledCardWrapper>
        <RulesCard title={t('Trade to increase your rank')}>
          <Text textAlign="center" fontSize="14px" color="textSubtle">
            {t(
              'Eligible pairs: DAR/BNB, CAKE/BNB, and CAKE/BUSD. Please note that the volume from limit orders will not be indexed.',
            )}
          </Text>
        </RulesCard>
        <RulesCard title={t('Play as a team')}>
          <Text textAlign="center" fontSize="14px" color="textSubtle">
            {t('The higher your team’s rank, the better your prizes!')}
          </Text>
        </RulesCard>
        <RulesCard title={t('Everyone’s a winner!')}>
          <Text textAlign="center" fontSize="14px" color="textSubtle">
            {t('Sign up for battle and you’re guaranteed a prize!')}
          </Text>
        </RulesCard>
      </StyledCardWrapper>
      <FAQs />
    </Wrapper>
  )
}

export default Rules
