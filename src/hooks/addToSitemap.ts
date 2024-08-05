import type { CollectionAfterChangeHook } from 'payload/types'
import { SeoFieldsDocument } from '../types'

/**
 * @TODO Add delete as well
 */


const addToSitemap: CollectionAfterChangeHook<SeoFieldsDocument> = async ({ doc, req, previousDoc }) => {
  const { addToSitemap, changeFrequency, sitemapPriority } = doc.sitemap
  const sitemapHasChanged = 
    doc.sitemap.sitemapPriority !== previousDoc?.sitemap?.sitemapPriority ||
    doc.sitemap.changeFrequency !== previousDoc?.sitemap?.changeFrequency;
  const pathHasChanged = doc.seo.path !== previousDoc?.seo?.path;

  if (!sitemapHasChanged && !pathHasChanged) return;

  const existingEntries = await req.payload.find({
    collection: 'site-map-entries',
    where: {
      path: { equals:  pathHasChanged && !!previousDoc.seo?.path ? previousDoc.seo.path : doc.seo.path },
    },
  })
  
    if (existingEntries.docs.length === 0) {
      if (addToSitemap === "yes") {
        await req.payload.create({
          collection: 'site-map-entries',
          data: {
            path: doc.seo.path,
            priority: doc.sitemap.sitemapPriority,
            changeFrequency: doc.sitemap.changeFrequency,
          },
        })
      }
    } else {
      existingEntries.docs.forEach(async (existingEntry) => {
        if (addToSitemap === "yes") {
          await req.payload.update({
            collection: "site-map-entries",
            id: existingEntry.id,
            data: {
              path: doc.seo.path,
              priority: sitemapPriority,
              changeFrequency
            }
          })
        } else {
          await req.payload.delete({
            collection: "site-map-entries",
            id: existingEntry.id
          })
        }
      })
    } 
  } 

export default addToSitemap

