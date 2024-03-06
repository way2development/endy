import React, { useState } from 'react'
import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import { ProductProps, VariantProps } from './ShopModule.types'
import { SaleProps } from '../../Interfaces/sales'
import { Image, ImageProps } from '../Image'

import { PromoPill } from '../PromoPill'
import { Text } from '../Text/Text'
import { Grid } from '../Grid'
import { Modal } from '../Modal'

import {
  StyledBundleItemCard,
  StyledBundleItemTitle,
  StyledBundleItemQuantity,
  StyledBundleModuleContainer,
  StyledBundleDescription,
  StyledBundleHeading,
  StyledBundleChecklist,
  StyledValueContainer,
  StyledPromoPillContainer,
  StyledGridContainer,
  StyledTotalValue,
  StyledModalButton
} from './BundleFreeGift.styled'
import { StyledSemibold } from '../../styles/global.styled'
import { getLocalizedPrice } from '../../utils'
interface BundleItemCardProps {
  quantity: number
  title: string
  variantImage: ImageProps
  showBundleModal: boolean
  setShowBundleModal: (showBundleModal: boolean) => void
}

const giftIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/0781d96197d0d38c6defb967768102833bb95465-14x15.svg'

const BundleItemCard = ({
  quantity,
  title,
  variantImage,
  showBundleModal,
  setShowBundleModal
}: BundleItemCardProps) => {
  return (
    <StyledBundleItemCard>
      <StyledModalButton
        onClick={() => {
          setShowBundleModal(!showBundleModal)
        }}
      >
        <StyledBundleItemQuantity color={'white'} variant={'micro'}>
          {quantity}
        </StyledBundleItemQuantity>
        {variantImage && (
          <Image
            desktopImage={variantImage.desktopImage}
            mobileImage={variantImage.mobileImage}
            tabletImage={variantImage.tabletImage}
            alt={variantImage.alt}
            srcWidths={[152, 152, 152]}
          />
        )}
        <StyledBundleItemTitle color={'gravy'} variant={'smallBody'}>
          {title}
        </StyledBundleItemTitle>
      </StyledModalButton>
    </StyledBundleItemCard>
  )
}

interface BundleFreeGiftProps {
  locale: Locale
  sales: SaleProps
  freeGift?: ProductProps | null
  freeGiftVariant?: VariantProps
}

export const BundleFreeGift = ({
  locale,
  sales,
  freeGift,
  freeGiftVariant
}: BundleFreeGiftProps) => {
  if (!freeGiftVariant || !freeGift) {
    return null
  }

  const localizedDictionary = dictionary[locale]

  const bundleItems = freeGiftVariant.bundleOffers
  const bundleDescription = freeGiftVariant.bundleDescription
  const bundleTotalValue = getLocalizedPrice(freeGiftVariant.price, locale)

  const totalValueCopy =
    locale === 'fr'
      ? `${localizedDictionary.totalValue} ${bundleTotalValue}`
      : `${bundleTotalValue} ${localizedDictionary.totalValue}`

  const hasBundleModal = sales?.modals?.bundleModal !== undefined

  const [showBundleModal, setShowBundleModal] = useState(false)

  // Using the any keyword here because of the use of the cloneElement function.
  const bundleModal = sales?.modals?.bundleModal as any
  // Added further safeguards to ensure that the bundleModal is not undefined.
  const isValidElement = React.isValidElement(bundleModal)
  const isModalAvailable = isValidElement && sales && hasBundleModal

  return (
    <StyledBundleModuleContainer>
      {isModalAvailable && (
        <Modal
          showModal={showBundleModal}
          onClose={() => setShowBundleModal(false)}
          locale={locale}
          isExitModal={false}
        >
          {React.cloneElement(bundleModal as React.ReactElement<any>, {
            onButtonClick: () => setShowBundleModal(false),
            publishDate: sales?._updatedAt,
            locale
          })}
        </Modal>
      )}
      <StyledPromoPillContainer locale={locale}>
        <PromoPill
          showCountdown={true}
          locale={locale}
          variant={'gravy'}
          borderStyle={'dotted'}
          sales={sales}
        />
      </StyledPromoPillContainer>
      <StyledBundleHeading color={'rubine'} variant={'largeBody'}>
        {localizedDictionary.bundleFreeWithMattress}
      </StyledBundleHeading>

      <StyledGridContainer>
        <Grid
          rowGap={[]}
          columnGap={[]}
          columnRatio={['1:1', '1:1:1:1', '1:1']}
        >
          {bundleItems &&
            bundleItems.map((item) => (
              <BundleItemCard
                key={item._key}
                quantity={item.quantity}
                title={item.title}
                variantImage={item.variantImage}
                showBundleModal={showBundleModal}
                setShowBundleModal={setShowBundleModal}
              />
            ))}
        </Grid>
      </StyledGridContainer>

      <StyledBundleDescription
        color={'gravy'}
        variant={'smallBody'}
        element={'div'}
      >
        {bundleDescription}
      </StyledBundleDescription>

      <StyledTotalValue>
        {/* TODO: Replace with the Icon component */}
        <img src={giftIcon} alt='' />
        <Text variant='smallBody' color='gravy'>
          <StyledSemibold>{totalValueCopy}</StyledSemibold>
        </Text>
      </StyledTotalValue>
    </StyledBundleModuleContainer>
  )
}
