import React from 'react'
import { Text } from '../Text'
import {
  StyledFigure,
  StyledBlockQuote,
  StyledAuthor,
  StyledAuthorContainer
} from './QuoteCard.styled'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { ColorProps } from '../../Interfaces/color'
import { theme } from '../../styles/theme'

export interface QuoteProps {
  quote: string
  author: string
  backgroundColor?: ColorProps
  backgroundImage?: BackgroundImageProps
}

interface BlockQuoteProps {
  quote: string
  author: string
}

const BlockQuote = ({ quote, author }: BlockQuoteProps) => {
  return (
    <>
      <StyledBlockQuote variant={'h3'} color={'gravy'} element={'blockquote'}>
        {quote}
      </StyledBlockQuote>

      {author && (
        <Text variant={'smallBody'} color={'gravy'} element={'figcaption'}>
          <StyledAuthorContainer>
            — <StyledAuthor>{author}</StyledAuthor>
          </StyledAuthorContainer>
        </Text>
      )}
    </>
  )
}

export const QuoteCard = ({
  quote,
  author,
  backgroundColor,
  backgroundImage
}: QuoteProps) => {
  return (
    <>
      {backgroundImage ? (
        <BackgroundImage
          srcHeights={[221, 186, 229]}
          mobileImage={backgroundImage.desktopImage}
          tabletImage={backgroundImage.desktopImage}
          desktopImage={backgroundImage.desktopImage}
        >
          <StyledFigure>
            <BlockQuote quote={quote} author={author} />
          </StyledFigure>
        </BackgroundImage>
      ) : (
        <StyledFigure
          backgroundColor={
            backgroundColor ? backgroundColor.hex : `${theme.colors.mint}`
          }
        >
          <BlockQuote quote={quote} author={author} />
        </StyledFigure>
      )}
    </>
  )
}
