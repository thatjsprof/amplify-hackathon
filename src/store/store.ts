import { create } from "zustand";
import { userStore } from "./userStore";
import { IStore } from "../interfaces/store";
import { tasksStore } from "./tasksStore";

const useStore = create<IStore>()((set) => {
  return {
    user: userStore(set),
    task: tasksStore(set),
  };
});

export { useStore };
