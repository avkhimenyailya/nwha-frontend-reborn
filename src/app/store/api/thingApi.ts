import { commonApi } from '../commonApi';
import { Thing } from '../../models/Thing';

export const thingApi = commonApi.injectEndpoints({
    endpoints: build => ({
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