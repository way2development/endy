import { Question } from 'phosphor-react'

const supportLinkColumn = {
  title: 'Support Link Column',
  name: 'supportLinkColumn',
  type: 'object',
  fields: [
    {
      title: 'Badge Image',
      name: 'badgeImage',
      type: 'badgeImage'
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
      type: 'text'
    }
  ],
  preview: {
    select: {
      media: 'image',
      title: 'heading',
      subtitle: 'subcopy'
    },
    prepare({ media, title, subtitle }) {
      return {
        title,
        subtitle,
        media
      }
    }
  }
}

export default {
  title: 'Support Links',
  name: 'supportLinks',
  type: 'object',
  icon: Question,
  fields: [
    {
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Support Link Columns',
      name: 'supportLinkColumns',
      type: 'array',
      of: [supportLinkColumn],
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      photo: 'lifestyleImage',
      title: 'heading'
    },
    prepare({ photo, title }) {
      return {
        title: 'Support Links',
        subtitle: title,
        media: photo
      }
    }
  }
}
