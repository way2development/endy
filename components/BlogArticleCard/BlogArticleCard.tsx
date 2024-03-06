import { Image, ImageProps } from '../Image'
import {
  StyledCardLink,
  StyledBlogsCardContainer,
  StyledHeader,
  StyledSubcopyText,
  StyledFormattedDate
} from './BlogArticleCard.styled'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import { getFormattedDate } from '../../lib/time'
import { CtaLink } from '../CtaLink'

export interface BlogArticleCardProps {
  lifestyleImage: ImageProps
  heading: string
  subcopy: string
  publishedDate: Date | string
  url: string
  locale: Locale
}

export const BlogArticleCard = ({
  lifestyleImage,
  heading,
  subcopy,
  publishedDate,
  url,
  locale
}: BlogArticleCardProps) => {
  const localizedDictionary = dictionary[locale]
  const formattedDate = getFormattedDate(
    publishedDate,
    { month: 'long', day: 'numeric', year: 'numeric' },
    locale
  )

  return (
    <StyledCardLink href={`${url}`} locale={locale}>
      {lifestyleImage && (
        <Image
          desktopImage={lifestyleImage?.desktopImage}
          mobileImage={lifestyleImage?.mobileImage}
          tabletImage={lifestyleImage?.tabletImage}
          alt={lifestyleImage?.alt}
          srcWidths={[768, 1024]}
        />
      )}
      <StyledBlogsCardContainer>
        <StyledHeader color='gravy' variant='h3'>
          {heading}
        </StyledHeader>
        <StyledFormattedDate variant='smallBody' color='gravy'>
          {formattedDate}
        </StyledFormattedDate>
        <StyledSubcopyText variant='mediumBody' color='gravy'>
          {subcopy}
        </StyledSubcopyText>

        <span>
          <CtaLink
            url={url}
            label={localizedDictionary.readMore}
            variant='block-line-gravy'
            locale={locale}
          />
        </span>
      </StyledBlogsCardContainer>
    </StyledCardLink>
  )
}
