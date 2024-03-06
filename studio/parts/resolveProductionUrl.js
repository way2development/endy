// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = 'sanity-preview-secret'

const remoteUrl = `https://endy-preview.vercel.app`
const localUrl = `http://localhost:3000`
const templateMapSubpath = {
  productDetailPage: '/products',
  collectionsPage: '/collection',
  reviewsPage: '/reviews',
  blogHomepage: '/blog',
  salesLandingPage: '/promos'
}

export default function resolveProductionUrl(doc) {
  const template = doc._type
  const baseUrl =
    window.location.hostname === 'localhost' ? localUrl : remoteUrl

  const previewUrl = new URL(baseUrl)

  previewUrl.pathname = '/api/preview'
  previewUrl.searchParams.append('secret', previewSecret)
  previewUrl.searchParams.append(
    'slug',
    `/${doc?.__i18n_lang || 'en'}${templateMapSubpath[template] ?? ''}${
      doc?.slug ?? ''
    }`
  )

  return previewUrl.toString()
}
