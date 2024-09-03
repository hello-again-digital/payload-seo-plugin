import { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  auth: false,
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
    },
  ],
  hooks: {},
}

export default Pages
