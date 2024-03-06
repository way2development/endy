import { Locale } from '../../types/global-types'

import { ColorProps } from '../../Interfaces/color'
import { Image, ImageProps } from '../Image'
import { BackgroundImage, BackgroundImageProps } from '../BackgroundImage'

import { StyledPageWidth } from '../../styles/global.styled'
import {
  StyledContainer,
  StyledSection,
  StyledDesktopImageContainer,
  StyledDesktopFormContainer,
  StyledMobileOverlayImage,
  StyledDesktopContainer,
  StyledMobileContainer,
  StyledMobileWrapper,
  StyledWrapper,
  StyledFormContainer,
  StyledMobileBackgroundImage
} from './SalesSignUp.styled'

import { SignUpForm } from './SignUpForm'
import { InviteForm } from './InviteForm'
interface SalesSignUpProps {
  backgroundImage: BackgroundImageProps
  bgColor: ColorProps
  ctaLabel: string
  heading: string
  subcopy: string
  lifestyleImage: ImageProps
  lifestyleImagePosition: 'Left' | 'Right'
  locale: Locale
  microcopy: string
  showPhoneNumberSignUp: boolean
  klaviyoSourceId: string
  formType: 'Invite Friends' | 'Newsletter Sign Up'
  showConsentCheckbox?: boolean
}

export const SalesSignUp = ({
  backgroundImage,
  bgColor,
  ctaLabel,
  heading,
  subcopy,
  lifestyleImage,
  lifestyleImagePosition,
  locale,
  microcopy,
  showPhoneNumberSignUp,
  klaviyoSourceId,
  formType,
  showConsentCheckbox
}: SalesSignUpProps) => {
  return (
    <StyledSection bgColor={bgColor} formType={formType} id='sign-up'>
      <StyledMobileContainer>
        <StyledMobileOverlayImage>
          <BackgroundImage
            srcHeights={[600, 600, 775]}
            desktopImage={lifestyleImage?.desktopImage}
            tabletImage={lifestyleImage?.tabletImage}
            mobileImage={lifestyleImage?.mobileImage}
          />
        </StyledMobileOverlayImage>
        <StyledMobileBackgroundImage>
          <BackgroundImage
            srcHeights={[600, 600, 715]}
            mobileImage={backgroundImage?.mobileImage}
            tabletImage={backgroundImage?.tabletImage}
            desktopImage={backgroundImage?.desktopImage}
          >
            <StyledMobileWrapper>
              <StyledPageWidth>
                {formType === 'Newsletter Sign Up' && (
                  <StyledFormContainer formType={formType}>
                    <SignUpForm
                      heading={heading}
                      subcopy={subcopy}
                      microcopy={microcopy}
                      ctaLabel={ctaLabel}
                      locale={locale}
                      showPhoneNumberSignUp={showPhoneNumberSignUp}
                      klaviyoSourceId={klaviyoSourceId}
                      showConsentCheckbox={showConsentCheckbox}
                    />
                  </StyledFormContainer>
                )}
                {formType === 'Invite Friends' && (
                  <StyledFormContainer formType={formType}>
                    <InviteForm
                      heading={heading}
                      subcopy={subcopy}
                      microcopy={microcopy}
                      ctaLabel={ctaLabel}
                      locale={locale}
                      klaviyoSourceId={klaviyoSourceId}
                    />
                  </StyledFormContainer>
                )}
              </StyledPageWidth>
            </StyledMobileWrapper>
          </BackgroundImage>
        </StyledMobileBackgroundImage>
      </StyledMobileContainer>

      <StyledDesktopContainer>
        <BackgroundImage
          srcHeights={[600, 600, 715]}
          mobileImage={backgroundImage?.mobileImage}
          tabletImage={backgroundImage?.tabletImage}
          desktopImage={backgroundImage?.desktopImage}
        >
          <StyledContainer formType={formType}>
            <StyledWrapper lifestyleImagePosition={lifestyleImagePosition}>
              <StyledDesktopFormContainer
                lifestyleImagePosition={lifestyleImagePosition}
                formType={formType}
              >
                {formType === 'Newsletter Sign Up' && (
                  <SignUpForm
                    heading={heading}
                    subcopy={subcopy}
                    microcopy={microcopy}
                    ctaLabel={ctaLabel}
                    locale={locale}
                    showPhoneNumberSignUp={showPhoneNumberSignUp}
                    klaviyoSourceId={klaviyoSourceId}
                    showConsentCheckbox={showConsentCheckbox}
                  />
                )}
                {formType === 'Invite Friends' && (
                  <InviteForm
                    heading={heading}
                    subcopy={subcopy}
                    microcopy={microcopy}
                    ctaLabel={ctaLabel}
                    locale={locale}
                    klaviyoSourceId={klaviyoSourceId}
                  />
                )}
              </StyledDesktopFormContainer>

              <StyledDesktopImageContainer
                lifestyleImagePosition={lifestyleImagePosition}
                formType={formType}
              >
                <Image
                  srcWidths={[768, 1024]}
                  desktopImage={lifestyleImage?.desktopImage}
                  tabletImage={lifestyleImage?.tabletImage}
                  mobileImage={lifestyleImage?.mobileImage}
                  alt={lifestyleImage?.alt}
                />
              </StyledDesktopImageContainer>
            </StyledWrapper>
          </StyledContainer>
        </BackgroundImage>
      </StyledDesktopContainer>
    </StyledSection>
  )
}
