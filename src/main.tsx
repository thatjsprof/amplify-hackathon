import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from './routes/index.tsx';
import ErrorPage from './components/error.tsx';



Amplify.configure(awsExports);

const generalRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: routes
  },
];

const router = createBrowserRouter(generalRoutes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
