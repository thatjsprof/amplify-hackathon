import { addTask, editTask, fetchTasks } from "src/services/tasks";
import { IStoreParam, ITaskStore } from "../interfaces/store";
import { updateState } from "src/helpers/store";
import { ICreateTask, IUpdateTask } from "src/interfaces/tasks";

export const tasksStore = ({ set, get }: IStoreParam) => {
  return {
    tasks: [],
    loading: false,
    setLoading: (loading: boolean) => {
      set((state) => {
        return updateState<ITaskStore>(state, "task", {
          loading,
        });
      });
    },
    createTask: async (task: ICreateTask) => {
      await addTask(task);
      get().task.fetchTasks(task.userId as string);
    },
    updateTask: async (task: IUpdateTask) => {
      await editTask(task);
      get().task.fetchTasks(task.userId as string);
    },
    fetchTasks: async (userId: string) => {
      get().task.setLoading(true);
      const response = await fetchTasks(userId);
      get().task.setLoading(false);

      set((state) => {
        return updateState<ITaskStore>(state, "task", {
          tasks: response,
        });
      });
    },
  };
};
