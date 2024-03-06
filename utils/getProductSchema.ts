import { imageBuilder } from '../lib/sanity'
import { ProductProps } from '../components/ShopModule/ShopModule.types'
import { CustomerReviewsProps } from '../components/ShopModule/FeaturedReviews'
import { toPlainText } from '@portabletext/react'

export const getProductSchema = (
  product: ProductProps,
  productUrl: string,
  featuredReviews: CustomerReviewsProps[],
  seo: any,
  logo: string,
  reviewSummary: {
    averageScore: number
    totalReviews: number
  },
  querySize: string,
  media: any,
  faq: any
) => {
  const { video, heading, subcopy } = media || ''

  // Remove line break characters in copy (/n) since it results in an error in Google Rich Results Test
  const santizeCopy = (copy: string) => copy?.replace(/(\r\n|\n|\r)/gm, ' ')

  // First gallery image for variant or product
  const productImages = product.images?.carouselImage || []
  const variantImages = product.variants[0]?.images?.carouselImage || []
  const image = variantImages[0] || productImages[0]

  const offers = product.variants.map((variant) => {
    const sizeLabel = product.sizeVariants.find(
      (sizeVariant) => sizeVariant.id === variant.size
    )?.label
    const colorLabel = product.colorVariants?.find(
      (colorVariant) => colorVariant.id === variant.color
    )?.label
    return {
      '@type': 'Offer',
      url: `${productUrl}?size=${variant.size.split(' ').join('+')}${
        variant.color ? `&color=${variant.color.split(' ').join('+')}` : ''
      }`,
      priceCurrency: 'CAD',
      price: variant.price,
      sku: variant.sku,
      mpn: variant.id,
      name: `${product.name} - ${sizeLabel}${
        colorLabel ? `/ ${colorLabel}` : ''
      }`,
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock'
    }
  })

  const review = featuredReviews?.map((review) => {
    return {
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Product',
        name: product.title,
        image: image && imageBuilder.image(image.desktopImage).url(),
        offers
      },
      name: review.heading,
      description: review.subcopy,
      datePublished: review.publishedDate || '2021-04-21',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1
      },
      author: {
        '@type': 'Person',
        name: review.name
      }
    }
  })

  const aggregateRating = featuredReviews
    ? {
        '@type': 'AggregateRating',
        ratingValue:
          reviewSummary?.averageScore && reviewSummary.totalReviews >= 10
            ? Number(reviewSummary.averageScore.toFixed(1))
            : undefined,
        reviewCount: reviewSummary?.totalReviews
      }
    : []

  const faqs = faq && {
    '@context': 'https://schema.org/',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: faq.accordionItems[0]?.heading,
        acceptedAnswer: {
          '@type': 'Answer',
          text: santizeCopy(seo?.dimensions)
        }
      },
      {
        '@type': 'Question',
        name: faq.accordionItems[1]?.heading,
        acceptedAnswer: {
          '@type': 'Answer',
          text: santizeCopy(seo?.materialsCertifications)
        }
      },
      {
        '@type': 'Question',
        name: faq.accordionItems[2]?.heading,
        acceptedAnswer: {
          '@type': 'Answer',
          text: santizeCopy(seo?.freeShippingWarranty)
        }
      },
      faq.accordionItems[3]?.heading && {
        '@type': 'Question',
        name: faq.accordionItems[3]?.heading,
        acceptedAnswer: {
          '@type': 'Answer',
          text: santizeCopy(seo?.faq)
        }
      }
    ]
  }

  const videoSchema = video && {
    '@context': 'https://schema.org/',
    '@type': 'VideoObject',
    '@id': video.src,
    name: heading.props.value[0].children[0].text,
    embedUrl: video.src,
    description: toPlainText(subcopy.props.value),
    uploadDate: '2022-07-14',
    thumbnailUrl:
      'https://cdn.sanity.io/images/d0kd7r9c/production/c22106cc9186e7c2573ac0db319bb870e9312f88-1280x720.jpg'
  }

  return [
    {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name,
      image: image && imageBuilder.image(image.desktopImage).url(),
      description: seo?.productMetaDesc,
      sku: product.variants.find((variant) => {
        return variant.size === querySize
      })?.sku,
      mpn: product.variants.find((variant) => {
        return variant.size === querySize
      })?.sku,
      brand: {
        name: 'Endy',
        '@type': 'Organization',
        logo: logo && imageBuilder.image(logo).url()
      },
      review,
      aggregateRating,
      offers
    },
    videoSchema,
    faqs
  ]
}
