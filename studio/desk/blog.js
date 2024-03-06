import S from '@sanity/desk-tool/structure-builder'

import {
  Article,
  House,
  NotePencil,
  SquareHalfBottom,
  SquareHalf,
  SquaresFour
} from 'phosphor-react'

export const blog = S.listItem()
  .title('Blog')
  .child(
    S.list()
      .title('Blog')
      .items([
        S.listItem()
          .title('Homepage')
          .child(S.documentTypeList('blogHomepage').title('Homepage'))
          .icon(House),
        S.divider(),
        S.listItem()
          .title('Articles')
          .child(S.documentTypeList('blogArticle').title('Articles'))
          .icon(NotePencil),
        S.divider(),
        S.listItem()
          .title('Newsletter')
          .child(S.documentTypeList('blogNewsletter').title('Newsletter'))
          .icon(SquareHalf),
        S.divider(),
        S.listItem()
          .title('Prefooter')
          .child(S.documentTypeList('blogPrefooter').title('Prefooter'))
          .icon(SquareHalfBottom),
        S.divider(),
        S.listItem()
          .title('Categories')
          .child(S.documentTypeList('category').title('Category'))
          .icon(SquaresFour),
        S.divider()
      ])
  )
  .icon(Article)
