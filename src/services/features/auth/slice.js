import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, clearCredentials } from '@/store/feature/auth/authSlice';
import { authApi } from '@/services/authApi';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api/auth',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        console.log('Sending refresh token');

        const refreshResult = await baseQuery('/refresh', api, extraOptions);

        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearCredentials());
        }
    }

    return result;
};

export const authApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `/${credentials.role}/login`,
                method: 'POST',
                body: { ...credentials },
            }),
            transformResponse: (response) => ({
                user: response.data.user,
                token: response.data.accessToken,
                refreshToken: response.data.refreshToken,
            }),
        }),

        logout: builder.mutation({
            query: (credentials) => ({
                url: `/${credentials.role}/logout`,
                method: 'POST',
            }),
        }),

        getProfile: builder.query({
            query: () => '/profile',
            providesTags: ['User'],
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useForgotPasswordMutation,
} = authApiSlice;