import { getSanityClient } from '@lib/sanity'
import * as queries from './queries'

const isProduction =
  process.env.NODE_ENV === 'production' && process.env.BUILD_ENV !== 'draft'
const {
  getFormattedTypeQuery,
  getProductProjection,
  getVariantProjection,
  getRefQuery,
  getArticleProjection,
  getFeaturedArticleProjection,
  getPrefooterProjection,
  getBlogCategoryProjection
} = queries

// Fetch all dynamic docs and remove drafts from production
export async function getAllDocSlugs(doc) {
  const data = await getSanityClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true ${
      isProduction ? `&& !(_id in path('drafts.**'))` : ''
    }]{ "slug": slug, "__i18n_lang": __i18n_lang }`
  )
  return data
}

export async function getAllDocSlugsIds(doc) {
  const data = await getSanityClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true ${
      isProduction ? `&& !(_id in path('drafts.**'))` : ''
    }]{ "slug": slug, "id": _id  }`
  )
  return data
}

export async function getCollectionAnchorIds(doc) {
  const data = await getSanityClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true ${
      isProduction ? `&& !(_id in path('drafts.**'))` : ''
    }]{ "collections": collections }`
  )
  return data
}

// Fetch all our page redirects
export async function getAllRedirects() {
  const data = await getSanityClient().fetch(
    `*[_type == "redirect"]{ from, to }`
  )
  return data
}

export async function getAllBlogArticleSlugs(doc) {
  const data = await getSanityClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true ${
      isProduction ? `&& !(_id in path('drafts.**'))` : ''
    }]{ "slug": settings.slug.current, "categories": settings.categories[]->, "__i18n_lang": __i18n_lang }`
  )
  return data
}

export async function getAllBlogArticleSlugsIds(doc) {
  const data = await getSanityClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true ${
      isProduction ? `&& !(_id in path('drafts.**'))` : ''
    }]{ "slug": settings.slug.current, "id": _id  }`
  )
  return data
}

// Fetch a static page with our global data
export async function getStaticPage(pageData, locale) {
  const query = `
  {
    "page": ${pageData},
    "global": {
      "settings": ${getFormattedTypeQuery('settings')},
      "shopSettings": ${getFormattedTypeQuery(
        'shopSettings',
        locale,
        `{
          shippingModal,
          affirmModal,
          cartTextiles
        }`
      )},
      "pencilBanner": ${getFormattedTypeQuery('pencilBanner', locale)},
      "navigation": ${getFormattedTypeQuery('navigation', locale)},
      "footer": ${getFormattedTypeQuery('footer', locale)},
      "crossSellRankings": ${getFormattedTypeQuery(
        'crossSellRankings',
        undefined,
        undefined
      )},
      "specialOffers": ${getFormattedTypeQuery(
        'specialOffers',
        undefined,
        `
        {
          mysteryGift
        }
        `
      )}
    },
    "sales": ${getFormattedTypeQuery(
      'sales',
      undefined,
      `{
        _id,
        promoCode,
        lastChanceDays,
        navSaleCopy,
        "themeColor": themeColor.hex,
        "textColor": textColor,
        ...shopifySaleDetails {
          ...,
          "discountPercentageProducts": discountPercentageProducts[]->.store.id,
          "secondaryDiscountPercentageProducts": secondaryDiscountPercentageProducts[]->.store.id,
          "discountValueProducts": discountValueProducts[]->.store.id,
          "secondaryDiscountValueProducts": secondaryDiscountValueProducts[]->.store.id,
          "bmsmProducts": bmsmProducts[]->.store.id,
          "everythingOffProducts": everythingOffProducts[]->.store.id,
          productCardPillCopy,
          "levelUpProducts": levelUpProducts[]->.store.id
        },
        "content": ${getRefQuery(`^.translatedContent["${locale}"]._ref`)},
        "localizedContent": ${getRefQuery(`^.localizedContent._ref`)}
      }`,
      // Limit the sale previews to the last 30 days
      `dateTime(_updatedAt) > dateTime(now()) - 60*60*24*30`,
      true
    )},
    "references": {
      "products": ${getFormattedTypeQuery(
        'product',
        undefined,
        getProductProjection(locale),
        // Only pull in product records that have a display name
        `name != null`,
        true
      )},
      "productVariants": ${getFormattedTypeQuery(
        'productVariant',
        undefined,
        getVariantProjection(locale),
        undefined,
        true
      )},
      "modals": ${getFormattedTypeQuery(
        'customModal',
        locale,
        undefined,
        undefined,
        true
      )},
      "comparisonModals": ${getFormattedTypeQuery(
        'comparisonModal',
        locale,
        undefined,
        undefined,
        true
      )}
    }
  }
  `

  const data = await getSanityClient().fetch(query)
  return data
}

// HOT FIX: To reduce amount of page data being fetched from the queries, we are separating the blog data from the rest of the page data. This will allow us to fetch the blog data on the blog page only. This will be removed once we have a better solution.
export async function getStaticBlogPage(pageData, locale) {
  const query = `
  {
    "page": ${pageData},
    "global": {
      "settings": ${getFormattedTypeQuery('settings')},
      "shopSettings": ${getFormattedTypeQuery(
        'shopSettings',
        locale,
        `{
          shippingModal,
          affirmModal,
          cartTextiles
        }`
      )},
      "pencilBanner": ${getFormattedTypeQuery('pencilBanner', locale)},
      "navigation": ${getFormattedTypeQuery('navigation', locale)},
      "footer": ${getFormattedTypeQuery('footer', locale)},
      "crossSellRankings": ${getFormattedTypeQuery(
        'crossSellRankings',
        undefined,
        undefined
      )},
      "specialOffers": ${getFormattedTypeQuery(
        'specialOffers',
        undefined,
        `
        {
          mysteryGift
        }
        `
      )}
    },
    "sales": ${getFormattedTypeQuery(
      'sales',
      undefined,
      `{
        _id,
        promoCode,
        lastChanceDays,
        navSaleCopy,
        "themeColor": themeColor.hex,
        "textColor": textColor,
        ...shopifySaleDetails {
          ...,
          "discountPercentageProducts": discountPercentageProducts[]->.store.id,
          "secondaryDiscountPercentageProducts": secondaryDiscountPercentageProducts[]->.store.id,
          "discountValueProducts": discountValueProducts[]->.store.id,
          "secondaryDiscountValueProducts": secondaryDiscountValueProducts[]->.store.id,
          "bmsmProducts": bmsmProducts[]->.store.id,
          "everythingOffProducts": everythingOffProducts[]->.store.id,
          productCardPillCopy,
          "levelUpProducts": levelUpProducts[]->.store.id
        },
        "content": ${getRefQuery(`^.translatedContent["${locale}"]._ref`)},
        "localizedContent": ${getRefQuery(`^.localizedContent._ref`)}
      }`,
      undefined,
      true
    )},
    "blog": {
      "blogHomepage": ${getFormattedTypeQuery(
        'blogHomepage',
        locale,
        getFeaturedArticleProjection(),
        undefined
      )},
      "blogArticles": ${getFormattedTypeQuery(
        'blogArticle',
        locale,
        getArticleProjection(),
        undefined,
        true
      )},
      "blogNewsletter": ${getFormattedTypeQuery('blogNewsletter', locale)},
      "blogPrefooter": ${getFormattedTypeQuery(
        'blogPrefooter',
        locale,
        getPrefooterProjection(locale),
        undefined
      )},
      "blogCategories": ${getFormattedTypeQuery(
        'category',
        locale,
        getBlogCategoryProjection(),
        undefined,
        true
      )},
    },
    "references": {
      "products": ${getFormattedTypeQuery(
        'product',
        undefined,
        getProductProjection(locale),
        undefined,
        true
      )},
      "productVariants": ${getFormattedTypeQuery(
        'productVariant',
        undefined,
        getVariantProjection(locale),
        undefined,
        true
      )},
      "modals": ${getFormattedTypeQuery(
        'customModal',
        locale,
        undefined,
        undefined,
        true
      )},
      "blogCategories": ${getFormattedTypeQuery(
        'category',
        locale,
        getBlogCategoryProjection(locale),
        undefined,
        true
      )}
    }
  }
  `

  const data = await getSanityClient().fetch(query)
  return data
}

export { queries }
