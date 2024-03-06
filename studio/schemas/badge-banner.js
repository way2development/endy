import { CircleWavy } from 'phosphor-react'

import customBlock from '../lib/custom-block.js'

export default {
  title: 'Badge Banner',
  name: 'badgeBanner',
  type: 'object',
  icon: CircleWavy,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [customBlock('strong italic')],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Badge Image',
      name: 'badgeImage',
      type: 'badgeImage',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('strong italic')]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Badge Banner'
      }
    }
  }
}
