import { updateState } from "src/helpers/store";
import { ISet, IUserStore } from "../interfaces/store";
import { IUser } from "../interfaces/user";

export const userStore = (set: ISet) => {
  return {
    user: null,
    initialized: false,
    updateUser: (userInfo: IUser) => {
      set((state) => {
        return updateState<IUserStore>(state, "user", {
          user: userInfo,
          initialized: true,
        });
      });
    },
  };
};
