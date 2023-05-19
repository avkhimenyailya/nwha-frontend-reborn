import { api } from '../api';
import { Thing } from '../../models/Thing';
import { RecentlyAddedThing } from '../../models/RecentlyAddedThing';

export const thingApi = api.injectEndpoints({
    endpoints: build => ({
        fetchArchivedThingByPrincipal: build.query<Thing[], void>({
            providesTags: ['Thing'],
            query: () => ({
                url: `/profile/archivedThings`
            })
        }),
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
            invalidatesTags: ['ProfileTask'],
            query: (newThing: Thing) => ({
                url: '/thing',
                method: 'POST',
                body: newThing
            })
        }),
        updateThing: build.mutation<Thing, Thing | null>({
            invalidatesTags: ['ProfileTask', 'Thing'],
            query: (thing: Thing) => ({
                url: '/thing',
                method: 'PUT',
                body: thing
            })
        }),
        deleteThingById: build.mutation<void, number>({
            invalidatesTags: ['ProfileTask'],
            query: (id: number) => ({
                url: `/thing/${ id }`,
                method: 'DELETE'
            })
        }),
        archiveThingById: build.mutation<void, number>({
            invalidatesTags: ['Thing', 'ProfileTask'],
            query: (id: number) => ({
                url: `/thing/${ id }`,
                method: 'put'
            })
        })
    })
});