import { Ruler, ArrowsHorizontal, FrameCorners } from 'phosphor-react'

const dimension = {
  title: 'Dimension',
  name: 'dimension',
  type: 'object',
  icon: ArrowsHorizontal,
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Value',
      name: 'value',
      type: 'string',
      validation: (Rule) => Rule.required()
    }
  ]
}

const size = {
  title: 'Size',
  name: 'size',
  type: 'object',
  icon: FrameCorners,
  fields: [
    {
      title: 'Size Id',
      name: 'sizeId',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Dimensions',
      name: 'dimensions',
      type: 'array',
      of: [dimension],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage',
      validation: (Rule) => Rule.required()
    }
  ]
}

export default {
  title: 'Furniture Sizing',
  name: 'furnitureSizing',
  type: 'object',
  icon: Ruler,
  fields: [
    {
      title: 'Sizes',
      name: 'sizes',
      type: 'array',
      of: [size],
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Furniture Sizing'
      }
    }
  }
}
