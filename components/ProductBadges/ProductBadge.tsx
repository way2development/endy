import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { Text } from '../Text'
import { StyledSemibold } from '../../styles/global.styled'

import { StyledProductBadge } from '../../styles/global.styled'

import {
  StyledBadgeTooltip,
  StyledBadgeContainer,
  StyledLink
} from './ProductBadge.styled'
export interface ProductBadgeProps {
  anchorUrl?: string
  key: string
  heading: string
  badgeImage: BadgeImageProps
  tooltip?: string
}

export const ProductBadge = ({
  anchorUrl,
  heading,
  badgeImage,
  tooltip
}: ProductBadgeProps) => {
  const hasTooltip = tooltip ? true : false

  const onClick = () => {
    if (!anchorUrl) return

    const anchorEl = document.getElementById(anchorUrl)

    if (anchorEl) {
      const isExpanded = anchorEl.getAttribute('aria-expanded')
      if (isExpanded === 'true') return

      anchorEl.click()
    }
  }

  const ProductBadgeContent = () => {
    return (
      <>
        <StyledProductBadge>
          {badgeImage && <BadgeImage image={badgeImage.image} alt='' />}
        </StyledProductBadge>
        <Text color={'gravy80'} variant={'smallBody'}>
          <StyledSemibold>{heading} </StyledSemibold>
          {tooltip && (
            // TODO: Switch to icon component when ready
            <img
              src='https://cdn.sanity.io/images/d0kd7r9c/production/af9d6d44eabc973c05c23f9cfb842104136609c9-12x12.svg'
              alt=''
            />
          )}
        </Text>
        {tooltip && (
          <StyledBadgeTooltip>
            <Text color={'gravy80'} variant={'smallBody'} element={'span'}>
              {tooltip}
            </Text>
          </StyledBadgeTooltip>
        )}
      </>
    )
  }
  return (
    <StyledBadgeContainer tooltip={hasTooltip}>
      {hasTooltip && !anchorUrl && <ProductBadgeContent />}

      {anchorUrl && !hasTooltip ? (
        <StyledLink
          href={`#${anchorUrl}`}
          onClick={() => onClick()}
          tooltip={hasTooltip}
        >
          <ProductBadgeContent />
        </StyledLink>
      ) : (
        <ProductBadgeContent />
      )}
    </StyledBadgeContainer>
  )
}
