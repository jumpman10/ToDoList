import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setTasks, addTask, updateTask, setLoading, setError} from './todoSlice';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({baseUrl: '/api'}),
  endpoints: builder => ({
    fetchTasks: builder.query({
      query: () => '/tasks',
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        dispatch(setLoading(true));
        try {
          const {data} = await queryFulfilled;
          dispatch(setTasks(data));
        } catch (error) {
          dispatch(setError(error));
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
    createTask: builder.mutation({
      query: task => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      async onQueryStarted(task, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(addTask(data));
        } catch (error) {
          dispatch(setError(error));
        }
      },
    }),
    editTask: builder.mutation({
      query: ({id, ...task}) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: task,
      }),
      async onQueryStarted(task, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(updateTask(data));
        } catch (error) {
          dispatch(setError(error));
        }
      },
    }),
  }),
});

export const {useFetchTasksQuery, useCreateTaskMutation, useEditTaskMutation} =
  todoApi;
