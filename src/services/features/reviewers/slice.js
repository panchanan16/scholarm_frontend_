import { baseApi } from "@/services/baseApi"


export const reviewerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get one Reviewer ---
        getOneReviewer: builder.query({
            query: (params = {}) => ({
                url: '/reviewer/readOne',
                params: {
                    ...(params.reviewer_email && { reviewer_email: params.reviewer_email }),
                    ...(params.reviewer_id && { reviewer_id: params.reviewer_id }),
                },
            }),
            providesTags: ['Reviewers'],
        }),


        // get all reviewers ---
        getAllReviewers: builder.query({
            query: (params = {}) => ({
                url: '/reviewer/readAll',
                params: {
                },
            }),
            providesTags: ['Reviewers'],
        }),

        //Create New Reviewer ---
        createReviewer: builder.mutation({
            query: (data) => ({
                url: '/reviewer/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Reviewers'],
        }),


        //Update a Reviewer ---
        updateReviewer: builder.mutation({
            query: (data) => ({
                url: '/reviewer/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Reviewers'],
        }),

        //delete a Reviewer ---
        deleteReviewer: builder.mutation({
            query: (reviewer_id) => ({
                url: '/reviewer/remove',
                method: 'DELETE',
                params: {
                    reviewer_id
                },
            }),
            invalidatesTags: ['Reviewers'],
        }),

        


    }),
})


export const {
    useLazyGetOneReviewerQuery,
    useCreateReviewerMutation,
    useGetAllReviewersQuery,
    useUpdateReviewerMutation,
    useDeleteReviewerMutation,
} = reviewerApi