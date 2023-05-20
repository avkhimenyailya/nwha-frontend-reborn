import {api} from '../api';
import {Thing} from "../../models/Thing";
import {RecentlyThing} from "../../models/RecentlyThing";

export const thingApi = api.injectEndpoints({
    endpoints: build => ({
        fetchThingById: build.query<Thing, number>({
            query: (id: number) => ({
                url: `/thing/${id}`
            })
        }),
        fetchArchivedThingsByPrincipal: build.query<Thing[], void>({
            query: () => ({
                url: `/thing/archived`
            })
        }),
        fetchRecentlyThings: build.query<RecentlyThing[], void>({
            query: () => ({
                url: `/thing/recently`
            })
        }),
        fetchThingsByTaskId: build.query<Thing[], number>({
            query: (taskId: number) => ({
                url: `/thing/task/${taskId}`
            })
        }),
        createThing: build.mutation<Thing, Thing | null>({
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
    })
});