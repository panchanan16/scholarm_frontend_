import { baseApi } from "@/services/baseApi"


export const manuscriptApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get manuscript API by status ---
        getManuscriptByStatus: builder.query({
            query: (params = {}) => ({
                url: '/manuscript/findAllByStatus',
                params: {
                   status: params.status,
                },
            }),
            providesTags: ['ManuscriptList'],
        }),


        // Assign Editor to Manuscript ---
        assignEditorToManuscript: builder.mutation({
            query: (data) => ({
                url: '/assignEditor/create',
                method: 'POST',
                body: data,
            }),
            // invalidatesTags: ['ManuscriptList'],
        })


    }),
})


export const {
    useGetManuscriptByStatusQuery, 
    useAssignEditorToManuscriptMutation
} = manuscriptApi