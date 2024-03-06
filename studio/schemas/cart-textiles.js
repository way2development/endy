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
  title: 'Cart Textiles',
  name: 'cartTextiles',
  type: 'object',
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
  ]
}
