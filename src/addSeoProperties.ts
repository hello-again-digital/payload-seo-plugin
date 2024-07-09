import { CollectionConfig } from 'payload/types'
import { PluginTypes } from './types'
import seoFields from './fields/seoFields'
import addToSitemap from './hooks/addToSitemap'

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
      afterChange: [addToSitemap],
    },
  }
}

export default addSeoProperties
