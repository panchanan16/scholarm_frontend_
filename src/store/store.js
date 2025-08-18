import { configureStore } from '@reduxjs/toolkit'
import submissionSlice from './feature/submission/slice'
import { baseApi } from '@/services/baseApi'
import authReducer from '@/store/feature/auth/authSlice'
import { authApiSlice } from '@/services/features/auth/slice'
import { authApi } from '@/services/authApi'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    submission: submissionSlice,
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(baseApi.middleware),
})