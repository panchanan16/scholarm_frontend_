import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import  Dashboard  from './pages/Dashboard.jsx'
import SubmissionInterface from './components/submission-interface';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/about', element: <h1>About Page</h1> },
      { path: '/contact', element: <h1>Contact Page</h1> },
      {path :'/submission',element:<SubmissionInterface/>}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
