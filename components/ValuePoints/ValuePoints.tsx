import { ValueColumn } from './ValueColumn'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { CtaLink } from '../CtaLink'
import { StyledPageWidth } from '../../styles/global.styled'
import { ColorProps } from '../../Interfaces/color'
import {
  ValuePointsBackgroundContainer,
  StyledCard,
  StyledValuePointsGrid,
  StyledHeading,
  StyledValuePointsContainer,
  StyledMicrocopy
} from './ValuePoints.styled'

interface ValuePointProps {
  /**
   * Must provide description, icon url and title content
   */
  valueColumns: React.ElementRef<typeof ValueColumn>[]
  /**
   * Optional heading text
   */
  heading?: string
  /**
   * Optional microcopy test
   */
  microcopy?: string
  /**
   * Optional CTA Button
   */
  cta?: React.ElementRef<typeof CtaLink>[]
  /**
   * Optional Sanity background image object
   */
  backgroundImage?: BackgroundImageProps
  backgroundColor?: ColorProps
}

export const ValuePoints = ({
  valueColumns = [],
  heading,
  microcopy,
  cta,
  backgroundImage,
  backgroundColor
}: ValuePointProps) => {
  return (
    <StyledValuePointsContainer
      backgroundColor={backgroundColor?.hex}
      hasBackgroundImage={backgroundImage ? true : false}
    >
      {backgroundImage && (
        <ValuePointsBackgroundContainer>
          <BackgroundImage
            srcHeights={[500, 500, 500]}
            mobileImage={backgroundImage.desktopImage}
            tabletImage={backgroundImage.desktopImage}
            desktopImage={backgroundImage.desktopImage}
          />
        </ValuePointsBackgroundContainer>
      )}
      <StyledPageWidth>
        <StyledCard>
          {heading && (
            <StyledHeading color='gravy' variant='h2'>
              {heading}
            </StyledHeading>
          )}
          <StyledValuePointsGrid>{valueColumns}</StyledValuePointsGrid>
          {cta && cta}
          {microcopy && (
            <StyledMicrocopy color='gravy70' variant='smallBody'>
              {microcopy}
            </StyledMicrocopy>
          )}
        </StyledCard>
      </StyledPageWidth>
    </StyledValuePointsContainer>
  )
}
