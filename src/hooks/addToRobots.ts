import { CollectionAfterChangeHook } from 'payload/types'
import { PayloadResult, RobotsEntriesResponse, SeoFieldsDocument } from '../types'

const entryHasChanged = (doc: SeoFieldsDocument, previousDoc: SeoFieldsDocument) => {
  const addToRobotsHasChanged = doc.robots.addToRobots !== previousDoc?.robots?.addToRobots;
  const robotEntriesHasChanged = doc.robots.robotsEntries.some((newEntry, index) => {
    const prevEntry = previousDoc?.robots?.robotsEntries[index]
      return (
        newEntry.userAgent !== prevEntry?.userAgent ||
        newEntry.directive !== prevEntry?.directive
      )
  }) || doc.robots.robotsEntries.length !== previousDoc?.robots?.robotsEntries?.length

  return addToRobotsHasChanged || robotEntriesHasChanged
}

const addToRobots: CollectionAfterChangeHook<SeoFieldsDocument> = async ({ doc, req, previousDoc }) => {
  const { addToRobots, robotsEntries } = doc.robots
  const robotsHasChanged = entryHasChanged(doc, previousDoc)
  const pathHasChanged = doc.seo.path !== previousDoc?.seo?.path;

  if (!robotsHasChanged && !pathHasChanged) return;


  if (addToRobots === 'yes') {
    robotsEntries.forEach(async newEntry => {
      const existingEntries = await req.payload.find({
        collection: 'robots-entries',
        where: { userAgent: { equals: newEntry.userAgent } },
      })
      
      if (existingEntries.docs.length === 0) {
        await req.payload.create({
          collection: 'robots-entries',
          data: {
            userAgent: newEntry.userAgent,
            directives: [
              {
                type: newEntry.directive,
                path: doc.seo.path,
              },
            ],
          },
        })
      } else {
        existingEntries.docs.forEach(async existingEntry => {
          const exisitingDirective = existingEntry.directives?.find(directive => {
            if (pathHasChanged) return directive.path === previousDoc.seo.path
            return directive.path === doc.seo.path
          })
          if (!!exisitingDirective) {
            if (exisitingDirective.type !== newEntry.directive || pathHasChanged) {
              const newDirectives = existingEntry.directives?.map(directive => {
                if (directive.id === exisitingDirective.id) {
                  return { ...directive, type: newEntry.directive, path: doc.seo.path }
                }
                return directive
              })
              await req.payload.update({
                collection: 'robots-entries',
                where: { userAgent: { equals: newEntry.userAgent } },
                data: {
                  userAgent: newEntry.userAgent,
                  directives: newDirectives,
                },
              })
            } else console.log('no change detected, skipping')
          } else {
            await req.payload.update({
              collection: 'robots-entries',
              where: { userAgent: { equals: newEntry.userAgent } },
              data: {
                userAgent: newEntry.userAgent,
                directives: [
                  ...(existingEntry.directives || []),
                  {
                    type: newEntry.directive,
                    path: doc.seo.path,
                  },
                ],
              },
            })
          }
        })
      }
    })


    /** @TODO Delete */
  }
}

export default addToRobots
