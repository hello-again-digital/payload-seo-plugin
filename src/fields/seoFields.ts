import { Collection, CollectionConfig, CollectionSlug, GroupField, ValidateOptions } from 'payload'
import { SeoConfig } from '../addSeoProperties'

export const validatePath = (value: any) => {
  // will exclude query params, hashes and special character
  const isValidPath = /^\/[a-zA-Z0-9-_\/]*$/.test(value);
  if (!isValidPath) return 'Please enter a valid path'
  return true
}

export const validateUrl = (value: any) => {
  // works with http or https, will reject urls that have query params or hashes
  const isValidUrl = /^(https?:\/\/[^\s\/$.?#].[^\s]*)(\/[^\s]*)?$/i.test(value);
  if (!isValidUrl) return 'Please enter a valid URL'
  return true
}

const addSeoFields = ({ collection, pluginOptions }: SeoConfig): CollectionConfig["fields"] => {
  return [
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Meta title for search engines. Recommended length: 50-60 characters.',
          },
          maxLength: 60,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description:
              'Meta description for search engines. Recommended length: 120-158 characters.',
          },
          maxLength: 158,
        },
        {
          name: 'path',
          type: 'text',
          required: true,
          validate: validatePath,
          admin: {
            description: 'The url path for this page',
          },
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          admin: {
            description: 'Set a canonical URL for this content.',
          },
          validate: validateUrl,
          required: true,
        },
        /** Open Graph */
        {
          name: 'ogTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom title for social media sharing (Open Graph).',
          },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Custom description for social media sharing (Open Graph).',
          },
        },
        {
          name: 'image',
          type: 'upload',
          admin: {
            description:
              'Maximum upload file size: 12MB. Recommended file size for images is <500KB.',
          },
          label: 'Meta Image',
          localized: true,
          relationTo: pluginOptions.uploadsCollection as CollectionSlug,
        },
        {
          name: 'serpSchema',
          label: 'SERP Schema',
          type: 'textarea',
          required: false,
          admin: {
            description: 'Define your SERP schema here',
          },
        },
        {
          name: 'isIndexed',
          type: 'checkbox',
          admin: {
            description: 'Uncheck to hide the page from search engine using noindex.',
          },
          defaultValue: true,
          required: true,
        },
      ],
      label: 'SEO',
    },

    /** Sitemap Entries */
    {
      name: 'sitemap',
      type: 'group',
      fields: [
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
          name: 'priority',
          type: 'select',
          required: true,
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
      ],
    },
  ]
}
export default addSeoFields
