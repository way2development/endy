import { Bed } from 'phosphor-react'

export default {
  title: 'Mattress Learner Page',
  name: 'mlpPage',
  type: 'document',
  icon: Bed,
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
      title: 'Hero',
      name: 'hero',
      type: 'mlpHero',
      validation: (Rule) => Rule.required(),
      group: 'hero'
    },
    {
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'valuePoints' },
        { type: 'stackedMedia' },
        { type: 'mediaModule' },
        { type: 'textiles' },
        { type: 'awardsGrid' },
        { type: 'accordionList' },
        { type: 'featuredReviews' },
        { type: 'versusProduct' },
        { type: 'versusCompetitor' },
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
      title: 'title',
      language: '__i18n_lang'
    },
    prepare({ title, language, slug }) {
      return {
        title: `[${language}] ${slug}`,
        subtitle: title
      }
    }
  }
}
