import { PayloadRequest, TypeWithID } from "payload/types";
import { PluginTypes, SeoFieldsDocument } from "../types";
import { Response } from "express";
import { Payload } from "payload";
import { PaginatedDocs } from "payload/dist/database/types";

interface SitemapData {
  path: string;
  priority: number;
  changeFrequency: string;
}

const getAllSitemapEntries = async (payload: Payload, pluginOptions: PluginTypes): Promise<SitemapData[]> => {
    const sitemapEntries = (await payload.find({ collection: 'site-map-entries' })).docs
        .map((doc) => ({
            path: doc.path,
            priority: doc.priority,
            changeFrequency: doc.changeFrequency
          })) as SitemapData[]

    const pluginDocs = (await Promise.all(pluginOptions.collections
        .map(async (collection) => {
          const entries = await payload.find({ collection: collection }) 
          return entries.docs 
        })
      )).flat() as unknown as SeoFieldsDocument[]
  
  
      const remainingSitemaps = pluginDocs.filter((doc) => {
        if (doc.sitemap?.addToSitemap) {
          return sitemapEntries.findIndex((sitemapDoc) => {
            return sitemapDoc.path === doc.seo.path
          }) === -1
        }
      }).map((doc) => ({
        path: doc.seo.path,
        priority: doc.sitemap?.priority,
        changeFrequency: doc.sitemap?.changeFrequency
      }))
  
      return [sitemapEntries, remainingSitemaps].flat()
}

export const generateSitemapXML = (data: SitemapData[], hostname: string) => {
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n'
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  data.forEach(entry => {
    sitemapContent += '  <url>\n'
    sitemapContent += `    <loc>${hostname}${entry.path}</loc>\n`
    sitemapContent += `    <changefreq>${entry.changeFrequency}</changefreq>\n`
    sitemapContent += `    <priority>${entry.priority}</priority>\n`
    sitemapContent += '  </url>\n'
  })

  sitemapContent += '</urlset>'

  return sitemapContent
}

export const getSitemapXML = async (req: PayloadRequest, res: Response, pluginOptions: PluginTypes) => {
    const allSitemapEntries = await getAllSitemapEntries(req.payload, pluginOptions)
    const sitemapContent = generateSitemapXML(allSitemapEntries, pluginOptions.hostname)
    res.header('Content-Type', 'application/xml')
    res.status(200).send(sitemapContent)
}


export const getSitemap = async (req: PayloadRequest, res: Response, pluginOptions: PluginTypes) => {
    const allSitemapEntries = await getAllSitemapEntries(req.payload, pluginOptions)
    res.status(200).send(allSitemapEntries)
  }