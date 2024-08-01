import { CollectionConfig } from 'payload/types'

const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'url',
  },
  fields: [{
    name: 'url',
    label: 'Current URL',
    type: 'text',
    required: true,
    admin: {
        description: "The URL you wish to redirect from"
    }
  }, {
    /** @TODO - Might be an idea to include 307 and 308, or to simply use permanent: true/false */
    name: 'redirectType',
    label: 'Redirect Type',
    type: 'select',
    required: true,
    options:[
        { label: 'Permanent (301)', value: '301' },
        { label: 'Temporary (302)', value: '302' },
    ]
  }, {
    name: 'redirectUrl',
    label: 'Redirect to',
    type: 'text',
    required: true,
  }]
}

export default Redirects
