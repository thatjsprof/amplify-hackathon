import React, { useEffect } from "react";
import { IUser } from "src/interfaces/user";
import { getCurrentAuthenticatedUser } from "src/services/auth";
import { useStore } from "src/store/store";

const AuthProvider = (props: { children: React.ReactElement }) => {
  const { children } = props;

  const store = useStore((state) => state);
  const [setLoading, updateUser] = useStore((state) => [
    state.user.setLoading,
    state.user.updateUser,
  ]);

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      const userInfo = await getCurrentAuthenticatedUser();
      setLoading(false);

      updateUser(userInfo as IUser);
    };

    initialize();
  }, []);

  console.log("store", store);

  return <>{children}</>;
};

export default AuthProvider;
