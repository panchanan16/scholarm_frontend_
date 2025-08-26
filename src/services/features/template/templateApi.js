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
        }),


        // Create email field ---
        createEmailField: builder.mutation({
            query: (data) => ({
                url: '/emailField/create',
                method: 'POST',
                body: data,
            }),
        }),

        //getAll email field---
        getAllEmailField: builder.query({
            query: () => ({
                url: '/emailField/readAll',
            }),
        }),


        // Create email template ---
        createEmailTemplate: builder.mutation({
            query: (data) => ({
                url: '/emailTemplate/create',
                method: 'POST',
                body: data,
            }),
        }),

        //getAll email template---
        getAllEmailTemplate: builder.query({
            query: () => ({
                url: '/emailTemplate/readAll',
            }),
        }),


        //getOne email template---
        getOneEmailTemplate: builder.query({
            query: (params) => ({
                url: '/emailTemplate/readOne',
                params: {
                    template_id: params.template_id
                }
            }),
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
    useLazyGetOneEmailTemplateQuery
} = templateApi