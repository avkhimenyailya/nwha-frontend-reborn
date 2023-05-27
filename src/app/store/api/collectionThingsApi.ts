import { api } from '../api';
import { CollectionThings } from '../../models/CollectionThings';

export const collectionThingsApi = api.injectEndpoints({
    endpoints: build => ({
        fetchCollectionsThingsByPrincipal: build.query<CollectionThings[], void>({
            providesTags: ['CollectionThings'],
            query: () => ({ url: `/profile/collectionsThings` })
        }),
        fetchCollectionsThingsByProfileId: build.query<CollectionThings[], number>({
            providesTags: ['CollectionThings'],
            query: (profileId: number) => ({ url: `/profile/${ profileId }/collectionsThings` })
        }),
        fetchCollectionThingsById: build.query<CollectionThings, number>({
            providesTags: ['CollectionThings'],
            query: (id: number) => ({ url: `/collectionThings/${ id }` })
        }),
        createCollectionThings: build.mutation<CollectionThings, string>({
            invalidatesTags: ['CollectionThings'],
            query: (name: string) => ({ method: 'post', url: '/collectionThings', params: { name } })
        }),
        deleteCollectionThingsById: build.mutation<void, number>({
            invalidatesTags: ['CollectionThings'],
            query: (id: number) => ({ method: 'delete', url: `/collectionThings/${ id }` })
        }),
        updateCollectionThingNameById: build.mutation<CollectionThings, { collectionId: number, name: string }>({
            invalidatesTags: ['CollectionThings'],
            query: ({ collectionId, name }) => ({
                method: 'put',
                url: `/collectionThings/${ collectionId }`,
                params: { name }
            })
        }),
        putThingInCollectionThings: build.mutation<CollectionThings, { collectionId: number, thingId: number }>({
            invalidatesTags: ['CollectionThings', 'Thing'],
            query: ({ collectionId, thingId }) => ({
                method: 'put',
                url: `/collectionThings/${ collectionId }/put/${ thingId }`
            })
        }),
        removeThingInCollectionThings: build.mutation<CollectionThings, { collectionId: number, thingId: number }>({
            invalidatesTags: ['CollectionThings', 'Thing'],
            query: ({ collectionId, thingId }) => ({
                method: 'put',
                url: `/collectionThings/${ collectionId }/rm/${ thingId }`
            })
        })
    })
});