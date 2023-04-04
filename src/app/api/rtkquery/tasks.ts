import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../base';
import { Task } from '../../models/Task';

const tasksApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        getAllTasks: builder.query<Task, number>({
            query: () => '/task'
        }),
        getTaskById: builder.query<Task, number>({
            query: (id: number) => `/task/${ id }`
        })
    })
});

export const { useGetAllTasksQuery, useGetTaskByIdQuery } = tasksApi;
export default tasksApi.reducer;
