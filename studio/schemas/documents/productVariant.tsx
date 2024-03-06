import { CopyIcon } from '@sanity/icons'
import { Stack } from 'phosphor-react'
import React from 'react'
import ProductMediaPreview from '../../components/media/ProductStatus'
import ProductVariantHiddenInput from '../../components/inputs/ProductVariantHidden'
import customBlock from '../../lib/custom-block.js'
import localizedField from '../../lib/localized-field'

export default {
  // HACK: Required to hide 'create new' button in desk structure
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  name: 'productVariant',
  title: 'Product variant',
  type: 'document',
  icon: CopyIcon,
  groups: [{ title: 'Special Offers', name: 'specialOffers' }],
  fields: [
    // Product variant hidden status
    {
      name: 'hidden',
      type: 'string',
      inputComponent: ProductVariantHiddenInput,
      hidden: ({ parent }: any) => {
        const isDeleted = parent?.store?.isDeleted

        return !isDeleted
      }
    },
    // Title (proxy)
    {
      title: 'Title',
      name: 'titleProxy',
      type: 'proxyString',
      options: { field: 'store.title' }
    },
    {
      name: 'carouselImage',
      title: 'Carousel Image',
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
      options: {
        collapsed: false,
        collapsible: true
      }
    },
    {
      title: 'Cart Image',
      name: 'cartImage',
      type: 'lifestyleImage',
      options: {
        collapsed: false,
        collapsible: true
      }
    },
    {
      title: 'Upsell Image',
      name: 'upsellImage',
      type: 'lifestyleImage',
      options: {
        collapsed: false,
        collapsible: true
      }
    },
    {
      title: 'Free Gift Image',
      name: 'freeGiftImage',
      type: 'lifestyleImage',
      options: {
        collapsed: false,
        collapsible: true
      }
    },
    {
      title: 'SKU Selector Image',
      name: 'skuSelectorImage',
      type: 'lifestyleImage',
      options: {
        collapsed: false,
        collapsible: true
      }
    },
    {
      title: 'Sale Price',
      description: 'Sale price for everything off sales',
      name: 'salePrice',
      type: 'number'
    },
    {
      title: 'Off Sale Price',
      description: 'Regular price for everything off sales',
      name: 'offSalePrice',
      type: 'number'
    },
    {
      title: 'Swatches Flag',
      description:
        'Select whether to display a flag beside a color swatch in the Shop Module',
      name: 'swatchesFlag',
      type: 'string',
      options: {
        list: ['Bestseller', 'New']
      }
    },
    {
      title: 'Preorder',
      description:
        'Flags product variant as preorder item in shop module and cart',
      name: 'preorder',
      type: 'object',
      fields: [
        {
          title: 'Is Preorder',
          name: 'isPreorder',
          type: 'boolean',
          initialValue: false
        },
        {
          title: 'Threshold',
          description:
            'Low inventory messaging when inventory falls below threshold',
          name: 'inventoryThreshold',
          type: 'number'
        },
        {
          title: 'Preorder Shipping Date',
          description: 'The date pre-orders are expected to ship out',
          name: 'shippingDate',
          type: 'date'
        }
      ]
    },
    localizedField(
      'Bundle Description',
      'bundleDescription',
      'array',
      'specialOffers',
      {
        of: [customBlock('strong italic', '', 'checklist', 'link')]
      }
    ),
    {
      title: 'Bundle Offers',
      name: 'bundleOffers',
      type: 'array',
      of: [
        {
          title: 'Bundle Product',
          name: 'bundleProduct',
          type: 'object',
          fields: [
            {
              title: 'Quantity',
              name: 'quantity',
              type: 'number',
              description:
                'Number of products a customer receives when eligible for the Bundle Offer'
            },
            localizedField('Title', 'title', 'array', '', {
              of: [customBlock('strong italic', '', '', 'modal')]
            }),
            {
              title: 'Variant Image',
              name: 'variantImage',
              type: 'lifestyleImage',
              options: {
                collapsed: false,
                collapsible: true
              }
            }
          ],
          preview: {
            select: {
              title: 'title',
              quantity: 'quantity',
              variantImage: 'variantImage'
            },
            prepare(selection: any) {
              const { title, variantImage, quantity } = selection
              return {
                title: `Product: ${title.en[0].children[0].text}, Quantity: ${quantity}`,
                media: variantImage.desktopImage.asset
              }
            }
          }
        }
      ],
      group: 'specialOffers'
    },
    // Shopify product variant
    {
      name: 'store',
      title: 'Shopify',
      description: 'Variant data from Shopify (read-only)',
      type: 'shopifyProductVariant'
    }
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      previewImageUrl: 'store.previewImageUrl',
      sku: 'store.sku',
      status: 'store.status',
      title: 'store.title'
    },
    prepare(selection: any) {
      const { isDeleted, previewImageUrl, sku, status, title } = selection

      return {
        media: (
          <ProductMediaPreview
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="productVariant"
            url={previewImageUrl}
          />
        ),
        subtitle: sku,
        title
      }
    }
  }
}
