import { commonApi } from '../commonApi';
import { Task } from '../../models/Task';

export const taskApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchTaskByOrdinalNumber: build.query<Task, number>({
            query: (ordinalNumber: number) => ({
                url: `/task/${ ordinalNumber }`
            })
        }),
        fetchAllTasks: build.query<Task[], void>({
            query: () => ({
                url: '/task'
            })
        })
    })
});