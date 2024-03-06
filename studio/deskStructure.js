/**
 * Desk structure overrides
 *
 * This file configure how documents are structured in the Studio's desk tool.
 * It works because
    {
      "name": "part:@sanity/desk-tool/structure",
      "path": "./deskStructure.js"
    },
  * is added to the `parts` array in `/sanity.json`.
  *
  * Sanity Studio automatically lists document types out of the box.
  * With this custom desk structure we achieve things like showing the `home`
  * and `settings` document types as singletons, and grouping product details
  * and variants for easy editorial access.
  *
  * You can customize this even further as your schemas progress.
  * To learn more about structure builder, visit our docs:
  * https://www.sanity.io/docs/overview-structure-builder
 */

import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'

import { products } from './desk/products'
import { pages } from './desk/pages'
import { global } from './desk/global'
import { sales } from './desk/sales'
import { blog } from './desk/blog'
import { redirects } from './desk/redirects'
import resolveProductionUrl from './parts/resolveProductionUrl'

// If you add document types to desk structure manually, you can add them to this array to prevent duplicates in the root pane
const DOCUMENT_TYPES_IN_STRUCTURE = [
  'collection',
  'media.tag',
  'page',
  'product',
  'productVariant',
  'settings'
]

const hiddenDocTypes = (listItem) =>
  ![
    'page',
    'homePage',
    'section',
    'product',
    'productVariant',
    'generalSettings',
    'cookieSettings',
    'promoSettings',
    'headerSettings',
    'footerSettings',
    'shopSettings',
    'seoSettings',
    'siteSettings',
    'redirect',
    'media.tag', // for media plugin
    'home',
    'settingsOld',
    'footer',
    'productDetailPage',
    'customModal',
    'comparisonModal',
    'collectionsPage',
    'mlpPage',
    'author',
    'category',
    'salesContent',
    'navigation',
    'pencilBanner',
    'sales',
    'blogArticle',
    'blogHomepage',
    'blogPrefooter',
    'blogNewsletter',
    'reviewsPage',
    'salesLandingPage'
  ].includes(listItem.getId())

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (doc) => resolveProductionUrl(doc),
        reload: {
          button: true,
          revision: true
        }
      })
      .title('Preview')
  ])
}

export default () => {
  // prettier-ignore
  return (
    S.list()
      .title('Content')
      .items([
        pages,
        S.divider(),
        global,
        S.divider(),
        products,
        S.divider(),
        sales,
        S.divider(),
        blog,
        S.divider(),
        redirects,
        // Filter out docs already defined above
        ...S.documentTypeListItems().filter(hiddenDocTypes)
      ])
  )
}
