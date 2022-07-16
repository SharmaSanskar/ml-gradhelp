import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const universityApi = createApi({
  reducerPath: "universityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server-gradhelp.herokuapp.com",
  }),

  endpoints: (builder) => ({
    getUniversities: builder.query({
      query: () => ({
        url: "/api/unis",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUniversitiesQuery } = universityApi;
