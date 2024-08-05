import { CollectionConfig } from 'payload/types'

const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    group: 'SEO',
    useAsTitle: 'path',
  },
  fields: [{
    name: 'path',
    label: 'Pathname',
    type: 'text',
    required: true,
    admin: {
        description: "The URL path you wish to redirect from"
    }
  }, {
    /** @TODO - Might be an idea to include 307 and 308, or to simply use permanent: true/false */
    name: 'redirectType',
    label: 'Redirect Type',
    type: 'select',
    required: true,
    options:[
        { label: 'Moved Permenently (301)', value: '301' },
        { label: 'Found (302)', value: '302' },
        { label: 'See Other (303)', value: '303' },
        { label: 'Temporary Redirect (307)', value: '307' },
        { label: 'Permanent Redirect (308)', value: '308' },
    ],
    admin: {
      description: "Which code should be used for the redirect. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301"
  }

  }, {
    name: 'redirectUrl',
    label: 'Redirect URL',
    type: 'text',
    required: true,
  }]
}

export default Redirects
