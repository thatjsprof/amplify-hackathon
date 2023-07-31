import { ITask } from "./tasks";
import { IUser } from "./user";

export type ISet = (
  partial:
    | IStore
    | Partial<IStore>
    | ((state: IStore) => IStore | Partial<IStore>),
  replace?: boolean | undefined
) => void;

export type IGet = () => IStore;

export type IStoreParam = {
  set: ISet;
  get: IGet;
};

export interface IUserStore {
  loading: boolean;
  user: null | IUser;
  initialized: boolean;
  setLoading: (loading: boolean) => void;
  updateUser: (userInfo: IUser) => unknown;
}

export interface ITaskStore {
  tasks: ITask[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchTasks: (userId: string, filter?: ITodoFilter) => Promise<void>;
}

export interface IStore {
  user: IUserStore;
  task: ITaskStore;
}

export interface ITodoFilter {
  completed: boolean;
}
