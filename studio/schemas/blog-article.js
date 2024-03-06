import customBlock from '../lib/custom-block.js'
import { NotePencil, Image } from 'phosphor-react'
import { COLLAPSE_FIELDS } from '../constants'
import { blogPrefooterFields } from './blog-prefooter'
import imageGrid from './image-grid.js'

export default {
  name: 'blogArticle',
  title: 'Articles',
  type: 'document',
  icon: NotePencil,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  groups: [
    { title: 'Settings', name: 'settingsGroup' },
    { title: 'Hero', name: 'heroGroup' },
    { title: 'Content', name: 'contentGroup' },
    { title: 'Read More', name: 'readMoreGroup' },
    { title: 'Prefooter', name: 'prefooterGroup' },
    {
      title: 'SEO',
      name: 'seoGroup'
    }
  ],
  fields: [
    {
      title: 'Settings',
      name: 'settings',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'settings.heading'
          },
          validation: (Rule) => Rule.required()
        },
        {
          name: 'author',
          title: 'Author(s)',
          type: 'reference',
          to: { type: 'author' },
          validation: (Rule) => Rule.required()
        },
        {
          name: 'publishedAt',
          title: 'Published at',
          type: 'datetime',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'categories',
          title: 'Categories',
          type: 'array',
          of: [{ type: 'reference', to: { type: 'category' } }],
          validation: (Rule) => Rule.required()
        }
      ],
      ...COLLAPSE_FIELDS,
      group: 'settingsGroup'
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'object',
      group: 'seoGroup',
      fields: [
        {
          title: 'Meta Title',
          name: 'metaTitle',
          type: 'string',
          description: 'Title used for search engines and browsers',
          validation: (Rule) =>
            Rule.max(50).warning(
              'Longer titles may be truncated by search engines'
            )
        },
        {
          title: 'Meta Description',
          name: 'metaDesc',
          type: 'text',
          rows: 3,
          description: 'Description for search engines',
          validation: (Rule) =>
            Rule.max(150).warning(
              'Longer descriptions may be truncated by search engines'
            )
        }
      ]
    },
    {
      title: 'Hero',
      name: 'hero',
      type: 'object',
      fields: [
        {
          title: 'Image',
          name: 'image',
          type: 'lifestyleImage',
          ...COLLAPSE_FIELDS,
          validation: (Rule) => Rule.required()
        }
      ],
      options: {
        collapsed: false,
        collapsible: true
      },
      group: 'heroGroup'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'object',
      fields: [
        {
          title: 'Subcopy',
          name: 'subcopy',
          type: 'text',
          description:
            'Appears on the homepage and serves as a quick intro/summary of the article.',
          validation: (Rule) => Rule.required()
        },
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [
            customBlock(
              'italic strong',
              'h5 largeBody caption',
              'bullet number alphabet',
              'link superscript'
            ),
            {
              title: 'Image',
              type: 'lifestyleImage',
              options: { hotspot: true }
            },
            {
              title: 'Selling Card',
              type: 'sellingCard',
              options: { hotspot: true }
            },
            {
              title: 'Quote Card',
              type: 'quoteCard'
            },
            { title: 'Table', type: 'table' },
            {
              title: 'CTA',
              type: 'ctaLink'
            },
            {
              title: 'Image Grid',
              name: 'imageGrid',
              type: 'object',
              icon: Image,
              fields: [
                {
                  title: 'Image Grid',
                  name: 'imageGridCollection',
                  type: 'array',
                  of: [imageGrid],
                  options: {
                    layout: 'grid'
                  },
                  validation: (Rule) =>
                    Rule.max(3).error('Maximum of 3 items allowed.')
                }
              ],
              preview: {
                select: {
                  asset: 'asset',
                  alt: 'alt'
                },
                prepare({ alt, asset }) {
                  return {
                    title: 'Image Grid',
                    subtitle: alt
                  }
                }
              }
            }
          ],
          validation: (Rule) => Rule.required()
        }
      ],
      ...COLLAPSE_FIELDS,
      group: 'contentGroup'
    },
    {
      title: 'Read More',
      name: 'readMore',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          title: 'More Articles',
          name: 'moreArticles',
          type: 'array',
          of: [{ type: 'reference', to: { type: 'blogArticle' } }]
        }
      ],
      ...COLLAPSE_FIELDS,
      group: 'readMoreGroup'
    },
    {
      title: 'Prefooter',
      name: 'prefooter',
      type: 'object',
      fields: blogPrefooterFields,
      ...COLLAPSE_FIELDS,
      group: 'prefooterGroup'
    }
  ],
  preview: {
    select: {
      language: '__i18n_lang',
      settings: 'settings'
    },
    prepare({ language, settings }) {
      return {
        title: `[${language}] ${settings.heading}`
      }
    }
  }
}
