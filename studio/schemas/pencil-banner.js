import { Star } from 'phosphor-react'

export default {
  title: 'Pencil Banner',
  name: 'pencilBanner',
  type: 'document',
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  icon: Star,
  fields: [
    {
      title: 'Messages',
      name: 'messages',
      type: 'array',
      of: [{ type: 'pencilBannerMessage' }]
    }
  ],
  preview: {
    select: {
      language: '__i18n_lang'
    },
    prepare({ language }) {
      return {
        title: `[${language}] Pencil Banner`
      }
    }
  }
}
