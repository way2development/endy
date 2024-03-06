import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { ColorProps } from '../../Interfaces/color'
import { StyledPageWidth } from '../../styles/global.styled'

import { CtaLink } from '../CtaLink'

import {
  StyledHeading,
  StyledBadge,
  StyledCallOut,
  StyledMicrocopy,
  StyledCalloutPost,
  StyledWrapper
} from './CalloutPost.styled'
interface CalloutPostProps {
  heading: string
  badgeImage?: BadgeImageProps
  // TODO: Limit color section to brand colors only
  backgroundColor?: ColorProps
  backgroundImage?: BackgroundImageProps
  cta?: React.ElementRef<typeof CtaLink>[]
  microcopy?: string
}
interface CallOutProps {
  heading: string
  badgeImage?: BadgeImageProps
  cta?: React.ElementRef<typeof CtaLink>[]
  microcopy?: string
}

const CallOut = ({ heading, badgeImage, cta, microcopy }: CallOutProps) => {
  return (
    <StyledCallOut>
      <StyledHeading
        variant='h3'
        color='gravy'
        maxWidth={
          cta && microcopy
            ? ['100%', '618px', '100%']
            : ['362px', '400px', '570px']
        }
      >
        {heading}
      </StyledHeading>
      {badgeImage?.image && (
        <StyledBadge paddingBottom={badgeImage && cta ? true : false}>
          <BadgeImage image={badgeImage.image} alt={badgeImage.alt} />
        </StyledBadge>
      )}
      {cta && cta}
      {microcopy && (
        <StyledMicrocopy variant='micro' color='gravy'>
          {microcopy}
        </StyledMicrocopy>
      )}
    </StyledCallOut>
  )
}

export const CalloutPost = ({
  heading,
  backgroundImage,
  backgroundColor,
  badgeImage,
  cta,
  microcopy
}: CalloutPostProps) => {
  return (
    <StyledWrapper>
      {backgroundImage ? (
        <BackgroundImage
          srcHeights={[221, 186, 229]}
          mobileImage={backgroundImage.desktopImage}
          tabletImage={backgroundImage.desktopImage}
          desktopImage={backgroundImage.desktopImage}
        >
          <CallOut
            heading={heading}
            badgeImage={badgeImage}
            cta={cta}
            microcopy={microcopy}
          />
        </BackgroundImage>
      ) : (
        <StyledCalloutPost
          backgroundColor={backgroundColor ? backgroundColor.hex : 'none'}
        >
          <StyledPageWidth>
            <CallOut
              heading={heading}
              badgeImage={badgeImage}
              cta={cta}
              microcopy={microcopy}
            />
          </StyledPageWidth>
        </StyledCalloutPost>
      )}
    </StyledWrapper>
  )
}
