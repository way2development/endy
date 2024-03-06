import { useState } from 'react'

import {
  StyledContentContainer,
  StyledWrapper,
  StyledDesktopButtonGroup,
  StyledFieldset,
  StyledImageContainer,
  StyledMobileButtonGroup,
  StyledSection,
  StyledVariantLabel,
  StyledRoomLayout,
  StyledImageGroup,
  StyledHeading,
  StyledSubcopy,
  StyledImageLabel
} from './LifestyleSizing.styled'

import { BackgroundImage } from '../BackgroundImage'
import { Image, ImageProps } from '../Image'

import {
  StyledPageWidth,
  StyledVisuallyHiddenInput
} from '../../styles/global.styled'

interface RoomImage {
  lifestyleImage: ImageProps
  label: string
}

interface Option {
  label: string
  images: RoomImage[]
}

interface LifestyleSizingProps {
  heading: string
  subcopy: string
  options: Option[]
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

export const LifestyleSizing = ({
  heading,
  options,
  subcopy
}: LifestyleSizingProps) => {
  const [selectedRoom, setSelectedRoom] = useState(options[0])

  const handleChange = (value: string) => {
    const selected = options.find((option) => option.label === value)
    if (selected) {
      setSelectedRoom(selected)
    }
  }

  return (
    <StyledSection>
      <BackgroundImage
        srcHeights={[1000, 500, 400]}
        mobileImage={backgroundImage.mobileImage}
        tabletImage={backgroundImage.tabletImage}
        desktopImage={backgroundImage.desktopImage}
      >
        <StyledPageWidth>
          <StyledWrapper>
            <StyledContentContainer>
              <StyledHeading variant={'h2'} color={'gravy'}>
                {heading}
              </StyledHeading>
              <StyledSubcopy
                numOptions={options.length}
                variant={'mediumBody'}
                color={'gravy'}
              >
                {subcopy}
              </StyledSubcopy>
              {options.length > 1 && (
                <StyledDesktopButtonGroup>
                  <StyledFieldset>
                    {options.map((option) => (
                      <StyledVariantLabel
                        key={option.label}
                        selected={selectedRoom.label === option.label}
                        htmlFor={option.label}
                      >
                        {option.label}
                        <StyledVisuallyHiddenInput
                          type='radio'
                          name='variant'
                          value={option.label}
                          id={option.label}
                          checked={selectedRoom.label === option.label}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                      </StyledVariantLabel>
                    ))}
                  </StyledFieldset>
                </StyledDesktopButtonGroup>
              )}
            </StyledContentContainer>

            <StyledImageGroup numImages={selectedRoom.images.length}>
              {selectedRoom.images.length &&
                selectedRoom.images.map((image) => {
                  return image?.lifestyleImage ? (
                    <StyledRoomLayout
                      key={image.lifestyleImage.desktopImage.asset._ref}
                    >
                      <StyledImageContainer>
                        <Image
                          desktopImage={image.lifestyleImage.desktopImage}
                          tabletImage={image.lifestyleImage.tabletImage}
                          mobileImage={image.lifestyleImage.mobileImage}
                          srcWidths={[457 * 2, 424 * 2]}
                          alt={image.lifestyleImage.alt}
                        />
                      </StyledImageContainer>
                      <StyledImageLabel variant={'mediumBody'} color={'gravy'}>
                        {image.label}
                      </StyledImageLabel>
                    </StyledRoomLayout>
                  ) : null
                })}
            </StyledImageGroup>
            {options.length > 1 && (
              <StyledMobileButtonGroup>
                {/* @ts-ignore */}
                <StyledFieldset numImages={options.length}>
                  {options.map((option) => (
                    <StyledVariantLabel
                      key={option.label}
                      selected={selectedRoom.label === option.label}
                      htmlFor={option.label}
                    >
                      {option.label}
                      <StyledVisuallyHiddenInput
                        type='radio'
                        name='variant'
                        value={option.label}
                        id={`${option.label}-mobile`}
                        checked={selectedRoom.label === option.label}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                    </StyledVariantLabel>
                  ))}
                </StyledFieldset>
              </StyledMobileButtonGroup>
            )}
          </StyledWrapper>
        </StyledPageWidth>
      </BackgroundImage>
    </StyledSection>
  )
}
