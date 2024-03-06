import { Tag } from 'phosphor-react'

const navLink = {
  title: 'Nav Link',
  name: 'navLink',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'URL',
      name: 'url',
      type: 'string',
      validation: (Rule) => [Rule.required()]
    }
  ]
}

const socialLink = {
  title: 'Social Link',
  name: 'socialLink',
  type: 'object',
  fields: [
    {
      title: 'Icon',
      name: 'icon',
      type: 'badgeImage'
    },
    {
      title: 'Fallback Text',
      name: 'fallbackText',
      type: 'string'
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Aria Label',
      name: 'ariaLabel',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'string'
    }
  ]
}

export default {
  title: 'Footer',
  name: 'footer',
  type: 'document',
  i18n: true,
  initialValue: () => ({
    __i18n_lang: 'en'
  }),
  icon: Tag,
  groups: [
    { title: 'Logo', name: 'logoLanguage' },
    { title: 'Column 1', name: 'columnOne' },
    { title: 'Column 2', name: 'columnTwo' },
    { title: 'Column 3', name: 'columnThree' },
    { title: 'Social', name: 'social' },
    { title: 'Subfooter', name: 'subfooter' }
  ],
  fields: [
    {
      title: 'Logo',
      name: 'logo',
      type: 'badgeImage',
      group: 'logoLanguage'
    },
    {
      title: 'Languages',
      name: 'languages',
      type: 'array',
      of: [navLink],
      group: 'logoLanguage'
    },
    {
      title: 'Heading',
      name: 'menuHeading1',
      type: 'string',
      group: 'columnOne'
    },
    {
      title: 'Menu List',
      name: 'menuList1',
      type: 'array',
      of: [navLink],
      group: 'columnOne'
    },
    {
      title: 'Heading',
      name: 'menuHeading2',
      type: 'string',
      group: 'columnTwo'
    },
    {
      title: 'Menu List',
      name: 'menuList2',
      type: 'array',
      of: [navLink],
      group: 'columnTwo'
    },
    {
      title: 'Heading',
      name: 'menuHeading3',
      type: 'string',
      group: 'columnThree'
    },
    {
      title: 'Menu List',
      name: 'menuList3',
      type: 'array',
      of: [navLink],
      group: 'columnThree'
    },
    {
      title: 'Social Icons',
      name: 'socialIcons',
      type: 'array',
      of: [socialLink],
      group: 'social'
    },
    {
      title: 'Digital Certification Image',
      name: 'digiCertImg',
      type: 'badgeImage',
      group: 'social'
    },
    {
      title: 'Subfooter Links',
      name: 'subfooterLinks',
      type: 'array',
      of: [navLink],
      group: 'subfooter'
    }
  ],
  preview: {
    select: {
      language: '__i18n_lang'
    },
    prepare({ language }) {
      return {
        title: `Footer - ${language || 'en'}`
      }
    }
  }
}
