import React from "react";
import { getCurrentAuthenticatedUser } from "src/services/auth";
import { useStore } from "src/store/store";

const AuthProvider = (props: { children: React.ReactElement }) => {
  const { children } = props;

  const [updateUser] = useStore((state) => [state.user.updateUser]);

  React.useEffect(() => {
    const initialize = async () => {
      const userInfo = await getCurrentAuthenticatedUser();

      updateUser({
        email: userInfo.email,
        id: userInfo.sub,
      });
    };

    initialize();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
