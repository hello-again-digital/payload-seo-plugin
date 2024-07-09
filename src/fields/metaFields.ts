import { GroupField } from 'payload/types'

const MetaFields: GroupField = {
  name: 'meta',
  type: 'group',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
    },
    {
      name:'canonicalUrl',
      label:'Canonical URL',
      type:'text'
    },
    {
      name: 'openGraph',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Open Graph Title',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Open Graph Description',
          type: 'text',
        },
        {
          name: 'image',
          label: 'Open Graph Image',
          type: 'upload',
          relationTo: 'images',
        },
      ],
    },
  ],
}

export default MetaFields
