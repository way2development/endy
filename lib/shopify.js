// @ts-ignore
import Client from 'shopify-buy'
import { isBrowser } from './helpers'

// First, check that Shopify variables are set
const hasShopify = process.env.SHOPIFY_STORE_ID && process.env.SHOPIFY_API_TOKEN

// Warn the client if variables are missing
if (!hasShopify && isBrowser) {
  console.warn('Shopify .env variables are missing')
}

// Otherwise, setup the client and export
const options = {
  domain: `ca.endy.com`,
  storefrontAccessToken: process.env.SHOPIFY_API_TOKEN
}

export default hasShopify ? Client.buildClient(options) : null
