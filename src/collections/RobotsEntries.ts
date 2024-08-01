import { CollectionConfig } from 'payload/types'

const RobotsEntries: CollectionConfig = {
  slug: 'robots-entries',
  admin: {
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
            name: 'value',
            label: 'Value',
            type: 'text'
        }
      ],
    },
  ],
}

export default RobotsEntries
