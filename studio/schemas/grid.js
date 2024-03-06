import { GridFour, TextT } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Grid',
  name: 'grid',
  icon: GridFour,
  type: 'object',
  fields: [
    {
      title: 'Column Ratio',
      name: 'columnRatio',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['1:1', '1:1', '1:1:1'],
      hidden: () => true
    },
    {
      title: 'rowGap',
      name: 'rowGap',
      type: 'string',
      initialValue: '32px',
      hidden: () => true
    },
    {
      title: 'Column Gap',
      name: 'columnGap',
      type: 'string',
      initialValue: '24px',
      hidden: () => true
    },
    {
      title: 'Grid Columns',
      name: 'children',
      description: 'Add columns of rich text content to the grid',
      type: 'array',
      of: [
        {
          title: 'Rich Text Block',
          name: 'richTextBlock',
          icon: TextT,
          type: 'object',
          fields: [
            {
              title: 'Content',
              name: 'content',
              type: 'array',
              of: [customBlock('italic strong', '', 'bullet', 'link')]
            }
          ]
        }
      ]
    }
  ]
}
