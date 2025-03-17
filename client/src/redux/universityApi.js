import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const universityApi = createApi({
  reducerPath: "universityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
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
