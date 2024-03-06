import { Star } from 'phosphor-react'

export default {
  title: 'Generic Hero',
  name: 'genericHero',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Graphic Image',
      name: 'graphicImage',
      type: 'lifestyleImage',
      description:
        'An SVG or PNG asset, which renders above the heading with a bottom dividing line.'
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
      title: 'Pill Label',
      name: 'pillLabel',
      description: '(Optional) Will display a pill flag above the title',
      type: 'string'
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
    }
  ]
}
