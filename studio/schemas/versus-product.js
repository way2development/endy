import { Intersect } from 'phosphor-react'

const feature = {
  title: 'Feature',
  name: 'feature',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'text'
    }
  ]
}

const columnFields = [
  {
    title: 'Product',
    name: 'product',
    type: 'reference',
    to: [{ type: 'product' }],
    validation: (Rule) => Rule.required()
  },
  {
    title: 'ProductPill',
    name: 'productPill',
    type: 'string'
  },
  {
    title: 'Product Display Name',
    name: 'productDisplayName',
    type: 'string'
  },
  {
    title: 'Product Image',
    name: 'productImage',
    type: 'lifestyleImage',
    validation: (Rule) => Rule.required()
  },
  {
    title: 'Product Recommendation',
    name: 'recommendation',
    description: 'Displays below product information',
    type: 'object',
    fields: [
      {
        title: 'Heading',
        name: 'heading',
        type: 'string'
      },
      {
        title: 'Subcopy',
        name: 'subcopy',
        type: 'text'
      }
    ]
  },
  {
    title: 'Features',
    name: 'features',
    type: 'array',
    of: [feature]
  }
]

export default {
  title: 'Versus Product',
  name: 'versusProduct',
  type: 'object',
  icon: Intersect,
  groups: [
    {
      title: 'General',
      name: 'general',
      default: true
    },
    {
      title: 'Product One',
      name: 'productOne'
    },
    {
      title: 'Product Two',
      name: 'productTwo'
    }
  ],
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'color',
      group: 'general',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Product One',
      name: 'productOne',
      type: 'object',
      group: 'productOne',
      description: 'Displays in first column',
      fields: columnFields,
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Product Two',
      name: 'productTwo',
      type: 'object',
      group: 'productTwo',
      description: 'Displays in second column',
      fields: columnFields,
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      heading: 'heading'
    },
    prepare({ heading }) {
      return {
        subtitle: heading,
        title: 'Versus Product'
      }
    }
  }
}
