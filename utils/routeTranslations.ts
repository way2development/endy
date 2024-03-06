import { ProductProps } from '../components/ShopModule/ShopModule.types'
import { Locale } from '../types/global-types'
import { NextRouter } from 'next/router'
import type { ParsedUrlQuery } from 'querystring'

interface SlugsIdsProps {
  id: string
  slug: string
}

interface CollectionProps {
  _key: string
  anchorId: string
}

interface CollectionsProps {
  collections: CollectionProps[]
}
interface LocalizedRoutesProps {
  en_route: string
  fr_route: string
}

interface TranslatedRouteProps {
  enFrSlugsIds?: SlugsIdsProps[]
  locale?: Locale
  page?: any
  product?: ProductProps
  collections?: CollectionsProps[]
  urlPath?: string
}

interface LocalizedRoutesProps {
  localizedRoutes: LocalizedRoutesProps
  locale: Locale
  currentRoute: string
  redirectRoute: string
}

// This function basically looks at all the page ids (or anchor ids if its a collection page) from sanity and retrieves the correct corresponding translated slug it should use

export const getTranslatedRouteById = ({
  enFrSlugsIds,
  locale,
  page,
  product,
  collections,
  urlPath
}: TranslatedRouteProps) => {
  // for product pages
  if (product) {
    return enFrSlugsIds?.filter((slugAndId: SlugsIdsProps) => {
      return locale === 'en'
        ? slugAndId.id.includes(page.id) && slugAndId.slug !== product.slug
        : page.id.includes(slugAndId.id) && slugAndId.slug !== product.slug
    })
  }

  // for collection page with anchor id
  if (collections) {
    return collections?.reduce(
      (
        accum: { anchorId: string; key: string }[],
        currVal: CollectionsProps
      ) => {
        currVal.collections.map((collection: CollectionProps) => {
          if (collection.anchorId) {
            accum.push({ anchorId: collection.anchorId, key: collection._key })
          }
        })
        return accum
      },
      []
    )
  }

  // all other pages
  return enFrSlugsIds?.filter((slugAndId: SlugsIdsProps) => {
    return locale === 'en'
      ? slugAndId.id.includes(page.id) && slugAndId.slug !== urlPath
      : page.id.includes(slugAndId.id) && slugAndId.slug !== urlPath
  })
}

export const assignLocalizedRoutes = ({
  localizedRoutes,
  locale,
  currentRoute,
  redirectRoute
}: LocalizedRoutesProps) => {
  if (locale === 'en') {
    localizedRoutes['en_route'] = currentRoute
    localizedRoutes['fr_route'] = redirectRoute
  }

  if (locale === 'fr') {
    localizedRoutes['fr_route'] = currentRoute
    localizedRoutes['en_route'] = redirectRoute
  }
}

export const getLocalizedRouteWithQueryParams = (
  query: ParsedUrlQuery,
  route: string
) => {
  if (query.size && query.color) {
    return `${route}?size=${query.size}&color=${query.color}`
  }

  if (query.size) {
    return `${route}?size=${query.size}`
  }

  return `${route}`
}
