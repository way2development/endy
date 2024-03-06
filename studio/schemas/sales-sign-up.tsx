import { NewspaperClipping } from 'phosphor-react'

import customBlock from '../lib/custom-block.js'

export default {
  title: 'Sale Sign Up',
  name: 'salesSignUp',
  type: 'object',
  icon: NewspaperClipping,
  fields: [
    {
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['Invite Friends', 'Newsletter Sign Up']
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'showConsentCheckbox',
      title: 'Show Consent Checkbox',
      type: 'boolean',
      initialValue: false
    },
    {
      title: 'Show SMS Sign Up',
      name: 'showPhoneNumberSignUp',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }: any) => parent?.formType !== 'Newsletter Sign Up'
    },
    {
      title: 'Klaviyo Source Id',
      name: 'klaviyoSourceId',
      type: 'string',
      description: 'Klaviyo source id to track sign ups (ex. bf-sign-up)'
    },
    {
      title: 'Background Color',
      name: 'bgColor',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'array',
      of: [customBlock('italic')]
    },
    {
      title: 'Subcopy',
      name: 'subcopy',
      type: 'array',
      of: [customBlock('italic')]
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage'
    },
    {
      name: 'lifestyleImagePosition',
      title: 'Lifestyle Image Position',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['Left', 'Right']
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage'
    },
    {
      title: 'CTA Label',
      name: 'ctaLabel',
      type: 'text'
    },
    {
      title: 'Microcopy',
      name: 'microcopy',
      type: 'array',
      of: [customBlock('strong italic', '', '', 'link modal')]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Sign Up'
      }
    }
  }
}
