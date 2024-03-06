import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { NavDropdownProps, SharedNavProps } from '../Navigation.types'
import { StyledFeatures, StyledCtaLink } from '../Navigation.styled'
import {
  StyledMainMenuList,
  StyledDropdown,
  StyledMainMenuBtn,
  StyledMainMenuLink,
  StyledSubLinksList,
  StyledInnerDropdown,
  StyledChevronIcon
} from './DesktopNav.styled'
import { Text } from '../../Text'
import Link from 'next/link'
import { StyledSemiboldUnderline } from '../../../styles/global.styled'
import { SaleProps } from 'Interfaces/sales'

interface DesktopNavProps extends SharedNavProps {
  prefersReducedMotion: boolean
  closeDropdownOnKeyDown: (
    e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>,
    i: number
  ) => void
  mainLinks: React.MutableRefObject<React.RefObject<unknown>[]>
  sales?: SaleProps
}

export const DesktopNav = ({
  toggleDropdown,
  groups,
  activeDropdown,
  prefersReducedMotion,
  closeDropdownOnKeyDown,
  motionProps,
  productSubLinks,
  features,
  mainLinks,
  chevronDownIcon,
  router,
  isLinkActive,
  locale,
  sales
}: DesktopNavProps) => {
  const mainMenuItems = groups?.map((dropdown: NavDropdownProps, i: number) => {
    const slug = router?.query?.slug as string
    const isSubLinkActive = isLinkActive(dropdown, slug)
    const isSalePage = /promos/i.test(dropdown?.productUrl)
    let dropdownName = dropdown.name

    if (sales && sales.navSaleCopy && isSalePage) {
      dropdownName = sales?.navSaleCopy[locale] || 'Sales'
    }

    // If no dropdown is required
    if (dropdown.productUrl) {
      return (
        <li key={dropdown?.name} data-dropdown={dropdown?.name}>
          <StyledMainMenuLink
            href={`${dropdown?.productUrl}`}
            locale={locale}
            isSubLinkActive={isSubLinkActive}
            prefersReducedMotion={prefersReducedMotion}
            data-dropdown={dropdown?.name}
            ref={mainLinks.current[i] as React.RefObject<HTMLAnchorElement>}
            isSalePage={isSalePage}
          >
            {dropdownName}
          </StyledMainMenuLink>
        </li>
      )
    }

    return (
      <li
        key={dropdown?.name}
        data-dropdown={dropdown?.name}
        onMouseEnter={(e) => toggleDropdown(e, true)}
        onMouseLeave={(e) => toggleDropdown(e, false)}
      >
        <StyledMainMenuBtn
          isSubLinkActive={isSubLinkActive}
          isDropdownExpanded={activeDropdown[dropdown?.name]}
          prefersReducedMotion={prefersReducedMotion}
          data-dropdown={dropdown?.name}
          onClick={(e) => toggleDropdown(e, !activeDropdown[dropdown?.name])}
          onKeyDown={(e) => closeDropdownOnKeyDown(e, i)}
          ref={mainLinks.current[i] as React.RefObject<HTMLButtonElement>}
          aria-controls={`desktopDropdownMenu-${i + 1}`}
          aria-expanded={activeDropdown[dropdown?.name] || false}
        >
          {dropdown?.name} <StyledChevronIcon src={chevronDownIcon} alt='' />
        </StyledMainMenuBtn>
        <AnimatePresence initial={false}>
          {activeDropdown[dropdown?.name] && (
            <StyledDropdown
              {...motionProps}
              variants={{
                expanded: { height: '15rem' },
                collapsed: { height: 0 }
              }}
              id={`desktopDropdownMenu-${i + 1}`}
              onKeyDown={(e) => closeDropdownOnKeyDown(e, i)}
            >
              <StyledInnerDropdown
                productLinksLength={dropdown?.pdpLinks?.length}
              >
                <StyledSubLinksList>
                  {productSubLinks(dropdown)}
                  <Text
                    key={dropdown?.navLink?.url}
                    color={'gravy'}
                    variant={'mediumBody'}
                    element={'li'}
                  >
                    <Link href={`${dropdown?.navLink?.url}`} locale={locale}>
                      <StyledCtaLink>
                        <StyledSemiboldUnderline>
                          {dropdown?.navLink?.name}
                        </StyledSemiboldUnderline>
                      </StyledCtaLink>
                    </Link>
                  </Text>
                </StyledSubLinksList>
                <StyledFeatures>{features(dropdown?.name)}</StyledFeatures>
              </StyledInnerDropdown>
            </StyledDropdown>
          )}
        </AnimatePresence>
      </li>
    )
  })

  return <StyledMainMenuList>{mainMenuItems}</StyledMainMenuList>
}
