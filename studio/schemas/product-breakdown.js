import { Circle, CirclesThree } from 'phosphor-react'

import HotspotArray from 'sanity-plugin-hotspot-array'

const spot = {
  name: 'spot',
  type: 'object',
  icon: Circle,
  fieldsets: [{ name: 'position', options: { columns: 2 } }],
  fields: [
    { title: 'Subheading', name: 'subheading', type: 'string' },
    { title: 'Subcopy', name: 'subcopy', type: 'text' },
    { title: 'Microcopy', name: 'microcopy', type: 'text' },
    { title: 'Image', name: 'lifestyleImage', type: 'lifestyleImage' },
    {
      name: 'x',
      type: 'number',
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100)
    },
    {
      name: 'y',
      type: 'number',
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100)
    }
  ],
  preview: {
    select: {
      title: 'subheading'
    },
    prepare({ title }) {
      return {
        title
      }
    }
  }
}

const toggleContentFields = [
    {
      title: 'Hotspot Image',
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Hotspot Image Alt Text',
      name: 'alt',
      type: 'string',
      description: 'Important for SEO and accessibility.'
    },
    {
      title: 'Show Line Animation',
      name: 'lineAnimation',
      type: 'boolean',
      initialValue: false,
      description: 'Show guiding line animation on desktop'
    },
    {
      name: 'hotspots',
      type: 'array',
      inputComponent: HotspotArray,
      of: [spot],
      options: {
        imageHotspotPathRoot: 'parent',
        // see 'Image and description path' setup below
        hotspotImagePath: 'image',
        hotspotDescriptionPath: 'subheading'
      }
    }
]

export default {
  title: 'Product Breakdown',
  name: 'productBreakdown',
  type: 'object',
  icon: CirclesThree,
  groups: [
    {
      title: 'General',
      name: 'general',
      default: true
    },
    {
      title: 'Product One',
      name: 'productOne'
    },
    {
      title: 'Product Two',
      name: 'productTwo'
    }
  ],
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Toggle Label One',
      name: 'toggleLabelOne',
      type: 'string',
      group: 'general'
    },
    {
      title: 'Toggle Label Two',
      name: 'toggleLabelTwo',
      type: 'string',
      group: 'general'
    },
    {
      title: 'Product One',
      name: 'productOne',
      type: 'object',
      group: 'productOne',
      description: 'Content for default product to paint at page load',
      fields: toggleContentFields,
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Product Two',
      name: 'productTwo',
      type: 'object',
      group: 'productTwo',
      description: 'Toggle function switches to paint secondary product content',
      fields: toggleContentFields
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Product Breakdown'
      }
    }
  }
}
