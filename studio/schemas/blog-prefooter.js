import { SquareHalfBottom } from 'phosphor-react'

const productFields = [
  {
    title: 'Product',
    name: 'product',
    type: 'reference',
    to: [{ type: 'product' }],
    validation: (Rule) => Rule.required()
  },
  {
    title: 'Image',
    name: 'prefooterImage',
    type: 'lifestyleImage',
    validation: (Rule) => Rule.required()
  }
]

export const blogPrefooterFields = [
  {
    name: 'title',
    title: 'Title',
    type: 'string',
    validation: (Rule) => Rule.required()
  },
  {
    title: 'Primary Product',
    name: 'primaryProduct',
    type: 'object',
    fields: productFields,
    validation: (Rule) => Rule.required()
  },
  {
    title: 'Secondary Product',
    name: 'secondaryProduct',
    type: 'object',
    fields: productFields,
    validation: (Rule) => Rule.required()
  }
]

export default {
  title: 'Prefooter',
  name: 'blogPrefooter',
  type: 'document',
  icon: SquareHalfBottom,
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  fields: blogPrefooterFields,
  preview: {
    select: {
      language: '__i18n_lang'
    },
    prepare({ language }) {
      return {
        title: `[${language}] Prefooter`
      }
    }
  }
}
