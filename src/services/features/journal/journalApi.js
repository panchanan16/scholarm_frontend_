import { baseApi } from "@/services/baseApi"


export const journalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        //Create New Journal ---
        createJournal: builder.mutation({
            query: (data) => ({
                url: '/journal/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Journals'],
        }),


        // Get one journal ---
        getOneJournal: builder.query({
            query: (params = {}) => ({
                url: '/journal/readOne',
                params: {
                    ...(params.journal_id && { journal_id: params.journal_id }),
                },
            }),
            providesTags: ['Journals'],
        }),


        // get all Journals ---
        getAllJournal: builder.query({
            query: (params = {}) => ({
                url: '/journal/readAll',
                // params: {
                // },
            }),
            providesTags: ['Journals'],
        }),


        // Fileter journal by category ----
        getFilteredJournal: builder.mutation({
            query: (data) => ({
                url: '/journal/findByfilter',
                method: 'POST',
                body: data,
            }),
        }),

        // readOne by code ----
        getJournalByCode: builder.query({
            query: (params = {}) => ({
                url: '/journal/findOneByCode',
                params: {
                    journal_code: params.journal_code,
                },
            }),
        }),


        //Update a journal ---
        updateJournal: builder.mutation({
            query: (data) => ({
                url: '/journal/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Journals'],
        }),

        //delete a journal ---
        deleteJournal: builder.mutation({
            query: (reviewer_id) => ({
                url: '/journal/remove',
                method: 'DELETE',
                params: {
                    reviewer_id
                },
            }),
            invalidatesTags: ['Journals'],
        }),


        // ---------- Volume and Issue APIs -------------

        createVolume: builder.mutation({
            query: (data) => ({
                url: '/volume/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Journals'],
        }),


        createIssue: builder.mutation({
            query: (data) => ({
                url: '/issue/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Journals'],
        }),

        // Get All issue by journal id and is_special ----
        getAllIssueByJournalId: builder.query({
            query: (params = {}) => ({
                url: '/issue/readAll',
                params: {
                    ...(params.journal_id && { journal_id: params.journal_id }),
                    ...(params.is_special && { is_special: params.is_special }),
                },
            }),
            providesTags: ['Journals'],
        }),


    }),
})


export const {
    useCreateJournalMutation,
    useGetOneJournalQuery,
    useGetAllJournalQuery,
    useUpdateJournalMutation,
    useDeleteJournalMutation,
    useCreateVolumeMutation,
    useCreateIssueMutation,
    useGetFilteredJournalMutation,
    useGetJournalByCodeQuery,
    useGetAllIssueByJournalIdQuery,
} = journalApi