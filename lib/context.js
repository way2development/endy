import React, { createContext, useContext, useEffect, useState } from 'react'
import { Base64 } from 'base64-string'
import shopify from './shopify'

// Set our initial context states
const initialContext = {
  isPageTransition: false,
  productCounts: [],
  userLocation: null,
  shopifyClient: shopify,
  isLoading: true,
  isAdding: false,
  isUpdating: false,
  isCartOpen: false,
  isCartError: false,
  checkout: {
    id: null,
    lineItems: []
  },
  localizedRoutes: {
    en_route: '',
    fr_route: 'fr'
  },
  navigatorLanguage: null,
  reviews: {
    reviewPage: 1,
    filters: {
      selectedSort: '&sort=date&direction=desc',
      sleepPosition: '',
      keywordSearch: ''
    }
  }
}

export const WriteAReviewContext = createContext(false)

// Set context
const SiteContext = createContext({
  context: initialContext,
  setContext: () => null
})

// Build a new checkout
const createNewCheckout = (context) => {
  return context.shopifyClient?.checkout.create({
    presentmentCurrencyCode: 'USD'
  })
}

// Get Shopify checkout cart
const fetchCheckout = (context, id) => {
  return context.shopifyClient?.checkout.fetch(id)
}

// set Shopify variables
const shopifyCheckoutID = 'shopify_checkout_id'
const shopifyVariantGID = 'gid://shopify/ProductVariant/'
const shopifyProductGID = 'gid://shopify/Product/'

// set our checkout states
const setCheckoutState = async (checkout, setContext, openCart) => {
  if (!checkout) return null

  if (typeof window !== `undefined`) {
    localStorage.setItem(shopifyCheckoutID, checkout.id)
  }

  // lineItems contains an array of products that are in the shopify checkout
  // TODO: Look into renaming this variable for clarity
  const lineItems = await Promise.all(
    checkout.lineItems.map(async (item) => {
      const enc = new Base64()
      const variantID = item.variant.id.split(shopifyVariantGID)[1]
      const productID = item.variant.product.id.split(shopifyProductGID)[1]
      // Hard coded to be the first custom attribute in the array as we only add one attribute to the checkout
      const createdAt = item.customAttributes[0]?.value

      return {
        variantID,
        productID,
        quantity: item.quantity,
        lineID: item.id,
        createdAt
      }
    })
  )

  // update state
  setContext((prevState) => {
    return {
      ...prevState,
      isAdding: false,
      isLoading: false,
      isUpdating: false,
      isCartError: false,
      isCartOpen: openCart ? true : prevState.isCartOpen,
      checkout: {
        id: checkout.id,
        lineItems: lineItems,
        subTotal: checkout.lineItemsSubtotalPrice,
        webUrl: checkout.webUrl
      }
    }
  })
}

/*  ------------------------------ */
/*  Our Context Wrapper
/*  ------------------------------ */

const SiteContextProvider = ({ data, children }) => {
  const { productCounts } = data

  const [context, setContext] = useState({
    ...initialContext,
    ...{ productCounts }
  })

  const [initContext, setInitContext] = useState(false)

  useEffect(() => {
    // Shopify checkout not build yet
    if (initContext === false) {
      const initializeCheckout = async () => {
        const existingCheckoutID =
          typeof window !== 'undefined'
            ? localStorage.getItem(shopifyCheckoutID)
            : false

        // existing Shopify checkout ID found
        if (existingCheckoutID) {
          try {
            // fetch checkout from Shopify
            const existingCheckout = await fetchCheckout(
              context,
              existingCheckoutID
            )

            // Check if there are invalid items
            if (
              existingCheckout.lineItems.some((lineItem) => !lineItem.variant)
            ) {
              throw new Error(
                'Invalid item in checkout. This variant was probably deleted from Shopify.'
              )
            }

            // Make sure this cart hasn’t already been purchased.
            if (!existingCheckout.completedAt) {
              setCheckoutState(existingCheckout, setContext)
              return
            }
          } catch (e) {
            localStorage.setItem(shopifyCheckoutID, null)
          }
        }

        // Otherwise, create a new checkout!
        const newCheckout = await createNewCheckout(context)
        setCheckoutState(newCheckout, setContext)
      }

      // Initialize the store context
      initializeCheckout()
      setInitContext(true)
    }
  }, [initContext, context, setContext, context.shopifyClient?.checkout])

  return (
    <SiteContext.Provider
      value={{
        context,
        setContext
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

// Access our global store states
function useSiteContext() {
  const { context } = useContext(SiteContext)
  return context
}

// Toggle page transition state
function useTogglePageTransition() {
  const {
    context: { isPageTransition },
    setContext
  } = useContext(SiteContext)

  async function togglePageTransition(state) {
    setContext((prevState) => {
      return { ...prevState, isPageTransition: state }
    })
  }
  return togglePageTransition
}

/*  ------------------------------ */
/*  Our Shopify context helpers
/*  ------------------------------ */

// Access our cart item count
function useCartCount() {
  const {
    context: { checkout }
  } = useContext(SiteContext)

  let count = 0

  if (checkout.lineItems) {
    count = checkout.lineItems.reduce((total, item) => item.quantity + total, 0)
  }

  return count
}

// Access our cart totals
function useCartTotals() {
  const {
    context: { checkout }
  } = useContext(SiteContext)

  const subTotal = checkout.subTotal ? checkout.subTotal.amount * 100 : false
  return {
    subTotal
  }
}

// Access our cart items
function useCartItems() {
  const {
    context: { checkout }
  } = useContext(SiteContext)

  return checkout.lineItems
}

// Update item in cart
function useUpdateItem() {
  const {
    context: { checkout, shopifyClient },
    setContext
  } = useContext(SiteContext)

  async function updateItem(itemID, quantity) {
    // Bail if no ID or quantity given
    if (!itemID || !quantity) return

    // Otherwise, start adding the product
    setContext((prevState) => {
      return { ...prevState, isUpdating: true }
    })

    const newCheckout = await shopifyClient.checkout.updateLineItems(
      checkout.id,
      [{ id: itemID, quantity: quantity }]
    )

    setCheckoutState(newCheckout, setContext)
  }
  return updateItem
}

// Toggle cart state
function useToggleCart() {
  const {
    context: { isCartOpen },
    setContext
  } = useContext(SiteContext)

  async function toggleCart() {
    setContext((prevState) => {
      return { ...prevState, isCartOpen: !isCartOpen }
    })
  }
  return toggleCart
}

// Add an item to the checkout cart
function useAddItem() {
  const {
    context: { checkout, shopifyClient },
    setContext
  } = useContext(SiteContext)

  const lineItems = useCartItems()

  async function addItem(items) {
    // Bail if no ID or quantity given
    if (!items) return

    // Otherwise, start adding the product
    setContext((prevState) => {
      return { ...prevState, isAdding: true, isUpdating: true }
    })

    const itemsToUpdate = []
    const itemsToAdd = []

    items.forEach((item) => {
      const variantId = item.id
      const existingCartItem = lineItems.find(
        (item) => item.variantID == variantId
      )
      if (existingCartItem) {
        const newItem = {
          lineID: existingCartItem.lineID,
          quantity: existingCartItem.quantity + item.quantity
        }
        itemsToUpdate.push(newItem)
      } else {
        itemsToAdd.push(item)
      }
    })

    // build encoded variantID
    const enc = new Base64()

    const transformedItems = itemsToAdd.map((item) => {
      return {
        encodedId: enc.urlEncode(`${shopifyVariantGID}${item.id}`),
        quantity: item.quantity
      }
    })

    // Build the cart line item
    const newItems = transformedItems.map((item) => {
      return {
        variantId: item.encodedId,
        quantity: item.quantity,
        customAttributes: [
          { key: '_createdAt', value: new Date().toISOString() }
        ]
      }
    })

    if (newItems.length > 0 && itemsToUpdate.length === 0) {
      try {
        // Add it to the Shopify checkout cart
        const newCheckout = await shopifyClient.checkout.addLineItems(
          checkout.id,
          newItems
        )

        // Update our global store states
        setCheckoutState(newCheckout, setContext, true)
      } catch (error) {
        console.error(error)

        setContext((prevState) => {
          return { ...prevState, isUpdating: false, isCartError: true }
        })
      }
    } else if (newItems.length === 0 && itemsToUpdate.length > 0) {
      try {
        const newCheckout = await shopifyClient.checkout.updateLineItems(
          checkout.id,
          itemsToUpdate.map((item) => {
            return {
              id: item.lineID,
              quantity: item.quantity
            }
          })
        )

        setCheckoutState(newCheckout, setContext, true)
      } catch (error) {
        console.error(error)

        setContext((prevState) => {
          return { ...prevState, isUpdating: false, isCartError: true }
        })
      }
    } else {
      try {
        const newCheckout = await shopifyClient.checkout.addLineItems(
          checkout.id,
          newItems
        )

        const newCheckoutWithUpdates =
          await shopifyClient.checkout.updateLineItems(
            newCheckout.id,
            itemsToUpdate.map((item) => {
              return {
                id: item.lineID,
                quantity: item.quantity
              }
            })
          )

        // Update our global store states
        setCheckoutState(newCheckoutWithUpdates, setContext, true)
      } catch (error) {
        console.error(error)

        setContext((prevState) => {
          return { ...prevState, isUpdating: false, isCartError: true }
        })
      }
    }
  }

  return addItem
}

// Remove item from cart
function useRemoveItem() {
  const {
    context: { checkout, shopifyClient },
    setContext
  } = useContext(SiteContext)

  async function removeItem(itemID) {
    // Bail if no ID given
    if (!itemID) return

    // Otherwise, start removing the product
    setContext((prevState) => {
      return { ...prevState, isUpdating: true }
    })

    const newCheckout = await shopifyClient.checkout.removeLineItems(
      checkout.id,
      [itemID]
    )

    setCheckoutState(newCheckout, setContext)
  }
  return removeItem
}

// Build our Checkout URL
function useCheckout() {
  const {
    context: { checkout }
  } = useContext(SiteContext)

  return checkout.webUrl
}

// Reference a collection product count
function useProductCount() {
  const {
    context: { productCounts }
  } = useContext(SiteContext)

  function productCount(collection) {
    const collectionItem = productCounts.find((c) => c.slug === collection)
    return collectionItem.count
  }

  return productCount
}

function useUpdateLocation() {
  const { setContext } = useContext(SiteContext)

  async function updateUserLocation(userIp) {
    setContext((prevState) => {
      return { ...prevState, userLocation: userIp }
    })
  }
  return updateUserLocation
}

function useUpdateLanguageSetting() {
  const { setContext } = useContext(SiteContext)

  function updateLangPreference(lang) {
    setContext((prevState) => {
      return { ...prevState, navigatorLanguage: lang }
    })
  }

  return updateLangPreference
}

function useLanguageSetting() {
  const { context } = useContext(SiteContext)
  const { navigatorLanguage } = context

  return navigatorLanguage
}

// Access our cart items
function useUserLocation() {
  const {
    context: { userLocation }
  } = useContext(SiteContext)

  return userLocation
}

function useLocalizedRoutes() {
  const {
    context: { localizedRoutes }
  } = useContext(SiteContext)

  return localizedRoutes
}

function useReviewPage() {
  const {
    context: { reviews }
  } = useContext(SiteContext)

  return reviews.reviewPage
}

function useUpdateReviewPage() {
  const { setContext } = useContext(SiteContext)

  function updateReviewPage(nextPage) {
    setContext((prevState) => {
      return {
        ...prevState,
        reviews: {
          filters: prevState.reviews.filters,
          reviewPage: nextPage
        }
      }
    })
  }

  return updateReviewPage
}

function useReviewFilters() {
  const {
    context: { reviews }
  } = useContext(SiteContext)

  return reviews.filters
}

function useUpdateReviewFilters() {
  const {
    context: { reviews },
    setContext
  } = useContext(SiteContext)

  function updateReviewFilters(selectedFilters) {
    const selectedFilter = Object.keys(selectedFilters).toString()
    const selectedFilterValue = Object.values(selectedFilters).toString()

    let currentFilters = reviews.filters
    currentFilters[selectedFilter] = selectedFilterValue

    setContext((prevState) => {
      return {
        ...prevState,
        reviews: {
          reviewPage: prevState.reviews.reviewPage,
          filters: currentFilters
        }
      }
    })
  }

  return updateReviewFilters
}

function useClearReviewFilters() {
  const { setContext } = useContext(SiteContext)

  function clearReviewFilters() {
    setContext((prevState) => {
      return {
        ...prevState,
        reviews: {
          reviewPage: prevState.reviews.reviewPage,
          filters: {
            selectedSort: '&sort=date&direction=desc',
            sleepPosition: '',
            keywordSearch: ''
          }
        }
      }
    })
  }

  return clearReviewFilters
}

export {
  SiteContextProvider,
  useSiteContext,
  useTogglePageTransition,
  useCartCount,
  useCartTotals,
  useCartItems,
  useAddItem,
  useUpdateItem,
  useRemoveItem,
  useCheckout,
  useToggleCart,
  useProductCount,
  useUpdateLocation,
  useUserLocation,
  useLocalizedRoutes,
  useUpdateLanguageSetting,
  useLanguageSetting,
  useReviewPage,
  useUpdateReviewPage,
  useReviewFilters,
  useUpdateReviewFilters,
  useClearReviewFilters
}
