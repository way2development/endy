import { ChatCircleDots } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Pencil Banner Message',
  name: 'pencilBannerMessage',
  icon: ChatCircleDots,
  type: 'object',
  fields: [
    {
      name: 'pencilBannerSaleName',
      title: 'Pencil Banner Sale Name',
      description:
        'Copy will render as a prefix before the last chance countdown component.',
      type: 'string'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [customBlock('italic strong underline')]
    },
    {
      title: 'URL',
      name: 'url',
      type: 'string'
    },
    {
      title: 'Modal',
      name: 'modal',
      type: 'reference',
      to: [{ type: 'customModal' }],
      options: {
        disableNew: true
      }
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare({ title }) {
      const block = (title || []).find((block) => block._type === 'richText')
      return {
        title: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'No title'
      }
    }
  }
}
