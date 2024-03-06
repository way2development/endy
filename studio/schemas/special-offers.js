import { Gift, GitFork } from 'phosphor-react'

export default {
  title: 'Special Offers',
  name: 'specialOffers',
  type: 'object',
  icon: Gift,
  fields: [
    {
      title: 'Mystery Gift',
      name: 'mysteryGift',
      type: 'object',
      fieldsets: [
        {
          name: 'dates',
          title: 'Active Dates (Eastern time)',
          options: {
            columns: 2
          }
        }
      ],
      fields: [
        {
          title: 'Start Date',
          name: 'startDate',
          type: 'date',
          options: {
            dateFormat: 'YYYY-MM-DD'
          },
          fieldset: 'dates'
        },
        {
          title: 'End Date',
          name: 'endDate',
          type: 'date',
          options: {
            dateFormat: 'YYYY-MM-DD'
          },
          fieldset: 'dates'
        },
        {
          title: 'Product(s) customer buys',
          name: 'products',
          type: 'array',
          of: [
            {
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }]
            }
          ],
          validation: (Rule) => Rule.required()
        },
        {
          title: 'Product customer gets',
          name: 'gift',
          type: 'array',
          description: 'Limit of 1 mystery gift',
          of: [
            {
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }]
            }
          ],
          validation: (Rule) => Rule.required()
        },
        {
          title: 'Retail Value',
          name: 'retailValue',
          type: 'number',
          description: 'Retail value of mystery gift'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Special Offers'
      }
    }
  }
}
