import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { StyledDigiCertLogo } from './Footer.styled'

export const DigiCertLogo = ({ image, alt }: BadgeImageProps) => {
  return (
    <StyledDigiCertLogo>
      <BadgeImage alt={alt} image={image} />
    </StyledDigiCertLogo>
  )
}
