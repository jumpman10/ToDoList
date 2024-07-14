import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser, setLoading, setError } from './loginSlice';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1',
    mode: "no-cors",
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin' , '*' );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        // Aquí puedes consologuear las credenciales
        console.log('Sending credentials:', JSON.stringify(credentials));
        return {
          url: '/auth/login',
          method: 'POST',
          body: JSON.stringify(credentials),
        };
      },
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          dispatch(setError(error.error || error.message));
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;