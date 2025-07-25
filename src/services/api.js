// src/app/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'crudApi',                    // unique key for this slice
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: () => ({}),                 // start with no endpoints
  tagTypes: ['User', 'Post'],           
});
