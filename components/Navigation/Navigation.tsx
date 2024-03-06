import React, { useState, useRef, createRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock'
import { Locale } from '../../types/global-types'
import {
  NavProps,
  NavDropdownProps,
  ActiveDropdownProps
} from './Navigation.types'
import { SaleProps } from '../../Interfaces/sales'
import dictionary from '../../dictionary.json'
import {
  doesProductHaveFreeGift,
  isProductFreeGift,
  isProductOnSale,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'
import { getSaleTextVariantColor } from '../../utils'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import { useToggleCart, useCartCount } from '../../lib/context'
import { getDropdown, isLinkActive } from './utils'
import {
  StyledHomeLink,
  StyledFeatureLink,
  StyledFeatureContent,
  StyledFromPriceContainer,
  StyledFrom,
  StyledFeatureCopy,
  StyledSubLink,
  StyledNav,
  StyledDesktopNavSide,
  StyledSideLink,
  StyledCartButton,
  StyledCartCount,
  StyledLanguageToggleContainer
} from './Navigation.styled'
import { DesktopNav } from './DesktopNav/DesktopNav'
import { StyledDesktopNavSideLinks } from './DesktopNav/DesktopNav.styled'
import { NewFlag } from '../NewFlag'
import { PromoFlag, PopularFlag } from '../PromoFlag'
import { Text } from '../Text'
import { Image } from '../Image'
import { StyledSemibold } from '../../styles/global.styled'
import { Price } from '../ShopModule/Price'
import { MobileNav, MobileMenuBtn } from './MobileNav/MobileNav'
import { BadgeImage, BadgeImageProps } from '../BadgeImage'
import { LanguageToggle } from '../LanguageToggle'
import { doesProductHaveCompareAtPrice } from '../../utils/compareAtPrice'

const chevronDownIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/bed7bdfbf896ce0eb2ec68cd0662746729af3018-16x16.svg'

const Flags = ({
  name,
  subLink,
  groups,
  sales,
  locale
}: {
  name: string
  subLink: string
  groups: NavDropdownProps[]
  sales?: SaleProps
  locale: Locale
}) => {
  const dropdown = getDropdown(name, groups)

  return (
    <>
      {dropdown?.pdpLinks?.map((pdpLink) => {
        const { product, name } = pdpLink
        const isOnSale = sales ? isProductOnSale(sales, product.id) : false
        const hasFreeGift = sales
          ? doesProductHaveFreeGift(sales, product.id)
          : false
        const isFreeGift = sales ? isProductFreeGift(sales, product.id) : false

        const showPromoFlag =
          sales &&
          (isOnSale || hasFreeGift || isFreeGift) &&
          sales?.saleType !== 'Bmsm' &&
          sales?.saleType !== 'Everything Off' &&
          sales?.saleType !== 'Percentage' &&
          sales?.saleType !== 'Level Up Offer'

        const promoFlagCopy =
          sales && isSecondarySaleProduct(sales, product.id)
            ? sales?.secondaryProductPillLabel
            : sales?.productPillLabel

        const hasVariantWithDiscount = doesProductHaveCompareAtPrice(product)

        return (
          <React.Fragment key={product.id}>
            {product.isNewProduct &&
              !hasFreeGift &&
              subLink === name &&
              !isOnSale && (
                <NewFlag locale={locale} isNewProduct={product.isNewProduct} />
              )}

            {showPromoFlag && subLink === name && (
              <PromoFlag
                bgColor={sales?.themeColor}
                promoCopy={promoFlagCopy}
                color={getSaleTextVariantColor(sales.themeColor)}
                isCentered={true}
              />
            )}

            {hasVariantWithDiscount && subLink === name && (
              <PromoFlag
                bgColor={'#FFFFFF'}
                promoCopy={locale === 'fr' ? 'Solde' : 'Sale'}
                color={'#243746'}
                isCentered={true}
              />
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

const HomeLink = ({
  locale,
  badgeImage
}: {
  locale: Locale
  badgeImage?: BadgeImageProps
}) => {
  return (
    <StyledHomeLink href='/' locale={locale}>
      {badgeImage?.image && (
        <BadgeImage image={badgeImage.image} alt={badgeImage.alt} />
      )}
    </StyledHomeLink>
  )
}

const Features = ({
  productCategory,
  groups,
  locale,
  sales
}: {
  productCategory: string
  groups: NavDropdownProps[]
  locale: Locale
  sales?: SaleProps
}) => {
  const dropdown = getDropdown(productCategory, groups)
  return (
    <>
      {dropdown?.features?.map((feature) => {
        const { product, image } = feature
        const isOnSale = sales ? isProductOnSale(sales, product.id) : false

        const isPercentageSale =
          sales &&
          (sales?.saleType === 'Percentage' ||
            sales?.saleType === 'Level Up Offer' ||
            isSecondarySaleProduct(sales, product.id))

        const promoFlagCopy =
          sales && isSecondarySaleProduct(sales, product.id)
            ? sales?.secondaryProductPillLabel
            : sales?.productPillLabel

        const hasVariantWithDiscount = doesProductHaveCompareAtPrice(product)

        return (
          <StyledFeatureLink
            href={`/products${product?.slug}`}
            key={product?.id}
            locale={locale}
            features={dropdown?.features?.length}
          >
            <StyledFeatureContent>
              {product?.isPopularProduct &&
                !isOnSale &&
                !hasVariantWithDiscount && (
                  <PopularFlag
                    promoCopy={dictionary[locale].popular.toUpperCase()}
                  />
                )}
              {(isOnSale && sales?.saleType === 'Everything Off') ||
                (isPercentageSale && (
                  <PromoFlag
                    bgColor={sales?.themeColor}
                    promoCopy={promoFlagCopy}
                    color={getSaleTextVariantColor(sales.themeColor)}
                    isCentered={false}
                  />
                ))}

              {hasVariantWithDiscount && (
                <PromoFlag
                  bgColor={'#FFFFFF'}
                  promoCopy={locale === 'fr' ? 'Solde' : 'Sale'}
                  color={'#243746'}
                  isCentered={false}
                />
              )}
              <Image
                alt={image?.alt}
                desktopImage={image?.desktopImage}
                tabletImage={image?.tabletImage}
                mobileImage={image?.mobileImage}
                srcWidths={[768, 1024]}
              />
              <StyledFeatureCopy
                color={'gravy80'}
                variant={'smallBody'}
                productTitle={product?.name}
              >
                <StyledSemibold>{product?.name}</StyledSemibold>
                <StyledFromPriceContainer>
                  <StyledFrom productTitle={product?.name}>
                    {dictionary[locale].from.toLowerCase()}
                  </StyledFrom>
                  <Price
                    variantSalePrice={
                      product?.variants[0]?.salePrice
                        ? product?.variants[0]?.salePrice
                        : 0
                    }
                    variantOffSalePrice={
                      product?.variants[0]?.offSalePrice
                        ? product?.variants[0]?.offSalePrice
                        : product?.priceRange?.minVariantPrice
                    }
                    variantPrice={product?.priceRange?.minVariantPrice}
                    locale={locale}
                    sales={sales}
                    isOnSale={isOnSale}
                    productId={product.id}
                  />
                </StyledFromPriceContainer>
              </StyledFeatureCopy>
            </StyledFeatureContent>
          </StyledFeatureLink>
        )
      })}
    </>
  )
}

const SideCart = ({ locale }: { locale: Locale }) => {
  const cartCount = useCartCount()
  const toggleCart = useToggleCart()

  return (
    <StyledCartButton
      aria-label={dictionary[locale].openCartButton}
      onClick={() => toggleCart()}
    >
      {cartCount && cartCount >= 1 ? (
        <div style={{ position: 'relative' }}>
          {/* TODO: replace with the Icon component when ready */}
          <img
            src='https://cdn.sanity.io/images/d0kd7r9c/production/feb964d241363a0e0fb99c7066bb776ef5e894f0-28x28.svg'
            alt=''
          />
          <StyledCartCount variant={'micro'} color={'white'}>
            <strong>{cartCount}</strong>
          </StyledCartCount>
        </div>
      ) : (
        <>
          {/* TODO: replace with the Icon component when ready */}
          <img
            src='https://cdn.sanity.io/images/d0kd7r9c/production/48cd55c88a79971aa359270035f11dcdfff11ce6-28x28.svg'
            alt=''
          />
        </>
      )}
    </StyledCartButton>
  )
}

export const Navigation = ({
  links,
  groups,
  sales,
  locale,
  extoleMobileRef,
  setShowMobileMenu,
  showMobileMenu,
  badgeImage
}: NavProps) => {
  const router = useRouter()
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdownProps>({})
  const prefersReducedMotion = usePrefersReducedMotion()
  const mainLinks = useRef(
    Array.from(Array(groups.length)).map(() => createRef())
  )
  const mobileMenuRef = useRef(null)
  // freezes the scroll of the body content when the mobile menu is active
  // and then then enables it again (while retaining its current position) once the mobile menu is closed
  useEffect(() => {
    if (!mobileMenuRef.current) {
      return clearAllBodyScrollLocks()
    }

    if (showMobileMenu) {
      return disableBodyScroll(mobileMenuRef.current)
    }

    enableBodyScroll(mobileMenuRef.current)
  }, [showMobileMenu])

  const motionProps = !prefersReducedMotion && {
    initial: 'collapsed',
    animate: 'expanded',
    exit: 'collapsed',
    transition: { easeIn: [0.17, 0.67, 0.83, 0.67] }
  }

  const toggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement | HTMLLIElement, MouseEvent>,
    isActive: boolean
  ) => {
    const { dropdown } = e.currentTarget.dataset
    setActiveDropdown({ [`${dropdown}`]: isActive })
  }

  const closeDropdownOnKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>,
    i: number
  ) => {
    if (e.key === 'Escape') {
      const { dropdown } = e.currentTarget.dataset
      setActiveDropdown({ [`${dropdown}`]: false })

      const activeMainLink = mainLinks.current[i].current as HTMLElement
      activeMainLink.focus()
    }
  }

  const productSubLinks = (dropdown: NavDropdownProps) => {
    const currentQuerySlug = router?.query?.slug

    return dropdown?.pdpLinks?.map((subLink) => {
      const currentProductSlug = subLink?.product?.slug?.replace('/', '')

      return (
        <Text
          color={'gravy'}
          variant={'mediumBody'}
          element={'li'}
          key={subLink?.name}
        >
          <Link href={`/products${subLink?.product?.slug}`} locale={locale}>
            <StyledSubLink
              isSubLinkActive={currentProductSlug === currentQuerySlug}
            >
              {subLink?.name}
              <Flags
                name={dropdown?.name}
                subLink={subLink?.name}
                groups={groups}
                sales={sales}
                locale={locale}
              />
            </StyledSubLink>
          </Link>
        </Text>
      )
    })
  }

  const sideLinks = links.map((link) => {
    return (
      <Link href={`${link?.url}`} key={link?.url} locale={locale}>
        <StyledSideLink
          prefersReducedMotion={prefersReducedMotion}
          showOnDesktop={link?.showOnDesktop}
          className={link?.classNames}
        >
          {link?.name}
        </StyledSideLink>
      </Link>
    )
  })

  const navProps = {
    isLinkActive,
    toggleDropdown,
    motionProps,
    activeDropdown,
    productSubLinks,
    groups,
    chevronDownIcon,
    router,
    features: (productCategory: string) => (
      <Features
        productCategory={productCategory}
        groups={groups}
        locale={locale}
        sales={sales}
      />
    ),
    locale
  }

  return (
    <StyledNav>
      <MobileMenuBtn
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        locale={locale}
      />
      <HomeLink locale={locale} badgeImage={badgeImage} />
      <DesktopNav
        {...navProps}
        prefersReducedMotion={prefersReducedMotion}
        closeDropdownOnKeyDown={closeDropdownOnKeyDown}
        mainLinks={mainLinks}
        sales={sales}
      />
      <StyledDesktopNavSide>
        <StyledDesktopNavSideLinks>{sideLinks}</StyledDesktopNavSideLinks>
        <StyledLanguageToggleContainer>
          <LanguageToggle locale={locale} />
        </StyledLanguageToggleContainer>
        <SideCart locale={locale} />
      </StyledDesktopNavSide>
      <MobileNav
        {...navProps}
        mobileMenuRef={mobileMenuRef}
        showMobileMenu={showMobileMenu}
        sideLinks={sideLinks}
        extoleMobileRef={extoleMobileRef}
        sales={sales}
      />
    </StyledNav>
  )
}
