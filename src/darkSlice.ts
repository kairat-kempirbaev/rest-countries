import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface DarkState {
  value: boolean;
}

// Define the initial state using that type
const initialState: DarkState = {
  value: false,
};

export const darkSlice = createSlice({
  name: "dark",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggle: (state) => {
      return { value: !state.value };
    },
  },
});

export const { toggle } = darkSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDark = (state: RootState) => state.dark.value;

export default darkSlice.reducer;
