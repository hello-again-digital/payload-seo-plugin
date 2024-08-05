import { CollectionConfig } from 'payload/types'

const SiteMapEntries: CollectionConfig = {
  slug: 'site-map-entries',
  admin: {
    group: 'SEO',
    useAsTitle: 'url',
  },
  fields: [
    {
      name: 'path',
      label: 'Pathname',
      type: 'text',
      required: true,
    },

    { name: 'priority', type: 'number', required: true, min: 0, max: 1, admin: { step: 0.1 } },
    {
      name: 'changeFrequency',
      label: 'Change Frequency',
      type: 'select',
      options: [
        { label: 'Always', value: 'always' },
        { label: 'Hourly', value: 'hourly' },
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' },
        { label: 'Never', value: 'never' },
      ],
      required: true,
    },
  ],
}

export default SiteMapEntries
