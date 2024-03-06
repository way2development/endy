export default {
  title: 'Button',
  name: 'button',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true
  },
  fields: [
    {
      title: 'Variant',
      name: 'variant',
      type: 'string',
      description: 'Button Variation',
      options: {
        list: [
          'solid-rubine',
          'solid-gravy',
          'hollow-rubine',
          'hollow-gravy',
          'hollow-white',
          'block-line-gravy',
          'block-line-white'
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      description: 'Display Text',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Classes',
      name: 'classNames',
      type: 'string',
      description: 'Optional HTML classes for GTM triggers'
    }
  ],
  preview: {
    select: {
      title: 'label',
      url: 'url'
    },
    prepare({ title, url }) {
      return {
        title: title ?? url,
        subtitle: title && url
      }
    }
  }
}
