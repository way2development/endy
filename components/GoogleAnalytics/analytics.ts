import { ProductProps, VariantProps } from '../ShopModule/ShopModule.types'
import { SaleProps } from '../../Interfaces/sales'
import { NextRouter } from 'next/router'
import { isProductOnSale } from '../../utils'
import {
  getVariantByVariantId,
  getCartItemDataElevar,
  getVariantByProductId,
  getviewItemListProducts,
  getRankedCrossSells,
  getCrossSellWithCorrectIndexes,
  getCartItemData,
  ItemProps
} from './utils'

//extend the global Window interface
declare global {
  interface Window {
    dataLayer: any
    ElevarDataLayer: any
  }
}

// type AnalyticsProductProps = ProductProps

// TODO: store this file in lib or utils or a new folder since it's not really a component
export const googleAnalytics = {
  beginCheckout: (
    cartProducts: ProductProps[],
    cartVariants: VariantProps[],
    sales: SaleProps
  ) => {
    return new Promise((resolve, reject) => {
      const items = getCartItemData(cartProducts, cartVariants, sales)

      window.dataLayer &&
        window.dataLayer.push({
          event: 'begin_checkout',
          ecommerce: {
            items
          }
        })

      items.length > 0 ? resolve(true) : reject(false)
    })
  },
  viewCart: (
    cartProducts: ProductProps[],
    cartVariants: VariantProps[],
    sales: SaleProps,
    cartTotal: { subTotal: number | boolean }
  ) => {
    const items = getCartItemData(cartProducts, cartVariants, sales)
    const elevarItems = getCartItemDataElevar(cartProducts, cartVariants, sales)

    window.dataLayer &&
      window.dataLayer.push({
        event: 'view_cart',
        ecommerce: {
          items
        }
      })
    window.ElevarDataLayer.push({
      event: 'dl_view_cart',
      cart_total: cartTotal?.subTotal?.toString().slice(0, -2),
      ecommerce: {
        currencyCode: 'CAD',
        actionField: {
          list: 'Shopping Cart'
        },
        impressions: elevarItems
      }
    })
  },
  selectItem: (
    product: ProductProps,
    variantId: number,
    list?: string,
    position?: number
  ) => {
    const variant = getVariantByVariantId(product.variants, variantId)
    const item = {
      item_name: `${product.title}`,
      item_id: variant?.sku,
      item_brand: 'Endy',
      item_category: product.productType,
      quantity: 1,
      item_variant: variant?.title,
      item_variant_id: variantId?.toString(),
      price: variant?.price,
      product_image_url: product.previewImageUrl,
      product_sku: variant?.sku,
      product_id: product.id,
      variant_sku: variant?.sku,
      compare_price: variant?.compareAtPrice,
      list: list
    }
    const elevarItems = {
      brand: 'Endy',
      category: product.productType,
      id: variant?.sku?.toString(),
      name: `${product.title}`,
      variant: getVariantByVariantId(
        product.variants,
        variantId
      )?.sku?.toString(),
      variant_id: variantId?.toString(),
      price: getVariantByVariantId(
        product.variants,
        variantId
      )?.price?.toString(),
      image: product.previewImageUrl,
      product_id: product?.id?.toString(),
      quantity: '1',
      compare_at_price: getVariantByVariantId(
        product.variants,
        variantId
      )?.compareAtPrice?.toString(),
      list: list,
      inventory: '',
      position: position
    }

    window.dataLayer &&
      window.dataLayer.push({
        ecommerce: {
          items: [item]
        }
      })
    window.ElevarDataLayer.push({
      event: 'dl_select_item',
      user_properties: { visitor_type: 'guest', user_consent: '' },
      ecommerce: {
        currencyCode: 'CAD',
        click: {
          actionField: {
            list: location.pathname,
            action: 'click'
          },
          products: [elevarItems]
        }
      }
    })
  },
  viewItemDetails: (
    product: ProductProps,
    variantId: number,
    sales: SaleProps
  ) => {
    const variant = getVariantByVariantId(product.variants, variantId)
    const item = {
      item_name: `${product.title}`,
      item_id: variant?.sku,
      price: variant?.price,
      compare_price: variant?.compareAtPrice,
      item_brand: 'Endy',
      item_category: product.productType,
      item_variant: variant?.title,
      item_variant_id: variantId?.toString(),
      product_image_url: product.previewImageUrl,
      product_sku: variant?.sku,
      product_id: product.id,
      variant_sku: variant?.sku,
      product_slug: product.slug.replace('/', '')
    }
    const elevarItems = {
      brand: 'Endy',
      category: product.productType,
      id: variant?.sku?.toString(),
      name: `${product.title}`,
      variant: getVariantByVariantId(
        product.variants,
        variantId
      )?.sku?.toString(),
      variant_id: variantId?.toString(),
      price: getVariantByVariantId(
        product.variants,
        variantId
      )?.price?.toString(),
      image: product.previewImageUrl,
      product_id: product?.id?.toString(),
      quantity: '1',
      compare_at_price: getVariantByVariantId(
        product.variants,
        variantId
      )?.compareAtPrice?.toString(),
      list: `/products${product.slug}`,
      inventory: ''
    }

    window.ElevarDataLayer.push({
      event: 'dl_view_item',
      ecommerce: {
        currencyCode: 'CAD',
        detail: {
          actionField: {
            list: `/product${product.slug}`,
            action: 'detail'
          },
          products:
            sales && isProductOnSale(sales, product.id)
              ? [{ ...elevarItems, coupon: sales.promoCode }]
              : [elevarItems]
        }
      }
    })
    window.dataLayer &&
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          items: isProductOnSale(sales, product.id)
            ? [{ ...item, coupon: sales.promoCode }]
            : [item]
        }
      })
  },
  signupForNewsletter: (formName: string) => {
    const newsletterData = {
      event: 'form_submit',
      form_name: formName
    }

    window.dataLayer && window.dataLayer.push(newsletterData)
  },
  updateEstimatedDelivery: (formName: string, postalFSA: string) => {
    const eddFormData = {
      event: 'edd_form_submit',
      form_name: formName,
      postal_fsa: postalFSA
    }

    window.dataLayer && window.dataLayer.push(eddFormData)
  },
  addFreeGiftToCart: ({
    sales,
    freeGiftProduct
  }: {
    sales: SaleProps | undefined
    freeGiftProduct?: ItemProps | null | undefined
  }) => {
    if (sales?.saleType === 'Buy X Get Y') {
      window.dataLayer &&
        window.dataLayer.push({
          event: 'add_free_gift_to_cart',
          ecommerce: {
            items: freeGiftProduct !== undefined && [
              {
                ...freeGiftProduct,
                coupon: sales.promoCode
              }
            ]
          }
        })
    }
  },
  addUpsellToCart: ({
    product,
    variant,
    sales,
    upsellProducts,
    cartItems
  }: {
    product: ProductProps
    variant: VariantProps | undefined
    upsellProducts: { variants: VariantProps[]; products: ProductProps[] }
    sales: SaleProps | undefined
    cartItems: { id: number; quantity: number }[]
  }) => {
    const upsellCartItems = cartItems.filter((item) => item.id !== variant?.id)
    const upsellItems = upsellCartItems?.map((cartItem) => {
      const upsellProduct = upsellProducts?.products.find((product) => {
        return product?.variants.find((variant) => variant.id === cartItem.id)
      })

      const upsellVariant = upsellProduct?.variants.find(
        (variant) => variant.id === cartItem.id
      )

      if (upsellProduct && upsellVariant) {
        return {
          item_name: `${upsellProduct?.title}`,
          item_id: upsellVariant?.sku,
          price: upsellVariant?.price,
          compare_price: upsellVariant?.compareAtPrice,
          item_brand: 'Endy',
          main_product: product?.title,
          item_category: upsellProduct?.productType,
          item_variant: upsellVariant?.title,
          item_variant_id: variant?.id?.toString(),
          product_image_url: upsellProduct?.previewImageUrl,
          product_sku: upsellVariant?.sku,
          product_id: upsellProduct?.id?.toString(),
          variant_sku: upsellVariant?.sku,
          quantity: 1
        }
      }
    })
    window.dataLayer &&
      window.dataLayer.push({
        event: 'add_upsell_to_cart',
        ecommerce: {
          items:
            sales && isProductOnSale(sales, product.id)
              ? [{ ...upsellItems, coupon: sales.promoCode }]
              : [upsellItems]
        }
      })
  },
  addCrossSellToCart: ({
    product,
    variant,
    sales,
    mainProduct
  }: {
    product: ProductProps
    variant: VariantProps | undefined
    sales: SaleProps | undefined
    mainProduct: string
  }) => {
    const item = {
      item_brand: 'Endy',
      main_product: mainProduct,
      item_category: product.productType,
      item_id: variant?.sku,
      item_name: `${product.title}`,
      item_variant: variant?.title,
      item_variant_id: variant?.id?.toString(),
      price: variant?.price,
      product_image_url: product.previewImageUrl,
      product_id: product.id,
      variant_sku: variant?.sku,
      compare_price: variant?.compareAtPrice,
      quantity: 1
    }

    window.dataLayer &&
      window.dataLayer.push({
        event: 'add_to_cart_cross_sell_pdp',
        ecommerce: {
          items:
            sales && isProductOnSale(sales, product.id)
              ? [{ ...item, coupon: sales.promoCode }]
              : [item]
        }
      })
  },
  addCartCrossSellToCart: ({
    product,
    variant,
    sales
  }: {
    product: ProductProps
    variant: VariantProps | undefined
    sales: SaleProps | undefined
  }) => {
    const item = {
      item_brand: 'Endy',
      item_category: product.productType,
      item_id: variant?.sku,
      item_name: `${product.title}`,
      item_variant: variant?.title,
      item_variant_id: variant?.id?.toString(),
      price: variant?.price,
      product_image_url: product.previewImageUrl,
      product_id: product.id,
      variant_sku: variant?.sku,
      compare_price: variant?.compareAtPrice,
      quantity: 1
    }
    const elevarItems = {
      brand: 'Endy',
      category: product.productType,
      id: variant?.sku?.toString(),
      name: `${product.title}`,
      variant: variant?.title,
      variant_id: variant?.id?.toString(),
      price: variant?.price?.toString(),
      image: product.previewImageUrl,
      product_id: product?.id?.toString(),
      quantity: '1',
      compare_price: variant?.compareAtPrice?.toString(),
      list: `/product${product.slug}`
    }

    window.dataLayer &&
      window.dataLayer.push({
        event: 'add_to_cart_cross_sell_cart',
        ecommerce: {
          items:
            sales && isProductOnSale(sales, product.id)
              ? [{ ...item, coupon: sales.promoCode }]
              : [item]
        }
      })
    // Push event to the dataLayer
    window.ElevarDataLayer.push({
      event: 'dl_add_to_cart',
      ecommerce: {
        currencyCode: 'CAD',
        add: {
          actionField: {
            list: `/products${product.slug}`
          },
          products:
            sales && isProductOnSale(sales, product.id)
              ? [{ ...elevarItems, coupon: sales.promoCode }]
              : [elevarItems]
        }
      }
    })
  },
  addToCart: ({
    product,
    variant,
    sales,
    quantity
  }: {
    product: ProductProps
    variant: VariantProps | undefined
    sales: SaleProps | undefined
    quantity: number
  }) => {
    // Create the item object for data layer
    const item = {
      item_brand: 'Endy',
      item_category: product.productType,
      item_id: variant?.sku,
      item_name: `${product.title}`,
      item_variant: variant?.title,
      item_variant_id: variant?.id?.toString(),
      price: variant?.price,
      product_image_url: product.previewImageUrl,
      product_id: product.id,
      variant_sku: variant?.sku,
      compare_price: variant?.compareAtPrice,
      quantity: quantity,
      product_slug: product?.slug?.replace('/', '')
    }
    // Create the elevarItems object for Elevar dataLayer events
    const elevarItems = {
      brand: 'Endy',
      category: product.productType,
      id: variant?.sku?.toString(),
      name: `${product.title}`,
      variant: variant?.title,
      variant_id: variant?.id?.toString(),
      price: variant?.price?.toString(),
      image: product.previewImageUrl,
      product_id: product.id?.toString(),
      quantity: quantity?.toString(),
      compare_price: variant?.compareAtPrice?.toString(),
      list: `/product${product.slug}`
    }
    // Push event to the dataLayer
    window.ElevarDataLayer.push({
      event: 'dl_add_to_cart',
      ecommerce: {
        currencyCode: 'CAD',
        add: {
          actionField: {
            list: `/products${product.slug}`
          },
          products:
            sales && isProductOnSale(sales, product.id)
              ? [{ ...elevarItems, coupon: sales.promoCode }]
              : [elevarItems]
        }
      }
    })

    window.dataLayer &&
      window.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          items:
            sales && isProductOnSale(sales, product.id)
              ? [{ ...item, coupon: sales.promoCode }]
              : [item]
        }
      })
  },
  removeFromCart: (
    product: ProductProps,
    variant: VariantProps | undefined,
    sales: SaleProps
  ) => {
    // Create the item object for data layer
    const item = {
      item_brand: 'Endy',
      item_category: product.productType,
      item_id: variant?.sku,
      item_name: `${product.title}`,
      item_variant: variant?.title,
      item_variant_id: variant?.id?.toString(),
      price: variant?.price,
      quantity: 1,
      product_image_url: product.previewImageUrl,
      product_sku: variant?.sku,
      variant_sku: variant?.sku,
      product_id: product.id?.toString(),
      compare_price: variant?.compareAtPrice,
      product_slug: product.slug?.replace('/', '')
    }
    // Create the elevarItems object for Elevar events
    const elevarItems = {
      brand: 'Endy',
      category: product.productType,
      id: variant?.sku?.toString(),
      name: `${product.title}`,
      variant: variant?.title,
      variant_id: variant?.id?.toString(),
      price: variant?.price?.toString(),
      image: product.previewImageUrl,
      product_id: product.id?.toString(),
      quantity: '1',
      compare_price: variant?.compareAtPrice?.toString(),
      list: `/product${product.slug}`
    }
    // Send event to Elevar data layer
    window.ElevarDataLayer.push({
      event: 'dl_remove_from_cart',
      ecommerce: {
        currencyCode: 'CAD',
        remove: {
          actionField: {
            list: `/product${product.slug}`
          },
          products:
            sales && isProductOnSale(sales, product.id)
              ? [{ ...elevarItems, coupon: sales.promoCode }]
              : [elevarItems]
        }
      }
    })

    window.dataLayer &&
      window.dataLayer.push({
        event: 'remove_from_cart',
        ecommerce: {
          items: isProductOnSale(sales, product.id)
            ? [{ ...item, coupon: sales.promoCode }]
            : [item]
        }
      })
  },

  // Todo: to be merged with elevarViewItemList
  viewItemList: ({
    products,
    listName,
    listId,
    sales,
    variants
  }: {
    products: ProductProps[]
    listName: string
    listId: string
    sales: SaleProps | undefined
    variants?: (VariantProps | undefined)[]
  }) => {
    const items = products.map((product, i) => {
      // Get the variant corresponding to the product ID
      const variant = variants && getVariantByProductId(variants, product.id)
      // Create the current item object
      const currentItem = {
        item_name: `${product.title}`,
        item_id: variant?.sku ? variant?.sku : '',
        item_brand: 'Endy',
        item_category: product.productType,
        item_list_name: listName,
        item_list_id: listId,
        item_variant: variant?.size,
        product_image_url: product.previewImageUrl,
        variant_sku: variant?.sku
      }
      if (
        listId === 'collections' ||
        listId === 'addons' ||
        listId === 'sidecart'
      ) {
        return getviewItemListProducts({
          currentItem,
          listId,
          product,
          sales,
          listName,
          variants: listId !== 'collections' ? variants : undefined
        })
      }
    })

    const filteredItems = items.filter((item) => item !== undefined)
    const rankedCartCrossSells =
      listId === 'sidecart' &&
      variants &&
      getCrossSellWithCorrectIndexes(
        getRankedCrossSells(filteredItems, variants)
      )

    window.dataLayer &&
      window.dataLayer.push({
        event: 'view_item_list',
        ecommerce: {
          items: listId === 'sidecart' ? rankedCartCrossSells : filteredItems
        }
      })
  },

  dlUserData: (
    cartProducts: ProductProps[],
    cartVariants: VariantProps[],
    sales: SaleProps,
    cartTotal: number
  ) => {
    const items = getCartItemDataElevar(cartProducts, cartVariants, sales)
    const subTotal = cartTotal > 0 ? cartTotal / 100 : 0

    window.ElevarDataLayer.push({
      event: 'dl_user_data',
      cart_total: subTotal?.toString(),
      user_properties: { visitor_type: 'guest', user_consent: '' },
      ecommerce: {
        currencyCode: 'CAD',
        cart_contents: {
          products: items
        }
      }
    })
  },

  // View item list for Elevar because it has different params
  // Todo: merge it with viewItemlist after testing and making sure serverside works
  elevarViewItemList: ({
    products,
    listName,
    listId,
    sales,
    variants,
    router
  }: {
    products: ProductProps[]
    listName: string
    listId: string
    sales: SaleProps | undefined
    variants?: (VariantProps | undefined)[]
    router?: NextRouter
  }) => {
    const items = products.map((product, i) => {
      // Get the variant corresponding to the product ID
      const variant = variants && getVariantByProductId(variants, product.id)
      // Create the current item object
      const currentItem = {
        brand: 'Endy',
        category: product.productType,
        id: variant?.sku?.toString(),
        name: `${product.title}`,
        variant: variant?.title,
        variant_id: variant?.id?.toString(),
        image: product.previewImageUrl,
        product_id: product.id?.toString(),
        list: listName,
        position: i + 1
      }

      if (
        listId === 'collections' ||
        listId === 'addons' ||
        listId === 'sidecart'
      ) {
        return getviewItemListProducts({
          currentItem,
          listId,
          product,
          sales,
          listName,
          variants: listId !== 'collections' ? variants : undefined
        })
      }
    })
    // Filter out undefined items from the items array
    const filteredItems = items.filter((item) => item !== undefined)

    // Calculate rankedCartCrossSells if listId is 'sidecart' and variants exist
    const rankedCartCrossSells =
      listId === 'sidecart' &&
      variants &&
      getCrossSellWithCorrectIndexes(
        getRankedCrossSells(filteredItems, variants)
      )
    // Push data to the Elevar data layer
    window.ElevarDataLayer.push({
      event: 'dl_view_item_list',
      user_properties: { visitor_type: 'guest', user_consent: '' },
      ecommerce: {
        currencyCode: 'CAD',
        impressions:
          listId === 'sidecart' ? rankedCartCrossSells : filteredItems
      }
    })
  }
}
