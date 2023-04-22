import { commonApi } from '../commonApi';
import { Thing } from '../../models/Thing';
import { RecentlyAddedThing } from '../../models/RecentlyAddedThing';

export const thingApi = commonApi.injectEndpoints({
    endpoints: build => ({
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
        createThing: build.mutation<Thing, Thing>({
            query: (newThing: Thing) => ({
                url: '/thing',
                method: 'POST',
                body: newThing
            }),
            invalidatesTags: ['Profile']
        })
    })
});