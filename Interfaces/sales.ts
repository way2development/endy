import React from 'react'

import { BackgroundImageProps } from '../components/BackgroundImage'
import { ImageProps } from '../components/Image'
import { BadgeImageProps } from '../components/BadgeImage'
import { CtaLink } from '../components/CtaLink'
import { TextModal, TextModalProps } from '../components/TextModal'
import { CustomModal } from '../components/CustomModal'
import { ProductProps } from 'components/ShopModule/ShopModule.types'
import { ColorProps } from './color'

interface SaleCollectionsFeatureProps {
  /** Main heading */
  heading: string
  /** Subcopy to add below heading (optional) */
  subcopy?: string
  /** Microcopy to add as the last line (optional) */
  microcopy?: string
  /** Lifestyle assets for each breakpoint */
  lifestyleImage: ImageProps
  /** Background Image Assets */
  backgroundImage: BackgroundImageProps
  /** Background color */
  backgroundColor: ColorProps
  /** CTA label */
  cta: React.ElementRef<typeof CtaLink>
  /** Sale pill copy */
  pillLabel: string
}

interface SalesCollectionsHeroProps {
  heading: string
  subcopy?: string
  microcopy?: string
  backgroundImage: BackgroundImageProps
  lifestyleImage: ImageProps
  pillLabel: string
}

interface SalesMlpHeroProps {
  heading: string
  subcopy?: string
  microcopy?: string
  backgroundImage: BackgroundImageProps
  lifestyleImage: ImageProps
  badgeImage?: BadgeImageProps
  badgeVariant?: string
  subcopyTextImage?: ImageProps
  pillLabel: string
  cta: React.ElementRef<typeof CtaLink>
}

interface SideCartBannerProps {
  firstConditionCopy: string
  secondConditionCopy: string
  thirdConditionCopy: string
}

interface SalesPencilBannerMessageProps {
  pencilBannerSaleName: string
  heading: string
  url?: string
  modal?: React.ElementRef<typeof CustomModal>
}

interface ExitModalProps {
  pillLabel: string
  heading: string
  subcopy: string
  buttonLabel: string
  lifestyleImage: ImageProps
}

interface BundleModalProps {
  heading: string
  subcopy: string
  buttonLabel: string
  bundleItemList: {
    product: ProductProps
    productDescription: string
    lifestyleImage: ImageProps
  }[]
}

type SaleType =
  | 'Percentage'
  | 'Fixed Amount'
  | 'Buy X Get Y'
  | 'Bmsm'
  | 'Everything Off'
  | 'Level Up Offer'

export interface SaleContentProps {
  displayName: string
  collectionsFeature: SaleCollectionsFeatureProps
  pencilBannerMessage: SalesPencilBannerMessageProps
  countdownTimeLabel: string
  productPillLabel: string
  shopModulePillLabel: string
  secondaryProductPillLabel: string
  secondaryShopModulePillLabel: string
  termsConditions: TextModalProps
  heros: {
    homePageHero: { cta: { label: string | undefined } }
    collectionsHero: SalesCollectionsHeroProps
    mlpHero: SalesMlpHeroProps
  }
  unlockOffer: {
    desktopHeading: string
    mobileHeading: string
    subcopy: string
    disclaimer: string
  }
  modals: {
    exitModal: ExitModalProps
    bundleModal: BundleModalProps
  }
  sideCartBanner: SideCartBannerProps
  saleLandingProductCards: ProductProps[]
  cartCrossSellPillLabels: {
    primaryCartCrossSellPillLabel: string
    secondaryCartCrossSellPillLabel: string
  }
  _updatedAt: string
}

export interface LastChanceProps {
  homepageHero: {
    pillLabel: string
    badgeImage: BadgeImageProps
  }
  mlpHero: {
    pillLabel: string
    badgeImage: BadgeImageProps
  }
  collections: {
    heroPillLabel: string
    prefooterPillLabel: string
  }
  pencilBannerMessage: SalesPencilBannerMessageProps
  exitModal: ExitModalProps
  salesLandingPage: { salesBannerPill: string }
}

export interface SaleProps extends SaleContentProps {
  _id: string
  themeColor: string
  textColor: string
  promoCode: string
  isLastChance: boolean
  lastChanceDays: number
  minPurchaseAmount?: number
  minQuantity?: number

  saleType: SaleType
  secondarySaleType?: SaleType

  discountPercentage?: number
  secondaryDiscountPercentage?: number

  discountPercentageProducts?: number[]
  secondaryDiscountPercentageProducts?: number[]

  discountValue?: number
  secondaryDiscountValue?: number

  discountValueProducts?: number[]
  secondaryDiscountValueProducts?: number[]

  startDate: Date
  endDate: Date
  termsConditions: React.ElementRef<typeof TextModal>
  // content and localizedContent only exist on the raw sales data that comes back from Sanity
  content?: SaleContentProps
  localizedContent?: SaleContentProps
  lastChance: LastChanceProps

  bxgyProductData?: ProductProps[]
  secondaryBxgyProductData?: ProductProps[]

  customerGetsProducts?: ProductProps
  secondaryCustomerGetsProducts?: ProductProps

  customerGetsQuantity?: number
  secondaryCustomerGetsQuantity?: number

  maxUsesPerOrder?: number
  secondaryMaxUsesPerOrder?: number

  secondPromoCode?: string
  secondarySecondPromoCode?: string

  firstDiscountThreshold?: number
  secondaryFirstDiscountThreshold?: number

  firstDiscount?: number
  secondaryFirstDiscount?: number

  secondDiscountThreshold?: number
  secondarySecondDiscountThreshold?: number

  secondDiscount: number
  secondarySecondDiscount: number

  bmsmProducts?: number[]
  secondaryBmsmProducts?: number[]

  shopModuleBanner?: {
    bannerBgColor: { hex: string }
    content: HTMLElement
  }
  everythingOffProducts: number[]
  secondaryEverythingOffProducts: number[]
  navSaleCopy?: {
    [key: string]: string
  }

  promoLabel?: string

  salesLandingBanner: { pillLabel: string }

  // Level Up Offer Props
  discountValueForLevelUp: 'Percentage' | 'Fixed Amount'
  firstDiscountForLevelUp: number
  secondDiscountForLevelUp: number
  secondPromoCodeForLevelUp: string
  discountThresholdForLevelUp: number
  levelUpProducts: number[]
}
