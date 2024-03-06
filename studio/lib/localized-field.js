const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'fr', title: 'French' }
]

export default (title, name, fieldType, group, fieldProps) => ({
  title,
  name,
  type: 'object',
  group,
  // Fieldsets can be used to group object fields.
  // Here we omit a fieldset for the "default language",
  // making it stand out as the main field.
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  // Dynamically define one field per language
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: fieldType,
    fieldset: lang.isDefault ? null : 'translations',
    ...fieldProps
  }))
})
