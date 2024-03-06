import React from 'react'
import Head from 'next/head'
import { imageBuilder } from '../lib/sanity'

const HeadSEO = ({ settings = {}, page = {}, schema }) => {
  const siteFavicon = settings?.favicon?.asset
  const siteTouchIcon = settings?.appIcon?.asset

  const metaTitle = page.seo?.metaTitle
  const pageTitle = page.title
  const metaDesc = page.seo?.metaDesc
  const isProductPage = page.product
  const defaultShareGraphic = settings?.shareGraphic?.asset
  // Ensure we are showing the first 3 gallery images for product pages (used for Pinterest)
  const firstThreeGalleryImage =
    page?.product?.images?.carouselImage?.slice(0, 3) || []
  const shareGraphics = isProductPage
    ? firstThreeGalleryImage.map((image) => image?.desktopImage?.asset)
    : // Default to Endy logo for all other pages
    defaultShareGraphic
    ? [defaultShareGraphic]
    : []

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='format-detection' content='telephone=no' />

      <script
        async
        id='google-tag-manager'
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K5R2BC2');`
        }}
      ></script>

      <link
        preload='true'
        rel='shortcut icon'
        type='image/svg+xml'
        href={siteFavicon && imageBuilder.image(siteFavicon).url()}
      />
      <link
        preload='true'
        rel='shortcut mask-icon'
        href={siteFavicon && imageBuilder.image(siteFavicon).url()}
        color='#000000'
      />
      {siteTouchIcon && (
        <link
          rel='apple-touch-icon'
          href={imageBuilder.image(siteTouchIcon).url()}
        />
      )}
      <meta name='apple-mobile-web-app-title' content='Endy'></meta>

      <title>{pageTitle}</title>
      {metaDesc && <meta name='description' content={metaDesc} />}

      {metaTitle && (
        <>
          <meta property='og:title' content={metaTitle} />
          <meta name='twitter:title' content={metaTitle} />
        </>
      )}

      {metaDesc && (
        <>
          <meta property='og:description' content={metaDesc} />
          <meta name='twitter:description' content={metaDesc} />
        </>
      )}

      {shareGraphics.length > 0 && (
        <>
          {shareGraphics.map((shareGraphic) => (
            <meta
              key={shareGraphic._ref}
              property='og:image'
              content={imageBuilder
                .image(shareGraphic)
                .width(1200)
                .height(630)
                .url()}
            />
          ))}
          <meta
            name='twitter:image'
            content={imageBuilder
              .image(shareGraphics[0])
              .width(1200)
              .height(630)
              .url()}
          />
        </>
      )}

      <meta property='og:type' content='website' />
      <meta name='twitter:site' content='@Endy' />
      <meta name='twitter:card' content='summary_large_image' />

      <meta property='og:site_name' content='Endy' />

      {schema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  )
}

export default HeadSEO
