import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setUser, setLoading, setError} from './loginSlice';
export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => {
        return {
          url: '/auth/login',
          method: 'POST',
          body: JSON.stringify(credentials),
        };
      },
      async onQueryStarted(credentials, {dispatch, queryFulfilled}) {
        dispatch(setLoading(true));
        try {
          const {data} = await queryFulfilled;
          dispatch(setUser(data));
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('type', data.user.type);
          window.localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
          dispatch(setError(error.error || error.message));
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
});

export const {useLoginMutation} = loginApi;
