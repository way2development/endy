export default {
  title: 'Exit Modal',
  name: 'exitModal',
  type: 'object',
  fields: [
    { title: 'Pill Label', name: 'pillLabel', type: 'string' },
    { title: 'Heading', name: 'heading', type: 'string' },
    { title: 'Subcopy', name: 'subcopy', type: 'text' },
    { title: 'Button Label', name: 'buttonLabel', type: 'string' },
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
  ]
}
