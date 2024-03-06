import { GridFour, TextT } from 'phosphor-react'
import customBlock from '../lib/custom-block.js'

export default {
  title: 'Table',
  name: 'table',
  icon: GridFour,
  type: 'object',
  fields: [
    {
      title: 'Number of Columns',
      name: 'numOfColumns',
      type: 'number',
      validation: (Rule) => Rule.required().greaterThan(1)
    },
    {
      title: 'Table Cells',
      name: 'gridColumns',
      description: 'Adds a single cell to the table (from left to right)',
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
              of: [customBlock('italic strong', 'smallBody', 'bullet', 'link')]
            }
          ]
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Table'
      }
    }
  }
}
