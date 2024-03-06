import { buildComponent, buildPageProps } from '../lib/buildPage'
import { SaleProps } from '../Interfaces/sales'
import { Locale } from '../types/global-types'
import { formatSanitySaleEndDate, daysToMilliseconds } from '../lib/time'
import { ProductProps } from 'components/ShopModule/ShopModule.types'

export const isSaleActive = (saleStart: Date, saleEnd: Date) => {
  const today = new Date().getTime()
  return today >= new Date(saleStart).getTime() && today <= saleEnd.getTime()
}

export const getSalesData = (
  allSales: any[] | undefined,
  isQuebec: boolean,
  locale: Locale,
  buildContext: object,
  selectedSaleId?: string,
  isLastChancePreview?: boolean
): SaleProps | undefined => {
  if (allSales && selectedSaleId !== 'none') {
    const sales =
      allSales.find((sales) => sales._id === selectedSaleId) || allSales[0]

    if (sales && sales.content) {
      const endDate = formatSanitySaleEndDate(sales.endDate)
      const millisecondsUntilSaleEnd = +endDate - +new Date()
      const rawSales = {
        ...sales,
        ...sales.content,
        isLastChance:
          isLastChancePreview !== undefined
            ? isLastChancePreview
            : millisecondsUntilSaleEnd <=
              daysToMilliseconds(sales.lastChanceDays),
        endDate
      }
      let builtSalesContent

      const freeGift = sales?.customerGetsProducts
        ? buildComponent(sales.customerGetsProducts, {
            locale,
            ...buildContext
          })
        : null

      if (freeGift) {
        rawSales.customerGetsProducts = freeGift.props[0]
      }

      const bxgyProductData: ProductProps[] = []

      if (sales?.bxgyProducts) {
        sales?.bxgyProducts.forEach((product: ProductProps) => {
          const component = buildComponent(product, {
            locale,
            ...buildContext
          })
          bxgyProductData.push(component.props)
        })
      }

      if (bxgyProductData.length) {
        rawSales.bxgyProductData = bxgyProductData
      }

      // Only if user is located in Quebec, on the english site and the sales is localized
      if (isQuebec && locale === 'en' && sales.localizedContent) {
        const termsConditions = sales?.localizedContent?.termsConditions
          ? buildComponent(sales.localizedContent.termsConditions, {
              locale,
              ...buildContext
            })
          : null
        builtSalesContent = buildPageProps(sales.localizedContent, {
          locale,
          termsConditions,
          sales: rawSales,
          ...buildContext
        })
      } else {
        const termsConditions = sales?.content?.termsConditions
          ? buildComponent(sales.content.termsConditions, {
              locale,
              ...buildContext
            })
          : null

        builtSalesContent = buildPageProps(sales.content, {
          locale,
          termsConditions,
          sales: rawSales,
          ...buildContext
        })
      }

      return {
        ...rawSales,
        ...builtSalesContent,
        // Remove raw data
        content: undefined,
        localizedContent: undefined
      }
    }
  }
}
