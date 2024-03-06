import { ListNumbers } from 'phosphor-react'

export default {
  title: 'Cross Sell Rankings',
  name: 'crossSellRankings',
  type: 'object',
  icon: ListNumbers,
  fields: [
    {
      title: 'Cart Rebuy',
      name: 'cartUpsellRebuy',
      type: 'object',
      fields: [
        {
          title: 'Enable Rebuy in cart',
          name: 'enableCartUpsellRebuy',
          type: 'boolean',
          initialValue: false
        },
        {
          title: 'Rebuy Ruleset Id',
          name: 'cartUpsellRulesetId',
          type: 'string',
          hidden: ({ parent }) => !parent?.enableCartUpsellRebuy
        }
      ]
    },
    {
      title: 'Product Ranking',
      name: 'productRanking',
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
      title: 'Mattress Size Ranking',
      name: 'mattressSizeRanking',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Cross Sell Rankings'
      }
    }
  }
}
