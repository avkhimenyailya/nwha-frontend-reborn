import {api} from '../api';
import {Thing} from "../../models/Thing";
import {RecentlyThing} from "../../models/RecentlyThing";

export const thingApi = api.injectEndpoints({
    endpoints: build => ({
        fetchThingById: build.query<Thing, number>({
            providesTags: ['Thing'],
            query: (id: number) => ({
                url: `/thing/${id}`
            })
        }),
        fetchArchivedThingsByPrincipal: build.query<Thing[], void>({
            providesTags: ['Thing'],
            query: () => ({
                url: `/thing/archived`
            })
        }),
        fetchRecentlyThings: build.query<RecentlyThing[], void>({
            providesTags: ['Thing'],
            query: () => ({
                url: `/thing/recently`
            })
        }),
        fetchThingsByTaskId: build.query<Thing[], number>({
            providesTags: ['Thing'],
            query: (taskId: number) => ({
                url: `/thing/task/${taskId}`
            })
        }),
        createThing: build.mutation<Thing, Thing | null>({
            invalidatesTags: ['ProfileTask', 'Thing'],
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
    })
});