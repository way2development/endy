const sanityClient = require('@sanity/client')
const client = sanityClient({
  dataset: process.env.SANITY_PROJECT_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: false,
  apiVersion: '2021-03-25'
})

// see breakdown of code bloat
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

// get redirects from Sanity for Vercel
async function fetchSanityRedirects() {
  const data = await client.fetch(
    `*[_type == "redirect"]{ source, destination, permanent, statusCode }`
  )

  const redirects = data.map((redirect) => {
    return {
      source:
        redirect.source.includes('http') || redirect.source.includes('www')
          ? `${redirect.source}`
          : `/${redirect.source}`,
      destination:
        redirect.destination.includes('http') ||
        redirect.destination.includes('www')
          ? `${redirect.destination}`
          : `/${redirect.destination}`,
      ...(redirect.statusCode
        ? { statusCode: parseInt(redirect.statusCode) }
        : { permanent: redirect.permanent })
    }
  })

  return redirects
}
const path = require('path')

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = withBundleAnalyzer({
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  },
  env: {
    BUILD_ENV: process.env.BUILD_ENV,
    // Needed for Sanity powered data
    SANITY_PROJECT_DATASET: process.env.SANITY_PROJECT_DATASET,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,

    IPREGISTRY_API_KEY: process.env.IPREGISTRY_API_KEY,
    YOTPO_API_KEY: process.env.YOTPO_API_KEY,

    // Needed for Shopify product syncs
    SHOPIFY_STORE_ID: process.env.SHOPIFY_STORE_ID,
    SHOPIFY_API_TOKEN: process.env.SHOPIFY_API_TOKEN,

    // Needed for Klaviyo forms
    KLAVIYO_API_KEY: process.env.KLAVIYO_API_KEY,
    KLAVIYO_SITE_ID: process.env.KLAVIYO_SITE_ID,

    // Needed for Yotpo reviews
    YOTPO_API_KEY: process.env.YOTPO_API_KEY,
    YOTPO_SECRET_KEY: process.env.YOTPO_SECRET_KEY,

    // Needed for Rebuy powered data
    REBUY_API_KEY: process.env.REBUY_API_KEY
  },
  async redirects() {
    const sanityRedirects = await fetchSanityRedirects()
    return sanityRedirects
  }
})

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
