import { configureStore } from '@reduxjs/toolkit'
import submissionSlice from './feature/submission/slice'


export const store = configureStore({
  reducer: {
    submission: submissionSlice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})