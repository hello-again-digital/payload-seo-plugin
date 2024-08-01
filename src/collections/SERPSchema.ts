import { CollectionConfig } from 'payload/types'
import SERPSchemaTemplateSelect from '../components/SERPSchemaTemplateSelect.tsx'

const SERPSchema: CollectionConfig = {
  slug: 'serp-schema',
  admin: {
    useAsTitle: 'url',
  },
  fields: [{
    name: 'url',
    label: 'Page URL',
    type: 'text',
    required: true,
    admin: {
        description: "The URL you wish to redirect from"
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
