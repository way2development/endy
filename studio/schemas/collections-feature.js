import { Sparkle } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Collections Feature',
  name: 'collectionsFeature',
  type: 'object',
  icon: Sparkle,
  fields: [
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage'
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
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [customBlock('strong italic')],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink'
    }
  ]
}
