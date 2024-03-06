import { COLLAPSE_FIELDS } from '../constants'
import customBlock from '../lib/custom-block.js'
import { SquareHalf } from 'phosphor-react'

export default {
  title: 'Selling Card',
  name: 'sellingCard',
  type: 'object',
  icon: SquareHalf,
  groups: [
    { title: 'Lifestyle Background', name: 'lifestyleGroup' },
    { title: 'Background', name: 'backgroundGroup' },
    { title: 'Copy', name: 'copyGroup' }
  ],
  fields: [
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage',
      ...COLLAPSE_FIELDS,
      group: 'lifestyleGroup'
    },
    {
      title: 'Variant',
      name: 'variant',
      type: 'string',
      options: {
        list: ['Left', 'Right']
      },
      initialValue: 'Left',
      description:
        'Determines whether you want the lifestyle image to appear on the left or right-hand side.',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage',
      ...COLLAPSE_FIELDS,
      group: 'backgroundGroup'
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      },
      group: 'backgroundGroup'
    },
    {
      title: 'Copy',
      name: 'copy',
      type: 'array',
      of: [
        customBlock('italic strong', '', 'bullet number', '', 'ctaLink'),
        {
          title: 'CTA',
          name: 'cta',
          type: 'ctaLink'
        }
      ],
      group: 'copyGroup',
      ...COLLAPSE_FIELDS,
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      asset: 'asset',
      alt: 'alt'
    },
    prepare({ alt, asset }) {
      return {
        title: 'Selling Card',
        subtitle: alt,
        media: asset
      }
    }
  }
}
