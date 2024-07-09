import { GroupField, CollectionConfig, Field } from 'payload/types'
import { SeoConfig } from '../addSeoProperties'

const addSeoFields = ({ collection, pluginOptions }: SeoConfig): GroupField[] => {
  return [
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Meta title for search engines. Recommended length: 50-60 characters.',
          },
          maxLength: 60,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description:
              'Meta description for search engines. Recommended length: 120-158 characters.',
          },
          maxLength: 158,
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          admin: {
            description: 'Set a canonical URL for this content.',
          },
          required: true,
        },
        {
          name: 'addToSitemap',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
          admin: {
            description: 'Include page in sitemap for search engines to crawl.',
          },
        },
        {
          name: 'sitemapPriority',
          type: 'select',
          options: [
            { label: '0.0', value: '0.0' },
            { label: '0.1', value: '0.1' },
            { label: '0.2', value: '0.2' },
            { label: '0.3', value: '0.3' },
            { label: '0.4', value: '0.4' },
            { label: '0.5', value: '0.5' },
            { label: '0.6', value: '0.6' },
            { label: '0.7', value: '0.7' },
            { label: '0.8', value: '0.8' },
            { label: '0.9', value: '0.9' },
            { label: '1.0', value: '1.0' },
          ],
          defaultValue: '0.5',
          admin: {
            description: 'The priority of this URL relative to other URLs on your site.',
            condition: (data, siblingData) => siblingData.addToSitemap === 'yes',
          },
        },
        {
          name: 'changeFrequency',
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
          defaultValue: 'weekly',
          admin: {
            description: 'How frequently the page is likely to change.',
            condition: (data, siblingData) => siblingData.addToSitemap === 'yes',
          },
        },
        {
          name: 'ogTitle',
          type: 'text',
          admin: {
            description: 'Custom title for social media sharing (Open Graph).',
          },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          admin: {
            description: 'Custom description for social media sharing (Open Graph).',
          },
        },
        ...(pluginOptions?.uploadsCollection
          ? ([
              {
                name: 'image',
                type: 'upload',
                admin: {
                  // components: {
                  //   Field: props => getMetaImageField({ ...props, pluginConfig }),
                  // },
                  description:
                    'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
                },
                label: 'Meta Image',
                localized: true,
                relationTo: pluginOptions?.uploadsCollection,
              },
            ] as Field[])
          : []),
      ],
      label: 'SEO',
    },
  ]
}
export default addSeoFields
