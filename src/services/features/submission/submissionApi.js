import { baseApi } from "@/services/baseApi"


export const submissionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get article Intro ---
        getArticleIntroById: builder.query({
            query: (params = {}) => ({
                url: '/introarticle/readOne',
                params: {
                    intro_id: params.intro_id || 6,
                },
            }),
            providesTags: ['IntroArticle'],
        }),

        //Create article typor meta data ---
        createArticleType: builder.mutation({
            query: (data) => ({
                url: '/getStart/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['IntroArticle'],
        }),

        //Create article detail Title, abstract etc. ---
        createArticleDetail: builder.mutation({
            query: (data) => ({
                url: '/introarticle/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['IntroArticle'],
        }),

        //Get article authors by article_id
        getArticleAuthorsByArticleId: builder.query({
            query: (params = {}) => ({
                url: '/articleAuthor/readAll',
                params: {
                    article_id: params.article_id || 0,
                },
            }),
            providesTags: ['IntroArticle'],
        }),

        // Add Authors to article---
        addAuthorsToArticle: builder.mutation({
            query: (data) => ({
                url: '/articleAuthor/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ArticleAuthors'],
        }),

        // Delete Authors from Article---
        deleteAuthorsFromArticle: builder.mutation({
            query: (params) => ({
                url: `/articleAuthor/remove`,
                params: {
                    article_id: params.article_id,
                    author_id: params.author_id
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['ArticleAuthors'],
        }),


    }),
})


export const {
    useCreateArticleTypeMutation,
    useLazyGetArticleIntroByIdQuery,
    useAddAuthorsToArticleMutation,
    useGetArticleAuthorsByArticleIdQuery,
    useDeleteAuthorsFromArticleMutation
} = submissionApi