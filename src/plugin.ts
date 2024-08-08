import type { Config, Plugin } from 'payload/config'
import { PayloadRequest } from 'payload/types'
import { onInitExtension } from './onInitExtension'
import type { PluginTypes } from './types'
import { extendWebpackConfig } from './webpack'
import AfterDashboard from './components/AfterDashboard'
import addSeoProperties from './addSeoProperties'
import { SiteMapEntries, RobotsEntries, Redirects } from "./collections"
import { getRobots, getRobotsTxt, getSitemap, getSitemapXML } from './api'


export const seoPlusPlugin =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config) => {
    let config = { ...incomingConfig }

    // If you need to add a webpack alias, use this function to extend the webpack config
    const webpack = extendWebpackConfig(incomingConfig)

    config.admin = {
      ...(config.admin || {}),
      // If you extended the webpack config, add it back in here
      // If you did not extend the webpack config, you can remove this line
      webpack,

      // Add additional admin config here

      components: {
        ...(config.admin?.components || {}),
        // Add additional admin components here
        // afterDashboard: [...(config.admin?.components?.afterDashboard || []), AfterDashboard],
      },
    }

    // If the plugin is disabled, return the config without modifying it
    // The order of this check is important, we still want any webpack extensions to be applied even if the plugin is disabled
    if (pluginOptions.enabled === false) {
      return config
    }

    config.collections = [
      ...(config?.collections?.map(collection => {
        const { slug } = collection
        const isEnabled = pluginOptions.collections?.includes(slug)
        return isEnabled ? addSeoProperties({ collection, pluginOptions }) : collection
      }) || []),
      SiteMapEntries,
      RobotsEntries,
      Redirects,
    ]


    config.endpoints = [
      ...(config.endpoints || []),
      {
        path: '/sitemap.xml',
        method: 'get',
        handler: async (req, res) => getSitemapXML(req, res, pluginOptions),
      },
      {
        path: '/sitemap',
        method: 'get',
        handler: async (req, res) => getSitemap(req, res, pluginOptions)
      },
      {
        path: '/robots.txt',
        method: 'get',
        handler: async (req, res) => getRobotsTxt(req, res, pluginOptions)
      }, {
        path: '/robots',
        method: 'get',
        handler: getRobots
      }
    ]

    config.globals = [
      ...(config.globals || []),
      // Add additional globals here
    ]

    config.hooks = {
      ...(config.hooks || {}),
      // Add additional hooks here
    }

    config.graphQL = {
      ...(config.graphQL || {}),
      queries: (GraphQL, payload) => {
        const existingQueries = config.graphQL?.queries || {}

        return {
          ...existingQueries,
          GenerateSiteMap: {
            type: new GraphQL.GraphQLObjectType({
              name: 'GenerateSiteMap',
              fields: {
                sitemap: { type: GraphQL.GraphQLString },
              },
            }),
            resolve: async (
              _: unknown,
              __: unknown,
              context: { req: PayloadRequest },
            ): Promise<{ content: string }> => {
              const { payload } = context.req
              const entries = await payload.find({
                collection: 'site-map-entries',
              })

              let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n'
              sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

              entries.docs.forEach(entry => {
                sitemapContent += '  <url>\n'
                sitemapContent += `    <loc>${pluginOptions.hostname}${entry.path}</loc>\n`
                sitemapContent += `    <changefreq>${entry.changeFrequency}</changefreq>\n`
                sitemapContent += `    <priority>${entry.priority}</priority>\n`
                sitemapContent += '  </url>\n'
              })

              sitemapContent += '</urlset>'

              return { content: sitemapContent }
            },
          },
        }
      },
    }

    config.upload = {
      limits: {
        fileSize: 5000000, // 5MB, written in bytes
      },
    },

    config.onInit = async payload => {
      if (incomingConfig.onInit) await incomingConfig.onInit(payload)
      // Add additional onInit code by using the onInitExtension function
      onInitExtension(pluginOptions, payload)
    }

    return config
  }
