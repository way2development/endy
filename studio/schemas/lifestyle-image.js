import { Image } from 'phosphor-react'

export default {
  title: 'Lifestyle Image',
  name: 'lifestyleImage',
  type: 'object',
  icon: Image,
  fields: [
    {
      title: 'Desktop Image',
      name: 'desktopImage',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      title: 'Tablet Image',
      name: 'tabletImage',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      title: 'Mobile Image',
      name: 'mobileImage',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      title: 'Alternative text',
      name: 'alt',
      type: 'string',
      description: 'Important for SEO and accessibility.'
    }
  ],
  preview: {
    select: {
      asset: 'asset',
      alt: 'alt'
    },
    prepare({ alt, asset }) {
      return {
        title: 'Lifestyle Image',
        subtitle: alt,
        media: asset
      }
    }
  }
}
