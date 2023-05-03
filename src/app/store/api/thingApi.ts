import { api } from '../api';
import { Thing } from '../../models/Thing';
import { RecentlyAddedThing } from '../../models/RecentlyAddedThing';

export const thingApi = api.injectEndpoints({
    endpoints: build => ({
        fetchRandomThing: build.query<Thing[], { limit: number; taskOrdinalNumber?: number }>({
            query: ({ limit, taskOrdinalNumber }) => ({
                url: `/thing/random`,
                params: { limit, taskOrdinalNumber }
            })
        }),
        fetchThingById: build.query<Thing, number>({
            query: (id: number) => ({
                url: `/thing/${ id }`
            })
        }),
        fetchRecentlyAddedThings: build.query<RecentlyAddedThing[], void>({
            query: () => ({
                url: '/thing/recently'
            })
        }),
        create: build.mutation<Thing, Thing | null>({
            query: (newThing: Thing) => ({
                url: '/thing',
                method: 'POST',
                body: newThing
            }),
            invalidatesTags: ['Profile']
        }),
        update: build.mutation<Thing, Thing | null>({
            query: (thing: Thing) => ({
                url: '/thing',
                method: 'PUT',
                body: thing
            })
        }),
        deleteById: build.mutation<void, number>({
            query: (id: number) => ({
                url: `/thing/${ id }`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Profile']
        })
    })
});