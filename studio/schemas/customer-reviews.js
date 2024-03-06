import { Star } from 'phosphor-react'

const keyword = {
  title: 'Keyword',
  name: 'keyword',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      description: 'Keyword that appears in module',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Search Term',
      name: 'searchTerm',
      type: 'string',
      description:
        'Search term to look up in Yotpo. Keep term broad in order to maximize results.',
      validation: (Rule) => Rule.required()
    }
  ]
}

export default {
  title: 'Customer Reviews',
  name: 'customerReviews',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Product selected on page load',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [keyword]
    },
    {
      title: 'Product Dropdown',
      name: 'productDropdown',
      type: 'array',
      of: [
        {
          title: 'Product',
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Customer Reviews'
      }
    }
  }
}
