import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LibraryApi = createApi({
  reducerPath: "LibraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),

  endpoints: (builder) => ({
    getAllUserData: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),

    getAllBookData: builder.query({
      query: () => ({
        url: "book/allbook",
        method: "GET",
      }),
    }),

    getRegisterUserData: builder.query({
      query: () => ({
        url: "/user/registerUser",
        method: "GET",
        headers: {
          "Access-Control-Allow-Credentials": "true",
        },
      }),
    }),
  }),
});

export const {
  useGetAllBookDataQuery,
  useGetAllUserDataQuery,
  useGetRegisterUserDataQuery,
} = LibraryApi;
