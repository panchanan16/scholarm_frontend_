import { BASE_URL } from '@/api/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'BaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/entity`,
  }),
  tagTypes: ['Authors', 'Editors', 'IntroArticle', 'ArticleAuthors', 'ArticleReffrences', 'ArticleSections', 'ArticleReviewers', 'Reviewers', 'ArticleSummary', 'ManuscriptList', 'ManuscriptEntireReview', 'Journals', 'EmailFieldWithType', 'EmailTemplates'],
  endpoints: () => ({}),
})



