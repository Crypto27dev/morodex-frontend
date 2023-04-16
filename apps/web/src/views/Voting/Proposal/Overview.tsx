import { ArrowBackIcon, Box, Button, Flex, Heading, NotFound, ReactMarkdown } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import { getAllVotes, getProposal } from 'state/voting/helpers'
import { useAccount } from 'wagmi'
import useSWRImmutable from 'swr/immutable'
import { ProposalState } from 'state/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from '@pancakeswap/localization'
import Container from 'components/Layout/Container'
import PageLoader from 'components/Loader/PageLoader'
import { FetchStatus } from 'config/constants/types'
import { isCoreProposal } from '../helpers'
import { ProposalStateTag, ProposalTypeTag } from '../components/Proposals/tags'
import Layout from '../components/Layout'
import Details from './Details'
import Results from './Results'
import Vote from './Vote'
import Votes from './Votes'

const Overview = () => {
  const { query, isFallback } = useRouter()
  const id = query.id as string
  const { t } = useTranslation()
  const { address: account } = useAccount()

  const {
    status: proposalLoadingStatus,
    data: proposal,
    error,
  } = useSWRImmutable(id ? ['proposal', id] : null, () => getProposal(id))

  const {
    status: votesLoadingStatus,
    data: votes,
    mutate: refetch,
  } = useSWRImmutable(proposal ? ['proposal', proposal, 'votes'] : null, async () => getAllVotes(proposal))
  const hasAccountVoted = account && votes && votes.some((vote) => vote.voter.toLowerCase() === account.toLowerCase())

  const isPageLoading = votesLoadingStatus === FetchStatus.Fetching || proposalLoadingStatus === FetchStatus.Fetching

  if (!proposal && error) {
    return <NotFound />
  }

  if (isFallback || !proposal) {
    return <PageLoader />
  }

  return (
    <Container py="40px">
      <PageMeta />
      <Box mb="40px">
        <Link href="/voting" passHref>
          <Button as="a" variant="text" startIcon={<ArrowBackIcon color="primary" width="24px" />} px="0">
            {t('Back to Vote Overview')}
          </Button>
        </Link>
      </Box>
      <Layout>
        <Box>
          <Box mb="32px">
            <Flex alignItems="center" mb="8px">
              <ProposalStateTag proposalState={proposal.state} />
              <ProposalTypeTag isCoreProposal={isCoreProposal(proposal)} ml="8px" />
            </Flex>
            <Heading as="h1" scale="xl" mb="16px">
              {proposal.title}
            </Heading>
            <Box>
              <ReactMarkdown>{proposal.body}</ReactMarkdown>
            </Box>
          </Box>
          {!isPageLoading && !hasAccountVoted && proposal.state === ProposalState.ACTIVE && (
            <Vote proposal={proposal} onSuccess={refetch} mb="16px" />
          )}
          <Votes votes={votes} totalVotes={votes?.length ?? proposal.votes} votesLoadingStatus={votesLoadingStatus} />
        </Box>
        <Box position="sticky" top="60px">
          <Details proposal={proposal} />
          <Results choices={proposal.choices} votes={votes} votesLoadingStatus={votesLoadingStatus} />
        </Box>
      </Layout>
    </Container>
  )
}

export default Overview
