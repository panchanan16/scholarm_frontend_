import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import SubmissionPage from "@/pages/submission";
import IntroForm from "@/pages/submission/modules/forms/IntroForm";
import Mainform from "@/pages/submission/modules/forms/mainfrom";
import { createBrowserRouter } from "react-router-dom";

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
        children: [{ index: true, element: <Mainform /> }, { path: "intro-section", element: <IntroForm /> }],
      },
    ],
  },
];

export default routes;
