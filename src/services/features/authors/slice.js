import { baseApi } from "@/services/baseApi"


export const authorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get one author ---
        getOneAuthor: builder.query({
            query: (params = {}) => ({
                url: '/author/readOne',
                params: {
                    ...(params.author_email && { author_email: params.author_email }),
                    ...(params.author_id && { author_id: params.author_id }),
                },
            }),
            providesTags: ['Authors'],
        }),

        getAllAuthors: builder.query({
            query: (journal) => ({
                url: '/author/readAll',
                params: { journal }
            }),
            providesTags: ['Authors'],
        }),

        //Create article typor meta data ---
        createAuthor: builder.mutation({
            query: (data) => ({
                url: '/author/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Authors'],
        }),


        // Update a author ---
        updateAuthor: builder.mutation({
            query: (data) => ({
                url: '/author/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Authors'],
        }),


        // Delete a author ---
        deleteAuthors: builder.mutation({
            query: (author_id) => ({
                url: '/author/remove',
                method: 'DELETE',
                params: {
                    author_id
                }
            }),
            invalidatesTags: ['Authors'],
        })


    }),
})


export const {
    useLazyGetOneAuthorQuery,
    useUpdateAuthorMutation,
    useCreateAuthorMutation,
    useGetAllAuthorsQuery,
    useDeleteAuthorsMutation
} = authorApi