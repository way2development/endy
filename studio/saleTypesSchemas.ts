export const bmsm = {
  primarySale: [
    {
      name: 'secondPromoCode',
      title: '2nd Promo Code',
      type: 'string',
      fieldset: 'bmsm'
    },
    {
      name: 'firstDiscountThreshold',
      title: '1st Discount Threshold',
      type: 'number',
      fieldset: 'bmsm'
    },
    {
      name: 'firstDiscount',
      title: '1st Discount',
      type: 'number',
      fieldset: 'bmsm'
    },
    {
      name: 'secondDiscountThreshold',
      title: '2nd Discount Threshold',
      type: 'number',
      fieldset: 'bmsm'
    },
    {
      name: 'secondDiscount',
      title: '2nd Discount',
      type: 'number',
      fieldset: 'bmsm'
    },
    {
      name: 'bmsmProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'bmsm'
    }
  ],
  secondarySale: [
    {
      name: 'secondarySecondPromoCode',
      title: '2nd Promo Code',
      type: 'string',
      fieldset: 'secondaryBmsm'
    },
    {
      name: 'secondaryFirstDiscountThreshold',
      title: '1st Discount Threshold',
      type: 'number',
      fieldset: 'secondaryBmsm'
    },
    {
      name: 'secondaryFirstDiscount',
      title: '1st Discount',
      type: 'number',
      fieldset: 'secondaryBmsm'
    },
    {
      name: 'secondarySecondDiscountThreshold',
      title: '2nd Discount Threshold',
      type: 'number',
      fieldset: 'secondaryBmsm'
    },
    {
      name: 'secondarySecondDiscount',
      title: '2nd Discount',
      type: 'number',
      fieldset: 'secondaryBmsm'
    },
    {
      name: 'secondaryBmsmProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'secondaryBmsm'
    }
  ]
}

export const levelUpOffer = {
  primarySale: [
    {
      title: 'Discount Value',
      name: 'discountValueForLevelUp',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['Percentage', 'Fixed Amount']
      },
      initialValue: 'Percentage',
      fieldset: 'levelUpOffer'
    },
    {
      name: 'firstDiscountForLevelUp',
      title: '1st Discount',
      type: 'number',
      fieldset: 'levelUpOffer'
    },
    {
      name: 'secondDiscountForLevelUp',
      title: '2nd Discount',
      type: 'number',
      fieldset: 'levelUpOffer'
    },
    {
      name: 'secondPromoCodeForLevelUp',
      title: '2nd Promo Code',
      type: 'string',
      fieldset: 'levelUpOffer'
    },
    {
      name: 'discountThresholdForLevelUp',
      title: 'Discount Threshold',
      type: 'number',
      fieldset: 'levelUpOffer'
    },
    {
      name: 'levelUpProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'levelUpOffer'
    },
  ],
  secondarySale: [
    {
      title: 'Discount Value',
      name: 'secondaryDiscountValueForLevelUp',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['Percentage', 'Fixed Amount']
      },
      initialValue: 'Percentage',
      fieldset: 'secondaryLevelUpOffer'
    },
    {
      name: 'secondaryFirstDiscountForLevelUp',
      title: '1st Discount',
      type: 'number',
      fieldset: 'secondaryLevelUpOffer'
    },
    {
      name: 'secondarySecondDiscountForLevelUp',
      title: '2nd Discount',
      type: 'number',
      fieldset: 'secondaryLevelUpOffer'
    },
    {
      name: 'secondarySecondPromoCodeForLevelUp',
      title: '2nd Promo Code',
      type: 'string',
      fieldset: 'secondaryLevelUpOffer'
    },
    {
      name: 'secondaryDiscountThresholdForLevelUp',
      title: 'Discount Threshold',
      type: 'number',
      fieldset: 'secondaryLevelUpOffer'
    },
    {
      name: 'secondaryLevelUpProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'secondaryLevelUpOffer'
    }
  ]
}

export const fixedAmount = {
  primarySale: [
    {
      title: 'Discount Value',
      name: 'discountValue',
      type: 'number',
      fieldset: 'fixedAmount'
    },
    {
      name: 'discountValueProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'fixedAmount'
    }
  ],
  secondarySale: [
    {
      title: 'Discount Value',
      name: 'secondaryDiscountValue',
      type: 'number',
      fieldset: 'secondaryFixedAmount'
    },
    {
      name: 'secondaryDiscountValueProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'secondaryFixedAmount'
    }
  ]
}

export const percentageOff = {
  primarySale: [
    {
      title: 'Discount Percentage',
      name: 'discountPercentage',
      type: 'number',
      fieldset: 'percentage',
      validation: (Rule: any) => Rule.integer()
    },
    {
      name: 'discountPercentageProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'percentage'
    }
  ],
  secondarySale: [
    {
      title: 'Discount Percentage',
      name: 'secondaryDiscountPercentage',
      type: 'number',
      fieldset: 'secondaryPercentage',
      validation: (Rule: any) => Rule.integer()
    },
    {
      name: 'secondaryDiscountPercentageProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'secondaryPercentage'
    }
  ]
}

export const bxgy = {
  primarySale: [
    {
      name: 'bxgyProducts',
      title: 'Product(s) customer buys',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'bxgy'
    },
    {
      name: 'customerGetsProducts',
      title: 'Product(s) customer gets',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'bxgy'
    },
    {
      title: 'Quantity customer gets',
      name: 'customerGetsQuantity',
      type: 'number',
      validation: (Rule: any) => Rule.integer(),
      fieldset: 'bxgy'
    },
    {
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['Percentage', 'Free']
      },
      fieldset: 'bxgy'
    },
    {
      title: 'Discount Percentage',
      name: 'bxgyDiscountPercentage',
      type: 'number',
      validation: (Rule: any) => Rule.integer(),
      hidden: ({ document }: any) =>
        document?.shopifySaleDetails?.discountType !== 'Percentage',
      fieldset: 'bxgy'
    },
    {
      title: 'Max number of uses per order',
      name: 'maxUsesPerOrder',
      type: 'number',
      validation: (Rule: any) => Rule.integer(),
      fieldset: 'bxgy'
    }
  ],
  secondarySale: [
    {
      name: 'secondaryBxgyProducts',
      title: 'Product(s) customer buys',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'secondaryBxgy'
    },
    {
      name: 'secondaryCustomerGetsProducts',
      title: 'Product(s) customer gets',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'secondaryBxgy'
    },
    {
      title: 'Quantity customer gets',
      name: 'secondaryCustomerGetsQuantity',
      type: 'number',
      validation: (Rule: any) => Rule.integer(),
      fieldset: 'secondaryBxgy'
    },
    {
      name: 'secondaryDiscountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['Percentage', 'Free']
      },
      fieldset: 'secondaryBxgy'
    },
    {
      title: 'Discount Percentage',
      name: 'secondaryBxgyDiscountPercentage',
      type: 'number',
      validation: (Rule: any) => Rule.integer(),
      hidden: ({ document }: any) =>
        document?.shopifySaleDetails?.discountType !== 'Percentage',
      fieldset: 'secondaryBxgy'
    },
    {
      title: 'Max number of uses per order',
      name: 'secondaryMaxUsesPerOrder',
      type: 'number',
      validation: (Rule: any) => Rule.integer(),
      fieldset: 'secondaryBxgy'
    }
  ]
}

export const everythingOff = {
  primarySale: [
    {
      name: 'everythingOffProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'everythingOff'
    }
  ],
  secondarySale: [
    {
      name: 'secondaryEverythingOffProducts',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Products',
          type: 'reference',
          weak: true,
          to: [{ type: 'product' }]
        }
      ],
      fieldset: 'secondaryEverythingOff'
    }
  ]
}