import axios from 'axios'

export default async function send(req, res) {
  const {
    query: { ids }
  } = req

  const hasShopify =
    process.env.SHOPIFY_STORE_ID && process.env.SHOPIFY_API_PASSWORD

  // Bail if no product ID was supplied
  if (!ids) {
    return res.status(401).json({ error: 'Product ID required' })
  }

  // Bail if no Shopify API credentials were supplied
  if (!hasShopify) {
    return res.status(401).json({ error: 'Shopify API not setup' })
  }

  // Setup our Shopify connection
  const shopifyConfig = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': process.env.SHOPIFY_API_PASSWORD
  }

  // Fetch our product from Shopify
  const shopifyProducts = await axios({
    url: `https://ca.endy.com/admin/api/2023-07/products.json?ids=${ids}`,
    method: 'GET',
    headers: shopifyConfig
  })
    .then((response) => {
      if (response.data?.products) {
        return response.data.products
      } else {
        return null
      }
    })
    .catch(() => {
      return null
    })

  // bail if Shopify can't find the product
  if (!shopifyProducts)
    return res.status(401).json({ error: 'Product not found' })

  const productsInventory = shopifyProducts.map((product) => {
    return {
      id: product.id,
      variants: product.variants.map((variant) => {
        return {
          id: variant.id,
          isAvailable:
            variant.inventory_quantity > 0 ||
            variant.inventory_policy === 'continue' ||
            !variant.inventory_management
        }
      })
    }
  })

  res.statusCode = 200
  res.json(productsInventory)
}
