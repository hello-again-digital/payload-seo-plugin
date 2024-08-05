import { buildConfig, Config, Plugin } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Examples from './collections/Examples'
import Pages from './collections/Pages'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { seoPlusPlugin } from '../../src/index'
import seo from '@payloadcms/plugin-seo'


const config: Config = {
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: config => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...(config?.resolve?.alias || {}),
            react: path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            payload: path.join(__dirname, '../node_modules/payload'),
          },
        },
      }
      return newConfig
    },
  },
  editor: slateEditor({}),
  collections: [Examples, Users, Pages],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [seoPlusPlugin({ collections: ['pages'], hostname: 'http://localhost:3000' })],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
}

export default buildConfig(config)
