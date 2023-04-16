import { ResponseArticleDataType, PaginationType } from 'views/Blog/types'

export interface ArticleDataType {
  id: number
  title: string
  locale: string
  imgUrl: string
  content: string
  createAt: string
  publishedAt: string
  description: string
  categories: Array<string>
}

export interface ArticleType {
  data: ArticleDataType[]
  pagination: PaginationType
}

export const transformArticle = (article: ResponseArticleDataType): ArticleDataType => {
  return {
    id: article.id,
    title: article?.attributes?.title ?? '',
    content: article?.attributes?.content ?? '',
    createAt: article?.attributes?.createAt ?? '',
    publishedAt: article?.attributes?.publishedAt ?? '',
    locale: article?.attributes?.locale ?? '',
    description: article?.attributes?.description ?? '',
    imgUrl: article?.attributes?.image?.data?.[0]?.attributes?.url ?? '',
    categories: article.attributes?.categories?.data?.map((i) => i.attributes.name),
  }
}
