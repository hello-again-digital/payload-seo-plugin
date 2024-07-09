import { CollectionAfterChangeHook } from 'payload/types'

const addToSitemap: CollectionAfterChangeHook = async ({ doc, req, previousDoc }) => {
  const { addToSitemap } = doc.seo

  if (addToSitemap === 'yes') {
    const existingEntry = await req.payload.find({
      collection: 'site-map-entries',
      where: {
        url: { equals: `/${doc.seo.canonicalUrl}` },
      },
    })

    console.log('DOCUMENT:', doc)

    if (existingEntry.docs.length === 0) {
      await req.payload.create({
        collection: 'site-map-entries',
        data: {
          url: `/${doc.seo.canonicalUrl || doc.slug}`,
          priority: doc.seo.sitemapPriority,
          changeFrequency: doc.seo.changeFrequency,
        },
      })
    }
  }
}

export default addToSitemap
