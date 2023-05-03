import { api } from '../api';
import { Profile } from '../../models/Profile';
import { Thing } from '../../models/Thing';
import { CollectionThings } from '../../models/CollectionThings';

export const profileApi = api.injectEndpoints({
    endpoints: build => ({
        fetchAuthorizedProfile: build.query<Profile, void>({
            query: () => ({
                url: '/profile'
            })
        }),
        fetchProfileById: build.query<Profile, number | undefined>({
            query: (id: number) => ({
                url: `/profile/id/${ id }`
            }),
            providesTags: ['Profile']
        }),
        fetchProfileByUsername: build.query<Profile, string>({
            query: (username: string) => ({
                url: `/profile/usr/${ username }`
            }),
            providesTags: ['Profile']
        }),
        fetchThingsByProfileId: build.query<Thing[], number>({
            query: (profileId: number) => ({
                url: `/profile/${ profileId }/things`
            })
        }),
        fetchCollectionsThingsByProfileId: build.query<CollectionThings[], number | undefined>({
            query: (profileId: number | undefined) => ({
                url: `/profile/${ profileId }/collections`
            }),
            providesTags: ['CollectionThings']
        })
    })
});