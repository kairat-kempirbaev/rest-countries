import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import Details from "./MapTypes"
// Define a type for the slice state
export interface DarkState {
  value: Array<Details>;
}

// Define the initial state using that type
const initialState: DarkState = {
  value: [],
};

export const itemsSlice = createSlice({
  name: "items",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setItems: (state,action) => {
      return { value: action.payload};
    },
  },
});

export const { setItems } = itemsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.items.value;

export default itemsSlice.reducer;
