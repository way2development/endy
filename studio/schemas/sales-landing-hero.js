import customBlock from '../lib/custom-block.js'
import { Star } from 'phosphor-react'

export default {
  title: 'Sale Landing Hero',
  name: 'salesLandingHero',
  type: 'object',
  icon: Star,
  groups: [
    { title: 'Content', name: 'content' },
    { title: 'Sale Preview', name: 'salePreview' },
    { title: 'Sale Active', name: 'saleActive' }
  ],
  fields: [
    {
      title: 'Sale Start Date',
      name: 'saleStartDate',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD'
      },
      group: 'content'
    },
    {
      title: 'Theme Color',
      description:
        'Select theme color associated with the background image. This sets the hero font color.',
      name: 'themeColor',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      name: 'pillBorderStyle',
      title: 'Pill Border Style',
      type: 'string',
      description:
        'Border style of the pill (e.g. Dotted is used for F&F, Solid is used for BF)',
      options: {
        layout: 'dropdown',
        list: ['dotted', 'solid']
      },
      initialValue: 'dotted',
      group: 'content'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content'
    },
    {
      name: 'backgroundColor',
      description: 'If there is no background image, select a background color',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage',
      group: 'content'
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage',
      validation: (Rule) => Rule.required(),
      group: 'content'
    },
    {
      title: 'Badge Image',
      name: 'badgeImage',
      type: 'badgeImage',
      group: 'content'
    },
    {
      title: 'Badge Position',
      name: 'badgePosition',
      type: 'string',
      initialValue: 'Top Right',
      description:
        'The corner placement of the circle badge. Position remains consistent across all viewports.',
      options: {
        list: ['Top Right', 'Top Left', 'Bottom Right', 'Bottom Left']
      },
      group: 'content'
    },
    {
      title: 'Show Countdown',
      name: 'showCountdown',
      type: 'boolean',
      description:
        'Show countdown timer in Hero before sale is live (e.g. turned off for F&F, turned on for BF).',
      initialValue: false,
      group: 'content'
    },
    {
      title: 'Countdown Header',
      name: 'countdownHeader',
      type: 'array',
      of: [customBlock('italic strong')],
      group: 'content',
      hidden: ({ parent }) => !parent?.showCountdown
    },
    {
      title: 'Pill Label',
      name: 'pillLabel',
      type: 'string',
      group: 'salePreview',
      description: 'Pill label before sale is live',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('italic strong')],
      validation: (Rule) => Rule.required(),
      description: 'Subcopy before sale is live',
      group: 'salePreview'
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'array',
      of: [customBlock('strong italic', '', '', 'link modal')],
      description: 'Microcopy before sale is live',
      group: 'salePreview'
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink',
      group: 'salePreview',
      description: 'CTA before sale is live',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Pill Label',
      name: 'saleActivePillLabel',
      type: 'string',
      description: 'Pill label when sale is live',
      group: 'saleActive'
    },
    {
      title: 'Subcopy',
      name: 'saleActiveSubcopy',
      type: 'array',
      of: [customBlock('italic strong')],
      description: 'Subcopy when sale is live',
      group: 'saleActive'
    },
    {
      title: 'Microcopy',
      name: 'saleActiveMicrocopy',
      type: 'array',
      of: [customBlock('strong italic', '', '', 'link modal')],
      description: 'Microcopy when sale is live',
      group: 'saleActive'
    },
    {
      title: 'CTA',
      name: 'saleActiveCta',
      type: 'ctaLink',
      description: 'CTA when sale is live',
      group: 'saleActive'
    }
  ]
}
