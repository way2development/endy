import { Medal } from 'phosphor-react'

export default {
  title: 'Awards Grid',
  name: 'awardsGrid',
  type: 'object',
  icon: Medal,
  fields: [
    {
      title: 'Awards',
      name: 'awards',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          title: 'Award',
          name: 'award',
          icon: Medal,
          type: 'object',
          fields: [
            {
              title: 'Show On Mobile',
              name: 'showOnMobile',
              type: 'boolean',
              initialValue: false
            },
            {
              title: 'Badge Image',
              name: 'badgeImage',
              type: 'badgeImage'
            },
            {
              title: 'Tooltip Text',
              name: 'tooltipText',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'badgeImage.alt'
            },
            prepare({ title }) {
              return {
                title
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Awards Grid'
      }
    }
  }
}
