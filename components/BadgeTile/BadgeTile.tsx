import {
  StyledTextBadge,
  StyledIconBadge,
  StyledText
} from './BadgeTile.styled'
import { BadgeImage, BadgeImageProps } from '../BadgeImage/BadgeImage'
import { Text } from '../Text/Text'
import { StyledSemibold } from '../../styles/global.styled'
interface BadgeTileProps {
  /** Heading copy */
  heading: string
  /** Subcopy to add below heading */
  subcopy: string
  /** Badge image that sits beside heading and subcopy */
  badgeImage: BadgeImageProps
}

export const BadgeTile = ({ heading, subcopy, badgeImage }: BadgeTileProps) => {
  return (
    <StyledTextBadge>
      <StyledIconBadge>
        <BadgeImage image={badgeImage.image} alt={badgeImage.alt} />
      </StyledIconBadge>

      <StyledText>
        <Text variant='mediumBody' element='h4' color={'gravy'}>
          <StyledSemibold>{heading}</StyledSemibold>
        </Text>
        <Text color={'gravy'} variant={'mediumBody'}>
          {subcopy}
        </Text>
      </StyledText>
    </StyledTextBadge>
  )
}
