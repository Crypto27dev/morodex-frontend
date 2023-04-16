import qs from 'qs'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line consistent-return
export const articles = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.STRAPI_PREVIEW_SECRET || !req.query) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_PREVIEW_SECRET}`,
    },
  }
  const queryString = qs.stringify(req.query)
  const requestUrl = `${process.env.STRAPI_API_URL}/api/articles?${queryString}`
  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    return res.status(400).json({ message: 'An error occured please try again' })
  }

  const data = await response.json()
  return res.status(200).json(data)
}

export default articles
