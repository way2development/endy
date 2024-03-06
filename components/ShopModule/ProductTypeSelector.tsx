import { CtaLink } from '../CtaLink'
import { StyledProductTypeContainer } from './ShopModule.styled'
import { NextRouter } from 'next/router'

export interface ProductTypeSelectorProps {
  productTypeSelector: {
    enableProductTypeSelector: boolean
    productTypeLinks: { label: string; slug: string }[]
  }
  color: string
  size: string
  router: NextRouter
}

export const ProductTypeSelector = ({
  productTypeSelector,
  color,
  size,
  router
}: ProductTypeSelectorProps) => {
  const { enableProductTypeSelector, productTypeLinks } = productTypeSelector
  const urlQueryParam = `?size=${size}&color=${color}`

  const route = '/products/' + router.query.slug

  return (
    <StyledProductTypeContainer>
      {enableProductTypeSelector &&
        productTypeLinks.map((link) => (
          <CtaLink
            variant='hollow-gravy'
            key={link.slug}
            label={link.label}
            url={link.slug + urlQueryParam}
            disabled={link.slug === route}
          />
        ))}
    </StyledProductTypeContainer>
  )
}
