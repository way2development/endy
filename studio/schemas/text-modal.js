import { Star } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Text Modal',
  name: 'textModal',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Pill Label',
      name: 'pillLabel',
      type: 'string'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('italic strong', '', '', 'link')]
    },
    {
      title: 'Subheading',
      name: 'subheading',
      type: 'string'
    },
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [customBlock('italic strong', '', 'bullet', 'link')]
    },
    {
      title: 'Button Label',
      name: 'buttonLabel',
      type: 'string'
    }
  ]
}
