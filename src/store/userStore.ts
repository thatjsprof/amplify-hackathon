import { updateState } from "src/helpers/store";
import { IStoreParam, IUserStore } from "../interfaces/store";
import { IUser } from "../interfaces/user";

export const userStore = ({ set }: IStoreParam) => {
  return {
    user: null,
    loading: false,
    initialized: false,
    setLoading: (loading: boolean) => {
      set((state) => {
        return updateState<IUserStore>(state, "user", {
          loading,
        });
      });
    },
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
