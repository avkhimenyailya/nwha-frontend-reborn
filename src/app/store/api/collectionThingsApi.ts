import { api } from '../api';
import { CollectionThings } from '../../models/CollectionThings';

export const collectionThingsApi = api.injectEndpoints({
    endpoints: build => ({

        // FETCHING
        fetchCountCollectionsByThingId:
            build.query<number, number | undefined>({
                query: (thingId: number) => ({
                    url: `/collection/count/${ thingId }`
                })
            }),
        fetchCollectionThingsById:
            build.query<CollectionThings, number>({
                query: (id: number) => ({
                    url: `/collection/${ id }`
                })
            }),

        // MUTATIONS
        createCollectionThings:
            build.mutation<CollectionThings, string>({
                query: (name: string) => ({
                    method: 'POST',
                    url: `/collection?name=${ name }`
                }),
                invalidatesTags: ['CollectionThings']
            }),
        deleteCollectionThingsById:
            build.mutation<void, number>({
                query: (id: number) => ({
                    method: 'DELETE',
                    url: `/collection/${ id }`
                }),
                invalidatesTags: ['CollectionThings']
            }),
        updateNameCollectionThingsById:
            build.mutation<CollectionThings, { collectionId?: number, name?: string }>({
                query: ({ collectionId, name }) => ({
                    method: 'PUT',
                    url: `/collection/${ collectionId }?name=${ name }`
                }),
                invalidatesTags: ['CollectionThings']
            }),
        putThingInCollectionThings:
            build.mutation<CollectionThings, { collectionId: number, thingId: number }>({
                query: ({ collectionId, thingId }) => ({
                    method: 'PUT',
                    url: `/collection/${ collectionId }/put/${ thingId }`
                }),
                invalidatesTags: ['CollectionThings']
            }),
        removeThingInCollectionThings:
            build.mutation<CollectionThings, { collectionId: number, thingId: number }>({
                query: ({ collectionId, thingId }) => ({
                    method: 'PUT',
                    url: `/collection/${ collectionId }/rm/${ thingId }`
                }),
                invalidatesTags: ['CollectionThings']
            })
    })
});