import customBlock from '../lib/custom-block.js'
import { Barcode } from 'phosphor-react'

const bundleItem = {
  title: 'BundleCard',
  name: 'bundleCard',
  type: 'object',
  icon: Barcode,
  fields: [
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Product Description',
      name: 'productDescription',
      type: 'array',
      of: [customBlock('italic strong', '', 'bullet', 'link')]
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage',
      validation: (Rule) => Rule.required()
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
  title: 'Bundle Modal',
  name: 'bundleModal',
  type: 'object',
  fields: [
    { title: 'Heading', name: 'heading', type: 'string' },
    { title: 'Subcopy', name: 'subcopy', type: 'string' },
    {
      title: 'Button Label',
      name: 'buttonLabel',
      type: 'string',
      description: 'CTA to close modal'
    },
    {
      title: 'Bundle Item List',
      name: 'bundleItemList',
      type: 'array',
      of: [bundleItem]
    }
  ]
}
