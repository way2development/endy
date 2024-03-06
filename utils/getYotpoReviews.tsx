// Docs on Yotpo query params : https://apidocs.yotpo.com/
import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

// query params for Yotpo API
export const RESULTS_PER_PAGE = 50
export const API_KEY = process.env.YOTPO_API_KEY

const getYotpoEndpoint = (
  productId: string,
  reviewPage: number,
  filters: {
    selectedSort: string
    sleepPosition: string
    keywordSearch: string
  },
  hasPayload: boolean
) => {
  const selectedSort = filters ? filters['selectedSort'] : ''

  if (hasPayload) {
    return `https://api.yotpo.com/v1/reviews/${API_KEY}/filter.json`
  } else {
    return `https://api.yotpo.com/v1/widget/${API_KEY}/products/${productId}/reviews.json?per_page=${RESULTS_PER_PAGE}&page=${reviewPage}${selectedSort}`
  }
}

interface QueryProps {
  domain_key: string
  page: number
  per_page: number
  sortings: { sort_by: string; ascending: boolean }[]
  crfs?: { question_id: number; answers: string[] }[]
  free_text_search?: string
}

export const createQuery = (
  productId: string,
  reviewPage: number,
  filters: {
    selectedSort: string
    sleepPosition: string
    keywordSearch: string
  }
) => {
  // format sort order for query
  const order = new URLSearchParams(filters['selectedSort'])
  const direction = order.get('direction')
  const isAscending = direction === 'asc' ? true : false
  let sortBy = order.get('sort')

  if (sortBy === 'rating') {
    sortBy = 'score'
  }

  let query: QueryProps = {
    domain_key: productId,
    page: reviewPage,
    per_page: RESULTS_PER_PAGE,
    sortings: [
      {
        sort_by: sortBy ? sortBy : 'date',
        ascending: isAscending
      }
    ]
  }

  if (filters['sleepPosition'] !== '') {
    query = {
      ...query,
      crfs: [
        {
          question_id: 18329,
          answers: [`${filters['sleepPosition']}`]
        }
      ]
    }
  }

  if (filters['keywordSearch'] !== '') {
    query = {
      ...query,
      free_text_search: `${filters['keywordSearch']}`
    }
  }

  return query
}

export const getYotpoReviews = async (
  productId: number,
  reviewPage: number,
  setPaginatedTotal: Dispatch<SetStateAction<number>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setIsError: Dispatch<SetStateAction<boolean>>,
  allReviews: any,
  setAllReviews: Dispatch<SetStateAction<any>>,
  lastIndex: number,
  setIndexOfLastResult: Dispatch<SetStateAction<number>>,
  filters: {
    selectedSort: string
    sleepPosition: string
    keywordSearch: string
  },
  setStarDistribution: (param: {
    1?: number
    2?: number
    3?: number
    4?: number
    5?: number
  }) => void
) => {
  setIsLoading(true)

  const hasPayload =
    filters['sleepPosition'] !== '' || filters['keywordSearch'] !== ''

  // Yotpo requires the product id to be a string
  const formattedProductId = productId.toString()

  const endpoint = getYotpoEndpoint(
    formattedProductId,
    reviewPage,
    filters,
    hasPayload
  )

  const query = createQuery(formattedProductId, reviewPage, filters)

  try {
    // Yotpo recommends fetching 50 results per call
    const fetchReviews = hasPayload
      ? await axios.post(endpoint, query)
      : await axios.get(endpoint)

    const { data } = fetchReviews

    // clear array of reviews if user is starting a new filter
    if (reviewPage > 1) {
      setAllReviews([...allReviews, ...data.response.reviews])
    } else {
      setAllReviews([...data.response.reviews])
    }

    lastIndex && setIndexOfLastResult(lastIndex)
    setStarDistribution(data.response.bottomline?.star_distribution)
    setPaginatedTotal(data.response.pagination?.total)
    setIsLoading(false)
  } catch (error) {
    console.error(error)
    setIsError(true)
    setIsLoading(false)
  }
}

export const getYotpoBottomLine = async (
  productId: number,
  setReviewSummary: Dispatch<
    SetStateAction<{
      averageScore: number
      totalReviews: number
    }>
  >
) => {
  try {
    const { data } = await axios.get(
      `https://api.yotpo.com/products/${API_KEY}/${productId}/bottomline`
    )

    const reviewSummary = {
      averageScore: data.response.bottomline?.average_score,
      totalReviews: data.response.bottomline?.total_reviews
    }

    setReviewSummary(reviewSummary)
  } catch (error) {
    console.error(error)
  }
}
