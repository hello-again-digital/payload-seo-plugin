import { CollectionAfterDeleteHook } from "payload/types"
import { SeoFieldsDocument } from "../types"

/** Delete all seo entries related to page */
export const onSeoEnabledCollectionDelete: CollectionAfterDeleteHook<SeoFieldsDocument> = async ({ doc, req }) => {
    const { seo, robots, sitemap, serpSchema } = doc
    // delete sitemap
    await req.payload.delete({
      collection: 'site-map-entries',
      where: { path: { equals: seo.path } },
    })
    // delete serp
    await req.payload.delete({
      collection: 'serp-schema',
      where: { path: { equals: seo.path } },
    })
    // delete robots
    const existingEntries = await req.payload.find({
      collection: 'robots-entries',
      /** @TODO Try to resolve the below type error */
      //@ts-ignore
      where: { directives: { some: { path: { equals: seo.path } } } },
    })
    for (const robot of existingEntries.docs) {
      const updatedDirectives = robot.directives?.filter(directive => directive.path !== seo.path)
      try {
        await req.payload.update({
          collection: 'robots-entries',
          id: robot.id,
          data: {
            directives: updatedDirectives,
          },
        })
      } catch (error) {
        console.error('Error deleting path from robot entries:', error)
      }
    }
  }
  