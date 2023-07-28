import { addTask, fetchTasks } from "src/services/tasks";
import { IStoreParam, ITaskStore } from "../interfaces/store";
import { updateState } from "src/helpers/store";
import { ICreateTask } from "src/interfaces/tasks";

export const tasksStore = ({ set, get }: IStoreParam) => {
  return {
    tasks: [],
    createTask: async (task: ICreateTask, userId: string) => {
      await addTask(task);
      get().task.fetchTasks(userId);
    },
    fetchTasks: async (userId: string) => {
      const response = await fetchTasks(userId);

      set((state) => {
        return updateState<ITaskStore>(state, "task", {
          tasks: response,
        });
      });
    },
  };
};
