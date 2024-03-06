import { Star, UserSquare } from 'phosphor-react'

const review = {
  title: 'Review',
  name: 'review',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Pill Label',
      name: 'pillLabel',
      type: 'string'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'text',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Social Handle',
      name: 'socialHandle',
      type: 'string'
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Location',
      name: 'location',
      type: 'string'
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage'
    }
  ],
  preview: {
    select: {
      heading: 'heading',
      name: 'name',
      socialHandle: 'socialHandle'
    },
    prepare({ heading, name, socialHandle }) {
      return {
        title: name || socialHandle,
        subtitle: heading
      }
    }
  }
}

export default {
  title: 'Featured Reviews',
  name: 'featuredReviews',
  type: 'object',
  icon: UserSquare,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Reviews',
      name: 'reviews',
      type: 'array',
      of: [review],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink'
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
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    }
  ],
  preview: {
    select: {
      heading: 'heading'
    },
    prepare({ heading }) {
      return {
        subtitle: heading,
        title: 'Featured Reviews'
      }
    }
  }
}
