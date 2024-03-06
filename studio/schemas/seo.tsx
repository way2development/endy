export default {
  title: 'SEO / Share Settings',
  name: 'seo',
  type: 'object',
  fields: [
    {
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Title used for search engines and browsers',
      validation: (Rule: any) =>
        Rule.max(50).warning('Longer titles may be truncated by search engines')
    },
    {
      title: 'Meta Description',
      name: 'metaDesc',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: (Rule: any) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines'
        )
    },
    {
      title: 'Product Meta Description',
      name: 'productMetaDesc',
      type: 'text',
      rows: 3,
      description: 'Description for product schema',
      hidden: ({ document }: any) => document?._type !== 'productDetailPage',
      validation: (Rule: any) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines'
        )
    },
    {
      title: 'Dimensions',
      name: 'dimensions',
      type: 'text',
      description: 'Description for FAQ schema'
    },
    {
      title: 'Materials & Certifications',
      name: 'materialsCertifications',
      type: 'text',
      description: 'Description for FAQ schema'
    },
    {
      title: 'Free Shipping & Warranty',
      name: 'freeShippingWarranty',
      type: 'text',
      description: 'Description for FAQ schema'
    },
    {
      title: 'FAQ',
      name: 'faq',
      type: 'text',
      description: 'Description for FAQ schema'
    }
  ]
}
