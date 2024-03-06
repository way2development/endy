import { useEffect, useState } from 'react'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'
import { Text } from '../Text'
import { AccordionList } from '../Accordion/AccordionList'
import {
  StyledStackedMediaContainer,
  StyledStackedMedia,
  StyledSubheading,
  StyledHeading,
  StyledTextContainer,
  StyledAccordionContainer,
  StyledWrapper,
  StyledSection
} from './StackedMedia.styled'
import { StyledTextDivider } from '../../styles/global.styled'
import { Image, ImageProps } from '../Image'
import { Video, VideoProps } from '../Video'
import { theme } from '../../styles/theme'
interface ColumnProps {
  heading: string
  showOpenedAccordion: boolean
  subcopy: string
  video?: VideoProps
  mainImage?: ImageProps
  productImage?: ImageProps
}

interface StackedMediaProps {
  /** Heading copy */
  heading: string
  /** Three mediaItems */
  columnOne: ColumnProps
  columnTwo: ColumnProps
  columnThree: ColumnProps
  icon: string
  /** Selected Location */
  locale: Locale
  bgColor?: { hex: string }
}

const closeIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/2639df01ed0af653c63813c041d013978fb41a36-12x13.svg'

export const StackedMedia = ({
  heading,
  columnOne,
  columnTwo,
  columnThree,
  icon = closeIcon,
  locale,
  bgColor
}: StackedMediaProps) => {
  const [showAccordion, setShowAccordion] = useState(false)
  const [mediaItems, setMediaItems] = useState<ColumnProps[]>([])

  const toggleAccordion = () => {
    setShowAccordion(!showAccordion)
  }

  useEffect(() => {
    // check if columnThree has more than 1 property (properties other than showOpenedAccordion)
    if (Object.keys(columnThree).length > 1) {
      setMediaItems([columnOne, columnTwo, columnThree])
    } else {
      setMediaItems([columnOne, columnTwo])
    }
  }, [])

  const stackedMedia = mediaItems.map((media, i) => {
    const {
      heading,
      showOpenedAccordion,
      video,
      mainImage,
      productImage,
      subcopy
    } = media
    return (
      <StyledStackedMedia
        key={mainImage?.desktopImage?.asset?._ref || video?.src}
      >
        {video && <Video variant='mini' src={video.src} />}

        {!video && mainImage && (
          <Image
            alt={mainImage.alt}
            desktopImage={mainImage.desktopImage}
            tabletImage={mainImage.tabletImage}
            mobileImage={mainImage.mobileImage}
            srcWidths={[768, 1024]}
          />
        )}

        {productImage && (
          <Image
            alt={productImage.alt}
            desktopImage={productImage.desktopImage}
            tabletImage={productImage.tabletImage}
            mobileImage={productImage.mobileImage}
            srcWidths={[768, 1024]}
          />
        )}

        <StyledTextContainer>
          <StyledSubheading variant={'h4'} color={'gravy'} element={'h3'}>
            {heading}
          </StyledSubheading>
          {/* TODO: Position subcopy to the bottom of the container in case subheading gets too long */}
          <Text variant={'mediumBody'} color={'gravy'}>
            {subcopy}
          </Text>
        </StyledTextContainer>
        <StyledAccordionContainer>
          <AccordionList
            accordionItems={[
              {
                heading,
                content: (
                  <Text variant={'mediumBody'} color={'gravy'}>
                    {subcopy}
                  </Text>
                ),
                toggleItem: toggleAccordion,
                showItem: showOpenedAccordion,
                index: i,
                icon
              }
            ]}
            bgColor={{ hex: `${theme.colors.white}` }}
          />
        </StyledAccordionContainer>
      </StyledStackedMedia>
    )
  })

  return (
    <StyledSection bgColor={bgColor}>
      <StyledWrapper>
        <StyledTextDivider>
          <StyledHeading
            variant={'h2'}
            color={
              // TODO: check if the current route is the Customizable Pillow and remove string
              heading.toLowerCase().includes(dictionary[locale].foam)
                ? 'rubine'
                : 'gravy'
            }
          >
            {heading}
          </StyledHeading>
        </StyledTextDivider>
        <StyledStackedMediaContainer>
          {stackedMedia}
        </StyledStackedMediaContainer>
      </StyledWrapper>
    </StyledSection>
  )
}
