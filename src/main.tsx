import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/index.tsx";
import ErrorPage from "./components/error.tsx";

// check if env is localhost or not
// if you're not developing on localhost, you will need to detect this is another way—the docs linked above give some examples.
const isLocalhost = !!(window.location.hostname === "localhost");

// split redirect signin and signout strings into correct URIs
const [productionRedirectSignIn, localRedirectSignIn] =
  awsExports.oauth.redirectSignIn.split(",");
const [productionRedirectSignOut, localRedirectSignOut] =
  awsExports.oauth.redirectSignOut.split(",");

// use correct URI in the right env
const updatedAwsConfig = {
  ...awsExports,
  oauth: {
    ...awsExports.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};

Amplify.configure(updatedAwsConfig);

const generalRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: routes,
  },
];

const router = createBrowserRouter(generalRoutes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
