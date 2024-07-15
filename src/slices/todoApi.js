import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setTasks, addTask, updateTask, setLoading, setError} from './todoSlice';

const token = window.localStorage.getItem('token');
export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['create'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1',
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    fetchTasks: builder.query({
      query: () => '/tasks',
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        dispatch(setLoading(true));
        try {
          const {data} = await queryFulfilled;
          dispatch(setTasks(data));
        } catch (error) {
          dispatch(setError(error.error || error.message));
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ['create', 'edit'],
    }),
    createTask: builder.mutation({
      query: task => {
        console.log('Sending credentials:', JSON.stringify(task));
        return {
          url: '/tasks',
          method: 'POST',
          body: JSON.stringify(task),
        };
      },
      async onQueryStarted(task, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(addTask(data));
        } catch (error) {
          dispatch(setError(error.error || error.message));
        }
      },
      invalidatesTags: ['create'],
    }),
    editTask: builder.mutation({
      query: task => {
        console.log(task, 'hoña');
        return {
          url: `/tasks/${task.id}`,
          method: 'PUT',
          body: JSON.stringify(task.obj),
        };
      },
      async onQueryStarted(task, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(updateTask(data));
        } catch (error) {
          dispatch(setError(error.error || error.message));
        }
      },
      invalidatesTags: ['edit'],
    }),
  }),
});

export const {useFetchTasksQuery, useCreateTaskMutation, useEditTaskMutation} =
  todoApi;
