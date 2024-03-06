import { Star } from 'phosphor-react'
import { COLLAPSE_FIELDS } from '../constants'
import customBlock from '../lib/custom-block.js'

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
      title: 'Product Card pill copy',
      name: 'productCardPillCopy',
      type: 'string'
    },
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
  title: 'Secondary Sale Products',
  name: 'secondarySaleProducts',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('italic strong', '', 'bullet', 'link modal')]
    },
    {
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'color'
    },
    {
      title: 'Sale Collection Cards',
      name: 'saleLandingProductCards',
      type: 'array',
      of: [productCard]
    }
  ]
}
