import { Gear } from 'phosphor-react'

export default {
  title: 'General Settings',
  name: 'settings',
  type: 'object',
  icon: Gear,
  fields: [
    {
      title: 'Favicon',
      name: 'favicon',
      type: 'image',
      description: 'Recommended size: 32x32'
    },
    {
      title: 'Default Share Graphic',
      name: 'shareGraphic',
      type: 'image',
      description: 'Recommended size: 1200x630'
    },
    {
      title: 'App Icon',
      name: 'appIcon',
      type: 'image',
      description: 'Recommended size: 167x167'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings'
      }
    }
  }
}
