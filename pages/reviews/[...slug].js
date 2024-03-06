import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  getStaticPage,
  getAllDocSlugs,
  queries,
  getAllDocSlugsIds
} from '@data'
import {
  assignLocalizedRoutes,
  getTranslatedRouteById
} from '../../utils/routeTranslations'

import { buildPageProps } from '@lib/buildPage'
import NotFoundPage from '@pages/404'
import {
  useUserLocation,
  useLocalizedRoutes,
  useLanguageSetting
} from '@lib/context'

import { getSalesData } from '../../utils/sales'
import Layout from '../../components/layout'
import { WriteAReviewContext } from '../../lib/context'

const ReviewsPage = ({
  data,
  locale,
  selectedSaleId,
  isLastChance,
  enFrSlugsIds
}) => {
  const router = useRouter()
  if (!router.isFallback && !data) {
    return <NotFoundPage locale={locale} />
  }

  const userLocation = useUserLocation()
  const localizedRoutes = useLocalizedRoutes()

  const isQuebec = userLocation?.province === 'Quebec'
  const navigatorLanguage = useLanguageSetting()
  const isFrench = navigatorLanguage?.includes('fr')

  const [showReviewForm, setShowReviewForm] = useState()

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
  const { modules } = page

  useEffect(() => {
    const reviewsPageData = {
      enFrSlugsIds,
      locale,
      page,
      urlPath: page.slug
    }

    const translatedRoute = getTranslatedRouteById(reviewsPageData)

    const redirectReviewsPageData = {
      localizedRoutes,
      locale,
      currentRoute: router?.asPath,
      redirectRoute: `/reviews${translatedRoute[0]?.slug}`
    }

    assignLocalizedRoutes(redirectReviewsPageData)
  }, [router])

  useEffect(() => {
    const reviewsPageData = {
      enFrSlugsIds,
      locale,
      page,
      urlPath: page.slug
    }

    const translatedRoute = getTranslatedRouteById(reviewsPageData)

    if (isFrench && !window.location.pathname.includes(`/${locale}/`)) {
      router.push(`/fr/reviews/${translatedRoute[0]?.slug}`)
    }
  }, [isFrench])

  return (
    <>
      {!router.isFallback && (
        <WriteAReviewContext.Provider
          value={{ showReviewForm, setShowReviewForm }}
        >
          <Layout
            page={page}
            global={global}
            data={data}
            locale={locale}
            sales={sales}
          >
            {modules}
          </Layout>
        </WriteAReviewContext.Provider>
      )}
    </>
  )
}
export async function getStaticProps({ params, locale, preview }) {
  const pageData = await getStaticPage(
    queries.getFormattedTypeQuery(
      'reviewsPage',
      locale,
      `{
        "id": _id,
        modules[],
        title,
        seo,
        slug
      }`,
      `slug == "/${params.slug}"`
    ),
    locale
  )

  const enFrSlugsIds = await getAllDocSlugsIds('reviewsPage')

  return {
    props: {
      data: pageData,
      enFrSlugsIds,
      locale,
      isPreviewMode: preview || false
    }
  }
}

export async function getStaticPaths() {
  const allPages = await getAllDocSlugs('reviewsPage')

  return {
    paths:
      allPages?.map((page) => {
        const slugs = page.slug.split('/').filter(Boolean)

        return {
          params: {
            slug: slugs
          },
          locale: page.__i18n_lang
        }
      }) || [],
    fallback: false
  }
}

export default ReviewsPage
