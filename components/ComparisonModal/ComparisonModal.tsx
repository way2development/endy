import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { VersusProduct, ColumnProps } from '../VersusProduct'
import { Image, ImageProps } from '../Image'
import { SaleProps } from '../../Interfaces/sales'
import {
  StyledModalContainer,
  StyledButton,
  StyledButtonContainer
} from './ComparisonModal.styled'
import { Locale } from '../../types/global-types'

export interface ComparisonModalProps {
  lifestyleImage: ImageProps
  buttonLabel: string
  onButtonClick: () => void
  locale: Locale
  heading: string
  productOne: ColumnProps
  productTwo: ColumnProps
  bgColor?: { hex: string }
  sales: SaleProps
}

export const ComparisonModal = ({
  lifestyleImage,
  bgColor,
  buttonLabel,
  onButtonClick,
  locale,
  productOne,
  productTwo
}: ComparisonModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [allReviews, setAllReviews] = useState([])
  const yotpoProductLimit = 100 // Yotpo limits fetch to 100 products

  const fetchReviews = async () => {
    const API_KEY = process.env.YOTPO_API_KEY

    try {
      setIsLoading(true)

      const { data } = await axios.get(
        `https://api.yotpo.com/v1/apps/${API_KEY}/bottom_lines?count=${yotpoProductLimit}&page=1`
      )

      setAllReviews(data.response.bottomlines || [])
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <StyledModalContainer bgColor={bgColor}>
      {lifestyleImage && (
        <Image
          desktopImage={lifestyleImage?.desktopImage}
          mobileImage={lifestyleImage?.mobileImage}
          tabletImage={lifestyleImage?.tabletImage}
          alt={lifestyleImage?.alt}
          srcWidths={[900, 900, 900]}
        />
      )}
      <VersusProduct
        productOne={productOne}
        productTwo={productTwo}
        locale={locale}
        productReviews={allReviews}
        isProductReviewsLoading={isLoading}
        isComparisonModal={true}
        bgColor={bgColor}
      />
      <StyledButtonContainer>
        <StyledButton
          label={buttonLabel}
          variant='solid-rubine'
          onClick={onButtonClick}
        />
      </StyledButtonContainer>
    </StyledModalContainer>
  )
}
