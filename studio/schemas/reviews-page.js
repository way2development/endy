import { Star } from 'phosphor-react'

export default {
  title: 'Reviews Page',
  name: 'reviewsPage',
  type: 'document',
  icon: Star,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  groups: [
    { title: 'Hero', name: 'hero' },
    { title: 'Content', name: 'content', default: true },
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
        { type: 'articleCards' },
        { type: 'awardsGrid' },
        { type: 'genericHero' },
        { type: 'mediaModule' },
        { type: 'featuredReviews' },
        { type: 'supportLinks' },
        { type: 'customerReviews' }
      ],
      group: 'content',
      options: {
        editModal: 'fullscreen'
      }
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
        subtitle: `Reviews Page`,
        title: `[${language}] ${slug}`
      }
    }
  }
}
