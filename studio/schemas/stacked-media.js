import { Stack } from 'phosphor-react'

const columnFields = [
  {
    title: 'Heading',
    name: 'heading',
    type: 'string'
  },
  {
    title: 'Show opened accordion',
    name: 'showOpenedAccordion',
    type: 'boolean',
    initialValue: false
  },
  {
    title: 'Subcopy',
    name: 'subcopy',
    type: 'text'
  },
  {
    title: 'Main Image',
    name: 'mainImage',
    type: 'lifestyleImage'
  },
  {
    title: 'Video',
    name: 'video',
    type: 'video'
  },
  {
    title: 'Product Image',
    name: 'productImage',
    type: 'lifestyleImage'
  }
]

export default {
  title: 'Stacked Media',
  name: 'stackedMedia',
  type: 'object',
  icon: Stack,
  groups: [
    { title: 'Column One', name: 'columnOne' },
    { title: 'Column Two', name: 'columnTwo' },
    { title: 'Column Three', name: 'columnThree' }
  ],
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Column One',
      name: 'columnOne',
      type: 'object',
      fields: columnFields,
      group: 'columnOne',
      validation: (Rule) =>
        Rule.fields({
          heading: (fieldRule) => fieldRule.required(),
          subcopy: (fieldRule) => fieldRule.required()
        })
    },
    {
      title: 'Column Two',
      name: 'columnTwo',
      type: 'object',
      fields: columnFields,
      group: 'columnTwo',
      validation: (Rule) =>
        Rule.fields({
          heading: (fieldRule) => fieldRule.required(),
          subcopy: (fieldRule) => fieldRule.required()
        })
    },
    {
      title: 'Column Three',
      name: 'columnThree',
      type: 'object',
      group: 'columnThree',
      fields: columnFields
    }
  ],
  preview: {
    select: {
      heading: 'heading'
    },
    prepare({ heading }) {
      return {
        title: 'Stacked Media',
        subtitle: heading
      }
    }
  }
}
