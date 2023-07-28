import { updateState } from "src/helpers/store";
import { IStoreParam, IUserStore } from "../interfaces/store";
import { IUser } from "../interfaces/user";

export const userStore = ({ get, set }: IStoreParam) => {
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
