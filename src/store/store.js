import { configureStore } from '@reduxjs/toolkit'
import submissionSlice from './feature/submission/slice'
import { baseApi } from '@/services/baseApi'


export const store = configureStore({
  reducer: {
    submission: submissionSlice,
    [baseApi.reducerPath]: baseApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(baseApi.middleware),
})