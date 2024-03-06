import React from 'react'
import {
  StyledPublishedDate,
  StyledFlexRow,
  StyledFlexEnd,
  StyledAuthor,
  StyledHeading,
  StyledArticle,
  StyledContent
} from './ArticleContent.styled'
import { SocialShareIcons } from '../SocialShareIcons'
import { Text } from '../Text/Text'
import { RichText } from '../RichText/RichText'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'

interface ArticleContentProps {
  formattedPublishedDate: string
  current: string
  heading: string
  author: string
  body: {
    props: {
      value: React.ElementRef<typeof RichText>
    }
  }
  locale: Locale
}

export const ArticleContent: React.FC<ArticleContentProps> = ({
  formattedPublishedDate,
  current,
  heading,
  author,
  body,
  locale
}) => {
  const localizedDictionary = dictionary[locale]

  return (
    <StyledArticle>
      <StyledFlexRow>
        <StyledPublishedDate variant={'smallBody'} color={'gravy'}>
          {formattedPublishedDate}
        </StyledPublishedDate>
        <SocialShareIcons slug={current} title={heading} locale={locale} />
      </StyledFlexRow>

      <StyledHeading variant={'h1'} color={'gravy'}>
        {heading}
      </StyledHeading>

      <StyledAuthor>
        <Text variant={'smallBody'} color={'gravy'} element={'span'}>
          {localizedDictionary.by} {author}
        </Text>
      </StyledAuthor>
      <StyledContent>
        <RichText value={body.props.value} locale={locale} />
      </StyledContent>

      <StyledFlexEnd>
        <SocialShareIcons slug={current} title={heading} locale={locale} />
      </StyledFlexEnd>
    </StyledArticle>
  )
}
