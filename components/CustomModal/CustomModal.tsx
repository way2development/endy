import React from 'react'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import { StyledHeading, StyledMain } from '../TextModal/TextModal.styled'
import {
  StyledAffirm,
  StyledFooter,
  StyledBadge,
  StyledPublishedDate,
  StyledModalContainer,
  StyledBackgroundImage,
  StyledButton,
  StyledButtonContainer,
  StyledBody
} from './CustomModal.styled'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { BackgroundImageProps } from '../BackgroundImage'
import { Text } from '../Text'
import { getFormattedDate } from '../../lib/time'

export interface CustomModalProps {
  /** Heading copy */
  heading: string
  /** Button that appears at the bottom of the modal to close the modal */
  buttonLabel: string
  /** Array of HTML elements to be shown in the modal */
  body: HTMLElement
  /** Badge image and alt text */
  logo?: BadgeImageProps
  /** Lifestyle image */
  backgroundImage: BackgroundImageProps
  /** footer microcopy that appears at bottom of modal */
  microcopy?: HTMLElement
  /** Published date */
  _updatedAt?: Date
  /** Site language  */
  locale: Locale
  /** Function that triggers when button in the text model is clicked */
  onButtonClick: () => void
}

export const CustomModal = ({
  heading,
  buttonLabel,
  body,
  logo,
  backgroundImage,
  microcopy,
  _updatedAt,
  locale,
  onButtonClick
}: CustomModalProps) => {
  const Affirm = () => {
    return (
      <>
        {logo && (
          <StyledAffirm>
            <StyledBadge>
              <BadgeImage image={logo?.image} alt={logo?.alt} />
            </StyledBadge>
          </StyledAffirm>
        )}
      </>
    )
  }

  const TextContentContainer = () => {
    return (
      <>
        <StyledMain maxwidth='49rem'>
          {_updatedAt && (
            <StyledPublishedDate color='gravy70' variant='micro'>
              {dictionary[locale].published}{' '}
              {getFormattedDate(
                _updatedAt,
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                },
                locale
              )}
            </StyledPublishedDate>
          )}
          <StyledHeading color='gravy' variant='h3'>
            {heading}
          </StyledHeading>
          {Affirm && <Affirm />}
          <StyledBody>
            <Text color='gravy' variant='mediumBody'>
              {body}
            </Text>
          </StyledBody>
          <StyledButtonContainer>
            <StyledButton
              label={buttonLabel}
              variant='solid-rubine'
              onClick={onButtonClick}
            />
          </StyledButtonContainer>
        </StyledMain>

        <>
          {microcopy && (
            <StyledFooter>
              <Text color='gravy' variant='micro'>
                {microcopy}
              </Text>
            </StyledFooter>
          )}
        </>
      </>
    )
  }

  return (
    <>
      {backgroundImage ? (
        <StyledModalContainer>
          <StyledBackgroundImage
            srcHeights={[145, 145, 667]}
            srcWidths={[335, 335, 400]}
            mobileImage={backgroundImage?.mobileImage}
            tabletImage={backgroundImage?.tabletImage}
            desktopImage={backgroundImage?.desktopImage}
          />
          <TextContentContainer />
        </StyledModalContainer>
      ) : (
        <TextContentContainer />
      )}
    </>
  )
}
