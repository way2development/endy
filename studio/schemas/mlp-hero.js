export default {
  title: 'MLP Hero',
  name: 'mlpHero',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'ctaLink',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'backgroundImage',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Lifestyle Image',
      name: 'lifestyleImage',
      type: 'lifestyleImage',
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Badge Image',
      name: 'badgeImage',
      type: 'badgeImage'
    },
    {
      title: 'Badge Variant',
      name: 'badgeVariant',
      type: 'string',
      initialValue: 'Circle',
      description:
        'Select which badge variant to render (includes their respective tilt)',
      options: {
        list: ['Circle', 'Pill', 'Wide Pill']
      }
    }
  ]
}
