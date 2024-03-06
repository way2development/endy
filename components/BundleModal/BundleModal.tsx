import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import { ProductProps } from '../ShopModule/ShopModule.types'
import { Image, ImageProps } from '../Image'

// import { ProductReviewStars } from '../ProductReviewStars'
import { Text } from '../Text'

import { API_KEY } from '../../utils/getYotpoReviews'

import {
  // StyledProductTitle,
  StyledImageContainer,
  StyledBundleItemCard,
  StyledSubcopyContainer,
  StyledDescription,
  // StyledProductReviewsLink,
  StyledButtonContainer,
  StyledFaqLink
} from './BundleModal.styled'

// import { StyledSemibold } from '../../styles/global.styled'

// import { StyledReviewsMicrocopy } from '../ProductReviews/ProductReviews.styled'

import { StyledHeading, StyledMain } from '../TextModal/TextModal.styled'

import {
  // StyledPublishedDate,
  StyledButton
} from '../CustomModal/CustomModal.styled'

// TODO: the code commented out in this file was removed alongside the launch of our Essentials Sleep Set (i.e. not our in-house products). We will need to re-add this code if/when we revert to a bundle which offers our in-house products.

export interface BundleItemProps {
  product: ProductProps
  description: string
  lifestyleImage: ImageProps
  locale: Locale
}

export interface BundleModalProps {
  heading: string
  subcopy: string
  buttonLabel: string
  bundleItemList: {
    product: ProductProps
    productDescription: string
    lifestyleImage: ImageProps
  }[]
  onButtonClick: () => void
  publishDate: string
  locale: Locale
}

const BundleItem = ({
  product,
  locale,
  description,
  lifestyleImage
}: BundleItemProps) => {
  const localizedDictionary = dictionary[locale]
  const [reviewSummary, setReviewSummary] = useState({
    averageScore: 0,
    totalReviews: 0
  })
  const [isError, setIsError] = useState(false)

  const getStarRating = async (id: number) => {
    try {
      const { data } = await axios.get(
        `https://api.yotpo.com/products/${API_KEY}/${id}/bottomline`
      )

      setReviewSummary({
        averageScore: data.response.bottomline.average_score,
        totalReviews: data.response.bottomline.total_reviews
      })
    } catch (error) {
      console.error(error)
      setIsError(true)
    }
  }

  // const totalReviews =
  //   locale === 'fr'
  //     ? `${reviewSummary.totalReviews} ${localizedDictionary.reviews}`
  //     : `${reviewSummary.totalReviews} ${localizedDictionary.customerReviews}`

  useEffect(() => {
    getStarRating(product.id)
  }, [product.id])

  return (
    <StyledBundleItemCard key={product.id}>
      <StyledImageContainer>
        <Image
          desktopImage={lifestyleImage?.desktopImage}
          mobileImage={lifestyleImage?.mobileImage}
          tabletImage={lifestyleImage?.tabletImage}
          alt={lifestyleImage?.alt}
          srcWidths={[306, 298, 378]}
        />
      </StyledImageContainer>
      <div>
        {/* <StyledProductTitle color='gravy' variant='smallBody'>
          <StyledSemibold>{product.name}</StyledSemibold>
        </StyledProductTitle>
        {!isError && (
          <StyledProductReviewsLink
            href={`/products${product.slug}`}
            locale={locale}
          >
            <ProductReviewStars rating={reviewSummary.averageScore} />
            <StyledReviewsMicrocopy>{totalReviews}</StyledReviewsMicrocopy>
          </StyledProductReviewsLink>
        )} */}
        <StyledDescription color='gravy' variant='smallBody'>
          {description}
        </StyledDescription>
      </div>
    </StyledBundleItemCard>
  )
}

export const BundleModal = ({
  heading,
  subcopy,
  buttonLabel,
  bundleItemList,
  onButtonClick,
  locale
}: BundleModalProps) => {
  // TODO: Consider adding this microcopy FAQ link into Sanity as an authorable field.
  const localizedDictionary = dictionary[locale]
  const essentialsBundleFaqLink =
    locale === 'fr'
      ? 'https://answers.endy.com/hc/fr-ca/articles/21015602006157-Qu-est-ce-que-l-ensemble-d-essentiels-du-sommeil-Endy-'
      : 'https://answers.endy.com/hc/en-ca/articles/21015602006157-What-is-the-Endy-Essential-Sleep-Set-'

  return (
    <StyledMain maxwidth='49rem'>
      {/* {publishDate && (
        // TODO: Create a publish date component
        <StyledPublishedDate color='gravy70' variant='micro'>
          {localizedDictionary.published}{' '}
          {getFormattedDate(
            publishDate,
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            },
            locale
          )}
        </StyledPublishedDate>
      )} */}
      <StyledHeading color='gravy' variant='h3'>
        {heading}
      </StyledHeading>

      <StyledSubcopyContainer>
        <Text color='gravy' variant='mediumBody'>
          {subcopy}
        </Text>
      </StyledSubcopyContainer>

      {bundleItemList.map((item) => {
        return (
          <BundleItem
            key={item.product.id}
            product={item.product}
            description={item.productDescription}
            locale={locale}
            lifestyleImage={item.lifestyleImage}
          />
        )
      })}

      <StyledFaqLink href={essentialsBundleFaqLink} locale={locale}>
        <Text color='gravy' variant='micro'>
          {localizedDictionary.essentialsBundleFaq}
        </Text>
      </StyledFaqLink>

      <StyledButtonContainer>
        <StyledButton
          label={buttonLabel}
          variant='solid-rubine'
          onClick={onButtonClick}
        />
      </StyledButtonContainer>
    </StyledMain>
  )
}
