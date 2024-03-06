import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

interface ColumnStackedMediaProps {
  video: {
    src: string
    _type: string
  }
  heading: string
  subcopy: string
}

interface MediaProps {
  video: {
    src: string
    _type: string
  }
  heading: {
    props: {
      value: PortableTextBlock[]
    }
  }
  subcopy: {
    props: {
      value: PortableTextBlock
    }
  }
}

interface StackedMediaProps {
  heading: string
  columnOne: ColumnStackedMediaProps
  columnTwo: ColumnStackedMediaProps
  columnThree: ColumnStackedMediaProps
  subcopy: string
}

const thumbnailUrl =
  'https://cdn.sanity.io/images/d0kd7r9c/production/c22106cc9186e7c2573ac0db319bb870e9312f88-1280x720.jpg'

const uploadDate = '2022-05-18T14:32:22Z'

export const getVideoSchema = (
  media: MediaProps,
  stackedMedia: StackedMediaProps
) => {
  const { video, heading, subcopy } = media || ''
  const { columnOne, columnTwo, columnThree } = stackedMedia || ''

  // TODO: Conslidate with video schema from getProductSchema file
  const videoSchema = video && {
    '@context': 'https://schema.org/',
    '@type': 'VideoObject',
    '@id': video.src,
    name: heading.props.value[0].children[0].text,
    embedUrl: video.src,
    description: toPlainText(subcopy.props.value),
    uploadDate,
    thumbnailUrl
  }

  const itemListSchema = stackedMedia && {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'VideoObject',
        position: 1,
        name: columnOne.heading,
        url: columnOne.video.src,
        description: columnOne.subcopy,
        thumbnailUrl,
        uploadDate,
        contentUrl: columnOne.video.src,
        embedUrl: columnOne.video.src
      },
      {
        '@type': 'VideoObject',
        position: 2,
        name: columnTwo.heading,
        url: columnTwo.video.src,
        description: columnTwo.subcopy,
        thumbnailUrl,
        uploadDate,
        contentUrl: columnTwo.video.src,
        embedUrl: columnTwo.video.src
      },
      {
        '@type': 'VideoObject',
        position: 3,
        name: columnThree.heading,
        url: columnThree.video.src,
        description: columnThree.subcopy,
        thumbnailUrl,
        uploadDate,
        contentUrl: columnThree.video.src,
        embedUrl: columnThree.video.src
      }
    ]
  }

  return [
    {
      '@context': 'https://schema.org/',
      itemListSchema,
      videoSchema
    }
  ]
}
