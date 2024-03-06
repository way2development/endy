import { Cube, Barcode, Stack } from 'phosphor-react'

const productCard = {
  title: 'Product',
  name: 'productCard',
  icon: Barcode,
  type: 'object',
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
      type: 'lifestyleImage'
    },
    {
      name: 'saleType',
      title: 'Sale Type',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['Percentage', 'Fixed Amount']
      }
    },
    {
      title: 'Percentage',
      name: 'discountPercentage',
      type: 'number',
      hidden: ({ parent }) => parent?.saleType !== 'Percentage'
    },
    {
      title: 'Fixed Amount',
      name: 'fixedAmount',
      type: 'number',
      hidden: ({ parent }) => parent?.saleType !== 'Fixed Amount'
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
  title: 'Sale Landing Collection',
  name: 'salesLandingCollection',
  type: 'object',
  icon: Cube,
  fields: [
    {
      title: 'Use Global Sales',
      name: 'useGlobalSales',
      type: 'boolean',
      description:
        'Toggle to use active sale. Otherwise, products cards will use sale type and amount defined below.'
    },
    {
      title: 'Sale Start Date',
      name: 'saleStartDate',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD'
      }
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'string'
    },
    {
      title: 'Sale Color',
      name: 'saleColor',
      type: 'color',
      options: {
        disableAlpha: true
      },
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Promo Label',
      name: 'promoLabel',
      type: 'string'
    },
    {
      name: 'saleType',
      title: 'Sale Type',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['Percentage', 'Fixed Amount']
      },
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Percentage',
      name: 'discountPercentage',
      type: 'number',
      hidden: ({ parent }) => parent?.saleType !== 'Percentage'
    },
    {
      title: 'Fixed Amount',
      name: 'fixedAmount',
      type: 'number',
      hidden: ({ parent }) => parent?.saleType !== 'Fixed Amount'
    },
    {
      title: 'Product Cards',
      name: 'productCards',
      type: 'array',
      of: [productCard]
    }
  ],
  preview: {
    prepare() {
      return {
        title: `Sale Landing Collection`
      }
    }
  }
}
