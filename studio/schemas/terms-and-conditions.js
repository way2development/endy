import { FileText } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Terms and Conditions',
  name: 'termsAndConditions',
  type: 'object',
  icon: FileText,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [customBlock('strong italic')],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [customBlock('italic strong', '', 'bullet', 'link')]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Terms and Conditions'
      }
    }
  }
}
