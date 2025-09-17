import { baseApi } from "@/services/baseApi"


export const submissionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //Create article typor meta data ---
        createArticleType: builder.mutation({
            query: (data) => ({
                url: '/getStart/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['IntroArticle'],
        }),

        // Get article Intro ---
        getArticleIntroById: builder.query({
            query: (intro_id) => ({
                url: '/introarticle/readOne',
                params: {
                    intro_id: intro_id || 0,
                },
            }),
            providesTags: ['IntroArticle'],
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


        // Get article details by Id
        getArticleDetailsById: builder.query({
            query: (article_id) => ({
                url: '/articleDetail/readOne',
                params: {
                    article_id: article_id || 0,
                },
            }),
        }),

        // Create article main details
        createArticleMainDetails: builder.mutation({
            query: (data) => ({
                url: '/articleDetail/create',
                method: 'POST',
                body: data,
            }),
        }),

        // update article main details
        updateArticleMainDetails: builder.mutation({
            query: (data) => ({
                url: '/articleDetail/update',
                method: 'PUT',
                body: data,
            }),
        }),

        // Create article section ---
        createArticleSection: builder.mutation({
            query: (data) => ({
                url: '/articleSection/update',
                method: 'PUT',
                body: data,
            }),

            invalidatesTags: ['ArticleSections'],
        }),

        //Get article authors by article_id
        getArticleAuthorsByArticleId: builder.query({
            query: (params = {}) => ({
                url: '/articleAuthor/readAll',
                params: {
                    article_id: params.article_id || 0,
                },
            }),
            providesTags: ['ArticleAuthors'],
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

        // Set the corresponding author---
        setCorrespondingAuthor: builder.mutation({
            query: (data) => ({
                url: '/author/setcorresponding',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['ArticleAuthors'],
        }),


        // Author Contribution ---
        createAuthorContribution: builder.mutation({
            query: (data) => ({
                url: '/authorcontribution/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['ArticleAuthors'],
        }),



        //get Reffrences by articleId---
        getReffencesByArticleId: builder.query({
            query: (params = {}) => ({
                url: '/reffrence/readAll',
                params: {
                    article_id: params.article_id || 0,
                },
            }),
            providesTags: ['ArticleReffrences'],
        }),

        // Add new reffences to article---
        addNewReffence: builder.mutation({
            query: (data) => ({
                url: '/reffrence/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ArticleReffrences'],
        }),


        // update a reffences to article---
        updateReffence: builder.mutation({
            query: (data) => ({
                url: '/reffrence/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['ArticleReffrences'],
        }),

        // Delete one refferences from Article---
        deleteRefferenceFromArticle: builder.mutation({
            query: (params) => ({
                url: `/reffrence/remove`,
                params: {
                    ref_id: params.ref_id
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['ArticleReffrences'],
        }),


        //get article sections by articleId---
        getArticleSections: builder.query({
            query: (params = {}) => ({
                url: '/articleSection/readAll',
                params: {
                    article_id: params.article_id || 0,
                },
            }),
            providesTags: ['ArticleSections'],
        }),


        //get article reviewers by articleId---
        getArticleReviewers: builder.query({
            query: (params = {}) => ({
                url: '/assignReviewer/readAll',
                params: {
                    article_id: params.article_id || 0,
                    round: params.round || 1,
                },
            }),
            providesTags: ['ArticleReviewers'],
        }),


        // Add reviewers to article---
        addReviewersToArticle: builder.mutation({
            query: (data) => ({
                url: '/assignReviewer/create/author',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ArticleReviewers'],
        }),


        // Delete one refferences from Article---
        deleteReviewerFromArticle: builder.mutation({
            query: (params) => ({
                url: `/assignReviewer/remove`,
                params: {
                    reviewer_id: params.reviewer_id,
                    article_id: params.article_id,
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['ArticleReviewers'],
        }),


        // GET summary of article---
        getArticleSummary: builder.query({
            query: (params = {}) => ({
                url: '/entireSubmit/readOne',
                params: {
                    article_id: params.article_id || 0,
                },
            }),
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true,
            providesTags: (result, error, arg) => [{ type: 'ArticleSummary', id: arg.article_id }],
        }),

        // Confirm and Submit manuscript
        confirmAndSubmitManuscript: builder.mutation({
            query: (data) => ({
                url: `/entireSubmit/create`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ArticleSummary', id: arg.article_id }
            ],
        }),
    }),
})


export const {
    useCreateArticleTypeMutation,
    useLazyGetArticleIntroByIdQuery,
    useAddAuthorsToArticleMutation,
    useGetArticleAuthorsByArticleIdQuery,
    useDeleteAuthorsFromArticleMutation,
    useSetCorrespondingAuthorMutation,
    useGetReffencesByArticleIdQuery,
    useAddNewReffenceMutation,
    useUpdateReffenceMutation,
    useDeleteRefferenceFromArticleMutation,
    useGetArticleSectionsQuery,
    useGetArticleReviewersQuery,
    useAddReviewersToArticleMutation,
    useDeleteReviewerFromArticleMutation,
    useGetArticleSummaryQuery,
    useCreateArticleSectionMutation,
    useCreateArticleMainDetailsMutation,
    useUpdateArticleMainDetailsMutation,
    useLazyGetArticleDetailsByIdQuery,
    useConfirmAndSubmitManuscriptMutation,
    useCreateAuthorContributionMutation
} = submissionApi