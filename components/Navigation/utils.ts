import { NavDropdownProps } from './Navigation.types'

export const getDropdown = (name: string, groups: NavDropdownProps[]) => {
  return groups.find((dropdown) => dropdown.name === name)
}

export const isLinkActive = (
  dropdown: NavDropdownProps,
  currentQuerySlug: string
) => {
  if (dropdown?.productUrl) {
    return dropdown?.productUrl === `/products/${currentQuerySlug}`
  } else {
    return dropdown?.pdpLinks?.some((link) => {
      const currentProductSlug =
        link.product.slug && link.product.slug.replace('/', '')
      return currentProductSlug === currentQuerySlug
    })
  }
}
