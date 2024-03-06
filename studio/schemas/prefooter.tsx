import { Star } from 'phosphor-react'

export default {
  title: 'Prefooter',
  name: 'prefooter',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Promo Pill',
      name: 'promoPill',
      description: '(Optional) Will display a promo pill above the title',
      type: 'string'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'Font Colour',
      name: 'textColor',
      type: 'string',
      description: 'Font colour for section (Default set to rubine)',
      options: {
        list: ['rubine', 'gravy']
      }
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'text'
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink'
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    },
    { title: 'Disclaimer', name: 'disclaimer', type: 'text' }
  ],
  initialValue: {
    textColor: 'rubine'
  }
}
