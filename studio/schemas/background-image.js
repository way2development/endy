export default {
  title: 'Background Image',
  name: 'backgroundImage',
  type: 'object',
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
    }
  ],
  preview: {
    select: {
      asset: 'asset'
    },
    prepare({ asset }) {
      return {
        title: 'Background Image',
        media: asset
      }
    }
  }
}
