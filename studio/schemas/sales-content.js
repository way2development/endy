import { NotePencil } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'
import { COLLAPSE_FIELDS } from '../constants'

const primarySaleFields = [
  {
    name: 'displayName',
    title: 'Display Name',
    type: 'string',
    group: 'global',
    fieldset: 'primarySaleContent'
  },
  {
    name: 'shopModulePillLabel',
    title: 'Shop Module Pill Label',
    type: 'string',
    group: 'global',
    fieldset: 'primarySaleContent'
  },
  {
    name: 'productPillLabel',
    title: 'Product Pill Label',
    type: 'string',
    group: 'global',
    fieldset: 'primarySaleContent'
  },
  {
    name: 'countdownTimeLabel',
    title: 'Countdown Time Label',
    type: 'string',
    group: 'global',
    fieldset: 'primarySaleContent'
  }
]

const secondarySaleFields = [
  {
    name: 'secondaryShopModulePillLabel',
    title: 'Shop Module Pill Label',
    type: 'string',
    group: 'global',
    fieldset: 'secondarySaleContent'
  },
  {
    name: 'secondaryProductPillLabel',
    title: 'Product Pill Label',
    type: 'string',
    group: 'global',
    fieldset: 'secondarySaleContent'
  }
]

const productCard = {
  title: 'Product',
  name: 'productCard',
  type: 'object',
  groups: [{ title: 'Bundle Offer', name: 'bundleOffer' }],
  fields: [
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Image',
      name: 'image',
      type: 'lifestyleImage',
      ...COLLAPSE_FIELDS
    },
    {
      title: 'Bundle Card',
      name: 'bundleCard',
      type: 'object',
      group: 'bundleOffer',
      fields: [
        {
          title: 'Card Title',
          description: 'Displays like: "(Product Name) + (Card Title)"',
          name: 'title',
          type: 'string'
        },
        {
          title: 'Promo Pill',
          name: 'promoPill',
          type: 'string'
        },
        {
          title: 'CTA',
          name: 'cta',
          type: 'ctaLink'
        }
      ],
      ...COLLAPSE_FIELDS
    }
  ],
  preview: {
    select: {
      name: 'product.store.title',
      language: '__i18n_lang'
    },
    prepare({ name }) {
      return {
        title: name
      }
    }
  }
}

export default {
  title: 'Sales Content',
  name: 'salesContent',
  type: 'document',
  icon: NotePencil,
  groups: [
    { title: 'Global', name: 'global', default: true },
    { title: 'Heros', name: 'heros' },
    { title: 'Modals', name: 'modals' },
    { title: 'Shop Module', name: 'shopModule' },
    { title: 'Side Cart', name: 'sideCart' },
    { title: 'Collections Feature', name: 'collectionsFeature' },
    { title: 'Terms & Conditions', name: 'termsConditions' },
    { title: 'Pencil Banner', name: 'pencilBanner' },
    { title: 'Unlock Offer', name: 'unlockOffer' },
    { title: 'Modals', name: 'Modals' },
    { title: 'Sale Landing Page', name: 'saleLandingPage' },
    { title: 'Last Chance', name: 'lastChance' }
  ],
  fieldsets: [
    {
      name: 'primarySaleContent',
      title: 'Primary Sale',
      description: 'Fill in the following fields for the main/primary sale'
    },
    {
      name: 'secondarySaleContent',
      title: 'Secondary Sale',
      description: 'Fill in the following fields for the secondary sale'
    }
  ],
  fields: [
    ...primarySaleFields,
    ...secondarySaleFields,
    {
      name: 'pencilBannerMessage',
      title: 'Pencil Banner Message',
      type: 'pencilBannerMessage',
      group: 'pencilBanner'
    },
    {
      title: 'Shop Module Banner',
      name: 'shopModuleBanner',
      type: 'object',
      group: 'shopModule',
      fields: [
        {
          title: 'Content',
          name: 'content',
          type: 'array',
          of: [customBlock('strong', '', '', 'modal')]
        },
        {
          name: 'bannerBgColor',
          title: 'Banner Background Color',
          type: 'color',
          options: {
            disableAlpha: true
          }
        }
      ]
    },
    {
      title: 'Bundle Secondary Sale Callout',
      name: 'bundleSecondarySaleCallout',
      type: 'string',
      group: 'shopModule',
      description:
        'Displays below the checklist in the Bundle Free Gift Module.'
    },
    {
      title: 'Side Cart Banner',
      name: 'sideCartBanner',
      type: 'object',
      group: 'sideCart',
      fields: [
        {
          title: '1st Condition Copy',
          name: 'firstConditionCopy',
          type: 'array',
          of: [customBlock('strong', '', '', '')]
        },
        {
          title: '2nd Condition Copy',
          name: 'secondConditionCopy',
          type: 'array',
          of: [customBlock('strong', '', '', '')]
        },
        {
          title: '3rd Condition Copy',
          name: 'thirdConditionCopy',
          type: 'array',
          of: [customBlock('strong', '', '', '')]
        }
      ]
    },
    {
      title: 'Cart Cross Sell Pill Labels',
      name: 'cartCrossSellPillLabels',
      type: 'object',
      group: 'sideCart',
      fields: [
        {
          title: 'Primary Pill Label',
          description:
            'Use for primary sale items which share the same promo pill label.',
          name: 'primaryCartCrossSellPillLabel',
          type: 'string'
        },
        {
          title: 'Secondary Pill label',
          description:
            'Use for secondary sale items whose promo pill label differs from the primary field above (optional).',
          name: 'secondaryCartCrossSellPillLabel',
          type: 'string'
        }
      ]
    },
    {
      name: 'heros',
      title: 'Heros',
      type: 'object',
      group: 'heros',
      groups: [
        { title: 'Home Page', name: 'homePage', default: true },
        { title: 'Collections Page', name: 'collectionsPage' },
        { title: 'MLP Page', name: 'mlpPage' }
      ],
      fields: [
        {
          name: 'homePageHero',
          title: 'Home Page Hero',
          type: 'salesHomepageHero',
          group: 'homePage'
        },
        {
          name: 'collectionsHero',
          title: 'Collections Hero',
          type: 'salesCollectionsHero',
          group: 'collectionsPage'
        },
        {
          name: 'mlpHero',
          title: 'MLP Hero',
          type: 'salesMlpHero',
          group: 'mlpPage'
        }
      ]
    },
    {
      name: 'collectionsFeature',
      title: 'Collections Feature',
      type: 'saleCollectionsFeature',
      group: 'collectionsFeature'
    },
    {
      name: 'termsConditions',
      title: 'Terms & Conditions',
      type: 'textModal',
      group: 'termsConditions'
    },
    {
      title: 'Unlock Offer',
      name: 'unlockOffer',
      type: 'object',
      group: 'unlockOffer',
      fields: [
        { title: 'Desktop Heading', name: 'desktopHeading', type: 'string' },
        {
          title: 'Mobile Heading (Step 1)',
          name: 'mobileHeading',
          type: 'string'
        },
        { title: 'Subcopy', name: 'subcopy', type: 'text' },
        { title: 'Disclaimer', name: 'disclaimer', type: 'text' }
      ]
    },
    {
      name: 'salesLandingPage',
      title: 'Sales Landing Page',
      type: 'object',
      group: 'saleLandingPage',
      groups: [
        { title: 'Generic Sale Hero', name: 'salesLandingHero', default: true },
        { title: 'Sales Banner', name: 'salesLandingBanner' },
        { title: 'Sale Collection Cards', name: 'saleLandingProductCards' },
        { title: 'Sales Email Sign Up', name: 'salesLandingSignUp' },
        { title: 'Secondary Sale', name: 'secondarySaleProducts' }
      ],
      fields: [
        {
          name: 'salesLandingHero',
          title: 'Generic Sale Hero',
          type: 'genericSaleHero',
          group: 'salesLandingHero'
        },
        {
          name: 'salesLandingBanner',
          title: 'Sales Banner',
          type: 'salesbanner',
          group: 'salesLandingBanner'
        },
        {
          title: 'Sale Collection Cards',
          name: 'saleLandingProductCards',
          group: 'saleLandingProductCards',
          type: 'array',
          of: [productCard]
        },
        {
          title: 'Sales One Column Image',
          description:
            'Lifestyle image used to fill the grid in case there are not enough collection cards.',
          name: 'salesLandingOneColumnImage',
          type: 'lifestyleImage',
          group: 'saleLandingProductCards',
          ...COLLAPSE_FIELDS
        },
        {
          title: 'Sale Collection CTA',
          name: 'saleLandingCollectionCTA',
          description:
            'CTA that appears below product cards. Displays when there are more than 6 products in the sale collection.',
          type: 'string',
          group: 'saleLandingProductCards'
        },
        {
          name: 'salesLandingSignUp',
          title: 'Sales Email Sign Up',
          type: 'salesEmailSignup',
          group: 'salesLandingSignUp',
          description:
            'Sign up module will only render when Sale Collection Cards content is filled out.'
        },
        {
          name: 'secondarySaleProducts',
          title: 'Secondary Sale',
          type: 'secondarySaleProducts',
          group: 'secondarySaleProducts',
          description:
            'Secondary sale product will only render when sale is on.'
        }
      ]
    },
    {
      title: 'Modals',
      name: 'modals',
      type: 'object',
      group: 'modals',
      groups: [
        { title: 'Exit Modal', name: 'exitModal', default: true },
        { title: 'Bundle Modal', name: 'bundleModal' }
      ],
      fields: [
        {
          title: 'Exit Modal',
          name: 'exitModal',
          type: 'exitModal',
          group: 'exitModal'
        },
        {
          title: 'Bundle Modal',
          name: 'bundleModal',
          type: 'bundleModal',
          group: 'bundleModal'
        }
      ]
    },
    {
      name: 'lastChance',
      title: 'Last Chance',
      type: 'lastChance',
      group: 'lastChance'
    }
  ],
  preview: {
    select: {
      displayName: 'displayName'
    },
    prepare({ displayName }) {
      return {
        subtitle: 'Sales Content',
        title: displayName || ''
      }
    }
  }
}
