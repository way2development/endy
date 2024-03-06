import { NewspaperClipping } from 'phosphor-react'

import customBlock from '../lib/custom-block.js'

export default {
  title: 'Media Module',
  name: 'mediaModule',
  type: 'object',
  icon: NewspaperClipping,
  fields: [
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Variant',
      name: 'variant',
      type: 'string',
      options: {
        list: ['Media Left', 'Media Right']
      },
      initialValue: 'Media Left',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Position',
      name: 'position',
      type: 'string',
      options: {
        list: ['Vertical', 'Horizontal']
      },
      initialValue: 'Horizontal',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [customBlock('italic')]
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('strong italic', '', 'checklist', 'link')]
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink'
    },
    {
      title: 'Video',
      name: 'video',
      type: 'video'
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage'
    },
    {
      title: 'Badge Image',
      description:
        'Adds a badge overlay on the top-left corner of a video.',
      name: 'badgeImage',
      type: 'badgeImage'
    },
    {
      title: 'Featured Products Pop-up',
      description:
        'Adds a button in the bottom right corner of the image. Button triggers a pop-up which displays featured products.',
      name: 'featuredProducts',
      type: 'object',
      fields: [
        {
          title: 'Featured Products',
          name: 'products',
          type: 'array',
          of: [
            {
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }]
            }
          ]
        },
        {
          title: 'Featured Products Button Label',
          name: 'buttonLabel',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    select: {
      subtitle: 'heading'
    },
    prepare({ subtitle }) {
      const block = (subtitle || []).find((block) => block._type === 'richText')
      return {
        title: 'Media Module',
        subtitle: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'No title'
      }
    }
  }
}
