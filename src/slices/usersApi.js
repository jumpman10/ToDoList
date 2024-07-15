import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setUsers, setLoading, setError} from './usersSlice';

const token = window.localStorage.getItem('token');

export const usersApi = createApi({
  reducerPath: 'usersApi',
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
    }),
  }),
});

export const {useFetchUsersQuery} = usersApi;
