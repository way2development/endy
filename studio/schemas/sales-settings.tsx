import { Star } from 'phosphor-react'
import {
  bmsm,
  levelUpOffer,
  fixedAmount,
  percentageOff,
  bxgy,
  everythingOff
} from '../saleTypesSchemas'

const primarySaleFieldsets = [
  {
    name: 'primarySale',
    title: 'Primary Sale'
  },
  {
    name: 'fixedAmount',
    title: 'Fixed Amount',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.saleType !== 'Fixed Amount'
  },
  {
    name: 'percentage',
    title: 'Percentage Off',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.saleType !== 'Percentage'
  },
  {
    name: 'bxgy',
    title: 'Buy X Get Y',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.saleType !== 'Buy X Get Y'
  },
  {
    name: 'bmsm',
    title: 'Buy More Save More',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.saleType !== 'Bmsm'
  },
  {
    name: 'everythingOff',
    title: 'Everything Off',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.saleType !== 'Everything Off'
  },
  {
    name: 'levelUpOffer',
    title: 'Level Up Offer',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.saleType !== 'Level Up Offer'
  }
]

const secondarySaleFieldsets = [
  {
    name: 'secondarySale',
    title: 'Secondary Sale'
  },
  {
    name: 'secondaryFixedAmount',
    title: 'Fixed Amount',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.secondarySaleType !== 'Fixed Amount'
  },
  {
    name: 'secondaryPercentage',
    title: 'Percentage Off',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.secondarySaleType !== 'Percentage'
  },
  {
    name: 'secondaryBxgy',
    title: 'Buy X Get Y',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.secondarySaleType !== 'Buy X Get Y'
  },
  {
    name: 'secondaryBmsm',
    title: 'Buy More Save More',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.secondarySaleType !== 'Bmsm'
  },
  {
    name: 'secondaryEverythingOff',
    title: 'Everything Off',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.secondarySaleType !== 'Everything Off'
  },
  {
    name: 'secondaryLevelUpOffer',
    title: 'Level Up Offer',
    hidden: ({ document }: any) =>
      document?.shopifySaleDetails?.secondarySaleType !== 'Level Up Offer'
  }
]

const primarySaleFields = [
  {
    name: 'saleType',
    title: 'Sale Type',
    type: 'string',
    options: {
      layout: 'dropdown',
      list: [
        'Percentage',
        'Fixed Amount',
        'Buy X Get Y',
        'Bmsm',
        'Everything Off',
        'Level Up Offer'
      ]
    },
    fieldset: 'primarySale',
    validation: (Rule: any) => Rule.required()
  },
  ...bmsm.primarySale,
  ...levelUpOffer.primarySale,
  ...fixedAmount.primarySale,
  ...percentageOff.primarySale,
  ...bxgy.primarySale,
  ...everythingOff.primarySale
]

const secondarySaleFields = [
  {
    name: 'secondarySaleType',
    title: 'Sale Type',
    type: 'string',
    options: {
      layout: 'dropdown',
      list: [
        'Percentage',
        'Fixed Amount',
        'Buy X Get Y',
        'Bmsm',
        'Everything Off',
        'Level Up Offer'
      ]
    },
    fieldset: 'secondarySale'
  },
  ...bmsm.secondarySale,
  ...levelUpOffer.secondarySale,
  ...fixedAmount.secondarySale,
  ...percentageOff.secondarySale,
  ...bxgy.secondarySale,
  ...everythingOff.secondarySale
]

export default {
  title: 'Sales Setting',
  name: 'salesSetting',
  type: 'object',
  icon: Star,
  fieldsets: [
    {
      name: 'dates',
      title: 'Active Dates (Eastern time)',
      options: {
        columns: 2
      }
    },
    ...primarySaleFieldsets,
    ...secondarySaleFieldsets,
    {
      name: 'minReq',
      title: 'Minimum requirements',
      options: {
        columns: 2
      }
    }
  ],
  fields: [
    {
      title: 'Start Date',
      name: 'startDate',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD'
      },
      fieldset: 'dates',
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'End Date',
      name: 'endDate',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD'
      },
      fieldset: 'dates',
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'Minimum purchase amount',
      name: 'minPurchaseAmount',
      type: 'number',
      fieldset: 'minReq'
    },
    {
      title: 'Minimum quantity of items',
      name: 'minQuantity',
      type: 'number',
      fieldset: 'minReq'
    },
    {
      name: 'productCardPillCopy',
      title: 'Product Card pill copy',
      type: 'string'
    },
    ...primarySaleFields,
    ...secondarySaleFields
  ]
}
