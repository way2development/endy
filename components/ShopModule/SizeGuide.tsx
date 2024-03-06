import React from 'react'
import {
  StyledDrawer,
  StyledUnderline,
  StyledClose,
  StyledBack,
  StyledSizingText,
  StyledCloseContainer,
  StyledHeading
} from './SizeGuide.styled'
import dictionary from '../../dictionary.json'
import { Locale } from 'types/global-types'
import { StyledArrow } from '../CtaLink/CtaLink.styled'

interface SizeGuideProps {
  sizeGuide: {
    heading: string
    content: any
  }
  isSizeGuideOpen: boolean
  toggleSizeGuide: () => void
  locale: Locale
}

const closeIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/7c498bc282aed9b4c6685490068af6f2cc4c2e56-48x48.svg'

export const SizeGuide = ({
  sizeGuide,
  isSizeGuideOpen,
  toggleSizeGuide,
  locale
}: SizeGuideProps) => {
  const { heading, content } = sizeGuide || {}
  const localizedDictionary = dictionary[locale]

  return (
    <StyledDrawer
      anchor='right'
      open={isSizeGuideOpen}
      onClose={toggleSizeGuide}
    >
      <StyledCloseContainer
        variant={'largeBody'}
        color={'gravy'}
        element={'div'}
      >
        <StyledBack
          onClick={toggleSizeGuide}
          aria-label={localizedDictionary.closeModal}
          aria-expanded={isSizeGuideOpen}
        >
          <StyledArrow aria-hidden='true'>←</StyledArrow>
          {localizedDictionary.back}{' '}
        </StyledBack>

        <StyledClose
          onClick={toggleSizeGuide}
          aria-label={localizedDictionary.closeModal}
          aria-expanded={isSizeGuideOpen}
        >
          {/* TODO: Update the icon to the Icon component when ready */}
          <img src={closeIcon} alt='' />
        </StyledClose>
      </StyledCloseContainer>

      <StyledHeading color={'gravy'} variant={'h2'}>
        {heading}
        <StyledUnderline></StyledUnderline>
      </StyledHeading>

      <StyledSizingText variant={'mediumBody'} color={'gravy'} element={'div'}>
        {content}
      </StyledSizingText>
    </StyledDrawer>
  )
}
