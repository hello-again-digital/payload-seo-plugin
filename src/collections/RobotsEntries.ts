import { CollectionConfig } from 'payload'
import { validatePath } from '../fields/seoFields'

export const RobotsEntries: CollectionConfig = {
  slug: 'robots-entries',
  admin: {
    group: 'SEO',
    useAsTitle: 'userAgent',
  },
  fields: [
    {
      name: 'userAgent',
      label: 'User Agent',
      type: 'text',
      required: true,
      admin: {
        description: 'Which user agent are you targetting with this rule',
      },
    }, {
      name: 'directives',
      label: 'Directive',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Directive',
        plural: 'Directives',
      },
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { label: 'Allow', value: 'Allow' },
            { label: 'Disallow', value: 'Disallow' },
          ],
        }, {
            name: 'path',
            label: 'Page path',
            type: 'text',
            validate: validatePath,
        }
      ],
    },
  ],
}
