import { Flex, Heading, Skeleton, Text, Balance } from '@pancakeswap/uikit'
import cakeAbi from 'config/abi/cake.json'
import { bscTokens } from '@pancakeswap/tokens'
import { useTranslation } from '@pancakeswap/localization'
import { useIntersectionObserver } from '@pancakeswap/hooks'
import { useEffect, useState } from 'react'
import { usePriceCakeBusd } from 'state/farms/hooks'
import styled from 'styled-components'
import { formatBigNumber, formatLocalisedCompactNumber } from '@pancakeswap/utils/formatBalance'
import { multicallv3 } from 'utils/multicall'
import { getCakeVaultAddress } from 'utils/addressHelpers'
import useSWR from 'swr'
import { SLOW_INTERVAL } from 'config/constants'
import cakeVaultV2Abi from 'config/abi/cakeVaultV2.json'
import { BigNumber } from '@ethersproject/bignumber'

const StyledColumn = styled(Flex)<{ noMobileBorder?: boolean; noDesktopBorder?: boolean }>`
  flex-direction: column;
  ${({ noMobileBorder, theme }) =>
    noMobileBorder
      ? `${theme.mediaQueries.md} {
           padding: 0 16px;
           border-left: 1px ${theme.colors.inputSecondary} solid;
         }
       `
      : `border-left: 1px ${theme.colors.inputSecondary} solid;
         padding: 0 8px;
         ${theme.mediaQueries.sm} {
           padding: 0 16px;
         }
       `}

  ${({ noDesktopBorder, theme }) =>
    noDesktopBorder &&
    `${theme.mediaQueries.md} {
           padding: 0;
           border-left: none;
         }
       `}
`

const Grid = styled.div`
  display: grid;
  grid-gap: 16px 8px;
  margin-top: 24px;
  grid-template-columns: repeat(2, auto);
  grid-template-areas:
    'a d'
    'b e'
    'c f';

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 16px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-areas:
      'a b c'
      'd e f';
    grid-gap: 32px;
    grid-template-columns: repeat(3, auto);
  }
`

const emissionsPerBlock = 9.9

/**
 * User (Planet Finance) built a contract on top of our original manual CAKE pool,
 * but the contract was written in such a way that when we performed the migration from Masterchef v1 to v2, the tokens were stuck.
 * These stuck tokens are forever gone (see their medium post) and can be considered out of circulation."
 * https://planetfinanceio.medium.com/pancakeswap-works-with-planet-to-help-cake-holders-f0d253b435af
 * https://twitter.com/PancakeSwap/status/1523913527626702849
 * https://bscscan.com/tx/0xd5ffea4d9925d2f79249a4ce05efd4459ed179152ea5072a2df73cd4b9e88ba7
 */
const planetFinanceBurnedTokensWei = BigNumber.from('637407922445268000000000')
const cakeVaultAddress = getCakeVaultAddress()

const CakeDataRow = () => {
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [loadData, setLoadData] = useState(false)
  const {
    data: { cakeSupply, burnedBalance, circulatingSupply } = {
      cakeSupply: 0,
      burnedBalance: 0,
      circulatingSupply: 0,
    },
  } = useSWR(
    loadData ? ['cakeDataRow'] : null,
    async () => {
      const totalSupplyCall = { abi: cakeAbi, address: bscTokens.cake.address, name: 'totalSupply' }
      const burnedTokenCall = {
        abi: cakeAbi,
        address: bscTokens.cake.address,
        name: 'balanceOf',
        params: ['0x000000000000000000000000000000000000dEaD'],
      }
      const cakeVaultCall = {
        abi: cakeVaultV2Abi,
        address: cakeVaultAddress,
        name: 'totalLockedAmount',
      }

      const [[totalSupply], [burned], [totalLockedAmount]] = await multicallv3({
        calls: [totalSupplyCall, burnedTokenCall, cakeVaultCall],
        allowFailure: true,
      })
      const totalBurned = planetFinanceBurnedTokensWei.add(burned)
      const circulating = totalSupply.sub(totalBurned.add(totalLockedAmount))

      return {
        cakeSupply: totalSupply && burned ? +formatBigNumber(totalSupply.sub(totalBurned)) : 0,
        burnedBalance: burned ? +formatBigNumber(totalBurned) : 0,
        circulatingSupply: circulating ? +formatBigNumber(circulating) : 0,
      }
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )
  const cakePriceBusd = usePriceCakeBusd()
  const mcap = cakePriceBusd.times(circulatingSupply)
  const mcapString = formatLocalisedCompactNumber(mcap.toNumber())

  useEffect(() => {
    if (isIntersecting) {
      setLoadData(true)
    }
  }, [isIntersecting])

  return (
    <Grid>
      <Flex flexDirection="column" style={{ gridArea: 'a' }}>
        <Text color="textSubtle">{t('Circulating Supply')}</Text>
        {circulatingSupply ? (
          <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={circulatingSupply} />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </Flex>
      <StyledColumn noMobileBorder style={{ gridArea: 'b' }}>
        <Text color="textSubtle">{t('Total supply')}</Text>
        {cakeSupply ? (
          <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={cakeSupply} />
        ) : (
          <>
            <div ref={observerRef} />
            <Skeleton height={24} width={126} my="4px" />
          </>
        )}
      </StyledColumn>
      <StyledColumn noMobileBorder style={{ gridArea: 'c' }}>
        <Text color="textSubtle">{t('Max Supply')}</Text>

        <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={750000000} />
      </StyledColumn>
      <StyledColumn noDesktopBorder style={{ gridArea: 'd' }}>
        <Text color="textSubtle">{t('Market cap')}</Text>
        {mcap?.gt(0) && mcapString ? (
          <Heading scale="lg">{t('$%marketCap%', { marketCap: mcapString })}</Heading>
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </StyledColumn>
      <StyledColumn style={{ gridArea: 'e' }}>
        <Text color="textSubtle">{t('Burned to date')}</Text>
        {burnedBalance ? (
          <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={burnedBalance} />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </StyledColumn>
      <StyledColumn style={{ gridArea: 'f' }}>
        <Text color="textSubtle">{t('Current emissions')}</Text>

        <Heading scale="lg">{t('%cakeEmissions%/block', { cakeEmissions: emissionsPerBlock })}</Heading>
      </StyledColumn>
    </Grid>
  )
}

export default CakeDataRow
