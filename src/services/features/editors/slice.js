import { baseApi } from "@/services/baseApi"


export const editorsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get All editor ---
        getAllEditors: builder.query({
            query: (params = {}) => ({
                url: '/editor/readAll',
                params: {
                  
                },
            }),
            providesTags: ['Editors'],
        }),

        //Create New editor ---
        createEditors: builder.mutation({
            query: (data) => ({
                url: '/editor/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Editors'],
        }),


        //Update a editor ---
        updateEditors: builder.mutation({
            query: (data) => ({
                url: '/editor/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Editors'],
        })


    }),
})


export const {
    useGetAllEditorsQuery,
    useCreateEditorsMutation,
    useUpdateEditorsMutation
} = editorsApi