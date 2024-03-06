import dictionary from '../../dictionary.json'
import { StyledPrevButton, StyledNextButton } from './ProductCarousel.styled'

interface CarouselButtonsProps {
  enabled: boolean
  onClick: () => void
  chevronIcon?: string
}

// TODO: Revisit replacing hard-coded Shopify CDNs
const chevronSvg =
  'https://cdn.shopify.com/s/files/1/0764/8025/t/275/assets/chevron-left-white-16x16.svg'

export const PrevButton = ({
  enabled,
  onClick,
  chevronIcon = chevronSvg
}: CarouselButtonsProps) => (
  <>
    {enabled && (
      <StyledPrevButton
        onClick={onClick}
        disabled={!enabled}
        aria-label={dictionary.en.prevCarouselButton}
      >
        <img src={chevronIcon} alt='' />
      </StyledPrevButton>
    )}
  </>
)

export const NextButton = ({
  enabled,
  onClick,
  chevronIcon = chevronSvg
}: CarouselButtonsProps) => (
  <>
    {enabled && (
      <StyledNextButton
        onClick={onClick}
        disabled={!enabled}
        aria-label={dictionary.en.nextCarouselButton}
      >
        <img src={chevronIcon} alt='' />
      </StyledNextButton>
    )}
  </>
)
