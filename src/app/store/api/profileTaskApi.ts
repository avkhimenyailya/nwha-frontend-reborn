import {api} from '../api';
import {ProfileTask} from '../../models/ProfileTask';
import {Answer} from '../../models/Answer';

export const profileTaskApi = api.injectEndpoints({
    endpoints: build => ({
        fetchProfileTasksByPrincipal: build.query<ProfileTask[], void>({
            providesTags: ['ProfileTask'],
            query: () => ({url: `/profile/tasks`})
        }),
        fetchProfileTasksByProfileId: build.query<ProfileTask[], number | undefined>({
            providesTags: ['ProfileTask'],
            query: (id: number) => ({url: `/profile/${id}/tasks`})
        }),
        fetchProfileTaskById: build.query<ProfileTask, number | undefined>({
            providesTags: ['ProfileTask'],
            query: (id: number) => ({url: `/profileTask/${id}`})
        }),
        updateAnswersByProfileTaskId: build.mutation<ProfileTask, {
            profileTaskId: number | undefined,
            answers: Answer[]
        }>({
            invalidatesTags: ['ProfileTask', 'Profile'],
            query: ({profileTaskId, answers}) => ({
                url: `/profileTask/${profileTaskId}`,
                method: 'put',
                body: answers
            })
        })
    })
});