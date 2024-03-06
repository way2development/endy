export default {
  name: 'imageGrid',
  title: 'Image Grid Block',
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
    },
    {
      title: 'Alternative Text',
      name: 'alt',
      type: 'string',
      description: 'Important for SEO and accessibility.'
    }
  ]
}
