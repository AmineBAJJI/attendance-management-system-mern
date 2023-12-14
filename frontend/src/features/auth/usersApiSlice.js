import { apiSlice } from './apiSlice';


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: '/logout',
        method: 'POST',
      
      }),
    })
  }),

});

export const {
  useLoginMutation,
  useLogoutMutation
} = userApiSlice;
