import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { TGridView } from "../types/types";

const initialState: TGridView = {
  value: {
    isGrid: true,
  },
};

export const gridViewSlice = createSlice({
  name: "gridView",
  initialState,
  reducers: {
    changeGridView: (state) => {
      state.value.isGrid = !state.value.isGrid;
    },
  },
});

export const { changeGridView } = gridViewSlice.actions;

export const selecteGridView = (state: RootState) => state.gridView.value;

export default gridViewSlice.reducer;
