import { Star } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Sales Homepage Hero',
  name: 'salesHomepageHero',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Variant',
      name: 'variant',
      type: 'string',
      initialValue: 'Default/Sale Split Screen V1',
      options: {
        list: [
          'Default/Sale Split Screen V1',
          'Default/Sale Split Screen V2',
          'Sale/Sale Split Screen',
          'One Block',
          'One Block Fade'
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Pill Label',
      name: 'pillLabel',
      type: 'string'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Secondary Heading',
      name: 'secondaryHeading',
      type: 'string',
      description:
        'Sale Aside Heading for both Default/Sale Split Screen variants hero.'
    },
    {
      title: 'Heading Text Image',
      name: 'headingTextImage',
      type: 'lifestyleImage',
      description:
        'If an image is uploaded for Default/Sale Split Screen V2, it will be used in place of heading copy.',
      validation: (Rule) =>
        Rule.fields({
          alt: (fieldRule) => fieldRule.required()
        })
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'text'
    },
    {
      title: 'Subcopy Text Image',
      name: 'subcopyTextImage',
      type: 'lifestyleImage',
      validation: (Rule) =>
        Rule.fields({
          alt: (fieldRule) => fieldRule.required()
        })
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'array',
      of: [customBlock('strong italic', '', '', 'modal')]
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink'
    },
    {
      title: 'Aside CTA Label',
      name: 'asideCtaLabel',
      type: 'string',
      description:
        'Sale Aside CTA label for both Default/Sale Split Screen hero variants. It is hard-coded to block-line variant, linking to MLP. This field is case sensitive and edits label copy only.'
    },
    {
      title: 'Aside Text Color',
      name: 'asideTextColor',
      type: 'string',
      initialValue: 'Gravy',
      description:
        'Text color for Default/Sale Split Screen variants Aside container.',
      options: {
        list: ['gravy', 'white']
      }
    },
    {
      title: 'Background Gradient Color',
      name: 'gradientColor',
      type: 'string',
      initialValue: 'Grey',
      description:
        'Text container background for both Default/Sale Split Screen variants Aside container to add accessibility contrast.',
      options: {
        list: ['Grey', 'White']
      }
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage'
    },
    {
      title: 'Badge Image',
      name: 'badgeImage',
      type: 'badgeImage'
    },
    {
      title: 'Badge Variant',
      name: 'badgeVariant',
      type: 'string',
      initialValue: 'Circle',
      description:
        'Select which badge variant to render (includes their respective tilt)',
      options: {
        list: ['Circle', 'Pill', 'Wide Pill']
      }
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
      }
    }
  ]
}
