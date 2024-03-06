import { House } from 'phosphor-react'

export default {
  title: 'Home Page',
  name: 'homePage',
  type: 'document',
  icon: House,
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
      title: 'Hero',
      name: 'hero',
      type: 'homepageHero',
      validation: (Rule) => Rule.required(),
      group: 'hero'
    },
    {
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'valuePoints' },
        { type: 'mediaModule' },
        { type: 'textiles' },
        { type: 'awardsGrid' },
        { type: 'featuredReviews' },
        { type: 'calloutPost' },
        { type: 'badgeBanner' }
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
      language: '__i18n_lang'
    },
    prepare({ language }) {
      return {
        title: `[${language}] Home Page`
      }
    }
  }
}
