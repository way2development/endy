import { Image, ImageProps } from '../Image'
import {
  StyledCard,
  StyledTextContainer,
  StyledText,
  StyledUrlLabel,
  StyledUrlArrow
} from './ArticleCard.styled'
import { Locale } from '../../types/global-types'

export interface ArticleCardProps {
  lifestyleImage: ImageProps
  heading: string
  subcopy: string
  url: string
  urlLabel: string
  locale: Locale
}

export const ArticleCard = ({
  lifestyleImage,
  heading,
  subcopy,
  url,
  urlLabel,
  locale
}: ArticleCardProps) => {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer'>
      <StyledCard>
        {lifestyleImage && (
          <Image
            desktopImage={lifestyleImage.desktopImage}
            mobileImage={lifestyleImage.mobileImage}
            tabletImage={lifestyleImage.tabletImage}
            alt={lifestyleImage.alt}
            srcWidths={[306, 298, 378]}
          />
        )}
        <StyledTextContainer isFrench={locale === 'fr'}>
          <StyledText color='gravy' variant='h5'>
            {heading}
          </StyledText>
          <p>{subcopy}</p>
          <StyledUrlLabel>
            {urlLabel}
            <StyledUrlArrow aria-hidden='true'> →</StyledUrlArrow>
          </StyledUrlLabel>
        </StyledTextContainer>
      </StyledCard>
    </a>
  )
}
