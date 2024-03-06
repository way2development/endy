import { Storefront } from 'phosphor-react'

export default {
  title: 'Shop Settings',
  name: 'shopSettings',
  type: 'document',
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  icon: Storefront,
  groups: [
    { title: 'Modals', name: 'modals', default: true },
    { title: 'Cart Textiles', name: 'cartTextiles' }
  ],
  fields: [
    {
      title: 'Shipping Modal',
      name: 'shippingModal',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{ type: 'customModal' }],
      options: {
        disableNew: true
      },
      group: 'modals'
    },
    {
      title: 'Affirm Modal',
      name: 'affirmModal',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{ type: 'customModal' }],
      options: {
        disableNew: true
      },
      group: 'modals'
    },
    {
      title: 'Cart Textiles',
      name: 'cartTextiles',
      type: 'cartTextiles',
      validation: (Rule) => Rule.required(),
      group: 'cartTextiles'
    }
  ],
  preview: {
    select: {
      language: '__i18n_lang'
    },
    prepare({ language }) {
      return {
        title: `Shop Settings - ${language}`
      }
    }
  }
}
