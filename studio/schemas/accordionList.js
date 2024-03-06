import { CaretCircleDown, TextT } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

const accordionItem = {
  title: 'Accordion Item',
  name: 'accordionItem',
  type: 'object',
  fields: [
    {
      title: 'Anchor URL',
      name: 'anchorUrl',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Content',
      name: 'content',
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
              of: [customBlock('italic strong', '', 'bullet', 'link modal')]
            }
          ]
        },
        { type: 'badgeTile' },
        { type: 'grid' }
      ]
    }
  ]
}

export default {
  title: 'Accordion List',
  name: 'accordionList',
  type: 'object',
  icon: CaretCircleDown,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Accordion Items',
      name: 'accordionItems',
      type: 'array',
      of: [accordionItem]
    }
  ],
  preview: {
    select: {
      heading: 'heading'
    },
    prepare({ heading }) {
      return {
        title: 'Accordion',
        subtitle: heading
      }
    }
  }
}
