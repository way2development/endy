import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { Grid } from '../Grid'
import { useRouter } from 'next/router'

import {
  StyledBadgeContainer,
  StyledTooltip,
  StyledContainer
} from './AwardsGrid.styled'

interface AwardsGridProps {
  awards: AwardProps[]
}

interface AwardProps {
  badgeImage: BadgeImageProps
  showOnMobile: boolean
  tooltipText: string
}

const Award = ({ badgeImage, showOnMobile, tooltipText }: AwardProps) => {
  return (
    <StyledBadgeContainer showOnMobile={showOnMobile}>
      <BadgeImage image={badgeImage.image} alt={badgeImage.alt} />
      {tooltipText && <StyledTooltip>{tooltipText}</StyledTooltip>}
    </StyledBadgeContainer>
  )
}

export const AwardsGrid = ({ awards }: AwardsGridProps) => {
  // Custom layout for module on Private Sale LP
  const router = useRouter()
  const currentQuerySlug = router?.asPath

  const excludedSlugs = [
    '/mattress-design',
    '/design-du-matelas',
    '/private-sale',
    '/vente-privee'
  ]

  return (
    <StyledContainer
      currentQuerySlug={currentQuerySlug}
      excludedSlugs={excludedSlugs}
    >
      <Grid
        rowGap={[]}
        columnGap={['0.5rem', '1rem', '3rem']}
        columnRatio={['1:1:1', '1:1:1:1:1']}
      >
        {awards.map((award) => {
          return <Award key={award.badgeImage.image.asset._ref} {...award} />
        })}
      </Grid>
    </StyledContainer>
  )
}
