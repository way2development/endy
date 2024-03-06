import { Cube, Barcode, Stack } from 'phosphor-react'

export const productCard = {
  title: 'Product',
  name: 'productCard',
  icon: Barcode,
  type: 'object',
  fields: [
    {
      title: 'Product',
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Image',
      name: 'image',
      type: 'lifestyleImage'
    }
  ],
  preview: {
    select: {
      name: 'product.store.title',
      language: '__i18n_lang'
    },
    prepare({ name }) {
      return {
        title: name
      }
    }
  }
}

const collection = {
  title: 'Collection',
  name: 'productCardGrid',
  icon: Stack,
  type: 'object',
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Images', name: 'images' }
  ],
  fields: [
    {
      title: 'Anchor Id',
      name: 'anchorId',
      type: 'string',
      group: 'content'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      group: 'content'
    },
    {
      title: 'Products',
      name: 'productCards',
      type: 'array',
      group: 'content',
      of: [productCard]
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink',
      group: 'content'
    },
    {
      title: 'Two Column Image',
      name: 'twoColumnImage',
      type: 'lifestyleImage',
      group: 'images'
    },
    {
      title: 'One Column Image',
      name: 'oneColumnImage',
      type: 'lifestyleImage',
      group: 'images'
    },
    {
      title: 'Highlight Image',
      name: 'highlightImage',
      type: 'lifestyleImage',
      group: 'images'
    }
  ]
}

export default {
  title: 'Collections Page',
  name: 'collectionsPage',
  type: 'document',
  icon: Cube,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  groups: [
    { title: 'Hero', name: 'hero' },
    { title: 'Collections', name: 'collections', default: true },
    { title: 'Prefooter', name: 'prefooter' },
    { title: 'Settings', name: 'settings' }
  ],
  fields: [
    {
      title: 'Hero',
      name: 'hero',
      type: 'collectionsHero',
      group: 'hero'
    },
    {
      title: 'Collections',
      name: 'collections',
      type: 'array',
      of: [collection],
      group: 'collections'
    },
    {
      title: 'Prefooter',
      name: 'prefooter',
      type: 'collectionsFeature',
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
      language: '__i18n_lang'
    },
    prepare({ language }) {
      return {
        title: `[${language}] Collections Page`
      }
    }
  }
}
