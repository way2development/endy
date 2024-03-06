import { File } from 'phosphor-react'

export default {
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: File,
  fields: [
    {
      name: 'source',
      title: 'From',
      description:
        'This may either be a relative path without the leading slash or a full URL (e.g. products/start-product, https://answers.endy.com/, www.wikipedia.org/wiki/Endy_Sleep)',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((field) =>
          field[0] === '/' || field.includes('http') || field.includes('www')
            ? 'Must be a relative path without the leading slash or an absolute path.'
            : true
        )
    },
    {
      name: 'destination',
      title: 'To',
      description:
        'This may be either a relative path without the leading slash or a full URL (e.g. products/end-product, https://answers.endy.com/, https://www.instagram.com/endy/, www.wikipedia.org/wiki/Endy_Sleep).',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((field) =>
          field[0] === '/'
            ? 'Must be a relative path without the leading slash or an absolute path.'
            : true
        )
    },
    {
      name: 'permanent',
      title: 'Permanent',
      description:
        'Enable to indicate that a page has moved permanently. (Enabled = 308 redirect, Disabled = 307 redirect)',
      type: 'boolean',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'statusCode',
      title: 'Status Code',
      description:
        'Optional: Provide a specific status code to apply to the redirect. (This will override the permanent toggle above)',
      type: 'string',
      // Regex .*[a-zA-Z].* checks if string contains any letter value
      validation: (Rule) =>
        Rule.max(3).custom((field) =>
          field !== undefined
            ? field.match('.*[a-zA-Z].*')
              ? 'Status code cannot contain any letters'
              : true
            : true
        )
    }
  ]
}
