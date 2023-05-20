import {api} from '../api';
import {Task} from '../../models/Task';

export const taskApi = api.injectEndpoints({
    endpoints: build => ({
        fetchTaskById: build.query<Task, number>({
            query: (id: number) => ({
                url: `/task/${id}`
            })
        }),
        fetchTaskByOrdinalNumber: build.query<Task, number>({
            query: (ordinalNumber: number) => ({
                url: `/task/number/${ordinalNumber}`
            })
        }),
        fetchAllTasks: build.query<Task[], void>({
            query: () => ({
                url: '/task'
            })
        })
    })
});