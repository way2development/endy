import { ChatText, TextT } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Modal',
  name: 'customModal',
  type: 'document',
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  icon: ChatText,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'badgeImage'
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    },
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [
        {
          title: 'Rich Text Block',
          name: 'richTextBlock',
          icon: TextT,
          type: 'object',
          fields: [
            {
              title: 'Content',
              name: 'content',
              type: 'array',
              of: [customBlock('italic strong', '', 'bullet', 'link')]
            }
          ]
        },
        { type: 'badgeTile' }
      ]
    },
    {
      title: 'Button Label',
      name: 'buttonLabel',
      type: 'string'
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'array',
      of: [customBlock('italic strong', '', '', 'link')]
    }
  ]
}
