import React from 'react'
import { Locale } from '../../types/global-types'
import { NextRouter } from 'next/router'
import { SaleProps } from '../../Interfaces/sales'
import { ImageProps } from '../Image'
import { BadgeImageProps } from '../BadgeImage'
import { ProductProps } from '../ShopModule/ShopModule.types'

export interface NavProps {
  /** Dropdown menus */
  groups: NavDropdownProps[]
  /** Support link, option to add additional links in the future */
  links: NavLinkProps[]
  /** Selected Location */
  locale: Locale
  /** Endy Logo */
  badgeImage?: BadgeImageProps
  /** Sale Data */
  sales?: SaleProps
  extoleRef: React.LegacyRef<HTMLDivElement> | undefined
  extoleMobileRef: React.LegacyRef<HTMLDivElement> | undefined
  showMobileMenu: boolean
  setShowMobileMenu: () => void
}

export interface NavDropdownProps {
  name: string
  productUrl: string
  pdpLinks: {
    name: string
    product: ProductProps
  }[]
  navLink?: NavLinkProps // this is the last link in the dropdown
  features: FeaturesProps[]
}

interface NavLinkProps {
  name: string
  url: string
  showOnDesktop?: boolean
  classNames?: string
}

interface FeaturesProps {
  product: ProductProps
  image: ImageProps
}

export interface ActiveDropdownProps {
  [dropdown: string]: boolean
}

interface MotionProps {
  initial: string
  animate: string
  exit: string
  transition: {
    easeIn: number[]
  }
}
export interface SharedNavProps {
  toggleDropdown: (
    e: React.MouseEvent<HTMLButtonElement | HTMLLIElement, MouseEvent>,
    isActive: boolean
  ) => void
  groups: NavDropdownProps[]
  activeDropdown: ActiveDropdownProps
  motionProps: boolean | MotionProps
  productSubLinks: (param: NavDropdownProps) => void
  features: (param: string) => JSX.Element
  chevronDownIcon: string
  router: NextRouter
  isLinkActive: (dropdown: NavDropdownProps, slug: string) => boolean
  locale: Locale
}
