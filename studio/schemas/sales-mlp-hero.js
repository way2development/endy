import customBlock from '../lib/custom-block.js'
import { Bed } from 'phosphor-react'

export default {
  title: 'Sales MLP Hero',
  name: 'salesMlpHero',
  type: 'object',
  icon: Bed,
  fields: [
    {
      title: 'Pill Label',
      name: 'pillLabel',
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
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('italic strong')]
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
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'array',
      of: [customBlock('strong italic', '', '', 'modal')]
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage',
      validation: (Rule) => Rule.required()
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
    }
  ]
}
