import { commonApi } from '../commonApi';
import { Profile } from '../../models/Profile';
import { Thing } from '../../models/Thing';
import { Collection } from '../../models/Collection';

export const profileApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchProfile: build.query<Profile, void>({
            query: () => ({
                url: '/profile'
            })
        }),
        fetchProfileById: build.query<Profile, number>({
            query: (id: number) => ({
                url: `/profile/id/${ id }`
            }),
            providesTags: ['Profile']
        }),
        fetchProfileByUsername: build.query<Profile, string>({
            query: (username: string) => ({
                url: `/profile/usr/${ username }`
            })
        }),
        fetchProfileThingsByProfileId: build.query<Thing[], number>({
            query: (profileId: number | undefined) => ({
                url: `/profile/${ profileId }/things`
            })
        }),
        fetchProfileCollectionsThingsByProfileId: build.query<Collection[], number>({
            query: (profileId: number | undefined) => ({
                url: `/profile/${ profileId }/collections`
            })
        })
    })
});