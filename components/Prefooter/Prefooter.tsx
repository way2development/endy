import {
  StyledImgContainer,
  StyledPrefooter,
  StyledTextContainer,
  StyledHeading,
  StyledSubcopy,
  StyledDisclaimer,
  StyledPillContainer
} from './Prefooter.style'
import { CtaLinkProps } from '../CtaLink'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'
import { PromoFlag } from '../PromoFlag/PromoFlag'

interface PrefooterProps {
  /**
   * Promo pill text (optional)
   */
  promoPill?: string
  /**
   * Main heading
   */
  heading: string
  /**
   * Text colour for main heading. Default setting: rubine
   */
  textColor: string
  /**
   * Subcopy to add below heading (optional)
   */
  subcopy?: string
  /**
   * CTA Link
   */
  cta: CtaLinkProps
  /**
   * Background assets for desktop and mobile
   */
  backgroundImage: BackgroundImageProps
  /**
   * Fine print/Disclaimer text (optional)
   */
  disclaimer?: string
}

export const Prefooter = ({
  promoPill,
  heading,
  textColor,
  subcopy,
  cta,
  backgroundImage,
  disclaimer
}: PrefooterProps) => (
  <StyledPrefooter>
    <StyledImgContainer>
      <BackgroundImage
        srcHeights={[200, 300, 650]}
        mobileImage={backgroundImage.mobileImage}
        tabletImage={backgroundImage.tabletImage}
        desktopImage={backgroundImage.desktopImage}
      />
    </StyledImgContainer>
    <StyledTextContainer>
      {promoPill && (
        <StyledPillContainer color={textColor}>
          <PromoFlag
            color={textColor}
            bgColor={textColor}
            promoCopy={promoPill}
          />
        </StyledPillContainer>
      )}
      <StyledHeading variant='h2' color={textColor ? textColor : 'rubine'}>
        {heading}
      </StyledHeading>
      {subcopy && (
        <StyledSubcopy variant='mediumBody' color='gravy'>
          {subcopy}
        </StyledSubcopy>
      )}
      {cta}
      {disclaimer && (
        <StyledDisclaimer color={textColor} variant={'micro'}>
          {disclaimer}
        </StyledDisclaimer>
      )}
    </StyledTextContainer>
  </StyledPrefooter>
)
