import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { Text } from '../Text'
import { CtaLinkProps } from '../CtaLink'
import {
  StyledGridItem,
  StyledGridIcon,
  StyledIconTooltip,
  StyledCtaLink
} from './ValuePoints.styled'
export interface ValueColumnsProps {
  _key: string
  subcopy?: string
  heading: string
  badgeImage: BadgeImageProps
  tooltip: string
  cta?: CtaLinkProps
}

export const ValueColumn = ({
  subcopy,
  heading,
  badgeImage,
  tooltip,
  _key,
  cta
}: ValueColumnsProps) => {
  return (
    <StyledGridItem key={_key}>
      <StyledGridIcon>
        {badgeImage && (
          <BadgeImage image={badgeImage.image} alt={badgeImage.alt} />
        )}
        {tooltip && (
          <StyledIconTooltip>
            <Text color={'gravy80'} variant={'smallBody'} element={'span'}>
              {tooltip}
            </Text>
          </StyledIconTooltip>
        )}
      </StyledGridIcon>
      <Text color='rubine' variant='h4'>
        {heading}
      </Text>
      {subcopy && (
        <Text color='gravy' variant='mediumBody'>
          {subcopy}
        </Text>
      )}
      {cta && <StyledCtaLink>{cta}</StyledCtaLink>}
    </StyledGridItem>
  )
}
