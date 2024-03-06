import React, { useMemo } from 'react'
import {
  PortableText,
  PortableTextBlockComponent,
  PortableTextComponents,
  PortableTextListComponent,
  PortableTextMarkComponent,
  PortableTextTypeComponent
} from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

import {
  StyledBulletlist,
  StyledChecklist,
  StyledSemibold,
  StyledNumberList,
  StyledAlphabetList
} from '../../styles/global.styled'
import { Locale } from '../../types/global-types'
import { CtaLink, CtaLinkProps } from '../CtaLink'
import { Text } from '../Text'
import { ModalInlineButton } from '../ModalInlineButton'
import { TextModal } from '../TextModal'
import { CustomModal } from '../CustomModal'
import { ComparisonModal } from '../ComparisonModal'

import {
  StyledChecklistWrapper,
  StyledWrapper,
  StyledCaption,
  StyledHorizontalContainer
} from './RichText.styled'
import { Image } from '../Image'
import { BlogSellingCard, BlogSellingCardProps } from '../BlogSellingCard'
import { Table, TableProps } from '../Table'
import { QuoteCard, QuoteProps } from '../QuoteCard'
import { Grid } from '../Grid'
import { theme } from '../../styles/theme'
import { getColumnRatioForItemCount } from '../../lib/helpers'

interface LinkMark {
  _type: 'link'
  href: string
}

interface SuperscriptMark {
  _type: 'superscript'
  href: string
  text: string
}

interface ModalButtonMark {
  _type: 'modalButton'
  modalType: 'Terms & Conditions' | 'Custom' | 'Comparison'
  content?:
    | React.ElementRef<typeof CustomModal>
    | React.ElementRef<typeof ComparisonModal>
}

export const Link: PortableTextMarkComponent<LinkMark> = ({ value, text }) => (
  <StyledSemibold>
    <CtaLink url={value?.href || '#'} label={text} variant='inline' />
  </StyledSemibold>
)

export const Checklist: PortableTextListComponent = ({ children }) => (
  <StyledChecklistWrapper>
    <StyledChecklist>{children}</StyledChecklist>
  </StyledChecklistWrapper>
)

export const Bulletlist: PortableTextListComponent = ({ children }) => (
  <StyledBulletlist color={'gravy'} variant={'mediumBody'} element={'ul'}>
    {children}
  </StyledBulletlist>
)

export const NumberList: PortableTextListComponent = ({ children }) => (
  <StyledNumberList>
    <Text color={'gravy'} variant={'mediumBody'}>
      {children}
    </Text>
  </StyledNumberList>
)

export const AlphabetList: PortableTextListComponent = ({ children }) => (
  <StyledAlphabetList>
    <Text color={'gravy'} variant={'mediumBody'}>
      {children}
    </Text>
  </StyledAlphabetList>
)

export const H1: PortableTextBlockComponent = ({ children }) => (
  <Text color={'rubine'} variant={'h1'}>
    {children}
  </Text>
)

export const H2: PortableTextBlockComponent = ({ children }) => (
  <Text color={'rubine'} variant={'h2'}>
    {children}
  </Text>
)

export const H3: PortableTextBlockComponent = ({ children }) => (
  <Text color={'rubine'} variant={'h3'}>
    {children}
  </Text>
)

export const H4: PortableTextBlockComponent = ({ children }) => (
  <Text color={'rubine'} variant={'h4'}>
    {children}
  </Text>
)

export const H5: PortableTextBlockComponent = ({ children }) => (
  <Text color={'gravy'} variant={'h4'} element={'h2'}>
    {children}
  </Text>
)

export const LargeBody: PortableTextBlockComponent = ({ children }) => (
  <Text color={'gravy'} variant={'largeBody'}>
    {children}
  </Text>
)

export const MediumBody: PortableTextBlockComponent = ({ children }) => (
  <Text color={'gravy'} variant={'mediumBody'}>
    {children}
  </Text>
)

export const SmallBody: PortableTextBlockComponent = ({ children }) => (
  <Text color={'gravy'} variant={'smallBody'}>
    {children}
  </Text>
)

export const Micro: PortableTextBlockComponent = ({ children }) => (
  <Text color={'gravy'} variant={'micro'}>
    {children}
  </Text>
)

export const DisplaySerif: PortableTextBlockComponent = ({ children }) => (
  <Text color={'gravy'} variant={'displaySerif'}>
    {children}
  </Text>
)

export const DisplaySans: PortableTextBlockComponent = ({ children }) => (
  <Text color={'gravy'} variant={'displaySans'}>
    {children}
  </Text>
)

export const NormalBlock: PortableTextBlockComponent = ({ children }) => (
  <span>{children}</span>
)

export const CaptionBlock: PortableTextBlockComponent = ({ children }) => (
  <StyledCaption color={'gravy'} variant={'caption'}>
    {children}
  </StyledCaption>
)

export interface ImageType {
  _type: 'lifestyleImage'
  desktopImage: {
    asset: { _ref: string }
  }
  tabletImage: {
    asset: { _ref: string }
  }
  mobileImage: {
    asset: { _ref: string }
  }
  alt: string
}

export interface ImageGridType {
  _type: 'imageGrid'
  imageGridCollection: {
    desktopImage: {
      asset: { _ref: string }
    }
    tabletImage: {
      asset: { _ref: string }
    }
    mobileImage: {
      asset: { _ref: string }
    }
    alt: string
  }[]
}

export const ImageComponent: PortableTextTypeComponent<ImageType> = ({
  value
}) => (
  <Image
    desktopImage={value?.desktopImage}
    tabletImage={value?.tabletImage}
    mobileImage={value?.mobileImage}
    alt={value.alt}
    srcWidths={[768, 1024]}
  />
)

export const ImageGridComponent: PortableTextTypeComponent<ImageGridType> = ({
  value
}) => {
  const gridRatio = getColumnRatioForItemCount(value.imageGridCollection.length)

  return (
    <div>
      <Grid
        columnRatio={['1', gridRatio, gridRatio]}
        rowGap={theme.spacing.xs}
        columnGap={theme.spacing.xs}
      >
        {value?.imageGridCollection?.map((image, index) => (
          <Image
            key={index}
            desktopImage={image?.desktopImage}
            tabletImage={image?.tabletImage}
            mobileImage={image?.mobileImage}
            alt={image?.alt ?? ''}
            srcWidths={[768, 1024]}
          />
        ))}
      </Grid>
    </div>
  )
}

export interface SellingCardType extends BlogSellingCardProps {
  _type: 'sellingCard'
}

export const SellingCardComponent: PortableTextTypeComponent<SellingCardType> =
  ({ value }) => {
    return (
      <BlogSellingCard
        variant={value?.variant}
        lifestyleImage={value?.lifestyleImage}
        backgroundImage={value?.backgroundImage}
        backgroundColor={value?.backgroundColor}
        copy={value?.copy}
      />
    )
  }

export interface CtaButtonType extends CtaLinkProps {
  _type: 'ctaLink'
}

export interface CtaLinkType extends CtaLinkProps {
  _type: 'cta'
}

export const CtaLinkComponent: PortableTextTypeComponent<CtaButtonType> = ({
  value
}) => {
  return <CtaLink variant={value.variant} url={value.url} label={value.label} />
}

export const CtaButtonComponent: PortableTextTypeComponent<CtaButtonType> = ({
  value
}) => {
  return (
    <StyledHorizontalContainer>
      <CtaLink variant={value.variant} url={value.url} label={value.label} />
    </StyledHorizontalContainer>
  )
}

export interface TableType extends TableProps {
  _type: 'table'
  gridColumns: JSX.Element[]
}

export const TableComponent: PortableTextTypeComponent<TableType> = ({
  value
}) => <Table numOfColumns={value.numOfColumns}>{value.gridColumns}</Table>

export interface QuoteCardType extends QuoteProps {
  _type: 'quoteCard'
}

export const QuoteCardComponent: PortableTextTypeComponent<QuoteCardType> = ({
  value
}) => (
  <QuoteCard
    quote={value.quote}
    author={value.author}
    backgroundColor={value.backgroundColor}
    backgroundImage={value.backgroundImage}
  />
)

const customComponents: PortableTextComponents = {
  block: {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    largeBody: LargeBody,
    mediumBody: MediumBody,
    smallBody: SmallBody,
    micro: Micro,
    displaySerif: DisplaySerif,
    displaySans: DisplaySans,
    normal: NormalBlock,
    caption: CaptionBlock
  },
  list: {
    checklist: Checklist,
    bullet: Bulletlist,
    number: NumberList,
    alphabet: AlphabetList
  },
  marks: {
    inlineLink: Link
  },
  types: {
    lifestyleImage: ImageComponent,
    imageGrid: ImageGridComponent,
    table: TableComponent,
    sellingCard: SellingCardComponent,
    cta: CtaLinkComponent,
    ctaLink: CtaButtonComponent,
    quoteCard: QuoteCardComponent
  }
}

interface RichTextProps {
  value: PortableTextBlock[]
  termsConditions?: React.ElementRef<typeof TextModal>
  locale: Locale
}

export const RichText = ({ value, termsConditions, locale }: RichTextProps) => {
  const memoizedCustomComponents = useMemo(() => {
    const ModalButton: PortableTextMarkComponent<ModalButtonMark> = ({
      text,
      value
    }) => {
      const modal =
        value?.modalType === 'Custom' || value?.modalType === 'Comparison'
          ? value.content
          : termsConditions
      return (
        <>
          {modal && (
            <ModalInlineButton label={text} modal={modal} locale={locale} />
          )}
        </>
      )
    }

    const Superscript: PortableTextMarkComponent<SuperscriptMark> = ({
      text,
      value
    }) => {
      return (
        <sup>
          <strong>
            <CtaLink url={value?.href || '#'} label={text} variant='inline' />
          </strong>
        </sup>
      )
    }

    return {
      ...customComponents,
      marks: {
        ...customComponents.marks,
        modalButton: ModalButton,
        superscript: Superscript
      }
    }
  }, [termsConditions])
  return (
    <StyledWrapper>
      <PortableText value={value} components={memoizedCustomComponents} />
    </StyledWrapper>
  )
}
