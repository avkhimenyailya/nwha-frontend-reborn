import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../base';
import { Profile } from '../../models/Profile';

export const profilesApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbHlhIiwiaWF0IjoxNjgwNTk5Mzg1LCJleHAiOjE2ODEyMDQxODV9.FWj3IbPA-6anHTI6KCTV6WdwyFBGs17YQQtwxNPv4_U'
        }
    }),
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, void>({
            query: () => '/profile'
        }),
        getProfileById: builder.query<Profile, number>({
            query: (id: number) => `/profile/${ id }`
        })
    })
});

export const {
    useGetProfileQuery,
    useGetProfileByIdQuery
} = profilesApi;
