import { CollectionConfig } from 'payload'
import { validatePath, validateUrl } from '../fields/seoFields'
import { apiKeyOrAuthenticated } from '../access/apiKeyOrAuthenticated'
import { authenticated } from '../access/authenticated'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    group: 'SEO',
    useAsTitle: 'path',
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    update: authenticated,
    read: apiKeyOrAuthenticated
  },
  fields: [{
    name: 'path',
    label: 'Pathname',
    type: 'text',
    required: true,
    validate: validatePath,
    admin: {
      description: "The URL path you wish to redirect from"
    }
  }, {
    name: 'redirectType',
    label: 'Redirect Type',
    type: 'select',
    required: true,
    options: [
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
    validate: validateUrl,
    required: true,
    admin: {
      description: "The URL you wish to redirect to"
    }
  }]
}
