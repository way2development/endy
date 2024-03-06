import { Star } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Sales Banner',
  name: 'salesbanner',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Bundles',
      name: 'bundles',
      type: 'object',
      fields: [
        {
          title: 'Is Bundle Sale',
          name: 'isBundleSale',
          type: 'boolean',
          initialValue: false,
          description:
            'If sale offer includes bundle products, check this box to display bundle sale banner (hides lifestyle image on mobile).'
        },
        {
          title: 'Total Bundle Value',
          name: 'totalBundleValue',
          type: 'number',
          hidden: ({ parent }) => !parent?.isBundleSale
        }
      ]
    },
    {
      name: 'bgColor',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Pill Label',
      name: 'pillLabel',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('strong italic', '', 'checklist')]
    },
    {
      title: 'Subcopy Image',
      name: 'subcopyImage',
      type: 'lifestyleImage',
      description: 'Image to display in subcopy section'
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'array',
      of: [customBlock('strong italic', '', '', 'modal')]
    },
    {
      title: 'Badge Image',
      name: 'badgeImage',
      type: 'badgeImage'
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage',
      validation: (Rule) => Rule.required()
    }
  ]
}
