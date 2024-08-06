import { CollectionConfig, CollectionAfterDeleteHook } from 'payload/types'
import { PluginTypes, SeoFieldsDocument } from './types'
import seoFields from './fields/seoFields'

export interface SeoConfig {
  collection: CollectionConfig
  pluginOptions: PluginTypes
}


const addSeoProperties = ({ collection, pluginOptions }: SeoConfig) => {
  return {
    ...collection,
    fields: [...collection.fields, ...seoFields({ collection, pluginOptions })],
    hooks: {
      ...collection.hooks,
    },
  }
}

export default addSeoProperties
