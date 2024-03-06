import { SquaresFour } from 'phosphor-react'
import localizedField from '../lib/localized-field'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: SquaresFour,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  fields: [
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description:
        "This is the category slug that appears in the URL (e.g. if it's called product-features, the URL will appear as /blog/product-features/[article])",
      options: {
        source: 'title'
      },
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    }
  ],
  preview: {
    select: {
      language: '__i18n_lang',
      title: 'title'
    },
    prepare({ language, title }) {
      return {
        title: `[${language}] ${title}`
      }
    }
  }
}
