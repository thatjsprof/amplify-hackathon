import { Outlet } from "react-router-dom";
import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Header from "./components/layout/header";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import { studioTheme } from "src/ui-components";
import AuthProvider from "./providers/authProvider";
import { useStore } from "./store/store";
import Loader from "./components/presentational/loader";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [initialized] = useStore((state) => [state.user.initialized]);

  return (
    <div id="App">
      <AmplifyProvider theme={studioTheme}>
        <Authenticator>
          <AuthProvider>
            <GoogleOAuthProvider clientId="1036868886555-fm31pimk00fb4k0doud0f8q15dofq03j.apps.googleusercontent.com">
              {initialized ? (
                <>
                  <Header />
                  <main
                    style={{
                      maxWidth: "100rem",
                      marginTop: "3rem",
                    }}
                  >
                    <Outlet />
                  </main>
                </>
              ) : (
                <Loader />
              )}
            </GoogleOAuthProvider>
          </AuthProvider>
        </Authenticator>
      </AmplifyProvider>
    </div>
  );
}

export default App;
