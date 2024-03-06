import styled from 'styled-components'
import { mq, theme } from '../../styles/theme'

const getTextColor = (validColors: string[], color: string) => {
  return validColors.includes(color) && theme.colors[color]
    ? `${theme.colors[color]}`
    : validColors[0]
}

const H1 = styled.h1(({ color }: { color: string }) => {
  const validColors = ['gravy', 'rubine', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.wulkan}`,
    fontSize: ['40px', '40px', '47px'],
    fontWeight: `${theme.fontWeights.semibold}`,
    lineHeight: 1.1
  })
})

const H2 = styled.h2(({ color }: { color: string }) => {
  const validColors = ['gravy', 'rubine', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.wulkan}`,
    fontSize: ['33px', '33px', '39px'],
    fontWeight: `${theme.fontWeights.bold}`,
    lineHeight: 1.1
  })
})

const H3 = styled.h3(({ color }: { color: string }) => {
  const validColors = ['gravy', 'rubine', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.wulkan}`,
    fontSize: ['27px', '27px', '32px'],
    fontWeight: `${theme.fontWeights.bold}`,
    lineHeight: 1.1
  })
})

const H4 = styled.h4(({ color }: { color: string }) => {
  const validColors = ['gravy', 'rubine', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    fontSize: ['23px', '23px', '27px'],
    fontWeight: `${theme.fontWeights.semibold}`,
    lineHeight: 1.2
  })
})

const H5 = styled.h5(({ color }: { color: string }) => {
  const validColors = ['gravy', 'rubine', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    fontSize: ['19px', '19px', '22px'],
    fontWeight: `${theme.fontWeights.semibold}`,
    lineHeight: 1.2
  })
})

const LargeBody = styled.p(({ color }: { color: string }) => {
  const validColors = ['gravy', 'gravy80', 'gravy70', 'white', 'rubine']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    fontSize: ['19px', '19px', '22px'],
    fontWeight: `${theme.fontWeights.regular}`,
    lineHeight: 1.5
  })
})

const MediumBody = styled.p(({ color }: { color: string }) => {
  const validColors = ['gravy', 'gravy80', 'gravy70', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    fontSize: ['16px', '16px', '19px'],
    fontWeight: `${theme.fontWeights.regular}`,

    lineHeight: 1.5
  })
})

const SmallBody = styled.p(({ color }: { color: string }) => {
  const validColors = ['gravy', 'gravy80', 'gravy70', 'white', 'errorRed']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    fontSize: ['13px', '13px', '16px'],
    fontWeight: `${theme.fontWeights.regular}`,

    lineHeight: 1.5
  })
})

const Micro = styled.p(({ color }: { color: string }) => {
  const validColors = ['gravy', 'gravy90', 'gravy80', 'gravy70', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    fontSize: ['12px', '12px', '13px'],
    fontWeight: `${theme.fontWeights.regular}`,

    lineHeight: 1.5
  })
})

const Caption = styled.p(({ color }: { color: string }) => {
  const validColors = ['gravy', 'gravy80', 'gravy70', 'white', 'errorRed']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    fontSize: ['13px', '13px', '16px'],
    fontWeight: `${theme.fontWeights.regular}`,
    letterSpacing: `${theme.letterSpacing.s}`,
    lineHeight: 1.5
  })
})

const DisplaySerif = styled.p(({ color }: { color: string }) => {
  const validColors = ['gravy', 'rubine', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.wulkan}`,
    fontSize: ['48px', '48px', '57px'],
    fontWeight: `${theme.fontWeights.semibold}`,
    lineHeight: 1.1
  })
})

const DisplaySans = styled.p(({ color }: { color: string }) => {
  const validColors = ['gravy', 'rubine', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    fontSize: ['48px', '48px', '57px'],
    fontWeight: `${theme.fontWeights.semibold}`,
    lineHeight: 1.2
  })
})

const Price = styled.p(({ color }: { color: string }) => {
  const validColors = ['gravy', 'rubine', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    fontSize: ['33px', '', '39px'],
    fontWeight: `${theme.fontWeights.regular}`,
    lineHeight: 1.5
  })
})

const PriceCrossed = styled.p(({ color }: { color: string }) => {
  const validColors = ['gravy70', 'white']

  return mq({
    color: getTextColor(validColors, color),
    fontFamily: `${theme.fonts.calibre}`,
    textDecoration: 'line-through',
    fontSize: ['19px', '', '22px'],
    fontWeight: `${theme.fontWeights.regular}`,
    lineHeight: 1.5
  })
})

export const TypographyVariants: any = {
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
  price: Price,
  priceCrossed: PriceCrossed,
  caption: Caption
}
