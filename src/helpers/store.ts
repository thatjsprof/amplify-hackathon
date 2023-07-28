import { IStore } from "src/interfaces/store";

export const updateState = <I>(
  state: IStore,
  param: keyof IStore,
  newState: Partial<I> | I
) => {
  return {
    ...state,
    [param]: {
      ...state[param],
      ...newState,
    },
  };
};
