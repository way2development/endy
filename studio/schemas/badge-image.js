export default {
  title: 'Badge Image',
  name: 'badgeImage',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image'
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
        title: 'Badge Image',
        subtitle: alt,
        media: asset
      }
    }
  }
}
