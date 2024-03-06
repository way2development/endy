import { buildPageProps } from '../lib/buildPage'
import { ProductProps } from '../components/ShopModule/ShopModule.types'
import { useRouter } from 'next/router'
import { getCookie } from '../utils/cookies'

export const getRebuyProducts = async(
  rulesetId: string,
  fetchLimit: string,
  productIds: string,
  variantIds: number | string,
  references: any,
  sales: any,
  locale: any
) => {
  const REBUY_API_KEY = process.env.REBUY_API_KEY
  const user_id = getCookie('uuid')
  const utmObject = getCookie('utmObject') || window.location.search.replace('&',' ')
  // Get Rebuy cross sell recommendations based on ruleset specified in Sanity
  // Fetch limit is is "6" in case some items are out of stock or missing necessary data
  const rebuyJson = await fetch(
    `https://rebuyengine.com/api/v1/custom/id/${rulesetId}?limit=${fetchLimit}&shopify_product_ids=${productIds}&shopify_variant_ids=${variantIds}&key=${REBUY_API_KEY}&uuid=${user_id}&url=${utmObject}`
  ).then((response) => response.json())
   .catch((error) => {
      console.error(error)
    })
  // Loop through Rebuy recommended product IDs to find & return the corresponding Sanity/Shopify Product reference object
  const rebuyProductIds = rebuyJson?.data?.map((item: any) => item.id)

  const matchedProductReferences = rebuyProductIds?.map((rebuyId: number) => {
    return references.find((product: ProductProps) => product.id === rebuyId)
  })

  // Build/resolve references to populate product variant objects
  const productsWithResolvedReferences = buildPageProps(
    matchedProductReferences,
    {
      sales,
      locale,
      references
    }
  )

  // Transform resolved references into an array of objects
  const products = Object.keys(productsWithResolvedReferences).map((key) => {
    return productsWithResolvedReferences[key]
  })

  return products
}
