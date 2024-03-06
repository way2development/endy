import { ImageProps } from '../Image'
import { ProductBadgeProps } from '../ProductBadges'
import { BadgeImageProps } from '../BadgeImage'
import { Locale } from '../../types/global-types'
import { CustomModal } from '../../components/CustomModal/CustomModal'
import { CustomerReviewsProps } from '../ShopModule/FeaturedReviews'
import { SaleProps } from '../../Interfaces/sales'
import { ColorProps } from '../../Interfaces/color'
import { NextRouter } from 'next/router'
import { AccordionItemProps } from '../ShopModule/AccordionList'
export interface VariantProps {
  id: number
  productId: number
  images?: {
    carouselImage: ImageProps[]
    crossSellImage: ImageProps
    upsellImage: ImageProps
    cartImage: ImageProps
    freeGiftImage?: ImageProps
    skuSelectorImage?: ImageProps
  }
  preorder?: PreorderProps
  name: string
  price: number
  isAvailable: boolean
  salePrice: number | null
  offSalePrice: number | null
  size: string
  color: string
  quantity: number
  sku: string
  title?: string
  compareAtPrice: number
  swatchesFlag: string
  bundleDescription?: string
  bundleOffers?: {
    _key: string
    quantity: number
    title: string
    variantImage: ImageProps
  }[]
}

export interface PreorderProps {
  isPreorder: boolean
  shippingDate?: string
  inventoryThreshold?: number
}

export interface SizeVariant {
  id: string
  mattressSize: string[]
  label: string
  isAvailable: boolean
}

export interface ColorVariant {
  color: string // hex
  id: string
  label: string
}

export interface ProductProps {
  id: number
  name: string
  /** Product Tagline */
  shortDescription: string
  /** Product detail */
  longDescription: HTMLElement
  variants: VariantProps[]
  images: {
    carouselImage: ImageProps[]
    collectionImage: ImageProps
    crossSellImage: ImageProps
    cartImage: ImageProps
    upsellImage: ImageProps
    freeGiftImage: ImageProps
  }
  sizeVariants: SizeVariant[]
  colorVariants: ColorVariant[]
  isNewProduct: boolean
  isPopularProduct: boolean
  isGiftIdea: boolean
  priceRange: {
    maxVariantPrice: number
    minVariantPrice: number
  }
  slug: string
  // TODO: Replace with actual data when added to Sanity
  shippingDate?: string
  productType: string
  title: string
  previewImageUrl: string
  hasQuantitySelector: boolean
  hasSkuSelector: boolean
  disableFreeShipping: boolean
  isBundleProduct: boolean
  modalCrossSells: ProductProps[]
}

export interface ReviewsProps {
  rating?: number
  totalReviews?: number
  isError: boolean
  locale: Locale
}

export interface UserLocationProps {
  province: string
  city: string
  postalFSA: string
}

export interface SelectedItem {
  id: number
  quantity: number
}

export interface ShopModuleProps {
  /** Determines if product is a pre-order */
  isPreorder: boolean
  /** Product data from Shopify */
  product: ProductProps
  /** Selected product size */
  selectedSize: string
  /** Selected product color */
  selectedColor?: string
  /** Reviews data from Yotpo & copy from CMS */
  reviews: ReviewsProps
  addItemToCart: (items: SelectedItem[]) => void
  // addItemToCart: (variantId: number[], quantity: number) => void
  /** An array of product badges */
  productBadges?: ProductBadgeProps[]
  /** Product carousel badge image */
  carouselBadgeImage?: BadgeImageProps
  carouselBadgeImageSecondary?: BadgeImageProps
  /** Selected Location */
  locale: Locale
  /** Modal with shipping information */
  shippingModal: React.ElementRef<typeof CustomModal>
  /** Modal with Affirm information */
  affirmModal: React.ElementRef<typeof CustomModal>
  /** Update query parameters and set selection to state */
  handleSelect: (
    sizeSelection: string,
    variantId: number,
    colorSelection?: string
  ) => void
  isMobileDevice: boolean
  /** Top 3 featured reviews chosen by the content team */
  featuredReviews?: CustomerReviewsProps[]
  /** Sale Data */
  sales?: SaleProps
  userLocation: UserLocationProps
  selectedVariant: VariantProps
  upsellProducts: { variants: VariantProps[]; products: ProductProps[] }
  freeGiftBanner: {
    heading: string
    url: string
  }
  additionalInfo: HTMLElement | null
  comparisonInfo: HTMLElement | null
  outboundLinks: { label: string; url: string }[]
  accordionList: { accordionItems: AccordionItemProps[] }
  showDropAHint: boolean
  sizeGuide: {
    content: JSX.Element | JSX.Element[]
    heading: string
  }
  router: NextRouter
  isCartError: boolean
  mysteryGift?: { product: ProductProps }
  mysteryGiftVariant?: VariantProps
  hasMysteryGift: boolean
  disableFreeShipping: boolean
  productTypeSelector: {
    enableProductTypeSelector: boolean
    productTypeLinks: { label: string; slug: string }[]
  }
}
