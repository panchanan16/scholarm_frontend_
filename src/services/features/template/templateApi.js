import { baseApi } from "@/services/baseApi"


export const templateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //Create template field type---
        createFieldType: builder.mutation({
            query: (data) => ({
                url: '/fieldType/create',
                method: 'POST',
                body: data,
            }),
        }),


        //getAll template field type---
        getAllFieldType: builder.query({
            query: () => ({
                url: '/fieldType/readAll',
            }),

            providesTags: ['EmailFieldWithType']
        }),


        // Create email field ---
        createEmailField: builder.mutation({
            query: (data) => ({
                url: '/emailField/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['EmailFieldWithType'],
        }),

        //getAll email field---
        getAllEmailField: builder.query({
            query: () => ({
                url: '/emailField/readAll',
            }),
        }),

        // Delete a email Field ---
        deleteEmailField: builder.mutation({
            query: (params) => ({
                url: `/emailField/remove`,
                params: {
                    field_id: params.field_id,
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['EmailFieldWithType'],
        }),


        // Create email template ---
        createEmailTemplate: builder.mutation({
            query: (data) => ({
                url: '/emailTemplate/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['EmailTemplates']
        }),

        //getAll email template---
        getAllEmailTemplate: builder.query({
            query: () => ({
                url: '/emailTemplate/readAll',
            }),

            providesTags: ['EmailTemplates']
        }),


        //getOne email template ---
        getOneEmailTemplate: builder.query({
            query: (params) => ({
                url: '/emailTemplate/readOne',
                params: {
                    template_id: params.template_id
                }
            }),
        }),


        // Update Email template ---
        updateEmailTemplate: builder.mutation({
            query: (data) => ({
                url: '/emailTemplate/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['EmailTemplates'],
        }),



        // Delete Email template ---
        deleteEmailTemplate: builder.mutation({
            query: (params) => ({
                url: `/emailTemplate/remove`,
                params: {
                    template_id: params.template_id,
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['EmailTemplates'],
        }),


    }),
})


export const {
    useCreateFieldTypeMutation,
    useGetAllFieldTypeQuery,
    useCreateEmailFieldMutation,
    useGetAllEmailFieldQuery,
    useCreateEmailTemplateMutation,
    useGetAllEmailTemplateQuery,
    useLazyGetOneEmailTemplateQuery,
    useUpdateEmailTemplateMutation,
    useDeleteEmailFieldMutation,
    useDeleteEmailTemplateMutation
} = templateApi