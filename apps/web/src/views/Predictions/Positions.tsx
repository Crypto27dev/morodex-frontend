import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SwiperCore, { Keyboard, Mousewheel, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { useGetSortedRoundsCurrentEpoch } from 'state/predictions/hooks'
import delay from 'lodash/delay'
import RoundCard from './components/RoundCard'
import useSwiper from './hooks/useSwiper'
import useOnNextRound from './hooks/useOnNextRound'
import useOnViewChange from './hooks/useOnViewChange'
import { PageView } from './types'
import { CHART_DOT_CLICK_EVENT } from './helpers'

SwiperCore.use([Keyboard, Mousewheel, FreeMode])

const StyledSwiper = styled.div`
  .swiper-wrapper {
    align-items: center;
    display: flex;
  }

  .swiper-slide {
    width: 320px;
  }
`

const Positions: React.FC<React.PropsWithChildren<{ view?: PageView }>> = ({ view }) => {
  const { setSwiper, swiper } = useSwiper()
  const { currentEpoch, rounds } = useGetSortedRoundsCurrentEpoch()
  const previousEpoch = currentEpoch > 0 ? currentEpoch - 1 : currentEpoch
  const swiperIndex = rounds.findIndex((round) => round.epoch === previousEpoch)

  useOnNextRound()
  useOnViewChange(swiperIndex, view)

  useEffect(() => {
    const handleChartDotClick = () => {
      setIsChangeTransition(true)
      delay(() => setIsChangeTransition(false), 3000)
    }
    swiper?.el?.addEventListener(CHART_DOT_CLICK_EVENT, handleChartDotClick)

    return () => {
      swiper?.el?.removeEventListener(CHART_DOT_CLICK_EVENT, handleChartDotClick)
    }
  }, [swiper?.el])

  const [isChangeTransition, setIsChangeTransition] = useState(false)

  return (
    <StyledSwiper>
      <Swiper
        initialSlide={swiperIndex}
        onSwiper={setSwiper}
        spaceBetween={16}
        slidesPerView="auto"
        onBeforeDestroy={() => setSwiper(null)}
        freeMode={{ enabled: true, sticky: true, momentumRatio: 0.25, momentumVelocityRatio: 0.5 }}
        centeredSlides
        mousewheel
        keyboard
        resizeObserver
      >
        {rounds.map((round) => (
          <SwiperSlide key={round.epoch}>
            {({ isActive }) => <RoundCard round={round} isActive={isChangeTransition && isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSwiper>
  )
}

export default Positions
