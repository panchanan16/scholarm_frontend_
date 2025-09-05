import App from "@/App";
import AssignEditorPage from "@/pages/assignEditorPage";
import AssignReviewerPage from "@/pages/assignReviewer/index";
import Dashboard from "@/pages/dashboard/publisher/Dashboard";
import JournalPage from "@/pages/journalPage";
import JournalDetails from "@/pages/journalPage/modules/JournalDetails";
import SubmissionPage from "@/pages/submission";
import AddReviewersForm from "@/pages/submission/modules/forms/addReviewersForm";
import ArticleDetailsForm from "@/pages/submission/modules/forms/ArticleDetailsForm";
import ArticleSectionForm from "@/pages/submission/modules/forms/articleSectionForm";
import Author from "@/pages/submission/modules/forms/author";
import IntroForm from "@/pages/submission/modules/forms/IntroForm";
import Mainform from "@/pages/submission/modules/forms/ArticleMetaForm";
import ReferenceManagerForm from "@/pages/submission/modules/forms/reffrenceForm";
import SummaryForm from "@/pages/submission/modules/forms/summary";
import PreviewArticlePage from "@/pages/submission/modules/Preview";
import { Outlet } from "react-router-dom";
import EditorDashBoard from "@/pages/dashboard/editor/EditorDashboard";
import ReviewerDashBoard from "@/pages/dashboard/reviewer/ReviewerDashboard";
import { ValidatedJournalListTable } from "./validateRoute";
import AuthorDashboard from "@/pages/dashboard/author/AuthorDashboard";
import AdminLoginPage from "@/pages/loginPages/adminLogin/AdminLoginPage";
import { AdminRoute } from "./protectedRoute";
import SettingsPage from "@/pages/settings";
import FieldTypePage from "@/pages/settings/modules/FieldTypePage";
import MainSettings from "@/pages/settings/modules/MainSettings";
import FieldsPageForm from "@/pages/settings/modules/templateFields";
import EmailTemplatePage from "@/pages/settings/modules/EmailTemplate";
import AuthorPage from "@/components/users/authors";
import EditorPage from "@/components/users/editors";
import ReviewerPage from "@/components/users/reviewers";
import JournalManagement from "@/pages/journal/JournalManagement";
import AuthorContributionForm from "@/pages/submission/modules/AuthorContribution";
import JournalDetailPage from "@/pages/journal/JournalManagement/JournalDetails";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AdminLoginPage /> },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "dashboard",
        element: <JournalPage />,
        children: [
          { path: "manuscript/assign-editor", element: <AssignEditorPage /> },
          {
            path: "manuscript/assign-reviewer",
            element: <AssignReviewerPage />,
          },
          { path: "manuscript/:article_id", element: <JournalDetails /> },
          { path: "authors", element: <AuthorPage /> },
          { path: "editors", element: <EditorPage /> },
          { path: "reviewers", element: <ReviewerPage /> },
          { path: "journals", element: <JournalManagement /> },
          { path: "journals/:journalId", element: <JournalDetailPage /> }
        ],
      },
      { path: "/:role/manuscript", element: <ValidatedJournalListTable /> },

      //Editor Dashboard
      {
        path: "/editor-dashboard",
        element: <EditorDashBoard />,
      },
      {
        path: "editor-dashboard",
        element: <JournalPage />,
        children: [
          { path: "manuscript/assign-editor", element: <AssignEditorPage /> },
          {
            path: "manuscript/assign-reviewer",
            element: <AssignReviewerPage />,
          },
          { path: "manuscript/:article_id", element: <JournalDetails /> },
        ],
      },
      { path: "/:role/manuscript", element: <ValidatedJournalListTable /> },

      // Author Dashboard
      {
        path: "author-dashboard",
        element: <AuthorDashboard />,
        children: [],
      },
      // Reviewer Dashboard
      {
        path: "reviewer-dashboard",
        element: <ReviewerDashBoard />,
        children: [
          { path: "manuscript/:article_id", element: <JournalDetails /> },
        ],
      },
      { path: "assign-editor", element: <AssignEditorPage /> },
      {
        path: "/submission",
        element: <SubmissionPage />,
        children: [
          { path: "article-title", element: <Mainform /> },
          { path: "intro-section", element: <IntroForm /> },
          { path: "article-details", element: <ArticleDetailsForm /> },
          { path: "authors", element: <Author /> },
          { path: "author-contribution", element: <AuthorContributionForm /> },
          { path: "reviewers", element: <AddReviewersForm /> },
          {
            path: "article-sections",
            element: (
              <>
                <Outlet />
              </>
            ),
            children: [
              { path: ":section_name", element: <ArticleSectionForm /> },
            ],
          },
          { path: "reffrences", element: <ReferenceManagerForm /> },
          { path: "summary", element: <SummaryForm /> },
          { path: "preview", element: <PreviewArticlePage /> },
        ],
      },
      {
        path: "/settings",
        element: <SettingsPage />,
        children: [
          { index: true, element: <MainSettings /> },
          { path: "email-template", element: <EmailTemplatePage /> },
          { path: "fieldtype", element: <FieldTypePage /> },
          { path: "fields", element: <FieldsPageForm /> },
        ],
      },
    ],
  },
];

export default routes;
