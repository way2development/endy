import { Button } from '../Button/Button'
import {
  StyledHeadingContainer,
  StyledSubcopy,
  StyledSecondaryHeading,
  StyledHeading,
  StyledListContainer,
  StyledMain,
  StyledCtaContainer,
  StyledButtonContainer
} from './TextModal.styled'
import { PromoPill } from '../PromoPill'
import { Text } from '../Text/Text'
import { Locale } from '../../types/global-types'

export interface TextModalProps {
  /** Heading copy */
  heading: string
  /** Secondary heading copy */
  subheading?: string
  /** Array of text to be shown in the modal */
  body: HTMLElement | JSX.Element
  /** Subcopy below heading */
  subcopy: string
  /** Button that appears at the bottom of the modal to close the modal */
  buttonLabel: string
  /** Optonal sale promo pill that appears above heading */
  pillLabel?: string
  /** Function that triggers when button in the text model is clicked */
  onButtonClick: () => void
  cta?: JSX.Element
  locale: Locale
}

export const TextModal = ({
  heading,
  subheading,
  body,
  subcopy,
  buttonLabel,
  pillLabel,
  onButtonClick,
  cta,
  locale
}: TextModalProps) => {
  return (
    <StyledMain>
      <StyledHeadingContainer>
        {pillLabel && (
          <PromoPill promoCopy={pillLabel} variant='gravy' locale={locale} />
        )}
        <StyledHeading color={'gravy'} variant={'h3'}>
          {heading}
        </StyledHeading>
        <StyledSubcopy color={'gravy'} variant='mediumBody'>
          {subcopy}
        </StyledSubcopy>
      </StyledHeadingContainer>
      <div>
        <StyledSecondaryHeading color={'gravy'} variant={'mediumBody'}>
          {subheading}
        </StyledSecondaryHeading>
        <StyledListContainer>
          <Text color={'gravy'} variant={'mediumBody'}>
            {body}
          </Text>
        </StyledListContainer>
      </div>
      <StyledButtonContainer>
        <Button
          label={buttonLabel}
          variant='solid-rubine'
          onClick={onButtonClick}
        />
      </StyledButtonContainer>
      {cta && <StyledCtaContainer>{cta}</StyledCtaContainer>}
    </StyledMain>
  )
}
