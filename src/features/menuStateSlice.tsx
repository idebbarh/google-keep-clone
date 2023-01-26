import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { TMenuStateState } from "../types/types";

const initialState: TMenuStateState = {
  value: {
    originState: true,
    tempState: false,
  },
};

export const menuStateSlice = createSlice({
  name: "menuState",
  initialState,
  reducers: {
    toggleOriginState: (state) => {
      state.value.originState = !state.value.originState;
    },
    toggleTempState: (state) => {
      state.value.tempState = !state.value.tempState;
    },
  },
});

export const { toggleOriginState, toggleTempState } = menuStateSlice.actions;

export const selectMenuState = (state: RootState) => state.menuState.value;

export default menuStateSlice.reducer;
