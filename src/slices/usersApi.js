import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setUsers, setLoading, setError} from './usersSlice';

const token = window.localStorage.getItem('token');

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['tag1'],
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
    fetchUsers: builder.query({
      query: () => '/users',
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        dispatch(setLoading(true));
        try {
          const {data} = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (error) {
          dispatch(setError(error.error || error.message));
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ['tag1'],
    }),
    createUser: builder.mutation({
      query: user => {
        console.log(user);
        return {
          url: '/auth/signup',
          method: 'POST',
          body: JSON.stringify(user),
        };
      },
      async onQueryStarted(user, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (error) {
          dispatch(setError(error.error || error.message));
        }
      },
      invalidatesTags: ['tag1'],
    }),
    editUser: builder.mutation({
      query: user => {
        console.log(user);
        return {
          url: `/users/${user.id}`,
          method: 'PUT',
          body: JSON.stringify(user.obj),
        };
      },
      async onQueryStarted(user, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (error) {
          dispatch(setError(error.error || error.message));
          console.log(error);
        }
      },
      invalidatesTags: ['tag1'],
    }),
    deleteUser: builder.mutation({
      query: id => {
        return {
          url: `/users/${id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        dispatch(setLoading(true));
        try {
          const {data} = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (error) {
          dispatch(setError(error.error || error.message));
        } finally {
          dispatch(setLoading(false));
        }
      },
      invalidatesTags: ['tag1'],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useEditUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
} = usersApi;
