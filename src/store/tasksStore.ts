import { fetchTasks } from "src/services/tasks";
import { ISet, ITaskStore } from "../interfaces/store";
import { updateState } from "src/helpers/store";

export const tasksStore = (set: ISet) => {
  return {
    tasks: [],
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
