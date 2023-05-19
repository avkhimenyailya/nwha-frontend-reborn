import { api } from '../api';
import { User } from '../../models/User';

export const userApi = api.injectEndpoints({
    endpoints: build => ({
        fetchUserByPrincipal: build.query<User, void>({
            providesTags: ['User'],
            query: () => ({
                url: `/user`
            })
        }),
        updateUserUsername: build.mutation<User, string>({
            invalidatesTags: ['User', 'Profile'],
            query: (newUsername: string) => ({
                url: '/user/username',
                method: 'put',
                params: { newUsername }
            })
        }),
        updateUserPassword: build.mutation<void, { oldPassword: string, newPassword: string }>({
            query: ({ oldPassword, newPassword }) => ({
                url: '/user/password',
                method: 'put',
                body: { oldPassword, newPassword }
            })
        })
    })
});