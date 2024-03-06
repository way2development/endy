import { Heart } from 'phosphor-react'

const textileFields = [
  {
    title: 'Product',
    name: 'product',
    type: 'reference',
    to: [{ type: 'product' }],
    validation: (Rule) => Rule.required()
  },
  {
    title: 'Lifestyle Image',
    name: 'lifestyleImage',
    type: 'lifestyleImage'
  }
]

export default {
  title: 'Textiles',
  name: 'textiles',
  type: 'object',
  icon: Heart,
  groups: [
    {
      name: 'primaryProduct',
      title: 'Primary Product'
    },
    {
      name: 'secondaryProduct',
      title: 'Secondary Product'
    },
    {
      name: 'tertiaryProduct',
      title: 'Tertiary Product'
    }
  ],
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Primary Product',
      name: 'primaryProduct',
      type: 'object',
      group: 'primaryProduct',
      fields: textileFields,
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Secondary Product',
      name: 'secondaryProduct',
      group: 'secondaryProduct',
      type: 'object',
      fields: textileFields,
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Tertiary Product',
      name: 'tertiaryProduct',
      group: 'tertiaryProduct',
      type: 'object',
      fields: textileFields,
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare({ title }) {
      return {
        title: 'Textiles',
        subtitle: title
      }
    }
  }
}
