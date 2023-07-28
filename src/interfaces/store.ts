import { IUser } from "./user";

export type ISet = (
  partial:
    | IStore
    | Partial<IStore>
    | ((state: IStore) => IStore | Partial<IStore>),
  replace?: boolean | undefined
) => void;

export interface IAuthStore {
  user: null | IUser;
  updateUser: (userInfo: IUser) => unknown;
}

export interface IStore {
  auth: IAuthStore;
}
