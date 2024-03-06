import { Locale } from '../../types/global-types'

import { Text } from '../Text'
import { StyledAnchor } from './OutboundLinks.styled'
import { StyledSemibold } from '../../styles/global.styled'
interface OutboundLinksProps {
  outboundLinks: OutboundLinkProps[]
  locale: Locale
}

interface OutboundLinkProps {
  label: string
  url: string
}

const chevronIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/559650a3cd713e72f7139bf876b3e4d9faf5ca43-16x16.svg'

export const OutboundLinks = ({
  outboundLinks,
  locale
}: OutboundLinksProps) => {
  if (outboundLinks.length === 0) return null

  return (
    <>
      {outboundLinks.map((link) => (
        <StyledAnchor href={link.url} locale={locale} key={link.url}>
          <Text variant={'mediumBody'} color={'gravy'} element={'span'}>
            <StyledSemibold>{link.label}</StyledSemibold>
          </Text>
          <img src={chevronIcon} alt='' />
        </StyledAnchor>
      ))}
    </>
  )
}
