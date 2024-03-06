import { Tag } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Sale Collections Feature',
  name: 'saleCollectionsFeature',
  type: 'object',
  icon: Tag,
  fields: [
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Pill Label',
      name: 'pillLabel',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [customBlock('strong italic')],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('strong italic')]
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'array',
      of: [customBlock('strong italic', '', '', 'modal')]
    }
  ]
}
