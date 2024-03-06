import { Star } from 'phosphor-react'

import customImage from '../../lib/custom-image'

export default {
  title: 'Hero',
  name: 'hero',
  type: 'object',
  icon: Star,
  fields: [
    {
      title: 'Overlay Content',
      name: 'content',
      type: 'complexPortableText'
    },
    {
      name: 'photos',
      type: 'object',
      fields: [
        customImage({
          title: 'Background Photo (mobile)',
          name: 'mobilePhoto'
        }),
        customImage({
          title: 'Background Photo (desktop)',
          name: 'desktopPhoto'
        })
      ]
    }
  ],
  preview: {
    select: {
      photo: 'photo',
      content: 'content.0.children'
    },
    prepare({ photo, content }: any) {
      return {
        title: 'Hero',
        subtitle: content && content[0]?.text,
        media: photo
      }
    }
  }
}
