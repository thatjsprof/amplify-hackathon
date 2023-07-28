import { ICreateTask, ITask, IUpdateTask } from "./tasks";
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
  user: null | IUser;
  initialized: boolean;
  updateUser: (userInfo: IUser) => unknown;
}

export interface ITaskStore {
  tasks: ITask[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  createTask: (task: ICreateTask) => void;
  updateTask: (task: IUpdateTask) => Promise<void>;
  fetchTasks: (userId: string) => Promise<void>;
}

export interface IStore {
  user: IUserStore;
  task: ITaskStore;
}
