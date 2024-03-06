import { MapPin } from 'phosphor-react'

import customBlock from '../lib/custom-block.js'

//TODO: Add an embedded Google Maps field with a preset marker on CF Sherway Gardens
export default {
  title: 'Location Module',
  name: 'locationModule',
  type: 'object',
  icon: MapPin,
  fields: [
    {
      title: 'Variant',
      name: 'variant',
      type: 'string',
      options: {
        list: ['Media Left', 'Media Right']
      },
      initialValue: 'Media Left'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Address',
      name: 'address',
      type: 'array',
      of: [customBlock('strong italic', '', 'checklist', 'link')]
    },
    {
      title: 'Store Hours',
      name: 'storeHours',
      type: 'array',
      of: [customBlock('strong italic', '', 'checklist', 'link')]
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string'
    },
    {
      title: 'Telephone',
      name: 'telephone',
      type: 'string'
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink'
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage'
    }
  ],
  preview: {
    select: {
      heading: 'heading'
    },
    prepare({ heading }) {
      return {
        title: 'Location Module',
        subtitle: heading
      }
    }
  }
}
