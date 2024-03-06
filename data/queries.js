import { sortTypes } from '../studio/schemas/hull/shop-sort'

const isProduction =
  process.env.NODE_ENV === 'production' && process.env.BUILD_ENV !== 'draft'

export const getFormattedTypeQuery = (
  type,
  localeFilter,
  projections = '',
  additionalFilters,
  returnAll = false
) =>
  `*[_type == "${type}"${
    localeFilter ? ` && __i18n_lang == "${localeFilter}"` : ''
  }${isProduction ? ` && !(_id in path('drafts.**'))` : ''}${
    additionalFilters ? ` && ${additionalFilters}` : ''
  }] | order(_updatedAt desc)[${returnAll ? '' : '0'}]${projections}`

export const getRefQuery = (refId) => `
coalesce(
  ${isProduction ? '' : `*[_id == "drafts." + ${refId}][0],`}
  *[_id == ${refId}][0]
)
`

export const getProductProjection = (locale) => `
{
  _id,
  isNewProduct,
  isPopularProduct,
  isGiftIdea,
  isBundleProduct,
  hasQuantitySelector,
  hasSkuSelector,
  disableFreeShipping,
  "images": {
    carouselImage,
    collectionImage,
    crossSellImage,
    freeGiftImage,
    cartImage,
    upsellImage
  },
  sizeVariants[] {
    id,
    "label": translatedLabel["${locale}"],
    "mattressSize": @.mattressSize[].value
  },
  colorVariants[] {
    id,
    "color": color.hex,
    "label": translatedLabel["${locale}"]
  },
  modalCrossSells[],
  ...store {
    ...,
    variants[]
  },
  "name": name["${locale}"],
  "shortDescription": shortDescription["${locale}"],
  "longDescription": longDescription["${locale}"],
  "slug": ${getFormattedTypeQuery(
    'productDetailPage',
    locale,
    '.slug',
    '^._id match ("**" + product._ref)'
  )}
}
`
export const getVariantProjection = (locale) => `
{
  _id,
  ...store {
    id,
    "size": option1,
    "color": option2,
    price,
    productId,
    sku,
    title,
    compareAtPrice
  },
  preorder,
  swatchesFlag,
  salePrice,
  offSalePrice,
  "images": {
    carouselImage,
    crossSellImage,
    upsellImage,
    cartImage,
    freeGiftImage,
    skuSelectorImage
  },
  "bundleDescription": bundleDescription["${locale}"],
  bundleOffers[] {
    _key,
    quantity,
    "title": title["${locale}"],
    variantImage
  }
}
`

export const getPrefooterProjection = (locale) => `
{
  title,
  primaryProduct {
    product->${getProductProjection(locale)},
    prefooterImage
  },
  secondaryProduct {
    product->${getProductProjection(locale)},
    prefooterImage
  }
}
`

export const getArticleProjection = () => `
{
  _id,
  _updatedAt,
  content,
  hero,
  settings {
    "author": author->name,
    heading,
    publishedAt,
    _updatedAt,
    slug,
    categories[]->
  },
  readMore {
    ...,
    moreArticles[]->
  },
  seo,
  prefooter ${getPrefooterProjection()}
}
`

export const getFeaturedArticleProjection = () => `
 {
  header,
  featuredArticle {
    article[]->${getArticleProjection()},
    cta,
  }
 }
`

export const getBlogCategoryProjection = () => `
  {
    _id,
    slug,
    title
  }
`
// Create our sorting fallback titles from Sanity
const sortFallbacks = sortTypes
  .map((type) => `type == "${type.value}" => "${type.title}"`)
  .join(',')

// Construct our "home" and "error" page GROQ
export const shopID = `*[_type=="generalSettings"][0].shop->_id`
export const errorID = `*[_type=="generalSettings"][0].error->_id`

// Construct our "image meta" GROQ
export const imageMeta = `
  "alt": coalesce(alt, asset->altText),
  asset,
  crop,
  customRatio,
  hotspot,
  "id": asset->assetId,
  "type": asset->mimeType,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "lqip": asset->metadata.lqip
`

// Construct our "portable text content" GROQ
export const ptContent = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
      "page":@.page->{}
    }
  },
  _type == "photo" => {
    ${imageMeta}
  }
`

// Construct our "product" GROQ
export const product = `
  {
    "publishDate": coalesce(publishDate, _createdAt),
    "slug": slug.current,
    "id": productID,
    title,
    price,
    comparePrice,
    description,
    "photos": {
      "main": galleryPhotos[]{
        forOption,
        photos[]{
          ${imageMeta}
        }
      },
      "listing": listingPhotos[]{
        forOption,
        "default": listingPhoto{
          ${imageMeta}
        },
        "hover": listingPhotoHover{
          ${imageMeta}
        }
      },
    },
    inStock,
    lowStock,
    useGallery,
    surfaceOption,
    options[]{
      name,
      position,
      values[]
    },
    optionSettings[]{
      forOption,
      "color": color->color,
    },
    "variants": *[_type == "productVariant" && productID == ^.productID && wasDeleted != true && isDraft != true]{
      "id": variantID,
      title,
      price,
      comparePrice,
      inStock,
      lowStock,
      options[]{
        name,
        position,
        value
      },
      seo
    },
    "klaviyoAccountID": *[_type == "generalSettings"][0].klaviyoAccountID,
    "filters": filters[]{
      "slug": filter->slug.current,
      forOption
    }
  }
`

// Construct our "blocks" GROQ
export const blocks = `
  _type == 'freeform' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    textAlign,
    maxWidth
  },
  _type == 'accordions' => {
    _type,
    _key,
    items[]{
      "id": _key,
      title,
      content[]{
        ${ptContent}
      }
    }
  },
  _type == 'productCard' => {
    _type,
    _key,
    product->${product}
  },
  _type == 'defaultCollectionProducts' => {
    _type,
    _key,
    product->${product}
  }
`

// Construct our content "modules" GROQ
export const modules = `
  _type == 'grid' => {
    _type,
    _key,
    size,
    columns[]{
      sizes[]{
        breakpoint,
        width,
        justify,
        align,
        start
      },
      blocks[]{
        ${blocks}
      }
    }
  },
  _type == 'hero' => {
    _type,
    _key,
    content[]{
      ${ptContent}
    },
    photos{
      ...,
      mobilePhoto{
        ${imageMeta}
      },
      desktopPhoto{
        ${imageMeta}
      }
    },
  },
  _type == 'dividerPhoto' => {
    _type,
    _key,
    photo{
      ${imageMeta}
    }
  },
  _type == 'productHero' => {
    _type,
    _key,
  },
  _type == 'collectionGrid' => {
    _type,
    _key,
    "title": ^.title,
    "paginationLimit": *[_type == "shopSettings"][0].paginationLimit,
    "filter": *[_type == "shopSettings"][0].filter{
      isActive,
      groups[]{
        "id": _key,
        title,
        "slug": slug.current,
        display,
        options[]->{
          type,
          title,
          "slug": slug.current,
          "color": color->color
        }
      }
    },
    "sort": *[_type == "shopSettings"][0].sort{
      isActive,
      options[]{
        "slug": type,
        "title": coalesce(title, select(
          ${sortFallbacks}
        ))
      }
    },
    "noFilterResults": *[_type == "shopSettings"][0].noFilterResults[]{
      ${ptContent}
    }
  }
`
