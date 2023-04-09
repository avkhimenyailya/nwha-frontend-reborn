import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../base';
import { Task } from '../../models/Task';

export const tasksApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbHlhIiwiaWF0IjoxNjgwNTk5Mzg1LCJleHAiOjE2ODEyMDQxODV9.FWj3IbPA-6anHTI6KCTV6WdwyFBGs17YQQtwxNPv4_U'
        }
    }),
    endpoints: (builder) => ({
        getAllTasks: builder.query<Task, number>({
            query: () => '/task'
        }),
        getTaskById: builder.query<Task, number>({
            query: (id: number) => `/task/${ id }`
        })
    })
});

export const {
    useGetAllTasksQuery,
    useGetTaskByIdQuery
} = tasksApi;
