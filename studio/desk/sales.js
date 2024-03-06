import S from '@sanity/desk-tool/structure-builder'

import { Tag, NotePencil } from 'phosphor-react'

export const sales = S.listItem()
  .title('Sales')
  .child(
    S.list()
      .title('Sales')
      .items([
        S.listItem()
          .title('Sales')
          .child(S.documentTypeList('sales').title('Sales'))
          .icon(Tag),
        S.divider(),
        S.listItem()
          .title('Content')
          .child(S.documentTypeList('salesContent').title('Content'))
          .icon(NotePencil)
      ])
  )
  .icon(Tag)
