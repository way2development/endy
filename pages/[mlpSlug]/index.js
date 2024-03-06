import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Error from 'next/error'
import { useRouter } from 'next/router'
import {
  assignLocalizedRoutes,
  getTranslatedRouteById
} from '../../utils/routeTranslations'

import {
  getStaticPage,
  getAllDocSlugs,
  queries,
  getAllDocSlugsIds
} from '@data'
import { buildPageProps } from '@lib/buildPage'
import {
  useUserLocation,
  useLocalizedRoutes,
  useLanguageSetting
} from '@lib/context'

import Layout from '../../components/layout'
import { getSalesData } from '../../utils/sales'
import { getVideoSchema } from '../../utils/getVideoSchema'

const MLPPage = ({
  data,
  locale,
  selectedSaleId,
  isLastChance,
  enFrSlugsIds
}) => {
  const userLocation = useUserLocation()
  const localizedRoutes = useLocalizedRoutes()
  const isQuebec = userLocation?.province === 'Quebec'
  const navigatorLanguage = useLanguageSetting()
  const isFrench = navigatorLanguage?.includes('fr')

  const references = Object.keys(data.references).reduce(
    (allReferences, type) => {
      return allReferences.concat(data.references[type])
    },
    []
  )
  const sales = getSalesData(
    data.sales,
    isQuebec,
    locale,
    { references },
    selectedSaleId,
    isLastChance
  )
  const page = buildPageProps(data.page, { sales, locale, references })
  const global = buildPageProps(data.global, { sales, locale, references })
  const { modules, prefooter, hero } = page
  const router = useRouter()

  if (!page) {
    return (
      <Error
        title={`"MLP Page" is not set in Sanity, or the page data is missing`}
        statusCode='Data Error'
      />
    )
  }

  const [isLoading, setIsLoading] = useState(false)
  const [allReviews, setAllReviews] = useState([])

  const fetchReviews = async () => {
    const API_KEY = process.env.YOTPO_API_KEY

    try {
      setIsLoading(true)

      // Yotpo limits fetch to 100 products
      const { data } = await axios.get(
        `https://api.yotpo.com/v1/apps/${API_KEY}/bottom_lines?count=100&page=1`
      )

      setAllReviews(data.response.bottomlines || [])
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    const mlpPageData = {
      enFrSlugsIds,
      locale,
      page,
      urlPath: router.asPath
    }

    const translatedRoute = getTranslatedRouteById(mlpPageData)

    const redirectMlpPageData = {
      localizedRoutes,
      locale,
      currentRoute: router?.asPath,
      redirectRoute: translatedRoute[0]?.slug
    }

    assignLocalizedRoutes(redirectMlpPageData)
  }, [router])

  useEffect(() => {
    const mlpPageData = {
      enFrSlugsIds,
      locale,
      page,
      urlPath: router.asPath
    }

    const translatedRoute = getTranslatedRouteById(mlpPageData)

    if (isFrench && !window.location.pathname.includes(`/${locale}/`)) {
      router.push(`/fr/${translatedRoute[0]?.slug}`)
    }
  }, [isFrench])

  const mediaModule = modules.find((module) => {
    const { video, _type } = module.props
    return video && _type === 'mediaModule'
  })

  const stackedMedia = modules.find((module) => {
    const { _type } = module.props
    return _type === 'stackedMedia'
  })

  const videoSchema = useMemo(
    () => getVideoSchema(mediaModule?.props, stackedMedia?.props),
    [router.asPath]
  )

  return (
    <Layout
      page={page}
      global={global}
      schema={videoSchema}
      data={data}
      locale={locale}
      sales={sales}
    >
      {hero}
      {modules.map((module) => {
        return React.cloneElement(module, {
          productReviews: allReviews,
          isProductReviewsLoading: isLoading
        })
      })}

      {prefooter}
    </Layout>
  )
}

export async function getStaticProps({ locale, preview }) {
  const pageData = await getStaticPage(
    queries.getFormattedTypeQuery(
      'mlpPage',
      locale,
      `{
        "id": _id,
        "type": _type,
        hero,
        modules[],
        title,
        prefooter,
        seo
      }`
    ),
    locale
  )

  const enFrSlugsIds = await getAllDocSlugsIds('mlpPage')

  return {
    props: {
      data: pageData,
      locale,
      enFrSlugsIds,
      isPreviewMode: preview || false
    }
  }
}

export async function getStaticPaths() {
  const allPages = await getAllDocSlugs('mlpPage')

  return {
    paths:
      allPages?.map((page) => {
        const slug = page.slug.split('/').filter(Boolean)[0]

        return {
          params: {
            mlpSlug: slug
          },
          locale: page.__i18n_lang
        }
      }) || [],
    fallback: false
  }
}

export default MLPPage
