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
    title: 'Heading',
    name: 'heading',
    type: 'string',
    validation: (Rule) => Rule.required()
  },
  {
    title: 'Video',
    name: 'video',
    type: 'video'
  },
  {
    title: 'Lifestyle Image',
    name: 'lifestyleImage',
    type: 'lifestyleImage'
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
  title: 'Versus Competitor',
  name: 'versusCompetitor',
  type: 'object',
  icon: Intersect,
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
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Column Two',
      name: 'columnTwo',
      type: 'object',
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
        title: 'Versus Competitor'
      }
    }
  }
}
