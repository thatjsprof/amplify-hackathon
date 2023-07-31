import { create } from "zustand";
import { userStore } from "./userStore";
import { IStore } from "../interfaces/store";
import { tasksStore } from "./tasksStore";

const useStore = create<IStore>()((set, get) => {
  const toPass = {
    get,
    set,
  };

  const state = {
    user: userStore(toPass),
    task: tasksStore(toPass),
  };

  return state;
});

export { useStore };
