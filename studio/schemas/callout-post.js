import { Quotes } from 'phosphor-react'

import customBlock from '../lib/custom-block.js'

export default {
  title: 'Callout Post',
  name: 'calloutPost',
  type: 'object',
  icon: Quotes,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [customBlock('strong italic')],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'array',
      of: [customBlock('strong italic')]
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink'
    },
    {
      title: 'Background Image',
      description: 'Full width background image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    },
    {
      name: 'backgroundColor',
      description: 'If there is no background image, select a background color',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Badge Image',
      description: 'Add logo',
      name: 'badgeImage',
      type: 'badgeImage'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Callout Post'
      }
    }
  }
}
