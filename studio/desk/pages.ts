import S from '@sanity/desk-tool/structure-builder'

import {
  Browser,
  House,
  Cube,
  Storefront,
  ShieldCheck,
  Bed,
  Star,
  Tag
} from 'phosphor-react'

export const pages = S.listItem()
  .title('Pages')
  .child(
    S.list()
      .title('Pages')
      .items([
        S.listItem()
          .title('Home Page')
          .icon(House)
          .child(S.documentTypeList('homePage').title('Home Page')),
        S.divider(),
        S.listItem()
          .title('Mattress Learner Page')
          .icon(Bed)
          .child(S.documentTypeList('mlpPage').title('Mattress Learner Page')),
        S.divider(),
        S.listItem()
          .title('Collections Page')
          .icon(Cube)
          .child(
            S.documentTypeList('collectionsPage').title('Collections Page')
          ),
        S.divider(),
        S.listItem()
          .title('Product Detail Pages')
          .icon(Storefront)
          .child(
            S.documentTypeList('productDetailPage').title(
              'Product Detail Pages'
            )
          ),
        S.divider(),
        S.listItem()
          .title('Reviews Page')
          .icon(Star)
          .child(S.documentTypeList('reviewsPage').title('Reviews Page')),
        S.divider(),
        S.listItem()
          .title('Sales Landing Page')
          .icon(Tag)
          .child(S.documentTypeList('salesLandingPage').title('Sales Landing Page')),
        S.divider(),
        S.listItem()
          .title('Other Pages')
          .icon(Browser)
          .child(S.documentTypeList('page').title('Other Pages')),
        S.divider(),
        S.listItem().title('Warranty').icon(ShieldCheck)
      ])
  )
  .icon(Browser)
