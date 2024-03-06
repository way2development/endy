import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

// Components
import { Swatches } from './Swatches'
import { Dropdown } from './Dropdown'
import { Text } from '../Text'
import { ProductReviews } from '../ProductReviews'
import { ProductCarousel } from '../ProductCarousel'
import { ProductBadges } from '../ProductBadges'
import { Grid } from '../Grid'
import { ProductAffirm } from '../ProductAffirm'
import { Price } from './Price'
import { SalePillFlag } from './SalePillFlag'
import { PreorderBanner } from './PreorderBanner'
import { Modal } from '../Modal'
import { Waitlist } from '../ProductWaitlist/ProductWaitlist'
import ReadyToShip from '../ReadyToShip/ReadyToShip'
import { UpsellProducts } from './UpsellProducts'
import { FreeGift } from './FreeGift'
import { BundleFreeGift } from './BundleFreeGift'
import { SaleBanner } from './SaleBanner'
import { NewFlag } from '../NewFlag'
import { OutboundLinks } from '../OutboundLinks'
import { SizeGuide } from './SizeGuide'
import { AccordionList } from './AccordionList'
import { QuantitySelector } from '../QuantitySelector/QuantitySelector'
import { SkuSelectors } from './SkuSelectors'
import { FreeGiftBanner } from './FreeGiftBanner'
import { CompareAtPricePill } from './CompareAtPricePill'
import { ProductTypeSelector } from './ProductTypeSelector'

// Styles
import {
  StyledProductCarouselContainer,
  StyledContainer,
  StyledHeading,
  StyledShopButton,
  StyledSection,
  StyledPriceDesktop,
  StyledProductBadges,
  StyledAdditionalInfo,
  StyledComparisonInfo,
  StyledVerticalLine,
  StyledLongDescription,
  StyledProductDetailHeading,
  StyledExtoleBtn,
  StyledOutboundLinks
} from './ShopModule.styled'

import { theme } from '../../styles/theme'
import {
  StyledPageWidth,
  StyledCartError,
  StyledSemibold
} from '../../styles/global.styled'

// Utilities
import {
  doesProductHaveFreeGift,
  isProductFreeGift,
  isProductOnSale,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'
import { getProductWithStock } from '../../utils'
import dictionary from '../../dictionary.json'
import { getProductNameWithoutArticles } from '../../utils/grammar'

// Prop Types
import { ShopModuleProps, VariantProps } from './ShopModule.types'

// Tracking
import { googleAnalytics } from '../GoogleAnalytics/analytics'

declare global {
  interface Window {
    extole: any
  }
}

export const ShopModule = ({
  product,
  reviews,
  addItemToCart,
  selectedSize,
  selectedColor,
  productBadges,
  carouselBadgeImage,
  carouselBadgeImageSecondary,
  locale,
  sales,
  shippingModal,
  affirmModal,
  isMobileDevice,
  handleSelect,
  userLocation,
  selectedVariant,
  upsellProducts,
  freeGiftBanner,
  additionalInfo,
  comparisonInfo,
  outboundLinks,
  accordionList,
  showDropAHint,
  sizeGuide,
  router,
  isCartError,
  mysteryGift,
  mysteryGiftVariant,
  hasMysteryGift,
  productTypeSelector
}: ShopModuleProps) => {
  const localizedDictionary = dictionary[locale]
  const isOnSale = sales ? isProductOnSale(sales, product.id) : false

  const isPreorder = selectedVariant?.preorder?.isPreorder
  const selectedVariantSize = selectedVariant.size

  const [isLoading, setIsLoading] = useState(true)

  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [showShippingModal, setShowShippingModal] = useState(false)

  const [qty, setQty] = useState(1)

  const initialCartItems = { id: selectedVariant.id, quantity: qty }
  const [cartItems, setCartItems] = useState([initialCartItems])

  const initialButtonText = localizedDictionary.addToCart
  const [buttonText, setButtonText] = useState(initialButtonText)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const extoleRef = useRef(null)
  const showSaleEnds =
    sales?.saleType !== 'Buy X Get Y' && sales?.saleType !== 'Bmsm' && isOnSale
  const oneSize = product.sizeVariants.length === 1

  const toggleSizeGuide = () => {
    setIsSizeGuideOpen(!isSizeGuideOpen)
  }
  // Hotfix that was prompted from #bugs-and-quirks escalation. Once the Foam Headboard Product is discontinued, please remove all instances of isQueenFoamHeadboard boolean variable.
  const isQueenFoamHeadboard =
    product.id === 4721316233264 && selectedSize === 'Queen'

  // prevents price container from rendering until size query is present in url
  useEffect(() => {
    if (router.query.size) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [router, isLoading])

  // Affirm Monthly Payment
  const MIN_AMOUNT = 249.99
  const isMonthlyPayment = selectedVariant.price > MIN_AMOUNT

  const showSaleBanner =
    sales?.saleType === 'Bmsm' || sales?.saleType === 'Level Up Offer'

  // Upsell Products
  useEffect(() => {
    // if product variant has changed, reset cart items
    if (!cartItems.some((item) => item.id === selectedVariant.id)) {
      setCartItems([initialCartItems])
      setButtonText(
        qty === 2 ? localizedDictionary.addTwoItemsToCart : initialButtonText
      )
    } else if (cartItems[0].quantity !== qty) {
      // if quantity of main product changes, update cartItems and buttonText
      const currentProductQty = { id: selectedVariant.id, quantity: qty }
      const updatedProductQty = { id: selectedVariant.id, quantity: qty }

      const updatedCartItems = cartItems.filter(
        (item) => item.id !== currentProductQty.id
      )

      setCartItems([...updatedCartItems, updatedProductQty])
      setButtonText(
        qty === 2 ? localizedDictionary.addTwoItemsToCart : initialButtonText
      )
    }
  }, [selectedVariant, qty])

  const toggleSelectUpsellItem = (variant: VariantProps) => {
    const upsellItem = { id: variant.id, quantity: 1 }

    if (cartItems.some((item) => item.id === upsellItem.id)) {
      // remove upsell item
      setCartItems(cartItems.filter((item) => item.id !== upsellItem.id))
    } else {
      // add upsell item
      setCartItems([...cartItems, upsellItem])
    }
  }

  const updateUpsellItemVariant = (
    currentVariant: VariantProps,
    updatedVariant: VariantProps
  ) => {
    const currentUpsellVariant = { id: currentVariant.id, quantity: 1 }
    const updatedUpsellVariant = { id: updatedVariant.id, quantity: 1 }

    const updatedCartItems = cartItems.filter(
      (item) => item.id !== currentUpsellVariant.id
    )

    setCartItems([...updatedCartItems, updatedUpsellVariant])
  }

  useEffect(() => {
    const getLocalizedButtonText = (numOfCartItems: number) => {
      const localizedButtonText =
        locale === 'fr'
          ? `Ajouter ${numOfCartItems} Articles au panier`
          : `Add ${numOfCartItems} to Cart`

      return localizedButtonText
    }

    const totalCartItems =
      cartItems[0].quantity === 2 ? cartItems.length + 1 : cartItems.length

    setButtonText(
      cartItems.length <= 1 && cartItems[0].quantity === 1
        ? initialButtonText
        : getLocalizedButtonText(totalCartItems)
    )
  }, [cartItems])

  const submitCart = async (
    cartItems: { id: number; quantity: number }[],
    hasFreeGift: boolean,
    freeGiftVariant?: VariantProps
  ) => {
    const giftProducts: { id: number; quantity: number }[] = []

    const freeGiftInStock = freeGiftVariant?.isAvailable

    if (hasFreeGift && freeGiftVariant?.id && freeGiftInStock) {
      const freeGiftItem = {
        id: freeGiftVariant.id,
        quantity: freeGiftQuantity
      }

      giftProducts.push(freeGiftItem)
    }

    if (mysteryGift && mysteryGiftVariant) {
      const mysteryGiftItem = { id: mysteryGiftVariant.id, quantity: 1 }

      giftProducts.push(mysteryGiftItem)
    }

    const updatedCartItems = [...cartItems, ...giftProducts]

    return addItemToCart(updatedCartItems)
  }

  const freeGift = sales ? sales.customerGetsProducts : null
  const hasFreeGift = sales ? doesProductHaveFreeGift(sales, product.id) : false
  const isFreeGift = sales ? isProductFreeGift(sales, product.id) : false

  const freeGiftQuantity = sales?.customerGetsQuantity
    ? sales.customerGetsQuantity
    : 0

  const [freeGiftVariant, setFreeGiftVariant] =
    useState<VariantProps | undefined>(undefined)

  const getCorrespondingMattressSize = (size: string) => {
    const selectedSize = sales?.customerGetsProducts?.sizeVariants?.find(
      (variant) => variant.id === size
    )

    return selectedSize ? selectedSize.mattressSize : null
  }

  useEffect(() => {
    // Find the first free gift variant that matches the same product size
    // Set this as the initial free gift
    if (sales && sales.saleType === 'Buy X Get Y') {
      const initialFreeGiftVariant =
        sales?.customerGetsProducts?.variants?.find((variant) => {
          const correspondingMattressSizes = getCorrespondingMattressSize(
            variant.size
          )

          const selectedVariantSize =
            selectedVariant.size === 'Short Queen'
              ? 'RV Short Queen'
              : selectedVariant.size

          return correspondingMattressSizes
            ? correspondingMattressSizes.includes(selectedVariantSize)
            : false
        })

      setFreeGiftVariant(initialFreeGiftVariant)
    }
  }, [selectedVariantSize])

  const updateFreeGiftVariant = (
    selectedSizeId: string,
    variantId?: number | undefined,
    colorSelection?: string | undefined
  ) => {
    const newVariant = sales?.customerGetsProducts?.variants.find((variant) => {
      const isValidSize = variant.size === selectedSizeId
      const isValidColor = variant.color === colorSelection

      return isValidSize && isValidColor
    })

    if (newVariant) {
      setFreeGiftVariant(newVariant)
    }
  }

  const [freeGiftProductsInventoryInfo, updateFreeGiftProductsInventoryInfo] =
    useState([])

  const freeGiftInventoryInfo = freeGiftProductsInventoryInfo.find(
    (productInfo: VariantProps) => {
      return productInfo.id === freeGift?.id
    }
  )

  // Free Gift Product
  const freeGiftWithStockInfo = freeGift
    ? getProductWithStock(freeGift, freeGiftInventoryInfo)
    : null

  useEffect(() => {
    if (freeGiftVariant?.productId) {
      const fetchStockInfo = async () => {
        const currentProductId = freeGiftVariant.productId
        const response = await axios(
          `/api/shopify/product-inventory?ids=${currentProductId}`
        )
        updateFreeGiftProductsInventoryInfo(response.data)
      }

      fetchStockInfo()
    }
  }, [freeGiftVariant])

  // Free Gift Variant
  const freeGiftVariantStockInfo = freeGiftWithStockInfo?.variants.find(
    (variant: VariantProps) => {
      return variant.id === freeGiftVariant?.id
    }
  )

  const totalQuantity = cartItems.length + freeGiftQuantity

  useEffect(() => {
    if (showBundleFreeGift) {
      setButtonText(localizedDictionary.addAllItemsToCart)
    } else if (hasFreeGift && freeGiftVariantStockInfo) {
      setButtonText(
        localizedDictionary.add +
          ' ' +
          totalQuantity +
          ' ' +
          localizedDictionary.itemsToCart
      )
    }
  }, [hasFreeGift, freeGiftVariantStockInfo])

  // const freeItemMicrocopy = sales?.bxgyProductData?.length
  //   ? `${localizedDictionary.freeWith} ${getProductNameWithoutArticles(
  //       sales?.bxgyProductData[0]?.name
  //     )}`
  //   : null

  const defaultSaleProduct = sales?.bxgyProductData?.length
    ? sales.bxgyProductData[0]
    : null

  const productName =
    defaultSaleProduct?.name &&
    getProductNameWithoutArticles(defaultSaleProduct.name)

  const freeGiftLinkLabel =
    locale === 'fr'
      ? `Ajout gratuit à l’achat d’un ${productName}`
      : `Add for free with your ${productName} order`

  // Free gift logic ends

  // Free Gift Bundle
  const showBundleFreeGift =
    hasFreeGift && freeGift && freeGift.isBundleProduct && sales

  const ga4AddToCart = () => {
    const freeGiftData = freeGiftWithStockInfo &&
      freeGiftVariantStockInfo && {
        item_brand: 'Endy',
        item_category: freeGiftWithStockInfo.productType,
        item_id: freeGiftVariantStockInfo.sku,
        item_name: freeGiftWithStockInfo.title,
        item_variant: freeGiftVariantStockInfo.title,
        item_variant_id: freeGiftVariantStockInfo.id.toString(),
        price: freeGiftVariantStockInfo.price,
        product_image_url: freeGiftWithStockInfo.previewImageUrl,
        product_sku: freeGiftVariantStockInfo.sku,
        variant_sku: freeGiftVariantStockInfo.sku,
        compare_price: freeGiftWithStockInfo?.variants?.[0]?.compareAtPrice,
        quantity: freeGiftWithStockInfo?.variants.length
      }

    googleAnalytics.addToCart({
      product,
      variant: selectedVariant,
      sales,
      quantity: qty
    })

    // If upsells have been added, trigger add_upsell_to_cart event
    const hasUpsells = cartItems?.length > 1
    hasUpsells &&
      googleAnalytics.addUpsellToCart({
        product,
        variant: selectedVariant,
        upsellProducts,
        sales,
        cartItems
      })

    hasFreeGift &&
      googleAnalytics.addFreeGiftToCart({
        sales,
        freeGiftProduct: freeGiftData
      })
  }

  // For Everything Off Sales
  const variantSalePrice =
    selectedVariant?.salePrice !== null ? selectedVariant?.salePrice : 0

  const variantOffSalePrice =
    selectedVariant?.offSalePrice !== null
      ? selectedVariant?.offSalePrice
      : selectedVariant.price

  // Extole Drop-a-Hint
  useEffect(() => {
    // prettier-ignore
    //@ts-ignore
    // eslint-disable-next-line prefer-rest-params
    (function(c,e,k,l,a){c[e]=c[e]||{};for(c[e].q=c[e].q||[];a<l.length;)k(l[a++],c[e])})(window,"extole",function(c,e){e[c]=e[c]||function(){e.q.push([c,arguments])}},["createZone"],0);

    if (locale == 'en') {
      window.extole.createZone({
        name: 'product_page',
        element_id: 'extole_zone_product_page',
        data: {
          labels: 'drop-a-hint',
          size: selectedVariantSize,
          ...(selectedColor && { color: selectedColor }),
          'content.title': product.name
        }
      })
    }
  }, [
    selectedVariantSize,
    selectedColor,
    router?.query?.size,
    router?.query?.color
  ])

  const isFixedDiscountWithSecondarySale =
    sales?.secondarySaleType &&
    sales?.saleType === 'Fixed Amount' &&
    !isSecondarySaleProduct(sales, product.id)

  return (
    <StyledSection>
      {/* Size guide modal (hidden from page unless triggered) */}
      <SizeGuide
        sizeGuide={sizeGuide}
        isSizeGuideOpen={isSizeGuideOpen}
        toggleSizeGuide={toggleSizeGuide}
        locale={locale}
      />
      <StyledPageWidth>
        <Grid
          columnRatio={['1', '1', '55:45']}
          rowGap='0'
          columnGap={theme.spacing.xl}
        >
          {/* Defaults to product level carousel image if variant specific images are undefined */}
          <StyledProductCarouselContainer>
            <ProductCarousel
              badge={carouselBadgeImage}
              badgeSecondary={carouselBadgeImageSecondary}
              images={
                selectedVariant
                  ? selectedVariant.images?.carouselImage ||
                    product.images?.carouselImage
                  : undefined
              }
            />
            <StyledProductBadges>
              {productBadges && <ProductBadges productBadges={productBadges} />}
            </StyledProductBadges>
          </StyledProductCarouselContainer>
          <StyledContainer>
            {isPreorder && (
              <PreorderBanner
                locale={locale}
                inventoryThreshold={
                  selectedVariant?.preorder?.inventoryThreshold
                }
              />
            )}
            <StyledHeading variant={'h1'} color={'rubine'}>
              {!isPreorder && product.isNewProduct && (
                <NewFlag
                  locale={locale}
                  isNewProduct={product.isNewProduct}
                  isOnShopModule={true}
                />
              )}
              {product.name}
            </StyledHeading>
            <ProductReviews {...reviews} />

            {((isOnSale && sales?.saleType !== 'Buy X Get Y') ||
              isSecondarySaleProduct(sales, product.id)) &&
              !isFixedDiscountWithSecondarySale && (
                <SalePillFlag
                  saleType={sales?.saleType}
                  secondarySaleType={sales?.secondarySaleType}
                  saleColor={sales?.themeColor}
                  microcopy={sales?.shopModulePillLabel}
                  secondaryMicroCopy={sales?.secondaryShopModulePillLabel}
                  isSecondarySaleProduct={isSecondarySaleProduct(
                    sales,
                    product.id
                  )}
                />
              )}

            {freeGiftBanner && (
              <FreeGiftBanner
                heading={freeGiftBanner.heading}
                url={freeGiftBanner.url}
                locale={locale}
                sales={sales}
              />
            )}

            <CompareAtPricePill
              product={product}
              variantPrice={selectedVariant.price}
              compareAtPrice={
                selectedVariant?.compareAtPrice > 0
                  ? selectedVariant?.compareAtPrice
                  : null
              }
              locale={locale}
            />

            {/* for Mystery Gift sales with a saleBanner message, add 'mysteryGift &&' to condition below */}
            {showSaleBanner && (
              <SaleBanner
                sales={sales}
                shopModuleBanner={sales?.shopModuleBanner}
                hasMysteryGift={hasMysteryGift}
                locale={locale}
              />
            )}

            {isOnSale && isFixedDiscountWithSecondarySale && (
              <SaleBanner
                sales={sales}
                shopModuleBanner={sales?.shopModuleBanner}
                hasMysteryGift={hasMysteryGift}
                locale={locale}
                showCountdown={true}
              />
            )}

            {isFreeGift && defaultSaleProduct && (
              <FreeGiftBanner
                heading={freeGiftLinkLabel}
                slug={defaultSaleProduct.slug}
                locale={locale}
                sales={sales}
              />
            )}
            {isLoading === false && (
              <StyledPriceDesktop
                isAffirmAvailable={isMonthlyPayment && locale === 'en'}
              >
                <Price
                  variantPrice={selectedVariant.price}
                  variantSalePrice={variantSalePrice}
                  variantOffSalePrice={variantOffSalePrice}
                  qty={qty}
                  locale={locale}
                  sales={sales}
                  isOnSale={isOnSale}
                  compareAtPrice={
                    selectedVariant?.compareAtPrice > 0
                      ? selectedVariant?.compareAtPrice
                      : null
                  }
                  productId={product.id}
                  isMonthlyPayment={isMonthlyPayment}
                  showSaleEnds={showSaleEnds}
                />
                {isMonthlyPayment && (
                  <>
                    {locale === 'en' && (
                      <StyledVerticalLine
                        showAPRLineBreak={sales && showSaleEnds}
                      ></StyledVerticalLine>
                    )}
                    <ProductAffirm
                      variantPrice={selectedVariant.price}
                      locale={locale}
                      modal={affirmModal}
                      isMonthlyPayment={isMonthlyPayment}
                      isSaleOnFR={showSaleEnds && locale === 'fr'}
                      showAPRLineBreak={sales && showSaleEnds}
                      sales={sales}
                      qty={qty}
                    />
                  </>
                )}
              </StyledPriceDesktop>
            )}
            {productTypeSelector && (
              <ProductTypeSelector
                productTypeSelector={productTypeSelector}
                color={selectedVariant.color}
                size={selectedVariant.size}
                router={router}
              />
            )}
            {comparisonInfo && (
              <StyledComparisonInfo variant={'smallBody'} color={'gravy70'}>
                {comparisonInfo}
              </StyledComparisonInfo>
            )}
            {selectedColor && (
              <Swatches
                handleSelect={handleSelect}
                selectedSizeId={selectedSize}
                selectedColorId={selectedColor}
                colorVariants={product.colorVariants}
                productVariants={product.variants}
                locale={locale}
                productSlug={product.slug}
              />
            )}
            <Dropdown
              handleSelect={handleSelect}
              selectedSizeId={selectedSize}
              selectedVariantId={selectedVariant.id}
              selectedColorId={selectedColor}
              sizeVariants={product.sizeVariants}
              productVariants={product.variants}
              locale={locale}
              isMobileDevice={isMobileDevice}
              sales={sales}
              isOnSale={isOnSale}
              toggleSizeGuide={toggleSizeGuide}
              sizeGuide={sizeGuide}
              hasDropdown={!product.hasSkuSelector}
            />
            <SkuSelectors
              product={product}
              handleSelect={handleSelect}
              selectedSizeId={selectedSize}
              selectedColorId={selectedColor}
              productVariants={product.variants}
              locale={locale}
              productSlug={product.slug}
              hasSkuSelector={product.hasSkuSelector}
              toggleSizeGuide={toggleSizeGuide}
              sizeGuide={sizeGuide}
            />
            <QuantitySelector
              hasQuantitySelector={product.hasQuantitySelector}
              locale={locale}
              setQty={setQty}
            />
            {additionalInfo && (
              <StyledAdditionalInfo variant={'smallBody'} color={'gravy70'}>
                {additionalInfo}
              </StyledAdditionalInfo>
            )}
            {showBundleFreeGift && (
              <BundleFreeGift
                locale={locale}
                sales={sales}
                freeGift={freeGiftWithStockInfo}
                freeGiftVariant={
                  freeGiftVariantStockInfo
                    ? freeGiftVariantStockInfo
                    : freeGiftWithStockInfo?.variants[0]
                }
              />
            )}
            {hasFreeGift && freeGift && sales && !freeGift.isBundleProduct && (
              <FreeGift
                locale={locale}
                freeGift={freeGiftWithStockInfo}
                sales={sales}
                product={product}
                freeGiftVariant={
                  freeGiftVariantStockInfo
                    ? freeGiftVariantStockInfo
                    : freeGiftWithStockInfo?.variants[0]
                }
                updateFreeGiftVariant={updateFreeGiftVariant}
              />
            )}
            {upsellProducts && !showBundleFreeGift && (
              <UpsellProducts
                selectedProductVariant={selectedVariant}
                cartItems={cartItems}
                products={upsellProducts.products}
                variants={upsellProducts.variants}
                toggleSelectUpsellItem={toggleSelectUpsellItem}
                updateUpsellItemVariant={updateUpsellItemVariant}
                locale={locale}
                sales={sales}
                oneSize={oneSize}
              />
            )}
            <ReadyToShip
              isAvailable={selectedVariant?.isAvailable}
              isPreorder={isPreorder}
              preorderShippingDate={selectedVariant?.preorder?.shippingDate}
              userLocation={userLocation}
              locale={locale}
              selectedVariantId={selectedVariant?.id}
              selectedSku={selectedVariant?.sku}
              setShowShippingModal={setShowShippingModal}
              disableFreeShipping={product.disableFreeShipping}
            />
            {/* TODO: Disable the button if there is no shopifyClient in context? */}
            {selectedVariant?.isAvailable ? (
              <StyledShopButton
                onClick={() => {
                  submitCart(cartItems, hasFreeGift, freeGiftVariantStockInfo)
                  ga4AddToCart()
                }}
                variant={'solid-rubine'}
                className='AddToCart'
              >
                {buttonText}
              </StyledShopButton>
            ) : (
              <StyledShopButton
                onClick={() =>
                  !isQueenFoamHeadboard && setShowWaitlistModal(true)
                }
                disabled={isQueenFoamHeadboard}
                variant={'solid-gravy'}
              >
                {isQueenFoamHeadboard
                  ? localizedDictionary.outOfStock
                  : localizedDictionary.outOfStockNotifyMe}
              </StyledShopButton>
            )}
            {isCartError && (
              <StyledCartError color={'errorRed'} variant={'smallBody'}>
                {localizedDictionary.cartErrorMessage}{' '}
                {localizedDictionary.cartErrorTryAgainMessage}
              </StyledCartError>
            )}
            <StyledLongDescription>
              <StyledProductDetailHeading
                variant={'mediumBody'}
                color={'gravy'}
                element={'h2'}
              >
                <StyledSemibold>
                  {localizedDictionary.productDetails}
                </StyledSemibold>
              </StyledProductDetailHeading>

              <Text variant={'mediumBody'} color={'gravy'}>
                {product.longDescription}
              </Text>
            </StyledLongDescription>
            {accordionList && (
              <AccordionList accordionItems={accordionList.accordionItems} />
            )}
            {locale === 'en' && showDropAHint && (
              <StyledExtoleBtn>
                <span id='extole_zone_product_page' ref={extoleRef}></span>
              </StyledExtoleBtn>
            )}
            <StyledOutboundLinks>
              {outboundLinks && outboundLinks.length > 0 && (
                <OutboundLinks outboundLinks={outboundLinks} locale={locale} />
              )}
            </StyledOutboundLinks>
            <StyledProductBadges>
              <ProductBadges productBadges={productBadges} />
            </StyledProductBadges>
          </StyledContainer>
          <Modal
            locale={locale}
            showModal={showWaitlistModal}
            onClose={() => setShowWaitlistModal(false)}
          >
            <Waitlist
              klaviyo='biustv'
              selectedVariantId={selectedVariant.id}
              outOfStockVariants={product.variants.filter(
                (variant) => !variant.isAvailable
              )}
              sizeVariants={product.sizeVariants}
              locale={locale}
            />
          </Modal>
          {shippingModal && (
            <Modal
              locale={locale}
              showModal={showShippingModal}
              onClose={() => setShowShippingModal(false)}
            >
              {React.cloneElement(shippingModal, {
                onButtonClick: () => setShowShippingModal(false),
                locale
              })}
            </Modal>
          )}
        </Grid>
      </StyledPageWidth>
    </StyledSection>
  )
}
