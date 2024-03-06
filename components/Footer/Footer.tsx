import dictionary from '../../dictionary.json'
import { CtaLink } from '../CtaLink'
import { FooterMenu } from './FooterMenu/FooterMenu'
import { SocialLinks } from './SocialLinks'
import { DigiCertLogo } from './DigiCertLogo'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import {
  StyledFooter,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledLanguageList,
  StyledLanguageLink,
  StyledConnectContainer,
  StyledMenuColumnOne,
  StyledConnectContent,
  StyledIconsDesktop,
  StyledIconsMobile,
  StyledTermsContainer,
  StyledTerms,
  StyledTermsLink
} from './Footer.styled'
import { NewsletterJoin } from '../NewsletterJoin/NewsletterJoin'
import { Locale } from '../../types/global-types'
import { StyledPageWidth } from '../../styles/global.styled'
import { StyledExtoleFooterButton } from './FooterMenu/FooterMenu.styled'

interface Links {
  _key: string
  label: string
  url: string
}
interface Socials {
  _key: string
  icon: BadgeImageProps
  url: string
  ariaLabel: string
  title: string
  fallbackText: string
}
interface FooterProps {
  /** * Footer logo */
  logo: BadgeImageProps
  /** Available languages */
  languages: Links[]
  /** Category title of first footer menu */
  menuHeading1: string
  /** Links that appear in first footer menu */
  menuList1: Links[]
  /** Category title of second footer menu */
  menuHeading2: string
  /** Links that appear in second footer menu */
  menuList2: Links[]
  /** Category title of third footer menu */
  menuHeading3: string
  /** Links that appear in third footer menu */
  menuList3: Links[]
  /** Social media icons and links */
  socialIcons: Socials[]
  /** DigiCert logo */
  digiCertImg: BadgeImageProps
  /** Links that appear in the sub-footer */
  subfooterLinks: Links[]
  /** Locale*/
  locale: Locale
  extoleRef: React.LegacyRef<HTMLSpanElement> | undefined
}

export const Footer = ({
  logo,
  languages,
  menuHeading1,
  menuList1,
  menuHeading2,
  menuList2,
  menuHeading3,
  menuList3,
  socialIcons,
  digiCertImg,
  subfooterLinks,
  locale,
  extoleRef
}: FooterProps) => {
  return (
    <StyledFooter role='contentinfo'>
      <StyledPageWidth>
        <StyledContentContainer>
          <StyledLogoContainer>
            <StyledIconsMobile>
              <SocialLinks socialLinks={socialIcons} />
              <DigiCertLogo image={digiCertImg?.image} alt={digiCertImg?.alt} />
            </StyledIconsMobile>
            <StyledLogo>
              <BadgeImage alt={logo?.alt} image={logo?.image} />
            </StyledLogo>
            <StyledLanguageList>
              {/* TODO: Links should be switched out for localization */}
              {languages.map((language) => {
                return (
                  <StyledLanguageLink key={language.url}>
                    <CtaLink
                      variant='inline'
                      url={language.url}
                      locale={locale}
                      label={language.label}
                    />
                  </StyledLanguageLink>
                )
              })}
            </StyledLanguageList>
          </StyledLogoContainer>

          <StyledMenuColumnOne>
            <FooterMenu heading={menuHeading1} linkList={menuList1} />
            {locale === 'en' && (
              <StyledExtoleFooterButton>
                <span id='extole_zone_global_footer' ref={extoleRef}>
                  {dictionary[locale].referAFriend}
                </span>
              </StyledExtoleFooterButton>
            )}
          </StyledMenuColumnOne>
          <FooterMenu heading={menuHeading2} linkList={menuList2} />
          <FooterMenu heading={menuHeading3} linkList={menuList3} />
          <StyledConnectContainer>
            <StyledConnectContent>
              <NewsletterJoin isMobile={false} locale={locale} />
              <StyledIconsDesktop>
                <SocialLinks socialLinks={socialIcons} />
                <DigiCertLogo
                  image={digiCertImg?.image}
                  alt={digiCertImg?.alt}
                />
              </StyledIconsDesktop>
            </StyledConnectContent>
          </StyledConnectContainer>
        </StyledContentContainer>
      </StyledPageWidth>

      <StyledTermsContainer>
        <StyledPageWidth>
          <StyledTerms>
            {subfooterLinks?.map((link) => {
              return (
                <StyledTermsLink key={link.url}>
                  <CtaLink
                    variant='inline'
                    url={link.url}
                    locale={locale}
                    label={link.label}
                  />
                </StyledTermsLink>
              )
            })}
          </StyledTerms>
        </StyledPageWidth>
      </StyledTermsContainer>
    </StyledFooter>
  )
}
