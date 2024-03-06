import { Compass, Star, Link, HardDrives } from 'phosphor-react'

const endyLogo = {
    title: 'Logo',
    name: 'badgeImage',
    type: 'badgeImage'
}

const navLink = {
  title: 'Navigation Link',
  name: 'navLink',
  icon: Link,
  type: 'object',
  fields: [
    { title: 'Name', name: 'name', type: 'string' },
    { title: 'Url', name: 'url', type: 'string' }
  ]
}

const sideNavLink = {
  title: 'Side Navigation Link',
  name: 'sideNavLink',
  icon: Link,
  type: 'object',
  fields: [
    {
      title: 'Show on desktop',
      name: 'showOnDesktop',
      type: 'boolean',
      initialValue: true
    },
    { title: 'Name', name: 'name', type: 'string' },
    { title: 'Url', name: 'url', type: 'string' },
    {
      title: 'Classes',
      name: 'classNames',
      type: 'string',
      description: 'HTML classes for GTM triggers'
    }
  ]
}

const featuredProduct = {
  title: 'Featured Products',
  name: 'features',
  type: 'array',
  of: [
    {
      title: 'Featured Product',
      name: 'feature',
      type: 'object',
      icon: Star,
      fields: [
        {
          title: 'Product',
          name: 'product',
          type: 'reference',
          to: [{ type: 'product' }]
        },
        {
          title: 'Image',
          name: 'image',
          type: 'lifestyleImage'
        }
      ],
      preview: {
        select: {
          title: 'product.store.title'
        },
        prepare({ title }) {
          return {
            title
          }
        }
      }
    }
  ]
}

const navGroup = {
  title: 'Nav Groups',
  name: 'groups',
  type: 'array',
  of: [
    {
      title: 'Nav Group',
      name: 'group',
      type: 'object',
      icon: HardDrives,
      fields: [
        {
          title: 'Name',
          name: 'name',
          type: 'string'
        },
        {
          title: 'Product Url',
          name: 'productUrl',
          description:
            'Top level link with no dropdown. Only populate when no dropdown is requried.',
          type: 'string'
        },
        {
          title: 'Product Links',
          name: 'pdpLinks',
          type: 'array',
          of: [
            {
              title: 'Product Link',
              name: 'pdpLink',
              type: 'object',
              fields: [
                {
                  title: 'Name',
                  name: 'name',
                  type: 'string'
                },
                {
                  title: 'Product',
                  name: 'product',
                  type: 'reference',
                  to: [{ type: 'product' }]
                }
              ]
            }
          ]
        },
        navLink,
        featuredProduct
      ]
    }
  ]
}

export default {
  title: 'Navigation',
  name: 'navigation',
  icon: Compass,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  type: 'document',
  fields: [
    endyLogo,
    navGroup,
    {
      title: 'Side Links',
      name: 'links',
      type: 'array',
      of: [sideNavLink]
    }
  ],
  preview: {
    select: {
      language: '__i18n_lang'
    },
    prepare({ language }) {
      return {
        title: `Navigation - ${language || 'en'}`
      }
    }
  }
}
