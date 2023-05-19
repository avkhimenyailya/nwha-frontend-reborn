import {api} from '../api';
import {Thing2} from "../../models/Thing2";

export const thingApi2 = api.injectEndpoints({
    endpoints: build => ({
        fetchThing2ById: build.query<Thing2, number>({
            query: (id: number) => ({
                url: `/thing2/${id}`
            })
        }),
        createThing2: build.mutation<Thing2, Thing2 | null>({
            invalidatesTags: ['ProfileTask'],
            query: (newThing: Thing2) => ({
                url: '/thing2',
                method: 'POST',
                body: newThing
            })
        }),
        updateThing2: build.mutation<Thing2, Thing2 | null>({
            invalidatesTags: ['ProfileTask', 'Thing'],
            query: (thing: Thing2) => ({
                url: '/thing2',
                method: 'PUT',
                body: thing
            })
        }),
    })
});