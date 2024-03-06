import { Browser, Cube, Barcode, Stack } from 'phosphor-react'

export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: Browser,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  groups: [
    { title: 'Hero', name: 'hero' },
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
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'accordionList' },
        { type: 'articleCards' },
        { type: 'awardsGrid' },
        { type: 'genericHero' },
        { type: 'locationModule' },
        { type: 'mediaModule' },
        { type: 'featuredReviews' },
        { type: 'salesMlpHero' },
        { type: 'salesLandingHero' },
        { type: 'salesLandingCollection' },
        { type: 'salesSignUp' },
        { type: 'termsAndConditions' },
        { type: 'valuePoints' },
        { type: 'supportLinks' },
        { type: 'customerReviews' }
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
        subtitle: `Page`,
        title: `[${language}] ${slug}`
      }
    }
  }
}
