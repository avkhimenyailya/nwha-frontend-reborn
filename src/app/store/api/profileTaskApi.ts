import { commonApi } from '../commonApi';
import { Answer } from '../../models/Answer';
import { ProfileTask } from '../../models/ProfileTask';

export const profileTaskApi = commonApi.injectEndpoints({
    endpoints: build => ({
        // устанавливает/перезаписывает новые ответы в задание
        updateAnswers: build.mutation<ProfileTask, { profileTaskId: number, answers: Answer[] }>({
            query: ({ profileTaskId, answers }) => ({
                url: `/pt/${ profileTaskId }/put/answer`,
                method: 'PUT',
                body: answers
            })
        }),
        // удаляет все ответы из задания
        refreshAnswers:
            build.mutation<ProfileTask, { profileTaskId: number }>({
                query: ({ profileTaskId }) => ({
                    url: `/profile_task/${ profileTaskId }/answers`,
                    method: 'DELETE'
                })
            }),
        // если есть вещь — переносит ее в архив, удаляет все ответы из задания
        refreshProfileTask:
            build.mutation<ProfileTask, { profileTaskId: number }>({
                query: ({ profileTaskId }) => ({
                    url: `/profile_task/${ profileTaskId }`,
                    method: 'DELETE'
                })
            })
    })
});