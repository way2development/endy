export default ({ ...props } = {}) => {
  return {
    title: 'Photo',
    name: 'photo',
    type: 'image',
    options: {
      hotspot: true
    },
    fields: [
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
        alt: 'asset.alt',
        customAlt: 'alt'
      },
      prepare({ alt, customAlt, asset }) {
        return {
          title: customAlt ?? alt ?? '(alt text missing)',
          media: asset
        }
      }
    },
    ...props
  }
}
