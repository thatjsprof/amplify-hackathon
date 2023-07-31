import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Button, Flex } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

const AuthPage = () => {
  const signInWithGoogle = () => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  };
  return (
    <Flex
      style={{
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Button onClick={signInWithGoogle}>Sign In with Google</Button>
    </Flex>
  );
};

export default AuthPage;
