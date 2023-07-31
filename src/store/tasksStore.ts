import { fetchTasks } from "src/services/tasks";
import { ITodoFilter, IStoreParam, ITaskStore } from "../interfaces/store";
import { updateState } from "src/helpers/store";

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
    fetchTasks: async (userId: string, filter?: ITodoFilter) => {
      get().task.setLoading(true);
      const response = await fetchTasks(userId, filter);
      get().task.setLoading(false);

      set((state) => {
        return updateState<ITaskStore>(state, "task", {
          tasks: response,
        });
      });
    },
  };
};
