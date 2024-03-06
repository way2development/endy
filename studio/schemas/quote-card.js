import { COLLAPSE_FIELDS } from '../constants'
import customBlock from '../lib/custom-block.js'
import { Quotes } from 'phosphor-react'

export default {
  title: 'Quote Card',
  name: 'quoteCard',
  type: 'object',
  icon: Quotes,
  groups: [
    { title: 'Background', name: 'backgroundGroup' },
    { title: 'Quote', name: 'quoteGroup' }
  ],
  fields: [
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage',
      ...COLLAPSE_FIELDS,
      group: 'backgroundGroup'
    },
    {
      name: 'backgroundColor',
      description: 'If there is no background image, select a background color',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      },
      group: 'backgroundGroup'
    },
    {
      title: 'Quote',
      name: 'quote',
      type: 'text',
      group: 'quoteGroup',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Author',
      name: 'author',
      type: 'array',
      of: [customBlock('italic strong', 'caption', '', 'link')],
      group: 'quoteGroup'
    }
  ],
  preview: {
    select: {
      asset: 'asset',
      alt: 'alt'
    },
    prepare({ alt, asset }) {
      return {
        title: 'Quote Card',
        subtitle: alt,
        media: asset
      }
    }
  }
}
