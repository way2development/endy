// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationProduct from './annotations/product'

// Document types
import section from './documents/section'
import product from './documents/product'
import productVariant from './documents/productVariant'

// Module types
import hero from './modules/hero'
import dividerPhoto from './modules/divider-photo'
import newsletter from './modules/newsletter'

// Block content
import body from './blocks/body'

// Object types
import blockImage from './objects/blockImage'
import blockInlineProduct from './objects/blockInlineProduct'
import blockInlineProductMarginalia from './objects/blockInlineProductMarginalia'
import blockProduct from './objects/blockProduct'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import placeholderString from './objects/placeholderString'
import productOption from './objects/productOption'
import productWithVariant from './objects/productWithVariant'
import proxyString from './objects/proxyString'
import seoProduct from './objects/seo/product'
import seoSingleton from './objects/seo/singleton'
import seoStandard from './objects/seo/standard'
import shopifyProduct from './objects/shopifyProduct'
import shopifyProductVariant from './objects/shopifyProductVariant'

// Hull schemas
import navLink from './hull/nav-link'
import socialLink from './hull/social-link'
import horizontalRule from './hull/horizontal-rule'

import simplePortableText from './hull/portable-simple'
import complexPortableText from './hull/portable-complex'

import freeform from './hull/freeform'
import accordions from './hull/accordions'
import accordion from './hull/accordion'

import participant from './hull/participant'

import seo from './seo'
import shopSort from './hull/shop-sort'
import productCard from './hull/product-card'

// Custom endy schemas
import homePage from './home-page'
import page from './page'
import productDetailPage from './product-detail-page'
import homepageHero from './homepage-hero'
import link from './link'
import prefooter from './prefooter'
import valuePoints from './value-points'
import supportLinks from './support-links'
import sales from './sales'
import salesHomepageHero from './sales-homepage-hero'
import salesSettings from './sales-settings'
import mediaModule from './media-module'
import footer from './footer'
import lifestyleImage from './lifestyle-image'
import sellingCard from './selling-card'
import backgroundImage from './background-image'
import badgeImage from './badge-image'
import collectionsFeature from './collections-feature'
import saleCollectionsFeature from './sale-collections-feature'
import crossSellRankings from './cross-sell-rankings'
import pencilBanner from './pencil-banner'
import pencilBannerMessage from './pencil-banner-message'
import textModal from './text-modal'
import customModal from './custom-modal'
import comparisonModal from './comparison-modal'
import salesContent from './sales-content'
import badgeTile from './badge-tile'
import shopSettings from './shop-settings'
import collectionsPage from './collections-page'
import collectionsHero from './collections-hero'
import salesCollectionsHero from './sales-collections-hero'
import textiles from './textiles'
import awardsGrid from './awards-grid'
import mlpPage from './mlp-page'
import mlpHero from './mlp-hero'
import salesMlpHero from './sales-mlp-hero'
import salesLandingHero from './sales-landing-hero'
import salesLandingCollection from './sales-landing-collection'
import navigation from './navigation'
import accordionList from './accordionList'
import grid from './grid'
import table from './table'
import furnitureSizing from './furniture-sizing'
import settings from './settings'
import video from './video'
import lifestyleSizing from './lifestyle-sizing'
import featuredReviews from './featured-reviews'
import versusProduct from './versus-product'
import versusCompetitor from './versus-competitor'
import stackedMedia from './stacked-media'
import lastChance from './last-chance'
import exitModal from './exit-modal'
import bundleModal from './bundle-modal'
import calloutPost from './callout-post'
import badgeBanner from './badge-banner'
import productBreakdown from './product-breakdown'
import cartTextiles from './cart-textiles'
import salesSignUp from './sales-sign-up'
import termsAndConditions from './terms-and-conditions'
import specialOffers from './special-offers'
import author from './author'
import category from './category'
import blogArticle from './blog-article'
import blogHomepage from './blog-homepage'
import blogPrefooter from './blog-prefooter'
import blogNewsletter from './blog-newsletter'
import button from './button'
import quoteCard from './quote-card'
import articleCards from './article-cards'
import genericHero from './generic-hero'
import reviewsPage from './reviews-page'
import customerReviews from './customer-reviews'
import imageGrid from './image-grid'
import salesLandingPage from './sales-landing-page'
import genericSaleHero from './generic-sale-hero'
import secondarySaleProducts from './secondary-sale-products'
import salesEmailSignup from './sales-email-signup'
import locationModule from './location-module'

// Redirects
import redirect from './redirect'
import salesBanner from './sales-banner'

// Build the schemas and export to the Sanity Studio app
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // New Schemas
    homePage,
    homepageHero,
    link,
    prefooter,
    valuePoints,
    supportLinks,
    stackedMedia,
    sales,
    salesLandingPage,
    salesHomepageHero,
    salesSettings,
    mediaModule,
    locationModule,
    footer,
    lifestyleImage,
    sellingCard,
    quoteCard,
    backgroundImage,
    badgeImage,
    page,
    productDetailPage,
    collectionsFeature,
    saleCollectionsFeature,
    crossSellRankings,
    pencilBanner,
    pencilBannerMessage,
    textModal,
    salesContent,
    customModal,
    comparisonModal,
    badgeTile,
    shopSettings,
    collectionsPage,
    collectionsHero,
    salesCollectionsHero,
    textiles,
    awardsGrid,
    mlpPage,
    mlpHero,
    salesMlpHero,
    salesLandingHero,
    salesLandingCollection,
    navigation,
    accordionList,
    grid,
    table,
    furnitureSizing,
    settings,
    video,
    lifestyleSizing,
    featuredReviews,
    versusCompetitor,
    versusProduct,
    lastChance,
    exitModal,
    bundleModal,
    calloutPost,
    badgeBanner,
    productBreakdown,
    cartTextiles,
    salesSignUp,
    termsAndConditions,
    specialOffers,
    author,
    category,
    blogArticle,
    blogHomepage,
    blogPrefooter,
    blogNewsletter,
    button,
    articleCards,
    genericHero,
    reviewsPage,
    customerReviews,
    imageGrid,
    genericSaleHero,
    secondarySaleProducts,
    salesEmailSignup,
    salesBanner,

    // Redirects
    redirect,

    // Sanity Connect Schemas
    // Annotations
    annotationLinkEmail,
    annotationLinkExternal,
    annotationLinkInternal,
    annotationProduct,
    // Document types
    section,
    product,
    productVariant,
    // Module types
    hero,
    dividerPhoto,
    newsletter,
    // Block content
    body,
    // Objects
    blockImage,
    blockInlineProduct,
    blockInlineProductMarginalia,
    blockProduct,
    linkExternal,
    linkInternal,
    placeholderString,
    productOption,
    productWithVariant,
    proxyString,
    seoProduct,
    seoSingleton,
    seoStandard,
    shopifyProduct,
    shopifyProductVariant,

    // Hull Schemas
    // Objects
    navLink,
    socialLink,
    horizontalRule,
    simplePortableText,
    complexPortableText,
    freeform,
    accordions,
    accordion,
    participant,
    seo,
    shopSort,
    productCard
  ])
})
