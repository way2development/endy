import S from '@sanity/desk-tool/structure-builder'
import { ArrowUDownRight } from 'phosphor-react'

export const redirects = S.listItem()
  .title('Redirects')
  .child(S.documentTypeList('redirect').title('Redirects'))
  .icon(ArrowUDownRight)
