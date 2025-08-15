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

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AdminLoginPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "dashboard",
        element: <JournalPage />,
        children: [
          { path: "manuscript/assign-editor", element: <AssignEditorPage /> },
          { path: "manuscript/assign-reviewer", element: <AssignReviewerPage /> },
          { path: "manuscript/:article_id", element: <JournalDetails /> },
        ],
      },
      { path: "/:role/manuscript", element: <ValidatedJournalListTable /> },
      //Editor Dashboard
      {
        path: "editor-dashboard",
        element: <EditorDashBoard />,
        children: [
          { path: "manuscript/:article_id", element: <JournalDetails /> }
        ],
      },
      // Author Dashboard
       {
        path: "author-dashboard",
        element: <AuthorDashboard />,
        children: [],
      },
      // Reviewer Dashboard
      { path: "reviewer-dashboard", element: <ReviewerDashBoard /> },
      { path: "assign-editor", element: <AssignEditorPage /> },
      {
        path: "/submission",
        element: <SubmissionPage />,
        children: [
          { index: true, element: <Mainform /> },
          { path: "intro-section", element: <IntroForm /> },
          { path: "article-details", element: <ArticleDetailsForm /> },
          { path: "authors", element: <Author /> },
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
    ],
  },
];

export default routes;
