import { Tag, Barcode } from 'phosphor-react'

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

export default {
  title: 'Sales Landing Page',
  name: 'salesLandingPage',
  type: 'document',
  icon: Tag,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  groups: [
    { title: 'Content', name: 'content' },
    { title: 'Hero', name: 'hero' },
    { title: 'Default Collection', name: 'defaultCollection' },
    { title: 'Sign Up', name: 'signUp' },
    { title: 'Settings', name: 'settings' },
    { title: 'Prefooter', name: 'prefooter' }
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
      name: 'hero',
      title: 'Generic Sale Hero',
      type: 'genericSaleHero',
      group: 'hero'
    },
    {
      name: 'signup',
      title: 'Sales Email sign up',
      type: 'salesEmailSignup',
      group: 'signUp'
    },
    {
      title: 'Collection Heading',
      name: 'defaultCollectionHeading',
      type: 'string',
      group: 'defaultCollection'
    },
    {
      title: 'Default Collection Products',
      name: 'defaultCollectionProducts',
      type: 'array',
      of: [productCard],
      group: 'defaultCollection'
    },
    {
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'mediaModule' },
        { type: 'accordionList' },
        { type: 'featuredReviews' },
        { type: 'supportLinks' }
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
    }
  ],
  preview: {
    select: {
      slug: 'slug',
      language: '__i18n_lang'
    },
    prepare({ slug, language }) {
      return {
        subtitle: `Sales Landing Page`,
        title: `[${language}] ${slug}`
      }
    }
  }
}
