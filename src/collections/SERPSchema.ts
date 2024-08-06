import { CollectionConfig } from 'payload/types'
import SERPSchemaTemplateSelect from '../components/SERPSchemaTemplateSelect.tsx'
import { validatePath } from '../fields/seoFields'

const SERPSchema: CollectionConfig = {
  slug: 'serp-schema',
  admin: {
    group: 'SEO',
    useAsTitle: 'path',
  },
  fields: [{
    name: 'path',
    label: 'Page pathname',
    type: 'text',
    unique: true,
    validate: validatePath,
    required: true,
    admin: {
        description: "The URL path that this schema defines"
    }
  },
  //  {
  //   name: 'template',
  //   label: 'Schema template',
  //   type: 'select',
  //   required: true,
  //   options: [
  //     { label: "label", value: 'value' }
  //   ],
  //   admin: {
  //     components: {
  //       Field: SERPSchemaTemplateSelect
  //     }
  //   }
  // },
   {
    name: 'schema',
    label: 'SERP Schema',
    type: 'textarea',
    required: true,
    admin: {
        description: 'Define your SERP schema here'
    }
}]
}

export default SERPSchema
