import type { CollectionConfig } from 'payload';
import { CollectionAfterDeleteHook } from 'payload';
import type { PluginTypes } from './types';
import { SeoFieldsDocument } from './types';
import seoFields from './fields/seoFields';

export interface SeoConfig {
  collection: CollectionConfig;
  pluginOptions: PluginTypes;
}

const addSeoProperties = ({ collection, pluginOptions }: SeoConfig) => {
  return {
    ...collection,
    fields: [...collection.fields, ...seoFields({ collection, pluginOptions })],
    hooks: {
      ...collection.hooks,
    },
  };
};

export default addSeoProperties;
