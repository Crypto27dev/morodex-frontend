import { Swiper, SwiperSlide } from 'swiper/react'
import { Flex } from '@pancakeswap/uikit'
import NextLink from 'next/link'
import styled from 'styled-components'
import BlogCard from 'views/Blog/components/BlogCard'
import { useTranslation } from '@pancakeswap/localization'
import { Autoplay } from 'swiper'
import ArticleView from 'views/Blog/components/Article/ArticleView'
import useSWR from 'swr'
import { ArticleDataType } from 'views/Blog/utils/transformArticle'
import 'swiper/css/bundle'

const StyledChefsChoiceContainer = styled(Flex)`
  margin: 61px auto 48px auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 120px auto 80px auto;
  }
`

const ChefsChoice = () => {
  const { t } = useTranslation()
  const { data: articlesData } = useSWR<ArticleDataType[]>('/chefChoiceArticle')

  return (
    <StyledChefsChoiceContainer justifyContent="center">
      <ArticleView title={t('Chef’s choice')} subTitle={t('Read about our latest announcements and more')}>
        <Swiper
          loop
          resizeObserver
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            920: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
        >
          {articlesData?.map((article) => (
            <SwiperSlide key={article.id}>
              <NextLink passHref href={`/${article.id}`}>
                <BlogCard
                  margin="auto"
                  padding={['0', '0', '18.5px']}
                  imgHeight={['200px']}
                  article={article}
                  imgUrl={article.imgUrl}
                />
              </NextLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </ArticleView>
    </StyledChefsChoiceContainer>
  )
}

export default ChefsChoice
