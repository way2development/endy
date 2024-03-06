export default {
  title: 'Modal Inline Button',
  name: 'modalInlineButton',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Modal Type',
      name: 'modalType',
      type: 'string',
      options: {
        list: ['Terms & Conditions', 'Custom', 'Comparison']
      },
      validation: (Rule) => Rule.required()
    }
  ]
}
