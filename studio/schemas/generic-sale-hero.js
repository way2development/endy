import { Star } from 'phosphor-react'

export default {
  title: 'Generic Sale Hero',
  name: 'genericSaleHero',
  type: 'object',
  icon: Star,
  fields: [
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
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    }
  ]
}
