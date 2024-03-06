import React, { useEffect, useMemo } from 'react'
import Error from 'next/error'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  getStaticBlogPage,
  queries,
  getAllDocSlugsIds,
  getAllDocSlugs
} from '@data'
import { buildPageProps } from '@lib/buildPage'
import {
  useUserLocation,
  useLocalizedRoutes,
  useLanguageSetting
} from '@lib/context'
import Layout from '../../../components/layout'
import { getSalesData } from '../../../utils/sales'
import { BlogArticleCardsGrid } from 'components/BlogArticleCard/BlogArticleCardsGrid'

import {
  assignLocalizedRoutes,
  getTranslatedRouteById
} from '../../../utils/routeTranslations'

import { BlogHeader } from 'components/BlogHeader'
import NotFoundPage from '@pages/404'
import { StyledPageWidthWrap } from '..'
import { StyledPageWidth } from 'styles/global.styled'
import { getSortedArticlesOfObj } from '@lib/time'
import { getBlogSchema } from 'utils/getBlogSchema'
import { BlogPrefooter } from 'components/BlogPrefooter/BlogPrefooter'

const BlogCategory = ({
  data,
  locale,
  selectedSaleId,
  isLastChance,
  enFrSlugsIds
}) => {
  const userLocation = useUserLocation()
  const navigatorLanguage = useLanguageSetting()
  const isFrench = navigatorLanguage?.includes('fr')
  const isQuebec = userLocation?.province === 'Quebec'
  const localizedRoutes = useLocalizedRoutes()
  const router = useRouter()

  if (!router.isFallback && !data) {
    return <NotFoundPage locale={locale} />
  }

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

  const page = buildPageProps(data.page, {
    sales,
    locale,
    references
  })

  const global = buildPageProps(data.global, { sales, locale, references })

  const blog = buildPageProps(data.blog, {
    sales,
    locale,
    references
  })

  const { header } = blog.blogHomepage || {}
  const blogArticles = blog.blogArticles
  const { categorySlug } = page

  const blogCategory = blog.blogCategories.find((category) => {
    return category.slug === categorySlug
  })

  const currentSlug = useMemo(() => {
    return router?.asPath.split('/').pop()
  }, [router?.asPath])

  const articles = blogArticles.filter((article) => {
    return article.settings?.categories?.[0].slug.current === currentSlug
  })

  const sortedArticles = useMemo(() => {
    return getSortedArticlesOfObj(articles)
  }, [currentSlug])

  // Localization
  useEffect(() => {
    const categoryPageData = {
      enFrSlugsIds,
      locale,
      page,
      urlPath: page.categorySlug
    }

    const translatedRoute = getTranslatedRouteById(categoryPageData)

    const redirectCategoryPageData = {
      localizedRoutes,
      locale,
      currentRoute: router.asPath,
      redirectRoute: `/blog/${translatedRoute[0]?.slug}`
    }

    assignLocalizedRoutes(redirectCategoryPageData)
  }, [router])

  useEffect(() => {
    const categoryPageData = {
      enFrSlugsIds,
      locale,
      page,
      urlPath: page.categorySlug
    }

    const translatedRoute = getTranslatedRouteById(categoryPageData)

    if (isFrench && !window.location.pathname.includes(`/${locale}/`)) {
      router.push(`/fr/blog/${translatedRoute[0]?.slug}`)
    }
  }, [isFrench])

  if (!page) {
    return (
      <Error
        title={`"Blog Page" is not set in Sanity, or the page data is missing`}
        statusCode='Data Error'
      />
    )
  }

  const currentUrl = `https://endy.com/${router.locale}/blog/${currentSlug}`

  const blogSchema = useMemo(
    () =>
      Object.keys(sortedArticles).length !== 0 &&
      router.pathname &&
      getBlogSchema(
        global?.settings?.shareGraphic,
        blog,
        currentUrl,
        sortedArticles,
        currentSlug
      ),
    [global?.settings?.shareGraphic, blog, currentUrl]
  )

  return (
    <Layout
      page={{ ...page, title: header?.heading }}
      global={global}
      data={data}
      locale={locale}
      sales={sales}
      schema={blogSchema}
    >
      <StyledPageWidthWrap>
        <StyledPageWidth>
          <BlogHeader locale={locale} header={header} />

          <BlogArticleCardsGrid articles={sortedArticles} locale={locale} />
          {blog?.blogPrefooter && (
            <BlogPrefooter
              prefooter={blog.blogPrefooter}
              locale={locale}
              sales={sales}
            />
          )}
        </StyledPageWidth>
      </StyledPageWidthWrap>
    </Layout>
  )
}

export async function getStaticProps({ params, locale, preview }) {
  const pageData = await getStaticBlogPage(
    queries.getFormattedTypeQuery(
      'category',
      locale,
      `{
        "id": _id,
        "categorySlug": "${params.category}"
      }`,
      `slug == "${params.category}"`
    ),
    locale
  )

  const enFrSlugsIds = await getAllDocSlugsIds('category')

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
  const allPages = await getAllDocSlugs('category')

  return {
    paths:
      allPages?.map((page) => {
        return {
          params: {
            category: page.slug.current
          },
          locale: page.__i18n_lang
        }
      }) || [],
    fallback: false
  }
}

export default BlogCategory
