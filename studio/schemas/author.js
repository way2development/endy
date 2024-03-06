import { UserRectangle } from 'phosphor-react'

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserRectangle,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}
