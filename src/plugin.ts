import type { Config, Plugin } from 'payload/config'
import { GroupField, Field, PayloadRequest, TypeWithID } from 'payload/types'
import SiteMapEntries from './collections/SiteMapEntries'
import { onInitExtension } from './onInitExtension'
import type { PluginTypes, SiteMapEntry, SiteMapEntriesResponse, RobotsEntriesResponse, SeoFieldsDocument, RobotsSeoField, PayloadResult } from './types'
import { extendWebpackConfig } from './webpack'
import AfterDashboard from './components/AfterDashboard'
import addSeoProperties from './addSeoProperties'
import RobotsEntries from './collections/RobotsEntries'
import Redirects from './collections/Redirects'
import SERPSchema from './collections/SERPSchema'
import { Media } from './collections/Media'
import { PaginatedDocs } from 'payload/dist/database/types'


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
      Media,
      SiteMapEntries,
      RobotsEntries,
      Redirects,
      SERPSchema,
    ]

    config.endpoints = [
      ...(config.endpoints || []),
      {
        path: '/sitemap.xml',
        method: 'get',
        handler: async (req: PayloadRequest, res) => {
          const payload = req.payload
          const entries = await payload.find({ collection: 'site-map-entries' })

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

          res.header('Content-Type', 'application/xml')
          res.status(200).send(sitemapContent)
        },
      },
      {
        path: '/sitemap',
        method: 'get',
        handler: async (req, res) => {
          const { payload } = req;
          const entries = await payload.find({
            collection: 'site-map-entries',
          })
          res.status(200).send(entries.docs)
        }
      },
      {
        path: '/robots.txt',
        method: 'get',
        handler: async(req: PayloadRequest, res) => {
          try {
            const { payload } = req;
            const entries = await payload.find({ collection: 'robots-entries' });
            let robotsContent = '';
  
            entries.docs.forEach((entry) => {
              robotsContent += `User-agent: ${entry.userAgent}\n`;
              // @ts-ignore
              entry.directives.forEach((directive) => {
                robotsContent += `${directive.type}: ${directive.path}\n`
              })
              robotsContent += "\n";
            })
            robotsContent += "Sitemap: http://127.0.0.1:3000/sitemap.xml\n";
  
            res.set('Content-Type', 'text/plain');
            res.set('Cache-Control', 'public,max-age=86400');
  
            res.status(200).send(robotsContent.trim())
          } catch (error) {
            res.status(500).send('An error occured when attempting to generate robots.txt')
          }
        }
      }, {
        path: '/robots',
        method: 'get',
        handler: async(req, res) => {
          const { payload } = req;
          const entries = await payload.find({ collection: 'robots-entries' });

          res.status(200).send(entries.docs)
        }
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
