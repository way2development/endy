import { useState, useEffect, useRef } from 'react'
import dictionary from '../../../dictionary.json'
import { Locale } from '../../../types/global-types'
import { NavDropdownProps, SharedNavProps } from '../Navigation.types'
import { AnimatePresence } from 'framer-motion'
import { enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { StyledFeatures, StyledCtaLink } from '../Navigation.styled'
import {
  StyledHamburgerMenuBtn,
  StyledMobileMenuItem,
  StyledMainMobileBtn,
  StyledMainMobileLink,
  StyledMobileDropdown,
  StyledCtaMobileText,
  StyledMobileMenu,
  StyledMobileSideLinks,
  StyledExtoleMobileButton
} from './MobileNav.styled'
import Link from 'next/link'
import { StyledSemiboldUnderline } from '../../../styles/global.styled'
import { SaleProps } from 'Interfaces/sales'

interface MobileNavProps extends SharedNavProps {
  showMobileMenu: boolean
  sideLinks: JSX.Element[]
  mobileMenuRef: React.MutableRefObject<null>
  extoleMobileRef: React.LegacyRef<HTMLDivElement> | undefined
  sales?: SaleProps
}

const isReviewsPage = (dropdown: string) => {
  return (
    dropdown?.toLowerCase().includes('reviews') ||
    dropdown?.toLowerCase().includes('commentaires')
  )
}

export const MobileMenuBtn = ({
  showMobileMenu,
  setShowMobileMenu,
  locale
}: {
  showMobileMenu: boolean
  setShowMobileMenu: (param: boolean) => void
  locale: Locale
}) => {
  return (
    <StyledHamburgerMenuBtn
      aria-label={dictionary[locale].openSiteNavButton}
      onClick={() => setShowMobileMenu(!showMobileMenu)}
    >
      {/* TODO: Replace with the Icon component when ready */}
      <img
        src={
          showMobileMenu
            ? 'https://cdn.sanity.io/images/d0kd7r9c/production/dea2968994af83d2e4113ab8f8a6701bf3943f74-16x24.svg'
            : 'https://cdn.sanity.io/images/d0kd7r9c/production/db1a95f326eb7148e29408cfaa387268a2d5a23b-28x28.svg'
        }
        alt=''
      />
    </StyledHamburgerMenuBtn>
  )
}

export const MobileNav = ({
  groups,
  isLinkActive,
  toggleDropdown,
  motionProps,
  productSubLinks,
  features,
  activeDropdown,
  showMobileMenu,
  sideLinks,
  chevronDownIcon,
  router,
  mobileMenuRef,
  locale,
  extoleMobileRef,
  sales
}: MobileNavProps) => {
  const [extoleMobileNav, setExtoleMobileNav] = useState(false)
  const extoleMobileNavBtnRef = useRef(null)

  useEffect(() => {
    if (!extoleMobileNavBtnRef.current) {
      return clearAllBodyScrollLocks()
    }

    if (extoleMobileNav) {
      enableBodyScroll(extoleMobileNavBtnRef.current)
    }
  }, [extoleMobileNav])

  const mobileMenuItems = groups?.map(
    (dropdown: NavDropdownProps, i: number) => {
      const slug = router?.query?.slug as string
      const isSubLinkActive = isLinkActive(dropdown, slug)

      const isSalePage = /promos/i.test(dropdown?.productUrl)
      let dropdownName = dropdown?.name

      if (sales && sales.navSaleCopy && isSalePage) {
        dropdownName = sales?.navSaleCopy[locale] || 'Sales'
      }

      // If no dropdown is required
      if (dropdown.productUrl && !isReviewsPage(dropdown.productUrl)) {
        return (
          <StyledMobileMenuItem
            key={dropdown?.name}
            color={'gravy'}
            variant={'largeBody'}
            element={'li'}
          >
            <StyledMainMobileLink
              href={`${dropdown?.productUrl}`}
              locale={locale}
              data-dropdown={dropdown?.name}
              activeDropdown={activeDropdown[dropdown?.name]}
              isSubLinkActive={isSubLinkActive}
              isSalePage={isSalePage}
            >
              {dropdownName}
            </StyledMainMobileLink>
          </StyledMobileMenuItem>
        )
      }

      return (
        !isReviewsPage(dropdown?.name) && (
          <StyledMobileMenuItem
            key={dropdown?.name}
            color={'gravy'}
            variant={'largeBody'}
            element={'li'}
          >
            <StyledMainMobileBtn
              data-dropdown={dropdown?.name}
              onClick={(e) =>
                toggleDropdown(e, !activeDropdown[dropdown?.name])
              }
              activeDropdown={activeDropdown[dropdown?.name]}
              isSubLinkActive={isSubLinkActive}
              aria-controls={`mobileDropdownMenu-${i + 1}`}
              aria-expanded={activeDropdown[dropdown?.name] || false}
            >
              {/* TODO: replace with the Icon component when ready */}
              {dropdown.name} <img src={chevronDownIcon} alt='' />
            </StyledMainMobileBtn>
            <AnimatePresence initial={false}>
              {activeDropdown[dropdown?.name] && (
                <StyledMobileDropdown
                  id={`mobileDropdownMenu-${i + 1}`}
                  {...motionProps}
                  variants={{
                    expanded: { height: 'auto' },
                    collapsed: { height: 0 }
                  }}
                >
                  {productSubLinks(dropdown)}
                  <StyledCtaMobileText
                    key={dropdown?.navLink?.url}
                    color={'gravy'}
                    variant={'mediumBody'}
                    element={'li'}
                  >
                    <Link href={`${dropdown?.navLink?.url}`}>
                      <StyledCtaLink>
                        <StyledSemiboldUnderline>
                          {dropdown?.navLink?.name}
                        </StyledSemiboldUnderline>
                      </StyledCtaLink>
                    </Link>
                  </StyledCtaMobileText>
                  <StyledFeatures>{features(dropdown?.name)}</StyledFeatures>
                </StyledMobileDropdown>
              )}
            </AnimatePresence>
          </StyledMobileMenuItem>
        )
      )
    }
  )

  return (
    <AnimatePresence initial={false}>
      {showMobileMenu && (
        <StyledMobileMenu
          {...motionProps}
          variants={{
            // TODO: Replace hard-coded pencil banner height with dynamic value.
            expanded: { height: 'calc((100vh - 100%) - 61px)' },
            collapsed: { height: 0 }
          }}
          ref={mobileMenuRef}
        >
          {mobileMenuItems}
          <StyledMobileSideLinks>
            {locale === 'en' && (
              // doesn't use Button.tsx component as the extole embed exists a child element in place of label argument
              <StyledExtoleMobileButton
                onClick={() => setExtoleMobileNav(true)}
              >
                <div id='extole_zone_mobile_header' ref={extoleMobileRef}></div>
              </StyledExtoleMobileButton>
            )}
            {sideLinks}
          </StyledMobileSideLinks>
        </StyledMobileMenu>
      )}
    </AnimatePresence>
  )
}
