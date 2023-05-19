import { api } from '../api';
import { Profile } from '../../models/Profile';

export const profileApi = api.injectEndpoints({
    endpoints: build => ({
        fetchProfileByPrincipal: build.query<Profile, void>({
            providesTags: ['Profile'],
            query: () => ({
                url: '/profile'
            })
        }),
        fetchProfileById: build.query<Profile, number | undefined>({
            providesTags: ['Profile'],
            query: (id: number) => ({
                url: `/profile/id/${ id }`
            })
        }),
        fetchProfileByUsername: build.query<Profile, string | undefined>({
            providesTags: ['Profile'],
            query: (username: string) => ({
                url: `/profile/username/${ username }`
            })
        }),
        updateProfileDescription: build.mutation<Profile, string | undefined>({
            invalidatesTags: ['Profile'],
            query: (description: string) => ({
                url: '/profile/description',
                method: 'put',
                params: { description }
            })
        }),
        updateProfilePersonalLink: build.mutation<Profile, string | undefined>({
            invalidatesTags: ['Profile'],
            query: (personalLink: string) => ({
                url: '/profile/personalLink',
                method: 'put',
                params: { personalLink }
            })
        })
    })
});