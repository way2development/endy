import { SquareHalf } from 'phosphor-react'
import { COLLAPSE_FIELDS } from '../constants'

export default {
  title: 'Newsletter',
  name: 'blogNewsletter',
  type: 'document',
  icon: SquareHalf,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  fields: [
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage',
      ...COLLAPSE_FIELDS,
      validation: (Rule) => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'text',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Button',
      name: 'button',
      type: 'button',
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      language: '__i18n_lang'
    },
    prepare({ language }) {
      return {
        title: `[${language}] Newsletter`
      }
    }
  }
}
