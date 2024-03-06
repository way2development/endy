import { BackgroundImage } from '../BackgroundImage'
import { buildSrcSet, SanityImageProps } from '../../lib/buildSrcSet'

import {
  StyledSection,
  StyledHotspotButton,
  StyledImageContainer,
  StyledContent,
  StyledFlex,
  StyledHeadingContainer,
  StyledToggleContainer,
  StyledToggleLeft,
  StyledToggleRight,
  StyledButtonContainer,
  StyledContentContainer,
  StyledSubtext,
  StyledImageWrapper,
  StyledPicture,
  StyledImage,
  StyledMicrocopy
} from './ProductBreakdown.styled'
import { StyledPageWidth } from '../../styles/global.styled'
import { Text } from '../Text'
import { useState } from 'react'
import { ImageProps, Image } from '../Image'

interface HotSpotProps {
  subheading: string
  subcopy: string
  microcopy?: string
  lifestyleImage?: ImageProps
  x: number
  y: number
}

interface ToggleContentProps {
  hotspots: HotSpotProps[]
  image: SanityImageProps
  alt: string
  lineAnimation: boolean
}

interface ProductBreakdownContentProps {
  hotspots: HotSpotProps[]
  image: SanityImageProps
  alt: string
  lineAnimation: boolean
  productOne: ToggleContentProps
  productTwo: ToggleContentProps
  showDefaultProduct: boolean
}

interface ProductBreakdownProps {
  heading: string
  toggleLabelOne: string
  toggleLabelTwo: string
  productOne: ToggleContentProps
  productTwo: ToggleContentProps
}

const backgroundImage = {
  mobileImage: {
    asset: {
      _ref: 'image-7c91150e36a0757594f3b1cecfb2ac513c616216-3840x2598-jpg'
    }
  },
  desktopImage: {
    asset: {
      _ref: 'image-7c91150e36a0757594f3b1cecfb2ac513c616216-3840x2598-jpg'
    }
  },
  tabletImage: {
    asset: {
      _ref: 'image-7c91150e36a0757594f3b1cecfb2ac513c616216-3840x2598-jpg'
    }
  }
}

const ProductBreakdownContent = ({
  productOne,
  productTwo,
  showDefaultProduct
}: ProductBreakdownContentProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  let image
  let hotspot
  let lineAnimation = false
  let alt = ''

  if (showDefaultProduct) {
    image = productOne?.image
    hotspot = productOne?.hotspots
    lineAnimation = productOne?.lineAnimation
    alt = productOne?.alt
  } else {
    image = productTwo.image
    hotspot = productTwo.hotspots
    lineAnimation = productTwo.lineAnimation
    alt = productTwo.alt
  }

  return (
    <StyledPageWidth>
      <StyledFlex>
        <StyledImageWrapper>
          <StyledImageContainer>
            <StyledPicture>
              <StyledImage
                alt={alt}
                src={buildSrcSet(image)}
                width='100%'
                height='auto'
              />
            </StyledPicture>
            {hotspot?.map((spot, i) => {
              return (
                <StyledButtonContainer
                  lineAnimation={lineAnimation}
                  active={i === activeIndex}
                  x={spot.x}
                  y={spot.y}
                  key={spot.x + spot.y}
                >
                  <StyledHotspotButton
                    onClick={() => setActiveIndex(i)}
                    active={i === activeIndex}
                  >
                    {i + 1}
                  </StyledHotspotButton>
                </StyledButtonContainer>
              )
            })}
          </StyledImageContainer>
        </StyledImageWrapper>
        <StyledContentContainer>
          {hotspot?.map((spot, i) => {
            return (
              <StyledContent key={spot.x + spot.y} active={i === activeIndex}>
                <div>
                  <StyledSubtext color='gravy' variant='h5' element='h3'>
                    {spot.subheading}
                  </StyledSubtext>
                  <StyledSubtext color='gravy' variant='mediumBody' element='p'>
                    {spot.subcopy}
                  </StyledSubtext>
                  {spot.microcopy && (
                    <StyledMicrocopy color='gravy' variant='micro'>
                      {spot.microcopy}
                    </StyledMicrocopy>
                  )}
                </div>
                {spot.lifestyleImage && (
                  <div>
                    <Image
                      srcWidths={[768, 1024]}
                      desktopImage={spot.lifestyleImage?.desktopImage}
                      tabletImage={spot.lifestyleImage?.tabletImage}
                      mobileImage={spot.lifestyleImage?.mobileImage}
                      alt={spot.lifestyleImage?.alt}
                    />
                  </div>
                )}
              </StyledContent>
            )
          })}
        </StyledContentContainer>
      </StyledFlex>
    </StyledPageWidth>
  )
}

export const ProductBreakdown = ({
  heading,
  toggleLabelOne,
  toggleLabelTwo,
  productOne,
  productTwo
}: ProductBreakdownProps) => {
  const [showDefaultProduct, setShowDefaultProduct] = useState(true)

  const handleClick = () => {
    setShowDefaultProduct(!showDefaultProduct)
  }

  const handleChange = () => {
    setShowDefaultProduct(!showDefaultProduct)
  }

  return (
    <BackgroundImage
      srcHeights={[650, 750, 550]}
      mobileImage={backgroundImage.mobileImage}
      tabletImage={backgroundImage.tabletImage}
      desktopImage={backgroundImage.desktopImage}
    >
      <StyledSection>
        <StyledHeadingContainer>
          <Text variant={'h2'} color={'rubine'}>
            {heading}
          </Text>
          {productTwo && (
            <StyledToggleContainer
              onClick={() => handleClick()}
              onChange={() => handleChange()}
              showDefaultProduct={showDefaultProduct}
            >
              <StyledToggleLeft
                variant={'smallBody'}
                color={'white'}
                showDefaultProduct={showDefaultProduct}
              >
                {toggleLabelOne}
              </StyledToggleLeft>
              <StyledToggleRight
                variant={'smallBody'}
                color={'gravy'}
                showDefaultProduct={showDefaultProduct}
              >
                {toggleLabelTwo}
              </StyledToggleRight>
            </StyledToggleContainer>
          )}
        </StyledHeadingContainer>

        <ProductBreakdownContent
          image={productOne?.image}
          hotspots={productOne?.hotspots}
          lineAnimation={productOne?.lineAnimation}
          alt={productOne?.alt}
          productOne={productOne}
          productTwo={productTwo}
          showDefaultProduct={showDefaultProduct}
        />
      </StyledSection>
    </BackgroundImage>
  )
}
