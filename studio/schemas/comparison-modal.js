import { ArrowsLeftRight } from 'phosphor-react'

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
    title: 'Product Pill',
    name: 'productPill',
    type: 'string'
  },
  {
    title: 'Product Display Name',
    name: 'productDisplayName',
    type: 'string'
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
        type: 'string',
        validation: (Rule) => Rule.required(), // TODO: Investigate why required rule is not working for this field
        description:
          'Heading field *is required* to fill out before publishing.'
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
    of: [feature],
    validation: (Rule) => Rule.required()
  }
]

export default {
  title: 'Modal',
  name: 'comparisonModal',
  type: 'document',
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  icon: ArrowsLeftRight,
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
      description:
        'This is being used for Sanity Desk only, will not display on the front end'
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage',
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
      title: 'Button Label',
      name: 'buttonLabel',
      type: 'string',
      group: 'general'
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
        title: 'Comparison Modal'
      }
    }
  }
}
