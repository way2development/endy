import { House, Link } from 'phosphor-react'
import { COLLAPSE_FIELDS } from '../constants'

export default {
  title: 'Homepage',
  name: 'blogHomepage',
  type: 'document',
  icon: House,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  groups: [
    { title: 'Header', name: 'headerGroup' },
    { title: 'Featured', name: 'featuredGroup' }
  ],
  fields: [
    {
      title: 'Header',
      name: 'header',
      type: 'object',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',

          validation: (Rule) => Rule.required()
        },
        {
          title: 'Navigation',
          name: 'navigation',
          type: 'array',
          of: [
            {
              title: 'Nav Link',
              name: 'group',
              type: 'object',
              icon: Link,
              fields: [
                {
                  title: 'Label',
                  name: 'label',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                },
                {
                  title: 'Url',
                  name: 'url',
                  description: 'Top level link with no dropdown.',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                }
              ]
            }
          ],
          validation: (Rule) => Rule.required().min(1)
        }
      ],
      ...COLLAPSE_FIELDS,
      group: 'headerGroup'
    },
    {
      title: 'Featured Article',
      name: 'featuredArticle',
      type: 'object',
      fields: [
        {
          title: 'Article',
          name: 'article',
          type: 'array',

          of: [{ type: 'reference', to: { type: 'blogArticle' } }],
          validation: (Rule) => Rule.required().min(1).max(1)
        },
        {
          title: 'CTA',
          name: 'cta',
          type: 'ctaLink',
          description: 'Enter a URL',
          options: {
            collapsed: false,
            collapsible: true
          },

          validation: (Rule) => Rule.required()
        }
      ],
      ...COLLAPSE_FIELDS,
      group: 'featuredGroup'
    }
  ],
  preview: {
    select: {
      language: '__i18n_lang'
    },
    prepare({ language }) {
      return {
        title: `[${language}] Homepage`
      }
    }
  }
}
