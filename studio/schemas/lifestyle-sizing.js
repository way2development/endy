import { Rug, Image, FrameCorners } from 'phosphor-react'

const roomImage = {
  title: 'Room Image',
  name: 'roomImage',
  type: 'object',
  icon: Image,
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
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

const option = {
  title: 'Option',
  name: 'option',
  type: 'object',
  icon: FrameCorners,
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [roomImage]
    }
  ]
}

export default {
  title: 'Lifestyle Sizing',
  name: 'lifestyleSizing',
  type: 'object',
  icon: Rug,
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
    },
    {
      title: 'Options',
      name: 'options',
      type: 'array',
      of: [option],
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Lifestyle Sizing'
      }
    }
  }
}
