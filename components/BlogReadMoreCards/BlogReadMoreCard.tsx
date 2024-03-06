import { Image, ImageProps } from '../Image'
import { Locale } from '../../types/global-types'
import { CtaLink } from '../CtaLink/CtaLink'
import { getFormattedDate } from '../../lib/time'
import {
  StyledCardLink,
  StyledCard,
  StyledCardHeading,
  StyledDate,
  StyledContent
} from './BlogReadMoreCards.styled'

export interface BlogReadMoreCardProps {
  image: ImageProps
  heading: string
  url: string
  category: string
  publishedAt: string
  locale: Locale
}

export const BlogReadMoreCard = ({
  image,
  heading,
  url,
  category,
  publishedAt,
  locale
}: BlogReadMoreCardProps) => {
  const formattedDate = getFormattedDate(
    publishedAt,
    { month: 'long', day: 'numeric', year: 'numeric' },
    locale
  )

  return (
    <StyledCardLink
      href={`https://www.endy.com/blog/${category}/${url}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <StyledCard>
        <StyledCardHeading element={'h3'} color={'gravy70'} variant={'h5'}>
          {heading}
        </StyledCardHeading>
        {image && (
          <Image
            desktopImage={image?.desktopImage}
            mobileImage={image?.mobileImage}
            tabletImage={image?.tabletImage}
            alt={image?.alt}
            srcWidths={[618, 824, 374]}
          />
        )}
        <StyledContent>
          <CtaLink
            url={`https://www.endy.com/blog/${category}/${url}`}
            variant={'block-line-gravy'}
            label={'Read More'}
          />
          <StyledDate element={'p'} color={'gravy'} variant={'mediumBody'}>
            {formattedDate}
          </StyledDate>
        </StyledContent>
      </StyledCard>
    </StyledCardLink>
  )
}
