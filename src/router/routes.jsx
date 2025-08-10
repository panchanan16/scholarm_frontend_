import App from "@/App";
import AssignEditorPage from "@/pages/assignEditorPage";
import AssignReviewerPage from "@/pages/assignReviewer/index";
import Dashboard from "@/pages/dashboard/publisher/Dashboard";
import JournalPage from "@/pages/journalPage";
import JournalDetails from "@/pages/journalPage/modules/JournalDetails";
import JournalListTable from "@/pages/journalPage/modules/JournalList";
import SubmissionPage from "@/pages/submission";
import AddReviewersForm from "@/pages/submission/modules/forms/addReviewersForm";
import ArticleSectionForm from "@/pages/submission/modules/forms/articleSectionForm";
import Author from "@/pages/submission/modules/forms/author";
import IntroForm from "@/pages/submission/modules/forms/IntroForm";
import Mainform from "@/pages/submission/modules/forms/mainfrom";
import ReferenceManagerForm from "@/pages/submission/modules/forms/reffrenceForm";
import SummaryForm from "@/pages/submission/modules/forms/summary";
import PreviewArticlePage from "@/pages/submission/modules/Preview";
import { Outlet } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "/dashboard",
        element: <JournalPage />,
        children: [
          { index: true, element: <JournalListTable /> },
          { path: "assign-editor", element: <AssignEditorPage /> },
          { path: "assign-reviewer", element: <AssignReviewerPage /> },
          { path: ":article_id", element: <JournalDetails /> },
        ],
      },
      { path: "assign-editor", element: <AssignEditorPage /> },
      {
        path: "/submission",
        element: <SubmissionPage />,
        children: [
          { index: true, element: <Mainform /> },
          { path: "intro-section", element: <IntroForm /> },

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
