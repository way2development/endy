import { useEffect, useState } from 'react'
import Link from 'next/link'
import dictionary from '../../dictionary.json'
import { getProductNameWithoutArticles } from '../../utils/grammar'

import { Locale } from '../../types/global-types'
import { StyledVisuallyHidden } from '../../styles/global.styled'
import {
  getLocalizedPrice,
  getLocalizedSalePrice,
  getLevelUpSalePrice
} from '../../utils/getLocalizedPrice'
import {
  isSecondarySaleProduct,
  isProductOnSale
} from '../../utils/isProductOnSale'

import {
  useUpdateItem,
  useRemoveItem,
  useToggleCart,
  useAddItem
} from '../../lib/context'
import {
  StyledCartItem,
  StyledCartItemControl,
  StyledCartItemControls,
  StyledCartItemHeading,
  StyledCartItemImgContainer,
  StyledCartItemVariantContainer,
  StyledDecreaseButton,
  StyledDelayedShippingInfoContainer,
  StyledDiscountAmount,
  StyledFreeGiftInfo,
  StyledFreeGiftText,
  StyledEndyCashFreeGift,
  StyledEndyCashInfo,
  StyledIncreaseButton,
  StyledPreorderLabel,
  StyledRemoveButton,
  StyledBundleList,
  StyledVariantBundleContainer,
  StyledVariantPriceContainer,
  StyledBundleBanner,
  StyledCartItemInnerContainer,
  StyledCartItemHeader,
  StyledChangeQuantity,
  StyledEditSize
} from './Cart.styled'
import { Text } from '../Text/Text'
import { Image } from '../Image/Image'
import { ProductProps, VariantProps } from '../ShopModule/ShopModule.types'
import { SpecialOffersProps } from './Cart'
import { SaleProps } from '../../Interfaces/sales'
import CartItemPrice from './CartItemPrice'
import CartItemMystery from './CartItemMystery'
import { getFormattedDate } from '../../lib/time'
import { googleAnalytics } from '../GoogleAnalytics/analytics'
import { Dropdown } from '../Dropdown/Dropdown'

export interface LineItemProps extends VariantProps {
  productID: string
  variantID: string
  lineID: string
  createdAt: number
  isFreeGift?: boolean
  freeGiftQuantity?: number
  hasPaidItem?: boolean
  quantity: number
}

export interface CartItemProps {
  // Item is the line item data from the shopify cart
  item: LineItemProps
  locale: Locale
  // Product is the product data stored in Sanity
  product: ProductProps
  sales: SaleProps
  showSale: boolean
  isFreeGift: boolean
  freeGiftProduct?: ProductProps
  isOnSale: boolean
  specialOffers: SpecialOffersProps
  isMysteryGift?: boolean
  cartItems: LineItemProps[]
  subtotal: number
  calcDiscountForLevelUpOffer: number
  isBundleProduct?: boolean
}

const CartItemImage = ({
  item,
  product
}: {
  item: LineItemProps
  product: ProductProps
}) => {
  return (
    <>
      {item?.images?.cartImage ? (
        <Image
          desktopImage={item.images.cartImage.desktopImage}
          tabletImage={item.images.cartImage.tabletImage}
          mobileImage={item.images.cartImage.mobileImage}
          alt={item.images.cartImage?.alt}
          srcWidths={[768, 1024]}
        />
      ) : (
        <Image
          desktopImage={product?.images?.cartImage?.desktopImage}
          tabletImage={product?.images?.cartImage?.tabletImage}
          mobileImage={product?.images?.cartImage?.mobileImage}
          alt={product?.images?.cartImage?.alt}
          srcWidths={[768, 1024]}
        />
      )}
    </>
  )
}

const CartItem = ({
  item,
  product,
  locale,
  sales,
  showSale,
  isFreeGift,
  freeGiftProduct,
  isOnSale,
  isMysteryGift,
  cartItems,
  specialOffers,
  subtotal,
  calcDiscountForLevelUpOffer,
  isBundleProduct
}: CartItemProps) => {
  const localizedDictionary = dictionary[locale]
  // Context
  const updateItem = useUpdateItem()
  const toggleCart = useToggleCart()
  const removeItem = useRemoveItem()
  const addItem = useAddItem()

  // Determine if product has a mystery gift
  const [mysteryGift, setMysteryGift] =
    useState<LineItemProps | undefined>(undefined)

  const mysteryGiftProducts = specialOffers?.mysteryGift?.products

  const hasMysteryGift = mysteryGiftProducts?.find((mysteryGiftProduct) => {
    return mysteryGiftProduct.id === product.id
  })

  // Determine if product is a Bundle Sale
  const isBundleSale = isBundleProduct && sales?.saleType === 'Buy X Get Y'
  const bundleGiftIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/0781d96197d0d38c6defb967768102833bb95465-14x15.svg'

  const plusIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/ac1380aeeae96222f83e0a6663991ae045bd5973-12x13.svg'
  const minusIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/f93b2d7223528d6a804e01517d6828bdaf068d56-13x3.svg'
  const trashIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/dc00375780454b1d945cb69ae5fc48554f8ebb36-16x16.svg'
  const giftBoxIcon =
    'https://cdn.sanity.io/images/d0kd7r9c/production/bf62c7e10ff15125f335ebce03a721f40a4669dd-13x13.svg'

  useEffect(() => {
    if (hasMysteryGift) {
      // Getting the first mystery gift listed in Sanity. Determining if mystery gift is in cart based on product id.
      const mysteryGiftId = specialOffers?.mysteryGift?.gift[0].id

      const mysteryGiftInCart = cartItems.find((item) => {
        return item.productId === mysteryGiftId
      })

      setMysteryGift(mysteryGiftInCart)
    }
  }, [cartItems])

  const changeQuantity = async (
    quantity: number,
    qtyChange: 'increase' | 'decrease'
  ) => {
    await updateItem(item.lineID, quantity)

    if (hasMysteryGift && mysteryGift) {
      const mysteryGiftQty =
        qtyChange === 'increase'
          ? mysteryGift.quantity + 1
          : mysteryGift.quantity - 1

      updateItem(mysteryGift.lineID, mysteryGiftQty)
    }
  }

  // State
  const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(false)
  const [showChangeVariant, setShowChangeVariant] = useState(false)
  const [selectedVariantIDFromDropdown, setSelectedVariantIDFromDropdown] =
    useState('')

  // Variants & Size
  const hasVariants = product.variants?.length > 1
  const currentVariant = product.variants?.find(
    (variant) => variant.id === parseInt(item.variantID)
  )
  const selectedSize = currentVariant?.size
  const selectedColor = currentVariant?.color

  // If we want to show all product variants regardless of color in future, remove this filter
  const filteredProducts = {
    ...product,
    variants: product.variants?.filter((variant) => {
      if (selectedColor && variant.color) {
        return variant?.color === selectedColor
      }
      return true
    })
  }

  const selectedSizeLabel = filteredProducts?.sizeVariants?.find((sizeVar) => {
    return sizeVar.id === selectedSize
  })

  const selectedColorLabel = filteredProducts?.colorVariants?.find(
    (colorVar) => {
      return colorVar.id === selectedColor
    }
  )

  // Compare at Price
  const isReducedPriceActive = item?.compareAtPrice ? true : false
  const regularCompareAtPrice =
    isReducedPriceActive &&
    getLocalizedPrice(item?.compareAtPrice, locale, item?.quantity)

  // For Level Up Offer Sale Type
  const formatDiscountForLevelUpOffer = () => {
    return sales?.discountValueForLevelUp === 'Percentage'
      ? `${calcDiscountForLevelUpOffer}${locale === 'en' ? `% ` : ` % `}`
      : getLocalizedPrice(calcDiscountForLevelUpOffer, locale)
  }

  // Sales
  const isPercentageSaleProduct =
    (sales?.secondarySaleType === 'Percentage' &&
      isSecondarySaleProduct(sales, product.id)) ||
    (sales?.saleType === 'Percentage' && isProductOnSale(sales, product.id))

  const discountPercentage =
    isPercentageSaleProduct && sales?.secondarySaleType === 'Percentage'
      ? sales?.secondaryDiscountPercentage
      : sales?.discountPercentage

  let localizedDiscount

  if (sales?.saleType === 'Fixed Amount' && sales?.discountValue) {
    localizedDiscount = getLocalizedPrice(
      sales.discountValue * item?.quantity,
      locale
    )
  } else if (sales?.saleType === 'Everything Off') {
    const salePrice = item?.salePrice ? item?.salePrice : item?.price
    const offSalePrice = item?.offSalePrice ? item?.offSalePrice : item?.price
    const discountAmount = offSalePrice - salePrice

    localizedDiscount = getLocalizedPrice(
      discountAmount * item?.quantity,
      locale
    )
  } else {
    localizedDiscount = null
  }

  // TODO: Test this isGetYItem for next Buy X Get Y sale for any regressions
  const isGetYItem =
    sales?.saleType === 'Buy X Get Y' &&
    sales?.customerGetsProducts?.id === item?.productId
  const freeGiftQuantity = item?.freeGiftQuantity ? item.freeGiftQuantity : 0
  const calcQuantity = isFreeGift
    ? item?.quantity - freeGiftQuantity
    : item?.quantity

  const productName =
    freeGiftProduct?.name && getProductNameWithoutArticles(freeGiftProduct.name)

  const freeGiftText = `${localizedDictionary.freeWith} ${productName}`

  // Endy Cash logic
  const isEndyCash = sales?.displayName.includes('Endy Cash')
  const endyCashFreeGiftInfo =
    locale === 'fr'
      ? 'Valable jusqu’au 6 octobre.'
      : 'Redeem sitewide until Oct 6'

  // Item Totals
  const itemPrice =
    sales?.saleType === 'Everything Off' && item?.offSalePrice !== null
      ? item?.offSalePrice
      : item?.price

  const localizedTotal = getLocalizedPrice(itemPrice, locale, item?.quantity)

  let salePrice

  if (sales?.saleType === 'Everything Off') {
    const itemSalePrice = item?.salePrice ? item?.salePrice : item?.price

    salePrice = getLocalizedSalePrice(
      itemSalePrice,
      sales,
      locale,
      calcQuantity,
      item.productId
    )
  } else if (sales?.saleType === 'Level Up Offer') {
    const calcSalePrice = getLevelUpSalePrice(itemPrice, sales, subtotal)

    salePrice = getLocalizedPrice(calcSalePrice, locale, item?.quantity)
  } else {
    salePrice =
      sales &&
      getLocalizedSalePrice(
        itemPrice,
        sales,
        locale,
        calcQuantity,
        item.productId
      )
  }

  const removeFromCart = async (lineItemId: string) => {
    await removeItem(lineItemId)

    if (hasMysteryGift && mysteryGift) {
      if (item.quantity === mysteryGift.quantity) {
        removeItem(mysteryGift.lineID)
      } else {
        updateItem(mysteryGift.lineID, mysteryGift.quantity - item.quantity)
      }
    }
  }

  const variantData = filteredProducts.variants?.map((variant: any) => {
    return {
      id: variant.id.toString(),
      slug: variant.title,
      isAvailable: variant.isAvailable,
      price: variant.price
    }
  })

  const sizeLabels = filteredProducts.sizeVariants?.map((variant: any) => {
    return { label: variant.label }
  })

  // Combining the variant data with the translated size labels to create the dropdown list
  const productDropdownList = variantData.map((variant, index) => ({
    ...variant,
    ...sizeLabels[index]
  }))

  // ensures that the cart item card is immediately updated to the correct variant when the variant is changed
  useEffect(() => {
    if (selectedVariantIDFromDropdown) {
      updateVariant(selectedVariantIDFromDropdown)
    }
  }, [selectedVariantIDFromDropdown])

  const updateVariant = async (id: string) => {
    const selectedVariantID = parseInt(id)

    if (id) {
      const currentSelectedVariantId = item.lineID
      googleAnalytics.selectItem(
        filteredProducts,
        parseInt(id),
        'select_item_variant'
      )

      await addItem([{ id: selectedVariantID, quantity: item.quantity }])
      removeItem(currentSelectedVariantId)
    }
  }

  return (
    <>
      {isMysteryGift ? (
        <CartItemMystery
          locale={locale}
          mysteryGiftProduct={product}
          mysteryGiftItem={item}
          // removeFromCart={removeFromCart}
          itemLineId={item.lineID}
          retailValue={specialOffers?.mysteryGift?.retailValue}
        />
      ) : (
        <StyledCartItem hasBottomBorder={showChangeVariant}>
          {/* TODO: properly implement this with Sanity */}
          {currentVariant?.preorder?.isPreorder &&
            currentVariant?.preorder?.shippingDate && (
              <StyledDelayedShippingInfoContainer>
                {/* TODO: Replace with the icon component */}
                <img
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/97b5244fd644aa61904746a04ec4bf24ee968272-16x16.svg'
                  alt=''
                />
                <Text variant={'smallBody'} color={'white'}>
                  <strong>
                    {product.name}{' '}
                    {localizedDictionary.cartDelayedShippingMessage}{' '}
                    {getFormattedDate(
                      currentVariant?.preorder?.shippingDate,
                      { month: 'long', day: 'numeric' },
                      locale
                    )}
                    .
                  </strong>
                </Text>
              </StyledDelayedShippingInfoContainer>
            )}
          {isBundleSale && isGetYItem && (
            <StyledBundleBanner>
              <img src={bundleGiftIcon} alt='' />{' '}
              <Text variant={'mediumBody'} color={'gravy'}>
                <strong> {localizedDictionary.freeWithMattress}</strong>
              </Text>
            </StyledBundleBanner>
          )}
          <>
            <StyledCartItemInnerContainer>
              <StyledCartItemHeader>
                {filteredProducts?.slug ? (
                  <Link
                    href={`/products${filteredProducts?.slug}`}
                    locale={locale}
                    onClick={toggleCart}
                  >
                    <StyledCartItemHeading
                      variant={'mediumBody'}
                      color={'gravy'}
                      hasProductSlug={filteredProducts?.slug ? true : false}
                    >
                      <strong>{product.name}</strong>
                    </StyledCartItemHeading>
                  </Link>
                ) : (
                  <StyledCartItemHeading
                    variant={'mediumBody'}
                    color={'gravy'}
                    hasProductSlug={filteredProducts?.slug ? true : false}
                  >
                    <strong>{product.name}</strong>
                  </StyledCartItemHeading>
                )}

                <StyledRemoveButton
                  disabled={isRemoveButtonDisabled}
                  aria-label={localizedDictionary.removeProductButtonAlt}
                  onClick={() => {
                    googleAnalytics.removeFromCart(
                      product,
                      currentVariant,
                      sales
                    )
                    removeFromCart(item.lineID)
                    setIsRemoveButtonDisabled(true)
                  }}
                >
                  <img src={trashIcon} alt='' />
                </StyledRemoveButton>
              </StyledCartItemHeader>

              <div>
                <StyledCartItemVariantContainer>
                  <StyledCartItemImgContainer>
                    {filteredProducts?.slug ? (
                      <Link
                        href={`/products${filteredProducts?.slug}`}
                        locale={locale}
                        onClick={toggleCart}
                      >
                        <CartItemImage item={item} product={product} />
                      </Link>
                    ) : (
                      <CartItemImage item={item} product={product} />
                    )}
                  </StyledCartItemImgContainer>
                  <StyledVariantBundleContainer>
                    <StyledVariantPriceContainer>
                      <div>
                        <Text variant={'smallBody'} color={'gravy80'}>
                          {selectedSizeLabel?.label}
                        </Text>
                        {selectedColorLabel && (
                          <Text variant={'smallBody'} color={'gravy80'}>
                            {selectedColorLabel.label}
                          </Text>
                        )}
                      </div>
                      <CartItemPrice
                        localizedTotal={localizedTotal}
                        showSale={showSale}
                        salePrice={salePrice}
                        isFreeGift={isFreeGift}
                        locale={locale}
                        sales={sales}
                        isReducedPriceActive={isReducedPriceActive}
                        regularCompareAtPrice={regularCompareAtPrice}
                        isOnSale={isOnSale}
                      />
                    </StyledVariantPriceContainer>

                    {isBundleSale && (
                      <div>
                        <Text variant={'smallBody'} color={'gravy80'}>
                          {localizedDictionary.includes}
                          <StyledBundleList locale={locale}>
                            <div>
                              {product.variants?.map((variant) => {
                                return (
                                  variant.title === selectedSizeLabel?.id &&
                                  variant.bundleOffers &&
                                  variant.bundleOffers.map((bundleOffer) => {
                                    return (
                                      <li key={bundleOffer._key}>
                                        {bundleOffer?.quantity}{' '}
                                        {bundleOffer.title}
                                      </li>
                                    )
                                  })
                                )
                              })}
                            </div>
                          </StyledBundleList>
                        </Text>
                      </div>
                    )}
                    {currentVariant?.preorder?.isPreorder && (
                      <StyledPreorderLabel variant={'micro'} color={'gravy'}>
                        {localizedDictionary.preorderedItem}
                      </StyledPreorderLabel>
                    )}
                    {showSale && localizedDiscount && !isPercentageSaleProduct && (
                      <StyledDiscountAmount
                        variant={'smallBody'}
                        color={'rubine'}
                      >
                        <strong>
                          {localizedDiscount}{' '}
                          {localizedDictionary.cartFixedSalesMessageOff}
                        </strong>
                      </StyledDiscountAmount>
                    )}
                    {showSale &&
                      ((discountPercentage && isPercentageSaleProduct) ||
                        calcDiscountForLevelUpOffer) && (
                        <StyledDiscountAmount variant={'micro'} color={'gravy'}>
                          <strong>
                            {calcDiscountForLevelUpOffer &&
                              formatDiscountForLevelUpOffer()}
                            {` `}
                            {discountPercentage &&
                              `${discountPercentage}${
                                locale === 'en' ? `% ` : ` % `
                              }`}
                            {localizedDictionary.cartFixedSalesMessageOff}
                          </strong>
                        </StyledDiscountAmount>
                      )}
                    {isGetYItem &&
                      freeGiftProduct?.name &&
                      !isBundleProduct &&
                      !isEndyCash && (
                        <StyledFreeGiftInfo>
                          {/* TODO: Use Icon component when ready */}
                          <img src={giftBoxIcon} alt='' />
                          <StyledFreeGiftText variant={'micro'} color={'gravy'}>
                            <strong>{freeGiftText}</strong>
                          </StyledFreeGiftText>
                        </StyledFreeGiftInfo>
                      )}
                    {isFreeGift && isEndyCash && (
                      <>
                        <StyledEndyCashFreeGift
                          variant={'micro'}
                          color={'rubine'}
                        >
                          {localizedDictionary.freeGift}
                        </StyledEndyCashFreeGift>
                        <StyledEndyCashInfo variant={'micro'} color={'rubine'}>
                          {endyCashFreeGiftInfo}
                        </StyledEndyCashInfo>
                      </>
                    )}
                  </StyledVariantBundleContainer>
                </StyledCartItemVariantContainer>
              </div>
            </StyledCartItemInnerContainer>
            <StyledCartItemControls hasVariants={hasVariants}>
              {hasVariants && !showChangeVariant && (
                <StyledEditSize
                  label={localizedDictionary.editSize}
                  variant='block-line-gravy'
                  onClick={() => setShowChangeVariant(true)}
                />
              )}
              {showChangeVariant && (
                <Dropdown
                  label={''}
                  handleChange={() =>
                    updateVariant(selectedVariantIDFromDropdown)
                  }
                  handleClick={() =>
                    updateVariant(selectedVariantIDFromDropdown)
                  }
                  options={productDropdownList}
                  variant={'white'}
                  selectedOption={currentVariant?.id.toString()}
                  setDropdownSize={setSelectedVariantIDFromDropdown}
                  locale={locale}
                  isCartDropdown={true}
                />
              )}
              <StyledChangeQuantity>
                <StyledCartItemControl disabled={item?.quantity <= 1}>
                  <StyledDecreaseButton
                    aria-label={localizedDictionary.decreaseQuantityButtonAlt}
                    disabled={item?.quantity <= 1}
                    onClick={() => {
                      googleAnalytics.removeFromCart(
                        product,
                        currentVariant,
                        sales
                      )
                      changeQuantity(item?.quantity - 1, 'decrease')
                    }}
                  >
                    <img src={minusIcon} alt='' />
                  </StyledDecreaseButton>
                </StyledCartItemControl>
                <StyledCartItemControl>
                  <Text variant={'mediumBody'} color={'gravy'}>
                    {item?.quantity}
                  </Text>
                  {/* TODO: Have this translated and added in French */}
                  {locale === 'en' && (
                    <StyledVisuallyHidden>
                      {`You have ${item?.quantity} ${product?.name} in your cart, totalling ${localizedTotal}.`}
                    </StyledVisuallyHidden>
                  )}
                </StyledCartItemControl>
                <StyledCartItemControl>
                  <StyledIncreaseButton
                    aria-label={localizedDictionary.increaseQuantityButtonAlt}
                    onClick={() => {
                      googleAnalytics.addToCart({
                        product,
                        variant: currentVariant,
                        sales,
                        quantity: 1
                      })
                      changeQuantity(item?.quantity + 1, 'increase')
                    }}
                  >
                    <img src={plusIcon} alt='' />
                  </StyledIncreaseButton>
                </StyledCartItemControl>
              </StyledChangeQuantity>
            </StyledCartItemControls>
          </>
        </StyledCartItem>
      )}
    </>
  )
}

export default CartItem
