import { Star } from 'phosphor-react'

export default {
  title: 'Homepage Hero',
  name: 'homepageHero',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink'
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    },
    {
      title: 'Aside Link',
      name: 'asideLink',
      type: 'object',
      fields: [
        {
          title: 'Label',
          name: 'label',
          type: 'string'
        },
        {
          title: 'Url',
          name: 'url',
          type: 'string'
        }
      ]
    },
    {
      title: 'Aside Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage'
    },
    {
      title: 'Badge Image',
      name: 'badgeImage',
      type: 'badgeImage'
    }
  ]
}
