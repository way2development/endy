import { Tag } from 'phosphor-react'
import localizedField from '../lib/localized-field'

export default {
  title: 'Sales',
  name: 'sales',
  type: 'document',
  icon: Tag,
  groups: [
    { title: 'Settings', name: 'settings', default: true },
    { title: 'Content', name: 'content' }
  ],
  fields: [
    {
      name: 'promoCode',
      title: 'Promo Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    },
    {
      name: 'themeColor',
      title: 'Theme Color',
      type: 'color',
      options: {
        disableAlpha: true
      },
      validation: (Rule) => Rule.required(),
      group: 'settings'
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      initialValue: 'gravy',
      description:
        'This will set the text color for all heros modules and the collection feature',
      options: {
        list: ['gravy', 'white']
      },
      validation: (Rule) => Rule.required(),
      group: 'settings'
    },
    {
      title: 'Last Chance Days',
      name: 'lastChanceDays',
      type: 'number',
      validation: (Rule) => Rule.required(),
      group: 'settings'
    },
    localizedField('Nav Sale Copy', 'navSaleCopy', 'string', 'settings'),
    {
      name: 'shopifySaleDetails',
      title: 'Shopify Sale Details',
      type: 'salesSetting',
      group: 'settings'
    },
    localizedField('Content', 'translatedContent', 'reference', 'content', {
      to: [{ type: 'salesContent' }]
    }),
    {
      name: 'localizedContent',
      title: 'Localized Content',
      type: 'reference',
      group: 'content',
      to: [{ type: 'salesContent' }]
    }
  ],
  preview: {
    select: {
      promoCode: 'promoCode'
    },
    prepare({ promoCode }) {
      return {
        title: `${promoCode}`
      }
    }
  }
}
