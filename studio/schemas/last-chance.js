import { Star } from 'phosphor-react'

export default {
  title: 'Last Chance',
  name: 'lastChance',
  type: 'object',
  icon: Star,
  groups: [
    { title: 'Homepage Hero', name: 'homepageHero', default: true },
    { title: 'MLP Hero', name: 'mlpHero' },
    { title: 'Collections', name: 'collections' },
    { title: 'Pencil Banner', name: 'pencilBanner' },
    { title: 'Exit Modal', name: 'exitModal' },
    { title: 'Sales Landing Page', name: 'salesLandingPage' }
  ],
  fields: [
    {
      title: 'Homepage Hero',
      name: 'homepageHero',
      group: 'homepageHero',
      type: 'object',
      fields: [
        { title: 'Pill Label', name: 'pillLabel', type: 'string' },
        {
          title: 'Badge Image',
          name: 'badgeImage',
          type: 'badgeImage'
        }
      ]
    },
    {
      title: 'MLP Hero',
      name: 'mlpHero',
      group: 'mlpHero',
      type: 'object',
      fields: [
        { title: 'Pill Label', name: 'pillLabel', type: 'string' },
        {
          title: 'Badge Image',
          name: 'badgeImage',
          type: 'badgeImage'
        }
      ]
    },
    {
      title: 'Collections',
      name: 'collections',
      group: 'collections',
      type: 'object',
      fields: [
        { title: 'Hero Pill Label', name: 'heroPillLabel', type: 'string' },
        {
          title: 'Prefooter Pill Label',
          name: 'prefooterPillLabel',
          type: 'string'
        }
      ]
    },
    {
      name: 'pencilBannerMessage',
      title: 'Pencil Banner Message',
      type: 'pencilBannerMessage',
      group: 'pencilBanner'
    },
    {
      title: 'Exit Modal',
      name: 'exitModal',
      type: 'exitModal',
      group: 'exitModal'
    },
    {
      title: 'Sales Landing Page',
      name: 'salesLandingPage',
      group: 'salesLandingPage',
      type: 'object',
      fields: [
        {
          title: 'Sales Banner Promo Pill',
          name: 'salesBannerPill',
          type: 'string'
        }
      ]
    }
  ]
}
