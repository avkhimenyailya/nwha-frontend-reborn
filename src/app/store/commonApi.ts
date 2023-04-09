import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query/react';

import { logout, refresh } from './reducers/authSlice';
import { RootState } from './store';
import { Mutex } from 'async-mutex';
import { AuthResponse } from '../models/auth/AuthResponse';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.nwha.grayproject.io',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.data?.accessToken;
        headers.set('Content-Type', 'application/json;charset=UTF-8');
        headers.set('Authorization', `Bearer ${ accessToken || '' }`);
        return headers;
    }
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
    = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = (api.getState() as RootState).auth.data?.refreshToken!;
                const refreshResult = await baseQuery({
                        url: '/auth/refresh',
                        method: 'post',
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                        body: { 'refreshToken': refreshToken || '' }
                    },
                    api,
                    extraOptions
                );
                if (refreshResult.data) {
                    api.dispatch(refresh(refreshResult.data as AuthResponse));
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const commonApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Profile'],
    baseQuery: baseQueryWithReAuth,
    endpoints: _ => ({})
});