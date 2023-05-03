import { api } from '../api';
import { Task } from '../../models/Task';

export const taskApi = api.injectEndpoints({
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