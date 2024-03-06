import { Browser, Star, CircleWavy, Link, TextT } from 'phosphor-react'
import customBlock from '../lib/custom-block'

const featuredReview = {
  title: 'Featured Review',
  name: 'featuredReview',
  type: 'object',
  icon: Star,
  fields: [
    { title: 'Published Date', name: 'publishedDate', type: 'date' },
    { title: 'Heading', name: 'heading', type: 'string' },
    { title: 'Subcopy', name: 'subcopy', type: 'text' },
    { title: 'Name', name: 'name', type: 'string' },
    { title: 'Location', name: 'location', type: 'string' }
  ]
}

const accordionItem = {
  title: 'Accordion Item',
  name: 'accordionItem',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Content',
      name: 'content',
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
              of: [customBlock('italic strong', '', 'bullet', 'link modal')]
            }
          ]
        },
        { type: 'badgeTile' },
        { type: 'grid' }
      ]
    }
  ]
}

export default {
  title: 'Product Detail Page',
  name: 'productDetailPage',
  type: 'document',
  icon: Browser,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  groups: [
    { title: 'Shop Module', name: 'shopModule' },
    { title: 'Cross Sell', name: 'crossSell' },
    { title: 'Content', name: 'content', default: true },
    { title: 'Prefooter', name: 'prefooter' },
    { title: 'Settings', name: 'settings' }
  ],
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    },
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{ type: 'product' }],
      group: 'shopModule'
    },
    {
      title: 'Show Drop-a-Hint',
      name: 'showDropAHint',
      type: 'boolean',
      initialValue: false,
      group: 'shopModule'
    },
    {
      title: 'Carousel Badge Image Main',
      name: 'carouselBadgeImage',
      type: 'badgeImage',
      group: 'shopModule'
    },
    {
      title: 'Carousel Badge Image Secondary',
      name: 'carouselBadgeImageSecondary',
      type: 'badgeImage',
      group: 'shopModule'
    },
    {
      title: 'Product Type Selector',
      name: 'productTypeSelector',
      description:
        'Link to another product page via product type selection component (eg. Sateen & Percale)',
      group: 'shopModule',
      type: 'object',
      fields: [
        {
          title: 'Enable Product Type Selector',
          name: 'enableProductTypeSelector',
          type: 'boolean',
          initialValue: false
        },
        {
          title: 'Product Type Links',
          name: 'productTypeLinks',
          type: 'array',
          hidden: ({ parent }) => !parent?.enableProductTypeSelector,
          of: [
            {
              title: 'Product Type Link',
              name: 'productTypeLink',
              type: 'object',
              icon: Link,
              fields: [
                {
                  title: 'Label',
                  name: 'label',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                },
                {
                  title: 'Page Slug',
                  name: 'slug',
                  description:
                    'enter slug for PDP (i.e. /products/endy-mattress)',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                }
              ]
            }
          ]
        }
      ]
    },

    {
      title: 'Comparison Information',
      name: 'comparisonInfo',
      description:
        'Displays below the Product Type Selector component and is used to provide a link that triggers the comparison modal',
      type: 'array',
      group: 'shopModule',
      of: [customBlock('strong', '', '', 'modal')]
    },
    {
      title: 'Size Guide',
      name: 'sizeGuide',
      group: 'shopModule',
      type: 'object',
      fields: [
        {
          title: 'Heading',
          name: 'heading',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          title: 'Content',
          name: 'content',
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
                  of: [customBlock('italic strong', '', 'bullet', 'link modal')]
                }
              ]
            },
            { type: 'grid' }
          ]
        }
      ]
    },
    {
      title: 'Product Badges',
      name: 'productBadges',
      group: 'shopModule',
      type: 'array',
      of: [
        {
          title: 'Product Badge',
          name: 'productBadge',
          type: 'object',
          icon: CircleWavy,
          fields: [
            {
              title: 'Badge Image',
              name: 'badgeImage',
              type: 'badgeImage',
              validation: (Rule) => Rule.required()
            },
            {
              title: 'Heading',
              name: 'heading',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              title: 'Anchor URL',
              name: 'anchorUrl',
              description: `Add an anchor URL (without the '#' hash symbol) here`,
              type: 'string'
            },
            {
              title: 'Tooltip',
              name: 'tooltip',
              type: 'string',
              description:
                'Optional tooltip on hover. Badge will not anchor to URL when tooltip is provided.'
            }
          ]
        }
      ]
    },
    {
      title: 'Free Gift Banner',
      name: 'freeGiftBanner',
      group: 'shopModule',
      description:
        'Call out a free gift offer on the product detail page outside of sale configurations (ie. Bundle Sales)',
      type: 'object',
      fields: [
        {
          title: 'Heading',
          name: 'heading',
          type: 'string'
        },
        {
          title: 'Url',
          name: 'url',
          type: 'string',
          description:
            'Link to the free gift offer (ie. /products/endy-mattress)'
        }
      ]
    },
    {
      title: 'Additional Information',
      name: 'additionalInfo',
      description: 'Displays below the size selection dropdown',
      type: 'array',
      group: 'shopModule',
      of: [customBlock('strong', '', '', 'modal')]
    },
    {
      title: 'Outbound Links',
      name: 'outboundLinks',
      description: 'Links that direct outside of the shop module',
      group: 'shopModule',
      type: 'array',
      of: [
        {
          title: 'Outbound Link',
          name: 'outboundLink',
          type: 'object',
          icon: Link,
          fields: [
            {
              title: 'Label',
              name: 'label',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              title: 'Url',
              name: 'url',
              type: 'string',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ]
    },

    {
      title: 'Featured Reviews',
      name: 'featuredReviews',
      type: 'array',
      group: 'shopModule',
      of: [featuredReview]
    },
    {
      title: 'Accordion List',
      name: 'accordionList',
      type: 'object',
      group: 'shopModule',
      description: 'Accordion list that appears below product details section',
      fields: [
        {
          title: 'Accordion Items',
          name: 'accordionItems',
          type: 'array',
          of: [accordionItem]
        }
      ]
    },
    {
      title: 'Rebuy',
      name: 'upsellRebuy',
      type: 'object',
      group: 'shopModule',
      fields: [
        {
          title: 'Enable Rebuy',
          name: 'enableUpsellRebuy',
          type: 'boolean',
          initialValue: false
        },
        {
          title: 'Rebuy Ruleset Id',
          name: 'upsellRulesetId',
          type: 'string',
          hidden: ({ parent }) => !parent?.enableUpsellRebuy
        }
      ]
    },
    {
      title: 'Upsell Products (fallback)',
      name: 'upsellProducts',
      type: 'array',
      group: 'shopModule',
      description: 'Add Upsell Products as a fallback when Rebuy is disabled',
      hidden: ({ document }) => document.upsellRebuy?.enableUpsellRebuy,
      of: [
        {
          title: 'Product',
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ]
    },
    {
      title: 'Rebuy',
      name: 'crossSellRebuy',
      type: 'object',
      group: 'crossSell',
      fields: [
        {
          title: 'Enable Rebuy',
          name: 'enableCrossSellRebuy',
          type: 'boolean',
          initialValue: false
        },
        {
          title: 'Rebuy Ruleset Id',
          name: 'crossSellRulesetId',
          type: 'string',
          hidden: ({ parent }) => !parent?.enableCrossSellRebuy
        }
      ]
    },
    {
      title: 'Cross Sell Products (fallback)',
      name: 'crossSellProducts',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      type: 'array',
      of: [
        {
          title: 'Product',
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ],
      group: 'crossSell'
    },
    {
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'valuePoints' },
        { type: 'mediaModule' },
        { type: 'stackedMedia' },
        { type: 'accordionList' },
        { type: 'furnitureSizing' },
        { type: 'lifestyleSizing' },
        { type: 'featuredReviews' },
        { type: 'calloutPost' },
        { type: 'badgeBanner' },
        { type: 'productBreakdown' }
      ],
      group: 'content',
      options: {
        editModal: 'fullscreen'
      }
    },
    {
      title: 'Prefooter',
      name: 'prefooter',
      type: 'prefooter',
      group: 'prefooter'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'settings'
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'settings'
    }
  ],
  preview: {
    select: {
      slug: 'slug',
      language: '__i18n_lang'
    },
    prepare({ slug, language }) {
      return {
        subtitle: `Product Detail Page`,
        title: `[${language}] ${slug}`
      }
    }
  }
}
