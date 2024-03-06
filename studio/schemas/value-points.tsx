import { Star } from 'phosphor-react'

const valueColumn = {
  title: 'Value Column',
  name: 'valueColumn',
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
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'text'
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink'
    },
    {
      title: 'Tooltip',
      name: 'tooltip',
      type: 'string',
      description: 'Optional tooltip on hover of icon'
    }
  ],
  preview: {
    select: {
      media: 'image',
      title: 'heading',
      subtitle: 'subcopy'
    },
    prepare({ media, title, subtitle }: any) {
      return {
        title,
        subtitle,
        media
      }
    }
  }
}

export default {
  title: 'Value Points',
  name: 'valuePoints',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    },
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
      title: 'Value Columns',
      name: 'valueColumns',
      type: 'array',
      of: [valueColumn],
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink',
      description: 'enter an URL'
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'text'
    }
  ],
  preview: {
    select: {
      photo: 'lifestyleImage',
      title: 'heading'
    },
    prepare({ photo, title }: any) {
      return {
        title: 'Value Points',
        subtitle: title,
        media: photo
      }
    }
  }
}
