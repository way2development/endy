import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {
  StyledContentContainer,
  StyledWrapper,
  StyledDesktopButtonGroup,
  StyledDimension,
  StyledDimensionContainer,
  StyledHeading,
  StyledImageContainer,
  StyledMobileButtonGroup,
  StyledSection
} from './FurnitureSizing.styled'

import { Dropdown } from '../Dropdown'
import { BackgroundImage } from '../BackgroundImage'
import { Image, ImageProps } from '../Image'
import { Text } from '../Text'
import dictionary from '../../dictionary.json'

import { StyledPageWidth } from '../../styles/global.styled'
import { Locale } from '../../types/global-types'

type Dimension = {
  label: string
  value: string
}

interface Sizes {
  sizeId: string
  dimensions: Dimension[]
  name: string
  lifestyleImage: ImageProps
}

interface FurnitureSizingProps {
  locale: Locale
  sizes: Sizes[]
}

const backgroundImage = {
  mobileImage: {
    asset: {
      _ref: 'image-04e3c58a9416f6b06265f6459e01d060e459ad31-3840x2598-jpg'
    }
  },
  desktopImage: {
    asset: {
      _ref: 'image-04e3c58a9416f6b06265f6459e01d060e459ad31-3840x2598-jpg'
    }
  },
  tabletImage: {
    asset: {
      _ref: 'image-04e3c58a9416f6b06265f6459e01d060e459ad31-3840x2598-jpg'
    }
  }
}

export const FurnitureSizing = ({ sizes, locale }: FurnitureSizingProps) => {
  const router = useRouter()
  const localizedDictionary = dictionary[locale]

  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [dropdownSize, setDropdownSize] = useState(sizes[0].sizeId)

  useEffect(() => {
    if (router?.isReady) {
      // // On page load, select variant based on URL query param
      const sizeQueryParam = router?.query?.size
      const size = sizes.find((size) => size.sizeId === sizeQueryParam)
      if (size) {
        setSelectedSize(size)
      }
    }
  }, [router?.query?.size])

  useEffect(() => {
    const size = sizes.find((size) => size.sizeId === dropdownSize)

    if (size) {
      setSelectedSize(size)
    }
  }, [dropdownSize])

  const dimensionDetails = selectedSize.dimensions.map((dimension) => {
    return (
      <StyledDimension key={dimension.label}>
        <Text variant={'mediumBody'} color={'gravy'}>
          {dimension.label}
        </Text>
        <div>{dimension.value}</div>
      </StyledDimension>
    )
  })

  const sizingDropdownlist = sizes.map((size) => {
    return { label: size.name, id: size.sizeId }
  })

  const handleChange = () => {
    const selected = sizes.find((size) => size.sizeId === dropdownSize)

    if (selected) {
      setSelectedSize(selected)
      setDropdownSize(selected.sizeId)
    }
  }

  const sizeDropdown = (
    <Dropdown
      label={''}
      handleChange={handleChange}
      handleClick={handleChange}
      options={sizingDropdownlist}
      variant={'white'}
      selectedOption={selectedSize.sizeId}
      setDropdownSize={setDropdownSize}
    />
  )

  return (
    <StyledSection>
      <BackgroundImage
        srcHeights={[610, 700, 500]}
        mobileImage={backgroundImage.mobileImage}
        tabletImage={backgroundImage.tabletImage}
        desktopImage={backgroundImage.desktopImage}
      >
        <StyledPageWidth>
          <StyledWrapper>
            <StyledContentContainer>
              <StyledHeading variant={'h2'} color={'gravy'}>
                {localizedDictionary.sizingGuide}
              </StyledHeading>
              <div>
                <StyledDimensionContainer>
                  {dimensionDetails}
                </StyledDimensionContainer>
                {sizes.length > 1 && (
                  <StyledDesktopButtonGroup>
                    {sizeDropdown}
                  </StyledDesktopButtonGroup>
                )}
              </div>
            </StyledContentContainer>

            {selectedSize.lifestyleImage && (
              <StyledImageContainer>
                <Image
                  desktopImage={selectedSize.lifestyleImage?.desktopImage}
                  tabletImage={selectedSize.lifestyleImage?.tabletImage}
                  mobileImage={selectedSize.lifestyleImage?.mobileImage}
                  srcWidths={[457 * 2, 424 * 2]}
                  alt={selectedSize.lifestyleImage.alt}
                />
              </StyledImageContainer>
            )}
            {sizes.length > 1 && (
              <StyledMobileButtonGroup>{sizeDropdown}</StyledMobileButtonGroup>
            )}
          </StyledWrapper>
        </StyledPageWidth>
      </BackgroundImage>
    </StyledSection>
  )
}
