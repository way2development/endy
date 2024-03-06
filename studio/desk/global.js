import S from '@sanity/desk-tool/structure-builder'

import {
  Globe,
  SquareHalfBottom,
  ListNumbers,
  FlagBanner,
  ChatText,
  Storefront,
  Compass,
  Gear,
  Gift
} from 'phosphor-react'

export const global = S.listItem()
  .title('Global')
  .child(
    S.list()
      .title('Global')
      .items([
        S.listItem()
          .title('General Settings')
          .child(
            S.editor()
              .id('settings')
              .schemaType('settings')
              .documentId('settings')
          )
          .icon(Gear),
        S.listItem()
          .title('Shop Settings')
          .child(S.documentTypeList('shopSettings').title('Shop Settings'))
          .icon(Storefront),
        S.divider(),
        S.listItem()
          .title('Pencil Banner')
          .child(S.documentTypeList('pencilBanner').title('Pencil Banner'))
          .icon(FlagBanner),
        S.listItem()
          .title('Navigation')
          .child(S.documentTypeList('navigation').title('Navigation'))
          .icon(Compass),
        S.listItem()
          .title('Footer')
          .child(S.documentTypeList('footer').title('Footer'))
          .icon(SquareHalfBottom),
        S.divider(),
        S.listItem()
          .title('Modal')
          .child(S.documentTypeList('customModal').title('Modal'))
          .icon(ChatText),
        S.listItem()
          .title('Comparison Modal')
          .child(
            S.documentTypeList('comparisonModal').title('Comparison Modal')
          )
          .icon(ChatText),
        S.divider(),
        S.listItem()
          .title('Cross Sell Rankings')
          .child(
            S.editor()
              .id('crossSellRankings')
              .schemaType('crossSellRankings')
              .documentId('crossSellRankings')
          )
          .icon(ListNumbers),
        S.divider(),
        S.listItem()
          .title('Special Offers')
          .child(
            S.editor()
              .id('specialOffers')
              .schemaType('specialOffers')
              .documentId('specialOffers')
          )
          .icon(Gift)
      ])
  )
  .icon(Globe)
