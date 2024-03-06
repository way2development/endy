import { ProductBadge, ProductBadgeProps } from './ProductBadge'
import { Grid } from '../Grid'
import { theme } from '../../styles/theme'

interface ProductBadgesProps {
  /**
   * Must provide description, icon url and heading copy
   */
  productBadges?: ProductBadgeProps[]
}

export const ProductBadges = ({ productBadges }: ProductBadgesProps) => {
  if (!productBadges) return null

  const isThreeIconLayout = productBadges?.length === 3

  const gridProps = {
    columnRatio: isThreeIconLayout ? ['1:1:1'] : ['1:1:1:1'],
    rowGap: isThreeIconLayout ? ['0'] : [theme.spacing.m, '0'],
    columnGap: ['0']
  }

  return (
    <Grid {...gridProps}>
      {productBadges?.map((badge) => (
        <ProductBadge
          anchorUrl={badge.anchorUrl}
          key={badge.heading}
          heading={badge.heading}
          badgeImage={badge.badgeImage}
          tooltip={badge.tooltip}
        />
      ))}
    </Grid>
  )
}
