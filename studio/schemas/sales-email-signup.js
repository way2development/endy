import { NewspaperClipping } from 'phosphor-react'

import customBlock from '../lib/custom-block.js'

export default {
  title: 'Sale Email Sign Up',
  name: 'salesEmailSignup',
  type: 'object',
  icon: NewspaperClipping,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [customBlock('italic strong')]
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('italic strong', '', 'bullet', 'link modal')]
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'array',
      of: [customBlock('italic strong', '', 'bullet', 'link modal')]
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage'
    }
  ]
}
