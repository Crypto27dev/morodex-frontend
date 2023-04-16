import { appearAnimation, useIsomorphicEffect, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import { useActiveChainId } from 'hooks/useActiveChainId'
import styled from 'styled-components'
import SwiperCore, { Autoplay, EffectFade, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMultipleBannerConfig } from './hooks/useMultipleBannerConfig'

const BannerPlaceHolder = styled.div<{ walletConnected: boolean }>`
  position: relative;
  height: 179px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 221px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 232px;
  }
  &::before {
    content: '';
    border-radius: 32px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: -webkit-linear-gradient(#7645d9 0%, #452a7a 100%);
    ${({ theme }) => theme.mediaQueries.sm} {
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
    }
  }
  margin-top: ${({ walletConnected }) => (walletConnected ? '250px' : '0px')};
  margin-bottom: ${({ walletConnected }) => (walletConnected ? '-220px' : '0px')};
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: ${({ walletConnected }) => (walletConnected ? '190px' : '-32px')};
    margin-bottom: 30px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: ${({ walletConnected }) => (walletConnected ? '90px' : '-32px')};
    margin-bottom: ${({ walletConnected }) => (walletConnected ? '40px' : '30px')};
  }
  ${({ theme }) => theme.mediaQueries.lg},${({ theme }) => theme.mediaQueries.md} {
    padding-top: 0;
    margin-top: ${({ walletConnected }) => (walletConnected ? '60px' : '-32px')};
    margin-bottom: ${({ walletConnected }) => (walletConnected ? '60px' : '30px')};
  }
`

const StyledSwiper = styled(Swiper)`
  position: relative;
  overflow: visible;
  opacity: 0;
  animation: ${appearAnimation} 0.3s ease-in-out 0.7s forwards;
  .swiper-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    width: 108px;
    bottom: 12px;
    ${({ theme }) => theme.mediaQueries.sm} {
      bottom: 35px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      bottom: 45px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      bottom: 35px;
    }
  }
  .swiper-pagination-bullet {
    background-color: white;
    flex-basis: 108px;
    margin: 0 !important;
    border-radius: 0px;
    &:first-child {
      border-radius: 4px 0px 0px 4px;
    }
    &:last-child {
      border-radius: 0px 4px 4px 0px;
    }
  }
`

const MultipleBanner: React.FC<React.PropsWithChildren> = () => {
  const bannerList = useMultipleBannerConfig()
  const { address: account } = useAccount()
  const { isDesktop, isTablet } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()
  const [swiperRef, setSwiperRef] = useState<SwiperCore>(null)

  useIsomorphicEffect(() => {
    if (swiperRef) {
      if (bannerList.length > 1 && !swiperRef.autoplay?.running) {
        swiperRef.autoplay?.start()
      } else if (bannerList.length <= 1 && swiperRef.autoplay?.running) {
        swiperRef.autoplay?.stop()
      }
    }
  }, [bannerList, swiperRef])

  return (
    <BannerPlaceHolder walletConnected={Boolean(account) && chainId === ChainId.BSC}>
      <StyledSwiper
        onSwiper={setSwiperRef}
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={50}
        observer
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={500}
        autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
      >
        {bannerList.map((banner, index) => {
          const childKey = `Banner${index}`
          return (
            <SwiperSlide style={{ padding: isDesktop || isTablet ? 20 : 0 }} key={childKey}>
              {banner}
            </SwiperSlide>
          )
        })}
      </StyledSwiper>
    </BannerPlaceHolder>
  )
}

export default MultipleBanner
