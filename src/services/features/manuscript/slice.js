import { baseApi } from "@/services/baseApi"


export const manuscriptApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get started creating a manuscript ---
        getStartedArticle: builder.mutation({
            query: (data) => ({
                url: '/getStart/create',
                method: 'POST',
                body: data,
            }),
        }),

        // Add Article meta data ---
        addArticleMetaData: builder.mutation({
            query: (data) => ({
                url: '/introarticle/create',
                method: 'POST',
                body: data,
            }),
        }),

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


        // Get Manuscript for Editor ---
        getManuscriptForEditor: builder.query({
            query: (params = {}) => ({
                url: '/manuscript/findAllByEditor',
                params: {
                    userId: params.userId,
                    ...(params.status && { status: params.status }),
                    ...(params.editorStatus && { editorStatus: params.editorStatus }),
                    ...(params.completed && { completed: params.completed })

                },
            }),
        }),


        // Get Manuscript for Reviewer ---
        getManuscriptForReviewer: builder.query({
            query: (params = {}) => ({
                url: '/manuscript/findAllByReviewer',
                params: {
                    userId: params.userId,
                    ...(params.status && { status: params.status }),
                    ...(params.reviewerStatus && { reviewerStatus: params.reviewerStatus }),
                    ...(params.completed && { completed: params.completed })

                },
            }),
        }),

        // Get manuscript entire review details ---
        getManuscriptReviewDetails: builder.query({
            query: (article_id) => ({
                url: `/manuscript/review/readOne`,
                method: 'GET',
                params: {
                    article_id: article_id,
                },
            }),

            providesTags: ['ManuscriptEntireReview']
        }),


        // GET reviews and authors for editor ---
        getReviewsAuthors: builder.query({
            query: (article_id) => ({
                url: `/review/authors/readAll`,
                method: 'GET',
                params: {
                    article_id: article_id,
                },
            }),
        }),


        // Assign Editor to Manuscript ---
        assignEditorToManuscript: builder.mutation({
            query: (data) => ({
                url: '/assignEditor/create',
                method: 'POST',
                body: data,
            }),
            // invalidatesTags: ['ManuscriptList'],
        }),

        // Acept or reject assignment by Editor ---
        updateAssignMentStatusEditor: builder.mutation({
            query: (data) => ({
                url: '/assignEditor/status',
                method: 'PUT',
                body: data,
            }),

            invalidatesTags: ['ManuscriptEntireReview']
        }),

        // Update Editor's Descision on Manuscript ---
        updateEditorDescision: builder.mutation({
            query: (data) => ({
                url: '/editor/recommendation',
                method: 'POST',
                body: data,
            }),
        }),

        // Assign Reviewer to Manuscript ---
        assignReviewerToManuscript: builder.mutation({
            query: (data) => ({
                url: '/assignReviewer/create',
                method: 'POST',
                body: data,
            }),
            // invalidatesTags: ['ManuscriptList'],
        }),

        // Acept or reject assignment by Reviewer ---
        updateAssignMentStatusReviewer: builder.mutation({
            query: (data) => ({
                url: '/assignReviewer/status',
                method: 'PUT',
                body: data,
            }),

            invalidatesTags: ['ManuscriptEntireReview']
        }),


        // get all assigned reviewers for a manuscript ---
        getAssignedReviewers: builder.query({
            query: (article_id) => ({
                url: `/assignReviewer/readAll`,
                method: 'GET',
                params: {
                    article_id: article_id,
                },
            }),
        }),

        // update reviewer response ----
        updateReviewerRecommendation: builder.mutation({
            query: (data) => ({
                url: '/reviewer/recommendation',
                method: 'PUT',
                body: data,
            }),
        }),


    }),
})


export const {
    useGetManuscriptByStatusQuery,
    useAssignEditorToManuscriptMutation,
    useAssignReviewerToManuscriptMutation,
    useGetAssignedReviewersQuery,
    useGetManuscriptReviewDetailsQuery,
    useUpdateReviewerRecommendationMutation,
    useGetStartedArticleMutation,
    useAddArticleMetaDataMutation,
    useGetReviewsAuthorsQuery,
    useUpdateEditorDescisionMutation,
    useUpdateAssignMentStatusEditorMutation,
    useLazyGetManuscriptForEditorQuery,
    useLazyGetManuscriptForReviewerQuery,
    useLazyGetManuscriptByStatusQuery,
    useUpdateAssignMentStatusReviewerMutation
} = manuscriptApi