import React, { KeyboardEvent, useState, useEffect, useRef } from 'react'
import FocusTrap from 'focus-trap-react'
import Link from 'next/link'

import { Locale } from '../../types/global-types'
import dictionary from '../../dictionary.json'

import { getLocalizedPrice } from '../../utils'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

import { ProductProps } from '../ShopModule/ShopModule.types'

import { Image } from '../Image/Image'
import { Grid } from '../Grid/Grid'
import { Text } from '../Text/Text'

import {
  StyledButton,
  StyledFeaturedProducts,
  StyledModalContent,
  StyledHeading,
  StyledPrice,
  StyledProductDetails,
  StyledProductLinkContainer
} from './MediaModule.styled'

export interface FeaturedProductsProps {
  products: ProductProps[]
  buttonLabel: string
  locale: Locale
}
interface ModalProps {
  showModal: boolean
  products: ProductProps[]
  locale: Locale
}

const ShoppingBagSvg = () => {
  return (
    <svg
      width='16px'
      height='16px'
      viewBox='0 0 16 16'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>16x16/Shopping bag icon - gravy</title>
      <g
        id='16x16/Shopping-bag-icon---gravy'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
        strokeLinejoin='round'
      >
        <g
          id='icon'
          transform='translate(1.000000, 1.000000)'
          stroke='#FFF'
          strokeWidth='1.5'
        >
          <polygon
            id='Line'
            strokeLinecap='square'
            points='0 14 0.4375 3.5 13.1646402 3.5 14 14'
          ></polygon>
          <path
            d='M3.5,4.375 C3.5,1.45833333 4.66666667,0 7,0 C9.33333333,0 10.5,1.45833333 10.5,4.375'
            id='Line-2'
            strokeLinecap='round'
          ></path>
        </g>
      </g>
    </svg>
  )
}

const ButtonLabel = ({ label }: { label: string }) => {
  return (
    <>
      <ShoppingBagSvg />
      <span>{label}</span>
    </>
  )
}

export const FeaturedProducts = ({
  products,
  buttonLabel,
  locale
}: FeaturedProductsProps) => {
  const localizedDictionary = dictionary[locale]
  const prefersReducedMotion = usePrefersReducedMotion()

  const [toggleModal, setToggleModal] = useState(false)

  // TODO: onOutsideClick taken from shop module, see if we can create a reusable function
  const groupRef = useRef<HTMLDivElement>(null)

  const onOutsideClick = (e: MouseEvent) => {
    if (groupRef?.current?.contains(e.target as HTMLElement)) return
    setToggleModal(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', onOutsideClick)

    return () => {
      document.removeEventListener('mousedown', onOutsideClick)
    }
  }, [])

  // TODO: Refactor and declare component outside of parent component
  const Modal = ({ showModal, products, locale }: ModalProps) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        setToggleModal(false)
      }
    }

    return (
      <>
        {showModal && (
          <FocusTrap
            active={!!showModal}
            focusTrapOptions={{ allowOutsideClick: true }}
          >
            <StyledModalContent onKeyDown={(e) => handleKeyDown(e)}>
              {products.length > 0 &&
                products.map((product: ProductProps) => {
                  const variantSizes: string = product?.sizeVariants
                    .map((variant) => {
                      return locale === 'en' ? variant.id : variant.label
                    })
                    .join(', ')
                  return (
                    <StyledProductLinkContainer key={product.id}>
                      <Link href={`/products${product?.slug}`} locale={locale}>
                        <Grid
                          columnRatio={['1:4']}
                          rowGap={['0']}
                          columnGap={['0']}
                        >
                          <Image
                            desktopImage={
                              product?.images?.cartImage?.desktopImage
                            }
                            tabletImage={
                              product?.images?.cartImage?.tabletImage
                            }
                            mobileImage={
                              product?.images?.cartImage?.mobileImage
                            }
                            alt={product?.images?.cartImage?.alt}
                            srcWidths={[768, 1024]}
                          />
                          <StyledProductDetails>
                            <StyledHeading
                              variant={'micro'}
                              color={'gravy'}
                              prefersReducedMotion={prefersReducedMotion}
                            >
                              {product.name}
                            </StyledHeading>

                            <StyledPrice variant={'micro'} color={'gravy'}>
                              {localizedDictionary.from}{' '}
                              {getLocalizedPrice(
                                product?.priceRange?.minVariantPrice,
                                locale
                              )}
                            </StyledPrice>

                            <Text variant={'micro'} color={'gravy'}>
                              {variantSizes}
                            </Text>
                          </StyledProductDetails>
                        </Grid>
                      </Link>
                    </StyledProductLinkContainer>
                  )
                })}
            </StyledModalContent>
          </FocusTrap>
        )}
      </>
    )
  }

  return (
    <>
      <StyledFeaturedProducts ref={groupRef}>
        <Modal showModal={toggleModal} products={products} locale={locale} />
        <StyledButton
          onClick={() => setToggleModal(toggleModal ? false : true)}
          isModalOpen={toggleModal}
          variant='solid-gravy'
        >
          <ButtonLabel label={buttonLabel} />
        </StyledButton>
      </StyledFeaturedProducts>
    </>
  )
}
