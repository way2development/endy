import { SaleElementsProps } from './SalesHomepageHero'
import { StyledSubcopy, StyledSaleContent } from './SalesHomepageHero.styled'
import { PromoPill } from '../PromoPill'
import { Image } from '../Image'

export interface SaleContentProps extends SaleElementsProps {
  variant?: 'Sale/Sale Split Screen'
}

export const SaleContent = ({
  pillLabel,
  heading,
  headingTextImage,
  subcopy,
  subcopyTextImage,
  cta,
  sales,
  locale
}: SaleContentProps) => {
  const visiblePillLabel = sales?.isLastChance
    ? sales.lastChance?.homepageHero?.pillLabel
    : pillLabel

  return (
    <StyledSaleContent>
      {visiblePillLabel && sales && (
        <PromoPill
          promoCopy={visiblePillLabel}
          variant={sales?.textColor}
          locale={locale}
        />
      )}

      <h1>
        {headingTextImage ? (
          <Image
            desktopImage={headingTextImage.desktopImage}
            tabletImage={headingTextImage.tabletImage}
            mobileImage={headingTextImage.mobileImage}
            alt={headingTextImage?.alt}
            srcWidths={[768, 1024]}
          />
        ) : (
          <>{heading}</>
        )}
      </h1>

      <StyledSubcopy>
        {subcopyTextImage ? (
          <Image
            desktopImage={subcopyTextImage.desktopImage}
            tabletImage={subcopyTextImage.tabletImage}
            mobileImage={subcopyTextImage.mobileImage}
            alt={subcopyTextImage?.alt}
            srcWidths={[768, 1024]}
          />
        ) : (
          <>{subcopy}</>
        )}
      </StyledSubcopy>
      {cta}
    </StyledSaleContent>
  )
}
