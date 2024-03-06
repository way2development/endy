import { Locale } from '../../types/global-types'
import { SupportLinkColumn } from './SupportLinkColumn'
import { StyledPageWidth } from '../../styles/global.styled'
import { ColorProps } from '../../Interfaces/color'
import {
  StyledCard,
  StyledGrid,
  StyledHeading,
  StyledContainer
} from './SupportLinks.styled'
interface SupportLinksProps {
  supportLinkColumns: React.ElementRef<typeof SupportLinkColumn>[]
  heading: string
  locale: Locale
  backgroundColor: ColorProps
}

export const SupportLinks = ({
  supportLinkColumns = [],
  heading,
  backgroundColor
}: SupportLinksProps) => {
  return (
    <StyledContainer backgroundColor={backgroundColor?.hex}>
      <StyledPageWidth>
        <StyledCard>
          <StyledHeading color='gravy' variant='h2'>
            {heading}
          </StyledHeading>
          <StyledGrid>{supportLinkColumns}</StyledGrid>
        </StyledCard>
      </StyledPageWidth>
    </StyledContainer>
  )
}
