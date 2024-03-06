import { KeyboardEvent, useState, useEffect } from 'react'
import FocusTrap from 'focus-trap-react'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import { VariantProps } from '../ShopModule/ShopModule.types'
import { googleAnalytics } from '../GoogleAnalytics/analytics'
import { kickDynamicTracking } from 'components/GlobalAnalytics/analytics'

import {
  useSiteContext,
  useCartCount,
  useCartItems,
  useToggleCart,
  useCartTotals
} from '../../lib/context'
import {
  StyledCart,
  StyledCartHeader,
  StyledClose,
  StyledInnerCart,
  StyledOverlay,
  StyledText,
  StyledCartOverlay,
  StyledCartOverlayContent,
  StyledCartContainer,
  StyledStickyCheckout,
  StyledCartItemsContainer
} from './Cart.styled'
import Checkout from './Checkout'
import CartItem, { LineItemProps } from './CartItem'
import EmptyCart from './EmptyCart'
// import CartShippingMessage from './CartShippingMessage'
import { Text } from '../Text/Text'
import CartCrossSell from './CartCrossSell'
import { buildPageProps } from '../../lib/buildPage'
import {
  getProductWithStock,
  getEquivalentMattressSizes,
  getCrossSellVariants,
  isProductOnSale,
  getRebuyProducts
} from './../../utils'
import {
  doesProductHaveFreeGift,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'
import { ProductProps } from '../ShopModule/ShopModule.types'
import { InventoryInfoProps } from '../../Interfaces/inventoryInfo'
import { SaleProps } from '../../Interfaces/sales'
import { CartError } from './CartError'
import { TextilesProps } from './CartTextiles'
import { CartThresholdMessage } from './CartThresholdMessage'
// import CartFreeShipping from './CartFreeShipping'
import { Router, useRouter } from 'next/router'

const closeIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/7c498bc282aed9b4c6685490068af6f2cc4c2e56-48x48.svg'

export interface SpecialOffersProps {
  mysteryGift: {
    startDate: string
    endDate: string
    gift: ProductProps[]
    products: ProductProps[]
    retailValue: number
  }
}
interface CartProps {
  references: any
  products: ProductProps[]
  productVariants: VariantProps[]
  locale: Locale
  crossSellRankings: {
    cartUpsellRebuy: {
      cartUpsellRulesetId: string
      enableCartUpsellRebuy: boolean
    }
    mattressSizeRanking: string[]
    productRanking: ProductProps[]
  }
  sales: SaleProps
  textiles: TextilesProps
  specialOffers: SpecialOffersProps
}

export const Cart = ({
  references,
  products,
  productVariants,
  locale,
  crossSellRankings,
  specialOffers,
  sales,
  textiles
}: CartProps) => {
  const cartUpsellRebuy = crossSellRankings.cartUpsellRebuy
  const { isCartOpen, isUpdating, isCartError, checkout } = useSiteContext()
  const cartError =
    !products?.length || !productVariants?.length || !checkout.id || isCartError

  const cartCount = useCartCount()

  const cartTotal = useCartTotals()

  const lineItems: LineItemProps[] = useCartItems()
  const toggleCart = useToggleCart()

  const [hasFocus, setHasFocus] = useState(false)

  // Subtotal before discounts
  const [subtotal, setSubtotal] = useState(0)

  const localizedDictionary = dictionary[locale]

  const salesWithProgressBar =
    sales?.saleType === 'Bmsm' || sales?.saleType === 'Level Up Offer'

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      toggleCart()
    }
  }

  const [productsInventoryInfo, updateProductsInventoryInfo] = useState([])

  const allProductIds = crossSellRankings?.productRanking?.map(
    (product) => product.id
  )
  const matchedSanityProduct = (item: LineItemProps) =>
    products.find((product) => product?.id === parseInt(item?.productID))
  const router = useRouter()
  useEffect(() => {
    const fetchStockInfo = async () => {
      const response = await axios(
        `/api/shopify/product-inventory?ids=${allProductIds}`
      )

      updateProductsInventoryInfo(response.data)
    }

    fetchStockInfo()
  }, [])

  useEffect(() => {
    const viewItemListData = {
      products: cartCrossSellProductList?.slice(0, 3),
      listName: 'sidecart',
      listId: 'sidecart',
      sales,
      variants: crossSellVariants?.slice(0, 3)
    }

    // If the cart is not open, exit the function
    if (!isCartOpen) return

    // If there are items in the cart
    if (cartProducts.length > 0) {
      // Track view cart events in Google Analytics and kickDynamicTracking
      googleAnalytics.viewCart(cartProducts, fullLineItemData, sales, cartTotal)
      googleAnalytics.viewItemList(viewItemListData)
      googleAnalytics.elevarViewItemList(viewItemListData)
      kickDynamicTracking.viewCart(fullLineItemData)
    }

    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [isCartOpen])

  const getProductObj = (item: LineItemProps) => {
    const productWithVariant = buildPageProps(matchedSanityProduct(item), {
      references: productVariants
    })

    const productInventoryInfo = productsInventoryInfo.find(
      (productInfo: InventoryInfoProps) => {
        return productInfo.id === productWithVariant.id
      }
    )

    const productWithStockInfo = getProductWithStock(
      productWithVariant,
      productInventoryInfo
    )

    return productWithStockInfo
  }
  const cartProducts = lineItems.map((item) => getProductObj(item))
  // add variant information to all products in cart
  const fullLineItemData = lineItems.map((item) => {
    const variant = productVariants.find(
      (variant: VariantProps) => variant.id === parseInt(item.variantID)
    )

    return {
      ...item,
      ...variant
    }
  })

  const [cartCrossSellProductList, setCartCrossSellProductList] = useState<
    ProductProps[]
  >([])

  // Cart Cross Sell Logic
  // Get all mattress sizes from cart items
  const cartMattressSizes = fullLineItemData.reduce((mattressSizes, item) => {
    const product = cartProducts.find((product) => {
      return product.id === item.productId
    })
    return product
      ? mattressSizes.concat(getEquivalentMattressSizes(product, item) as [])
      : []
  }, [])

  // Find the top mattress size in cart
  const topCartMattressSize = crossSellRankings?.mattressSizeRanking.find(
    (sizeId) => cartMattressSizes.includes(sizeId as never)
  )

  // Filter out products in cart from product ranking, giving us the list of cross sell products in order of ranking
  const crossSellProducts = crossSellRankings?.productRanking?.filter(
    (rankedProduct: ProductProps) =>
      !cartProducts.some((cartProduct) => cartProduct.id === rankedProduct.id)
  )

  useEffect(() => {
    const cartUpsellRebuyEnabled =
      cartUpsellRebuy?.enableCartUpsellRebuy &&
      cartUpsellRebuy?.cartUpsellRulesetId

    if (!cartUpsellRebuyEnabled) {
      // If rebuy recommendations are not set/enabled in Sanity, use sanity data
      return setCartCrossSellProductList(crossSellProducts)
    } else {
      // Fetch limit is is "6" in case some items are out of stock or missing necessary data
      const FETCH_LIMIT = '6'
      const cartProductIds = cartProducts.map((product) => product.id).join(',')
      const cartProductVariantIds = fullLineItemData
        .map((item) => item.id)
        .join(',')

      try {
        const getAndSetRebuyProducts = async () => {
          const rebuyCartCrossSellProducts = await getRebuyProducts(
            cartUpsellRebuy?.cartUpsellRulesetId,
            FETCH_LIMIT,
            cartProductIds,
            cartProductVariantIds,
            references,
            sales,
            locale
          )
          // If rebuy returns less than 3 results, fallback to Sanity data
          // EX: If most of the options Rebuy would have recommended are already in the cart, use fallback.
          // EX: If fewer products than is needed for the cart upsell UI are returned, use fallback
          // EX: If not enough Rebuy products are in stock for the cart upsell UI, use fallback
          if (rebuyCartCrossSellProducts.length < 3) {
            return setCartCrossSellProductList(crossSellProducts)
          }

          setCartCrossSellProductList(rebuyCartCrossSellProducts)
        }

        getAndSetRebuyProducts()
      } catch (error) {
        // If Rebuy fetch fails, fall back to Sanity data
        console.error(error)
        setCartCrossSellProductList(crossSellProducts)
      }
    }
  }, [
    lineItems,
    cartUpsellRebuy?.enableCartUpsellRebuy,
    cartUpsellRebuy?.cartUpsellRulesetId,
    Router
  ])

  // Add stock information to the list of potential cross sell products
  const crossSellProductsWithStock = cartCrossSellProductList?.map(
    (crossSellProduct) => {
      const productInventoryInfo = productsInventoryInfo.find(
        (productInfo: InventoryInfoProps) => {
          return productInfo.id === crossSellProduct.id
        }
      )
      return getProductWithStock(crossSellProduct, productInventoryInfo)
    }
  )

  // Get the top 3 featured cross sell product by top mattress size in cart and variant availability
  const crossSellVariants = getCrossSellVariants(
    crossSellProductsWithStock,
    [topCartMattressSize || ''],
    crossSellRankings?.mattressSizeRanking
  )

  const [checkoutSaleData, setCheckoutSaleData] = useState<LineItemProps[]>([])
  const [isFreeGiftInCart, setIsFreeGiftInCart] = useState(false)

  // TODO: Update this hook to work for Buy More Save More sales
  // TODO: Tech debt refactor - remove pure calculations and nested if statement
  // Consider turning into a hook
  useEffect(() => {
    if (sales && sales?.saleType === 'Buy X Get Y') {
      const freeGiftItem = sales.customerGetsProducts

      const newCheckout = fullLineItemData

      const bxgyProductIds = sales?.bxgyProductData?.map(
        (product) => product.id
      )

      const checkoutProductIds = newCheckout.map((product) => product.productId)

      const isBxgyProductInCart = bxgyProductIds?.length
        ? bxgyProductIds.some((productId) =>
            checkoutProductIds.includes(productId)
          )
        : false

      if (!isBxgyProductInCart) {
        return setCheckoutSaleData(newCheckout)
      }

      const freeGiftsInCheckout = newCheckout.filter((item) => {
        return item.productId === freeGiftItem?.id
      })

      const paidItemsInCheckout = newCheckout.filter((item) => {
        return item.productId !== freeGiftItem?.id
      })

      const getCorrespondingMattressSize = (size: string) => {
        const selectedSize = sales?.customerGetsProducts?.sizeVariants?.find(
          (variant) => variant.id === size
        )
        return selectedSize ? selectedSize.mattressSize : null
      }

      // Looks at all the free gift items in the cart to determine price
      freeGiftsInCheckout.forEach((gift) => {
        // Determines which items in cart are buy items for free gift based on variant size
        const paidItemsInCart = paidItemsInCheckout.map((item) => {
          const hasFreeGift = doesProductHaveFreeGift(sales, item.productId)

          const correspondingMattressSizes = getCorrespondingMattressSize(
            gift.size
          )

          const itemSize =
            item.size === 'Short Queen' ? 'RV Short Queen' : item.size

          return correspondingMattressSizes?.includes(itemSize) && hasFreeGift
            ? item
            : false
        })

        // Determines the quantity of free gift items based on buy items in cart
        let totalPaidItemQuantity = 0

        paidItemsInCart.forEach((item) => {
          if (item) {
            const freeProductsPerBuyItem =
              sales?.customerGetsQuantity && sales?.customerGetsQuantity !== 1
                ? sales?.customerGetsQuantity
                : 1

            totalPaidItemQuantity += item.quantity * freeProductsPerBuyItem

            const giftQuantity = gift.quantity

            gift.freeGiftQuantity =
              totalPaidItemQuantity < giftQuantity
                ? totalPaidItemQuantity
                : giftQuantity

            gift.isFreeGift = true
            gift.hasPaidItem = true
          } else {
            gift.hasPaidItem = false
          }
        })
      })

      const isFreeGift = freeGiftsInCheckout.some((gift) => gift.isFreeGift)
      const hasPaidItem = freeGiftsInCheckout.some((gift) => gift.hasPaidItem)

      if (isFreeGift && hasPaidItem) {
        setIsFreeGiftInCart(true)
      } else {
        setIsFreeGiftInCart(false)
      }

      setCheckoutSaleData(newCheckout)
    }
  }, [sales])

  useEffect(() => {
    const handlePageLoad = () => {
      /**
       * Function to handle the data layer event for page load
       * Sends user data to Google Analytics using the `dlUserData` method
       */
      const subTotal = Number(cartTotal.subTotal)
      googleAnalytics.dlUserData(
        cartProducts,
        fullLineItemData,
        sales,
        subTotal
      )
    }
    const handleRouteChange = () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      handlePageLoad()
    }

    router.isReady
      ? handlePageLoad()
      : router.events.on('routeChangeComplete', handleRouteChange)

    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router])

  const freeGiftProduct = sales?.bxgyProductData?.length
    ? sales.bxgyProductData[0]
    : undefined

  const itemsLabel =
    cartCount > 1
      ? `${localizedDictionary.itemsLabel}s`
      : `${localizedDictionary.itemsLabel}`

  const calcDiscountForLevelUpOffer =
    (sales?.saleType === 'Level Up Offer' ||
      sales?.secondarySaleType === 'Level Up Offer') &&
    subtotal < sales?.discountThresholdForLevelUp
      ? sales?.firstDiscountForLevelUp
      : sales?.secondDiscountForLevelUp

  return (
    <>
      {/* TODO: Investigate ts error in vs code cause by FocusTrap (not causing build issues) */}
      <FocusTrap
        active={isCartOpen && hasFocus}
        focusTrapOptions={{ allowOutsideClick: true }}
      >
        <StyledCart
          active={isCartOpen}
          initial='hide'
          animate={isCartOpen ? 'show' : 'hide'}
          variants={{
            show: {
              x: '0%'
            },
            hide: {
              x: '100%'
            }
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onKeyDown={(e) => handleKeyDown(e)}
          onAnimationComplete={(v) => setHasFocus(v === 'show')}
        >
          <div>
            {isUpdating && (
              <>
                <StyledCartOverlay />
                <StyledCartOverlayContent>
                  <div className='position-relative'>
                    <div className='sp sp-circle'></div>{' '}
                    <svg
                      width='32px'
                      height='32px'
                      viewBox='0 0 16 16'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      className='rubine-checkmark'
                    >
                      <g
                        id='check-mark-16x16'
                        stroke='none'
                        strokeWidth='1'
                        fill='none'
                        fillRule='evenodd'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <polyline
                          id='checkmark-path'
                          stroke='#C40058'
                          strokeWidth='2'
                          points='13 4.5 6.5 11.5 3 8.5'
                          className='rubine-checkmark position-absolute'
                        ></polyline>
                      </g>
                    </svg>
                  </div>
                  <Text variant={'largeBody'} color={'gravy'}>
                    {localizedDictionary.cartUpdatingMessage}
                  </Text>
                </StyledCartOverlayContent>
              </>
            )}
            <StyledCartHeader numOfCartItems={lineItems?.length}>
              <StyledText color='gravy' variant='h4'>
                {cartError ? (
                  <>{localizedDictionary.cartErrorHeading}</>
                ) : (
                  <>
                    {localizedDictionary.cartHeading} – {cartCount} {itemsLabel}
                  </>
                )}
              </StyledText>
              <StyledClose
                onClick={() => toggleCart()}
                aria-label={localizedDictionary.closeCartButton}
              >
                {/* TODO: replace with the icon component once ready */}
                <img src={closeIcon} alt='' />
              </StyledClose>
            </StyledCartHeader>
            {/* Removed for Same Day Delivery Pop Up & Side Cart Task */}
            {/* <CartShippingMessage locale={locale} cartError={cartError} /> */}
            {cartError ? (
              <StyledCartContainer>
                <CartError locale={locale} />
              </StyledCartContainer>
            ) : (
              <StyledCartContainer>
                {lineItems?.length ? (
                  <>
                    {/* Removed for Same Day Delivery Pop Up & Side Cart Task */}
                    {/* <CartFreeShipping locale={locale} /> */}
                    {salesWithProgressBar && (
                      <CartThresholdMessage
                        items={
                          checkoutSaleData.length
                            ? checkoutSaleData
                            : fullLineItemData
                        }
                        sales={sales}
                        locale={locale}
                      />
                    )}
                    <StyledCartItemsContainer>
                      <CartItems
                        items={
                          checkoutSaleData.length
                            ? checkoutSaleData
                            : fullLineItemData
                        }
                        locale={locale}
                        products={cartProducts}
                        sales={sales}
                        freeGiftProduct={freeGiftProduct}
                        specialOffers={specialOffers}
                        subtotal={subtotal}
                        calcDiscountForLevelUpOffer={
                          calcDiscountForLevelUpOffer
                        }
                      />
                    </StyledCartItemsContainer>
                    <CartCrossSell
                      locale={locale}
                      crossSellVariants={crossSellVariants}
                      products={cartCrossSellProductList}
                      sales={sales}
                      freeGiftInCart={isFreeGiftInCart}
                      freeGiftProduct={freeGiftProduct}
                      specialOffers={specialOffers}
                      subtotal={subtotal}
                    />
                    <StyledStickyCheckout>
                      <StyledInnerCart>
                        <Checkout
                          locale={locale}
                          sales={sales}
                          items={
                            checkoutSaleData.length
                              ? checkoutSaleData
                              : fullLineItemData
                          }
                          products={products}
                          subtotal={subtotal}
                          setSubtotal={setSubtotal}
                        />
                      </StyledInnerCart>
                    </StyledStickyCheckout>
                  </>
                ) : (
                  <StyledInnerCart>
                    <EmptyCart textiles={textiles} locale={locale} />
                  </StyledInnerCart>
                )}
              </StyledCartContainer>
            )}
          </div>
        </StyledCart>
      </FocusTrap>
      <StyledOverlay active={isCartOpen} onClick={() => toggleCart()} />
    </>
  )
}

const CartItems = ({
  items,
  locale,
  products,
  sales,
  freeGiftProduct,
  specialOffers,
  subtotal,
  calcDiscountForLevelUpOffer
}: {
  items: LineItemProps[]
  locale: Locale
  products: ProductProps[]
  sales: SaleProps
  freeGiftProduct?: ProductProps
  specialOffers: SpecialOffersProps
  subtotal: number
  calcDiscountForLevelUpOffer: number
}) => {
  const sortedItems = items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <>
      <AnimatePresence initial={false}>
        {sortedItems.map((item) => {
          const product = products.find(
            (product) => product.id === item.productId
          )
          const isOnSale =
            sales && product ? isProductOnSale(sales, product.id) : false

          const hasSaleMessaging =
            sales?.saleType === 'Percentage' ||
            sales?.saleType === 'Fixed Amount' ||
            sales?.saleType === 'Everything Off' ||
            sales?.saleType === 'Level Up Offer'

          const hasSecondarySaleMessaging =
            sales && product ? isSecondarySaleProduct(sales, product.id) : false

          const showSale =
            isOnSale && (hasSaleMessaging || hasSecondarySaleMessaging)

          const isFreeGift = item.isFreeGift

          return product ? (
            <motion.div
              key={item.lineID}
              // TODO: Figure out why the layout prop isn't causing smooth resizing when removing items: https://www.framer.com/docs/component/###layout
              // layout
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                duration: 1
              }}
            >
              <CartItem
                item={item}
                locale={locale}
                product={product}
                sales={sales}
                showSale={showSale}
                isFreeGift={!!isFreeGift}
                isBundleProduct={product.isBundleProduct}
                freeGiftProduct={freeGiftProduct}
                isOnSale={isOnSale}
                cartItems={sortedItems}
                isMysteryGift={
                  product.id === specialOffers?.mysteryGift?.gift[0]?.id
                }
                specialOffers={specialOffers}
                subtotal={subtotal}
                calcDiscountForLevelUpOffer={calcDiscountForLevelUpOffer}
              />
            </motion.div>
          ) : null
        })}
      </AnimatePresence>
      {/* TODO: Use this banner for fixed sales at the bottom on the item list */}
      {/* {showFixedSaleBanner && localizedDiscount && (
        <StyledCartBanner>
          <Text variant={'mediumBody'} color={'gravy'}>
            {localizedDictionary.cartFixedSalesMessageCongrats}{' '}
            <strong>
              {localizedDictionary.cartFixedSalesMessageIntro}{' '}
              {localizedDiscount} {localizedDictionary.cartFixedSalesMessageOff}.
            </strong>{' '}
            {localizedDictionary.cartFixedSalesMessageDiscount}
          </Text>
        </StyledCartBanner>
      )} */}
    </>
  )
}

export default Cart
