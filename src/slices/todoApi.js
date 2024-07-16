import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setTasks, addTask, updateTask, setLoading, setError} from './todoSlice';
const token = window.localStorage.getItem('token');
export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['create', 'delete'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
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
      providesTags: ['create'],
    }),
    fetchTasksbyUserId: builder.query({
      query: id => `/tasks/user/${id}`,
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        dispatch(setLoading(true));
        try {
          const {data} = await queryFulfilled;
          dispatch(setTasks(data));
        } catch (error) {
          dispatch(setError(error.error || error.message));
          console.log(error);
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ['create'],
    }),
    createTask: builder.mutation({
      query: task => {
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
      invalidatesTags: ['create'],
    }),
    deletebyId: builder.mutation({
      query: id => {
        return {
          url: `/tasks/${id}`,
          method: 'DELETE',
        };
      },
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
      invalidatesTags: ['create'],
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useFetchTasksbyUserIdQuery,
  useDeletebyIdMutation,
} = todoApi;
