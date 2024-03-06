import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import dictionary from '../../dictionary.json'
import { Locale } from '../../types/global-types'
import {
  CartCrossSellTitle,
  StyledText,
  StyledEmblaViewport,
  StyledEmblaContainer,
  StyledEmblaProgressBoundary,
  StyledEmblaProgressFill
} from './Cart.styled'
import CartCrossSellProduct from './CartCrossSellProduct'
import { ProductProps, VariantProps } from '../ShopModule/ShopModule.types'
import { SaleProps } from '../../Interfaces/sales'
import {
  isProductFreeGift,
  isProductOnSale,
  isSecondarySaleProduct
} from '../../utils/isProductOnSale'
import { SpecialOffersProps } from './Cart'

interface CartCrossSellProps {
  locale: Locale
  crossSellVariants: (VariantProps | undefined)[]
  products: ProductProps[]
  sales: SaleProps
  freeGiftInCart: boolean
  freeGiftProduct?: ProductProps
  specialOffers: SpecialOffersProps
  subtotal: number
}

const CartCrossSell = ({
  locale,
  crossSellVariants,
  products,
  sales,
  freeGiftInCart,
  freeGiftProduct,
  specialOffers,
  subtotal
}: CartCrossSellProps) => {
  if (!crossSellVariants.length) return null

  const localizedDictionary = dictionary[locale]

  const [variants, setVariants] =
    useState<(VariantProps | undefined)[]>(crossSellVariants)

  // Options for Embla
  const scrollStartValue = 5
  const [scrollProgress, setScrollProgress] = useState(scrollStartValue)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      skipSnaps: true,
      dragFree: true
    },
    [WheelGesturesPlugin()]
  )

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(
      scrollStartValue / 100,
      Math.min(1, emblaApi.scrollProgress())
    )
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)
  }, [emblaApi, onScroll])

  // Ordering the cross sell products when there is an active sale
  // Current order: 1.Free Gift Item  2. Mattresses (except RV Mattress) 3. Secondary Sale Products 4. Remaining Cross Sells
  const updateCrossSells = (productId: number) => {
    const currentCrossSells = crossSellVariants

    const variantIndex = currentCrossSells.findIndex(
      (variant) => variant?.productId === productId
    )
    const productCrossSellVariant = currentCrossSells.find(
      (variant) => variant?.productId === productId
    )

    if (variantIndex && productCrossSellVariant) {
      currentCrossSells.splice(variantIndex, 1)
      currentCrossSells.unshift(productCrossSellVariant)

      setVariants(currentCrossSells)
    }
  }
  useEffect(() => {
    if (
      sales?.secondarySaleType === 'Percentage' &&
      sales?.secondaryDiscountPercentageProducts
    ) {
      const percentageDiscountProducts =
        sales?.secondaryDiscountPercentageProducts

      percentageDiscountProducts.forEach((discountProduct) => {
        updateCrossSells(discountProduct)
      })
    }

    if (
      sales?.secondarySaleType === 'Fixed Amount' &&
      sales?.secondaryDiscountValueProducts
    ) {
      const fixedAmountDiscountProducts = sales?.secondaryDiscountValueProducts

      fixedAmountDiscountProducts.forEach((discountProduct) => {
        updateCrossSells(discountProduct)
      })
    }

    const bxgyProducts = sales ? sales.bxgyProductData : null

    if (bxgyProducts) {
      bxgyProducts.forEach((product) => {
        if (product.name === localizedDictionary.rvMattressProductName) return

        updateCrossSells(product.id)
      })
    }

    setVariants(crossSellVariants)

    // TODO: Tech debt refactor - remove pure calculations and nested if statement
    // Consider turning into a hook
    if (!freeGiftInCart) {
      const freeGift = sales ? sales.customerGetsProducts : null

      if (freeGift?.id) {
        const rawVariants = crossSellVariants
        const freeGiftVariantIndex = rawVariants.findIndex(
          (variant) => variant?.productId === freeGift.id
        )
        const freeGiftCrossSellVariant = rawVariants.find(
          (variant) => variant?.productId === freeGift.id
        )

        if (freeGiftVariantIndex && freeGiftCrossSellVariant) {
          rawVariants.splice(freeGiftVariantIndex, 1)
          rawVariants.unshift(freeGiftCrossSellVariant)
          setVariants(rawVariants)
        }
      }
    }
  }, [freeGiftInCart, sales, crossSellVariants])

  return (
    <>
      <CartCrossSellTitle>
        <StyledText variant={'h5'} color={'gravy'}>
          {localizedDictionary.cartCrossSellTitle}
        </StyledText>
      </CartCrossSellTitle>
      <StyledEmblaViewport ref={emblaRef}>
        <StyledEmblaContainer>
          {variants?.slice(0, 5).map((variant) => {
            if (!variant) return null
            const product = products.find(
              (product) => product.id === variant?.productId
            )

            const isOnSale =
              sales && product ? isProductOnSale(sales, product.id) : false

            const isProductOnSecondarySale =
              sales && product
                ? isSecondarySaleProduct(sales, product.id)
                : false

            const showPromoTag =
              isOnSale &&
              (sales?.saleType === 'Percentage' ||
                sales?.saleType === 'Fixed Amount' ||
                sales?.saleType === 'Bmsm' ||
                sales?.saleType === 'Everything Off' ||
                sales?.secondarySaleType === 'Percentage' ||
                sales?.secondarySaleType === 'Fixed Amount' ||
                sales?.saleType === 'Level Up Offer')

            const showSalePrice =
              isOnSale &&
              (sales?.saleType === 'Percentage' ||
                sales?.saleType === 'Fixed Amount' ||
                sales?.saleType === 'Everything Off' ||
                sales?.saleType === 'Level Up Offer' ||
                isProductOnSecondarySale)

            const isFreeGift =
              sales && product ? isProductFreeGift(sales, product.id) : false

            return (
              <CartCrossSellProduct
                key={variant.id}
                variant={variant}
                product={product}
                locale={locale}
                sales={sales}
                showPromoTag={showPromoTag}
                showSalePrice={showSalePrice}
                showFreeGift={isFreeGift && !freeGiftInCart}
                specialOffers={specialOffers}
                subtotal={subtotal}
              />
            )
          })}
        </StyledEmblaContainer>
        <StyledEmblaProgressFill scrollProgress={scrollProgress}>
          <StyledEmblaProgressBoundary />
        </StyledEmblaProgressFill>
      </StyledEmblaViewport>
    </>
  )
}

export default CartCrossSell
