import { useState } from 'react'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { StyledSocialIconContainer, StyledSocialIcon } from './Footer.styled'

interface SocialLinksProps {
  socialLinks: Links[]
}

interface Links {
  _key: string
  icon: BadgeImageProps
  url: string
  ariaLabel: string
  title: string
  fallbackText: string
}

export const SocialLinks = ({ socialLinks }: SocialLinksProps) => {
  const [isSocialsActive, setIsSocialsActive] = useState(false)

  return (
    <StyledSocialIconContainer>
      {socialLinks &&
        socialLinks.map((social) => {
          return (
            <StyledSocialIcon
              key={social._key}
              onMouseEnter={() => setIsSocialsActive(true)}
              onMouseLeave={() => setIsSocialsActive(false)}
              isSocialActive={isSocialsActive}
            >
              <a
                target='_blank'
                href={social.url}
                aria-label={social.ariaLabel}
                title={social.title}
                rel='noreferrer'
              >
                <BadgeImage
                  width='auto'
                  height='100%'
                  image={social.icon.image}
                  alt=''
                />
                <span aria-label={social.fallbackText} />
              </a>
            </StyledSocialIcon>
          )
        })}
    </StyledSocialIconContainer>
  )
}
