import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { Image, ImageProps } from '../Image'
import { Text } from '../Text'
import {
  StyledHeroContainer,
  StyledWrapper,
  StyledHeading,
  StyledImageContainer,
  StyledGraphicImage,
  StyledPillContainer
} from './GenericHero.styled'
import { StyledPageWidth } from '../../styles/global.styled'
import { Grid } from '../Grid'
import { PromoFlag } from '../PromoFlag/PromoFlag'

interface GenericHeroProps {
  /** Heading text */
  heading: string
  /** Subcopy text*/
  subcopy: string
  /** Background Image Assets */
  backgroundImage: BackgroundImageProps
  /** Lifestyle Image Assets */
  lifestyleImage: ImageProps
  /** SVG/PNG Graphic Image Assets */
  graphicImage?: ImageProps
  /** (Optional) Pill / Flag Label */
  pillLabel?: string
}

export const GenericHero = ({
  heading,
  subcopy,
  backgroundImage,
  lifestyleImage,
  graphicImage,
  pillLabel
}: GenericHeroProps) => {
  const backgroundImageProps = {
    srcHeights: [633, 500, 330],
    mobileImage: backgroundImage?.mobileImage,
    tabletImage: backgroundImage?.tabletImage,
    desktopImage: backgroundImage?.desktopImage
  }

  const lifestyleImageProps = {
    srcWidths: [767, 1024, 594],
    mobileImage: lifestyleImage?.mobileImage,
    tabletImage: lifestyleImage?.tabletImage,
    desktopImage: lifestyleImage?.desktopImage,
    alt: ''
  }

  return (
    <StyledHeroContainer>
      <BackgroundImage {...backgroundImageProps}>
        <StyledPageWidth>
          <Grid
            columnRatio={['1', '1', '1:1']}
            rowGap={['0']}
            columnGap={['0']}
          >
            <StyledWrapper>
              {graphicImage && (
                <StyledGraphicImage>
                  <Image
                    desktopImage={graphicImage.desktopImage}
                    tabletImage={graphicImage.tabletImage}
                    mobileImage={graphicImage.mobileImage}
                    alt={graphicImage?.alt}
                    srcWidths={[198, 279, 279]}
                  />
                </StyledGraphicImage>
              )}
              {pillLabel && (
                <StyledPillContainer>
                  <PromoFlag
                    color={'gravy'}
                    bgColor={'gravy'}
                    promoCopy={pillLabel}
                  />
                </StyledPillContainer>
              )}
              <StyledHeading color={'gravy'} variant={'h1'}>
                {heading}
              </StyledHeading>
              <Text color={'gravy'} variant={'mediumBody'}>
                {subcopy}
              </Text>
            </StyledWrapper>
            <StyledImageContainer>
              <Image {...lifestyleImageProps} />
            </StyledImageContainer>
          </Grid>
        </StyledPageWidth>
      </BackgroundImage>
    </StyledHeroContainer>
  )
}
