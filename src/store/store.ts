import { create } from "zustand";
import { userStore } from "./userStore";
import { IStore } from "../interfaces/store";

const useStore = create<IStore>()((set) => {
  return {
    auth: userStore(set),
    // user: userStore(set)
  };
});

export { useStore };
