import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import Link from 'next/link'
import { StyledVisuallyHidden } from '../../styles/global.styled'
import {
  StyledText,
  StyledSocialIcons,
  SocialSharesContainer
} from './SocialShareIcons.styled'

interface SocialShareIconsProps {
  slug: string
  title: string
  locale: Locale
}

export const SocialShareIcons = ({
  slug,
  title,
  locale
}: SocialShareIconsProps) => {
  const localizedDictionary = dictionary[locale]

  const socials = [
    {
      icon: 'https://cdn.sanity.io/images/d0kd7r9c/production/eae5beecfea4a776e768f388c6423e9e77ef9ce4-12x21.svg?fit=max&w=1200&h=1200',
      url: `https://www.facebook.com/sharer.php?u=https://endy.com${slug}`,
      ariaLabel: localizedDictionary.shareOnFacebook
    },
    {
      icon: 'https://cdn.sanity.io/images/d0kd7r9c/production/cc881a0f88da6964501b75a1f2a317a6156e4f0c-18x21.svg',
      url: `https://pinterest.com/pin/create/bookmarklet/?url=https://endy.com${slug}&description=${title}`,
      ariaLabel: localizedDictionary.shareOnPinterest
    },
    {
      icon: 'https://cdn.sanity.io/images/d0kd7r9c/production/f452b7a58d85c3f0c652cc36a8945c73571b281f-19x17.svg?fit=max&w=1200&h=1200',
      url: `https://twitter.com/share?url=https://endy.com${slug}&text=${title}`,
      ariaLabel: localizedDictionary.shareOnTwitter
    }
  ]

  return (
    <SocialSharesContainer>
      <div>
        <StyledText color={'gravy70'} variant={'micro'} element={'span'}>
          {localizedDictionary.share}
          <StyledVisuallyHidden>
            {localizedDictionary.onSocialMedia}
          </StyledVisuallyHidden>
        </StyledText>
      </div>
      <StyledSocialIcons>
        {socials.map((social) => {
          return (
            <li key={social.url}>
              <Link
                href={social.url}
                locale={locale}
                aria-label={social.ariaLabel}
                target={'_blank'}
                rel={'noreferrer'}
              >
                {/* TODO: Update the icon to the Icon component when ready */}
                <img src={social.icon} alt='' />
              </Link>
            </li>
          )
        })}
      </StyledSocialIcons>
    </SocialSharesContainer>
  )
}
