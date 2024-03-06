import { NewspaperClipping, TextT } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Badge Tile',
  name: 'badgeTile',
  type: 'object',
  icon: NewspaperClipping,
  fields: [
    {
      title: 'Badge Image',
      name: 'badgeImage',
      type: 'badgeImage',
      validation: (Rule) => Rule.required()
    },
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
      of: [customBlock('italic strong', '', 'bullet', 'link modal')],
      validation: (Rule) => Rule.required()
    }
  ]
}
