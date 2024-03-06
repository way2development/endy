import { Cards } from 'phosphor-react'

export default {
  title: 'Article Cards',
  name: 'articleCards',
  type: 'object',
  icon: Cards,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Cards',
      name: 'articleCards',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          title: 'Cards',
          name: 'articleCard',
          icon: Cards,
          type: 'object',
          fields: [
            {
              title: 'Lifestyle Image',
              name: 'lifestyleImage',
              type: 'lifestyleImage',
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
              type: 'text',
              validation: (Rule) => Rule.required()
            },
            {
              title: 'URL',
              name: 'url',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              title: 'URL Label',
              name: 'urlLabel',
              type: 'string',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ]
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }
  ],
  preview: {
    select: {
      heading: 'heading'
    },
    prepare({ heading }) {
      return {
        title: 'Article Cards',
        subtitle: heading
      }
    }
  }
}
