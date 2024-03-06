import { ArrowsHorizontal, Palette, Barcode } from 'phosphor-react'
import pluralize from 'pluralize'
import React from 'react'
import ProductHiddenInput from '../../components/inputs/ProductHidden'
import ProductStatusMedia from '../../components/media/ProductStatus'
import { getPriceRange } from '../../utils/getPriceRange'
import customBlock from '../../lib/custom-block.js'
import localizedField from '../../lib/localized-field'

export default {
  // HACK: Required to hide 'create new' button in desk structure
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: Barcode,
  groups: [
    { title: 'Settings', name: 'settings', default: true },
    { title: 'Details', name: 'details' },
    { title: 'Images', name: 'images' },
    { title: 'Special Offers', name: 'specialOffers' }
  ],
  fields: [
    // Product hidden status
    {
      name: 'hidden',
      type: 'string',
      inputComponent: ProductHiddenInput,
      hidden: ({ parent }) => {
        const isActive = parent?.store?.status === 'active'
        const isDeleted = parent?.store?.isDeleted

        return isActive && !isDeleted
      }
    },
    // Title (proxy)
    {
      title: 'Shopify Title',
      name: 'titleProxy',
      type: 'proxyString',
      options: { field: 'store.title' },
      group: 'settings'
    },
    {
      title: 'New Product',
      name: 'isNewProduct',
      type: 'boolean',
      group: 'settings',
      initialValue: false
    },
    {
      title: 'Popular Product',
      name: 'isPopularProduct',
      type: 'boolean',
      group: 'settings',
      initialValue: false
    },
    {
      title: 'Gift Idea',
      name: 'isGiftIdea',
      type: 'boolean',
      group: 'specialOffers',
      initialValue: false
    },
    {
      title: 'Bundle Selector',
      name: 'isBundleProduct',
      group: 'specialOffers',
      type: 'boolean',
      initialValue: false,
      description:
        'Determines whether a product is a part of the Bundle Offer sale.'
    },
    {
      title: 'Quantity Selector',
      name: 'hasQuantitySelector',
      group: 'settings',
      type: 'boolean',
      initialValue: false,
      description:
        'Enables Quantity Selector dropdown in productʼs Shop Module.'
    },
    {
      title: 'Disable Free Shipping',
      name: 'disableFreeShipping',
      group: 'settings',
      type: 'boolean',
      initialValue: false,
      description:
        'When toggled on, user will not see "free shipping" messaging for product.'
    },
    {
      title: 'SKU Selector',
      name: 'hasSkuSelector',
      group: 'settings',
      type: 'boolean',
      initialValue: false,
      description:
        'Enables SKU Selector dropdown in productʼs Shop Module.'
    },
    {
      title: 'Size Variants',
      name: 'sizeVariants',
      group: 'settings',
      type: 'array',
      of: [
        {
          title: 'Size Variant',
          name: 'sizeVariant',
          icon: ArrowsHorizontal,
          type: 'object',
          fields: [
            {
              title: 'Shopify Size Id',
              name: 'id',
              type: 'string'
            },
            {
              title: 'Corresponding Mattress Size',
              name: 'mattressSize',
              type: 'tags',
              options: {
                frozen: true,
                // Preset of tags (defaults to empty)
                preload: [
                  { label: 'Queen', value: 'Queen' },
                  { label: 'King', value: 'King' },
                  { label: 'Twin', value: 'Twin' },
                  { label: 'Cal King', value: 'Cal King' },
                  { label: 'Full', value: 'Full' },
                  { label: 'Twin XL', value: 'Twin XL' },
                  { label: 'RV Short Queen', value: 'RV Short Queen' }
                ],
                closeMenuOnSelect: false
              }
            },
            localizedField('Label', 'translatedLabel', 'string')
          ]
        }
      ]
    },
    {
      title: 'Color Variants',
      name: 'colorVariants',
      group: 'settings',
      hidden: ({ parent }) => {
        const hasColorVariants = parent?.store?.options?.find(
          (option) => option?.name === 'Color'
        )
        return !hasColorVariants
      },
      type: 'array',
      of: [
        {
          title: 'Color Variant',
          name: 'colorVariant',
          type: 'object',
          icon: Palette,
          fields: [
            {
              title: 'Shopify Color Id',
              name: 'id',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              title: 'Display Color',
              name: 'color',
              type: 'color',
              options: {
                disableAlpha: true
              },
              validation: (Rule) => Rule.required()
            },
            localizedField('Label', 'translatedLabel', 'string')
          ]
        }
      ]
    },
    {
      name: 'modalCrossSells',
      title: 'Modal Cross Sells',
      group: 'settings',
      type: 'array',
      of: [
        {
          title: 'Modal Cross Sell',
          name: 'modalCrossSell',
          type: 'object',
          icon: Barcode,
          fields: [
            {
              title: 'Cross Sell Product Title',
              name: 'title',
              type: 'string',
              description: "Enter the product title as it appears in the product pages",
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare(selection) {
              const { title } = selection
              return {
                title
              }
            }
          }
        }
      ]
    },
    {
      name: 'carouselImage',
      title: 'Carousel Image',
      group: 'images',
      options: {
        collapsed: false,
        collapsible: true
      },
      type: 'array',
      of: [{ type: 'lifestyleImage' }]
    },
    {
      title: 'Cross Sell Image',
      name: 'crossSellImage',
      type: 'lifestyleImage',
      group: 'images',
      options: {
        collapsed: false,
        collapsible: true
      }
    },
    {
      title: 'Free Gift Image',
      name: 'freeGiftImage',
      type: 'lifestyleImage',
      group: 'images',
      options: {
        collapsed: false,
        collapsible: true
      }
    },
    localizedField('Display Name', 'name', 'string', 'details'),
    localizedField(
      'Short Description',
      'shortDescription',
      'string',
      'details'
    ),
    localizedField('Long Description', 'longDescription', 'array', 'details', {
      of: [customBlock('strong italic', '', 'bullet', '')]
    }),
    {
      title: 'Cart Image',
      name: 'cartImage',
      type: 'lifestyleImage',
      group: 'images',
      options: {
        collapsed: false,
        collapsible: true
      }
    },
    {
      title: 'Upsell Image',
      name: 'upsellImage',
      type: 'lifestyleImage',
      group: 'images',
      options: {
        collapsed: false,
        collapsible: true
      }
    },
    // Shopify product
    {
      name: 'store',
      title: 'Shopify',
      type: 'shopifyProduct',
      description: 'Product data from Shopify (read-only)'
    }
  ],
  orderings: [
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'store.title', direction: 'asc' }]
    },
    {
      title: 'Title (Z-A)',
      name: 'titleAsc',
      by: [{ field: 'store.title', direction: 'desc' }]
    },
    {
      title: 'Price (Highest first)',
      name: 'titleAsc',
      by: [{ field: 'store.priceRange.minVariantPrice', direction: 'desc' }]
    },
    {
      title: 'Title (Lowest first)',
      name: 'titleAsc',
      by: [{ field: 'store.priceRange.minVariantPrice', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      optionCount: 'store.options.length',
      previewImageUrl: 'store.previewImageUrl',
      priceRange: 'store.priceRange',
      status: 'store.status',
      title: 'store.title',
      variantCount: 'store.variants.length'
    },
    prepare(selection) {
      const {
        isDeleted,
        optionCount,
        previewImageUrl,
        priceRange,
        status,
        title,
        variantCount
      } = selection

      let description = [
        variantCount ? pluralize('variant', variantCount, true) : 'No variants',
        optionCount ? pluralize('option', optionCount, true) : 'No options'
      ]

      let subtitle = getPriceRange(priceRange)
      if (status !== 'active') {
        subtitle = '(Unavailable in Shopify)'
      }
      if (isDeleted) {
        subtitle = '(Deleted from Shopify)'
      }

      return {
        media: (
          <ProductStatusMedia
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="product"
            url={previewImageUrl}
          />
        ),
        description: description.join(' / '),
        subtitle,
        title
      }
    }
  }
}
