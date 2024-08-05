import { CollectionConfig, CollectionAfterDeleteHook } from 'payload/types'
import { PluginTypes, SeoFieldsDocument } from './types'
import seoFields from './fields/seoFields'
import addToSitemap from './hooks/addToSitemap'
import addToRobots from './hooks/addToRobots'
import addToSERPSchema from './hooks/addToSERPSchema'
import { onSeoEnabledCollectionDelete } from './hooks/onSeoEnabledCollectionDelete'

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
      afterChange: [addToSitemap, addToRobots, addToSERPSchema],
      afterDelete: [onSeoEnabledCollectionDelete],
    },
  }
}

export default addSeoProperties
