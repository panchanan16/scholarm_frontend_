import { baseApi } from "@/services/baseApi"


export const publisherApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get All admin ---
        getAllPublisher: builder.query({
            query: (params = {}) => ({
                url: '/admin/readAll',
                params: {

                },
            }),
            providesTags: ['Publishers'],
        }),

        //Create New admin ---
        createPublisher: builder.mutation({
            query: (data) => ({
                url: '/admin/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Publishers'],
        }),


        //Update a admin ---
        updatePublisher: builder.mutation({
            query: (data) => ({
                url: '/admin/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Publishers'],
        }),

        // Delete a Publisher ---
        deletePublisher: builder.mutation({
            query: (admin_id) => ({
                url: '/admin/remove',
                method: 'DELETE',
                params: {
                    admin_id
                }
            }),
            invalidatesTags: ['Publishers'],
        })

    }),
})


export const {
    useGetAllPublisherQuery,
    useCreatePublisherMutation, 
    useUpdatePublisherMutation,
    useDeletePublisherMutation
} = publisherApi