import { COLLAPSE_FIELDS } from '../constants'
import { Link } from 'phosphor-react'

export default {
  title: 'CTA Link',
  name: 'ctaLink',
  type: 'object',
  icon: Link,
  fields: [
    {
      title: 'Variant',
      name: 'variant',
      type: 'string',
      description: 'Link Variation',
      options: {
        list: [
          'solid-rubine',
          'solid-gravy',
          'hollow-rubine',
          'hollow-gravy',
          'hollow-white',
          'block-line-gravy',
          'block-line-white'
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      description: 'Display Text',
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'URL',
      name: 'url',
      type: 'string',
      description: 'enter an URL',
      validation: (Rule: any) => [Rule.required()]
    },
    {
      title: 'Classes',
      name: 'classNames',
      type: 'string',
      description: 'Optional HTML classes for GTM triggers'
    }
  ],
  ...COLLAPSE_FIELDS,
  preview: {
    select: {
      title: 'label',
      url: 'url'
    },
    prepare({ title, url }: any) {
      return {
        title: title ?? url,
        subtitle: title && url
      }
    }
  }
}
