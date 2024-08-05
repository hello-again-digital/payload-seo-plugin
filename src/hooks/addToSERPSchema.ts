import { CollectionAfterChangeHook } from 'payload/types'
import {  SeoFieldsDocument } from '../types'

const addToSERPSchema: CollectionAfterChangeHook<SeoFieldsDocument> = async ({ doc, previousDoc, req, context }) => {
    const { serpSchema } = doc
    console.log('new old', serpSchema, previousDoc?.serpSchema)
    const schemaHasChanged = serpSchema.schema !== previousDoc?.serpSchema?.schema;
    const pathHasChanged = doc.seo.path !== previousDoc?.seo?.path;

    if (!schemaHasChanged && !pathHasChanged) return;

    const existingEntries = await req.payload.find({
        collection: 'serp-schema',
        where: { path: { equals: pathHasChanged && !!previousDoc.seo?.path ? previousDoc.seo.path : doc.seo.path } }
    })

    if (existingEntries.docs.length === 0) {
        await req.payload.create({
            collection: 'serp-schema',
            data: {
                path: doc.seo.path,
                schema: serpSchema.schema
            }
        })

    } else {
        existingEntries.docs.forEach(async (existingEntry) => {

            if (!serpSchema.schema) {
                await req.payload.delete({
                    collection: 'serp-schema',
                    id: existingEntry.id
                })
            } else {
                await req.payload.update({
                    collection: 'serp-schema',
                    id: existingEntry.id,
                    data: {
                        path: doc.seo.path,
                        schema: serpSchema.schema
                    }
                })
            }
        })
    }
}

export default addToSERPSchema
