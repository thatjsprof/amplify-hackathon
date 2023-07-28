import { Outlet } from "react-router-dom";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Header from "./components/layout/header";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import { studioTheme } from "src/ui-components";
import AuthProvider from "./providers/authProvider";
import { useStore } from "./store/store";
import Loader from "./components/presentational/loader";

function App() {
  const [initialized] = useStore((state) => [state.user.initialized]);

  return (
    <div id="App">
      <AmplifyProvider theme={studioTheme}>
        <AuthProvider>
          {initialized ? (
            <>
              <Header />
              <Outlet />
            </>
          ) : (
            <Loader />
          )}
        </AuthProvider>
      </AmplifyProvider>
    </div>
  );
}

export default withAuthenticator(App);
