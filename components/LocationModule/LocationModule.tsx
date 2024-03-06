import React from 'react'
import { CtaLink } from '../CtaLink'
import { Image, ImageProps } from '../Image'
import { StyledWrapper } from './LocationModule.styled'
import {
  StyledHeading,
  StyledContent,
  StyledMediaColumn,
  StyledImageContainer,
  StyledEmail,
  StyledTelephone,
  StyledStoreInfo,
  StyledCta,
  StyledContactDetails,
  StyledContactDetailsText
} from './LocationModule.styled'
import { Text } from '../Text'

type Variant = 'Media Left' | 'Media Right'

interface LocationModuleProps {
  heading: string
  address: string
  storeHours: string
  cta: React.ElementRef<typeof CtaLink>[]
  email: string
  telephone: string
  variant: Variant
  lifestyleImage: ImageProps
}

const phoneIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/2be3c29353b164668998e14e765ebd90b2c68d8d-15x14.svg'
const emailIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/7ff2a41cf5137f05dc5432403100ddcd82629469-16x13.svg'

export const LocationModule = ({
  heading,
  address,
  storeHours,
  cta,
  email,
  telephone,
  variant,
  lifestyleImage
}: LocationModuleProps) => {
  return (
    <StyledWrapper variant={variant}>
      <StyledContent>
        <StyledHeading color='gravy' variant='h2'>
          {heading}
        </StyledHeading>

        <StyledStoreInfo>
          <Text color='gravy' variant='mediumBody'>
            {address}
          </Text>
          <Text color='gravy' variant='mediumBody'>
            {storeHours}
          </Text>
          <StyledContactDetailsText color='gravy' variant='mediumBody'>
            <StyledContactDetails>
              <img src={emailIcon} alt='' />
              <StyledEmail>
                <CtaLink
                  variant='inline'
                  url={`mailto:${email}`}
                  label={email}
                />
              </StyledEmail>
            </StyledContactDetails>
            <StyledContactDetails>
              <img src={phoneIcon} alt='' />
              <StyledTelephone>
                <CtaLink
                  variant='inline'
                  // remove all non-numeric characters from telephone number besides '+'
                  url={`tel:${telephone.replace(/[^\d+]/g, '')}`}
                  label={telephone}
                />
              </StyledTelephone>
            </StyledContactDetails>
          </StyledContactDetailsText>
        </StyledStoreInfo>
        <StyledCta>{cta}</StyledCta>
      </StyledContent>

      <StyledMediaColumn>
        <StyledImageContainer>
          <Image
            srcWidths={[768, 1024]}
            desktopImage={lifestyleImage?.desktopImage}
            tabletImage={lifestyleImage?.tabletImage}
            mobileImage={lifestyleImage.mobileImage}
            alt={lifestyleImage.alt}
          />
        </StyledImageContainer>
      </StyledMediaColumn>
    </StyledWrapper>
  )
}
