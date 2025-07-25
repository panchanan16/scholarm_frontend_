import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import SubmissionPage from "@/pages/submission";
import AddReviewersForm from "@/pages/submission/modules/forms/addReviewersForm";
import ArticleSectionForm from "@/pages/submission/modules/forms/articleSectionForm";
import Author from "@/pages/submission/modules/forms/author";
import IntroForm from "@/pages/submission/modules/forms/IntroForm";
import Mainform from "@/pages/submission/modules/forms/mainfrom";
import ReferenceManagerForm from "@/pages/submission/modules/forms/reffrenceForm";
import SummaryForm from "@/pages/submission/modules/forms/summary";
import PreviewArticlePage from "@/pages/submission/modules/Preview";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/about", element: <h1>About Page</h1> },
      { path: "/contact", element: <h1>Contact Page</h1> },
      {
        path: "/submission",
        element: <SubmissionPage />,
        children: [
          { index: true, element: <Mainform /> },
          { path: "intro-section", element: <IntroForm /> },

          { path: "authors", element: <Author /> },
          { path: "reviewers", element: <AddReviewersForm /> },
          { path: "article-sections", element: <ArticleSectionForm /> },
          { path: "reffrences", element: <ReferenceManagerForm /> },
          { path: "summary", element: <SummaryForm /> },
          { path: "preview", element: <PreviewArticlePage /> },
        ],
      },
    ],
  },
];

export default routes;
