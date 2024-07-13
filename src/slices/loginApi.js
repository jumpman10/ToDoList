import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setUser, setLoading, setError} from './loginSlice';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({baseUrl: '/api'}),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(credentials, {dispatch, queryFulfilled}) {
        dispatch(setLoading(true));
        try {
          const {data} = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          dispatch(setError(error));
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
});

export const {useLoginMutation} = loginApi;
