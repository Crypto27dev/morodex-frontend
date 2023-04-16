import { useState, useMemo, ReactNode } from 'react'
import shuffle from 'lodash/shuffle'
import styled from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/bundle'
import SwiperCore from 'swiper'
import { ArrowBackIcon, ArrowForwardIcon, Box, IconButton, Text, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { isAddress } from 'utils'
import useSWRImmutable from 'swr/immutable'
import { getNftsFromCollectionApi, getMarketDataForTokenIds } from 'state/nftMarket/helpers'
import { NftToken } from 'state/nftMarket/types'
import Trans from 'components/Trans'
import { pancakeBunniesAddress } from '../../../constants'
import { CollectibleLinkCard } from '../../../components/CollectibleCard'
import useAllPancakeBunnyNfts from '../../../hooks/useAllPancakeBunnyNfts'

const INITIAL_SLIDE = 4

const SwiperCircle = styled.div<{ isActive }>`
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.secondary : theme.colors.textDisabled)};
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 50%;
  cursor: pointer;
`

const StyledSwiper = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    .swiper-wrapper {
      max-height: 390px;
    }
  }
`

interface MoreFromThisCollectionProps {
  collectionAddress: string
  currentTokenName?: string
  title?: ReactNode
}

const MoreFromThisCollection: React.FC<React.PropsWithChildren<MoreFromThisCollectionProps>> = ({
  collectionAddress,
  currentTokenName = '',
  title = <Trans>More from this collection</Trans>,
}) => {
  const [swiperRef, setSwiperRef] = useState<SwiperCore>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const { isMobile, isMd, isLg } = useMatchBreakpoints()
  const allPancakeBunnyNfts = useAllPancakeBunnyNfts(collectionAddress)

  const isPBCollection = isAddress(collectionAddress) === pancakeBunniesAddress
  const checkSummedCollectionAddress = isAddress(collectionAddress) || collectionAddress

  const { data: collectionNfts } = useSWRImmutable<NftToken[]>(
    !isPBCollection && checkSummedCollectionAddress
      ? ['nft', 'moreFromCollection', checkSummedCollectionAddress]
      : null,
    async () => {
      try {
        const nfts = await getNftsFromCollectionApi(collectionAddress, 100, 1)

        if (!nfts?.data) {
          return []
        }

        const tokenIds = Object.values(nfts.data).map((nft) => nft.tokenId)
        const nftsMarket = await getMarketDataForTokenIds(collectionAddress, tokenIds)

        return tokenIds.map((id) => {
          const apiMetadata = nfts.data[id]
          const marketData = nftsMarket.find((nft) => nft.tokenId === id)

          return {
            tokenId: id,
            name: apiMetadata.name,
            description: apiMetadata.description,
            collectionName: apiMetadata.collection.name,
            collectionAddress,
            image: apiMetadata.image,
            attributes: apiMetadata.attributes,
            marketData,
          }
        })
      } catch (error) {
        console.error(`Failed to fetch collection NFTs for ${collectionAddress}`, error)
        return []
      }
    },
  )

  let nftsToShow = useMemo(() => {
    return shuffle(
      allPancakeBunnyNfts
        ? allPancakeBunnyNfts.filter((nft) => nft.name !== currentTokenName)
        : collectionNfts?.filter((nft) => nft.name !== currentTokenName && nft.marketData?.isTradable),
    )
  }, [allPancakeBunnyNfts, collectionNfts, currentTokenName])

  if (!nftsToShow || nftsToShow.length === 0) {
    return null
  }

  let slidesPerView = 4
  let maxPageIndex = 3

  if (isMd) {
    slidesPerView = 2
    maxPageIndex = 6
  }

  if (isLg) {
    slidesPerView = 3
    maxPageIndex = 4
  }

  if (isPBCollection) {
    // PancakeBunnies should display 1 card per bunny id
    nftsToShow = nftsToShow.reduce((nftArray, current) => {
      const bunnyId = current.attributes[0].value
      if (!nftArray.find((nft) => nft.attributes[0].value === bunnyId)) {
        nftArray.push(current)
      }
      return nftArray
    }, [])
  }
  nftsToShow = nftsToShow.slice(0, 12)

  const nextSlide = () => {
    if (activeIndex < maxPageIndex - 1) {
      setActiveIndex((index) => index + 1)
      swiperRef.slideNext()
    }
  }

  const previousSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex((index) => index - 1)
      swiperRef.slidePrev()
    }
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index / slidesPerView)
    swiperRef.slideTo(index)
  }

  const updateActiveIndex = ({ activeIndex: newActiveIndex }) => {
    if (newActiveIndex !== undefined) setActiveIndex(Math.ceil(newActiveIndex / slidesPerView))
  }

  return (
    <Box pt="56px" mb="52px">
      {title && (
        <Text bold mb="24px">
          {title}
        </Text>
      )}
      {isMobile ? (
        <StyledSwiper>
          <Swiper spaceBetween={16} slidesPerView={1.5}>
            {nftsToShow.map((nft) => (
              <SwiperSlide key={nft.tokenId}>
                <CollectibleLinkCard nft={nft} />
              </SwiperSlide>
            ))}
          </Swiper>
        </StyledSwiper>
      ) : (
        <StyledSwiper>
          <Swiper
            onSwiper={setSwiperRef}
            onActiveIndexChange={updateActiveIndex}
            spaceBetween={16}
            slidesPerView={slidesPerView}
            slidesPerGroup={slidesPerView}
            initialSlide={INITIAL_SLIDE}
          >
            {nftsToShow.map((nft) => (
              <SwiperSlide key={nft.tokenId}>
                <CollectibleLinkCard
                  nft={nft}
                  currentAskPrice={isPBCollection ? null : parseFloat(nft?.marketData?.currentAskPrice)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Flex mt="16px" alignItems="center" justifyContent="center">
            <IconButton variant="text" onClick={previousSlide}>
              <ArrowBackIcon />
            </IconButton>
            {[...Array(maxPageIndex).keys()].map((index) => (
              <SwiperCircle
                key={index}
                onClick={() => goToSlide(index * slidesPerView)}
                isActive={activeIndex === index}
              />
            ))}
            <IconButton variant="text" onClick={nextSlide}>
              <ArrowForwardIcon />
            </IconButton>
          </Flex>
        </StyledSwiper>
      )}
    </Box>
  )
}

export default MoreFromThisCollection
