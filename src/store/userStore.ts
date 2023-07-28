import { ISet } from "../interfaces/store";
import { IUser } from "../interfaces/user";

export const userStore = (set: ISet) => {
  return {
    user: null,
    updateUser: (userInfo: IUser) => {
      console.log("userInfo", userInfo);

      set((state) => {
        console.log("state", state);

        return {};
      });
    },
  };
};
