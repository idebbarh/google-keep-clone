import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { TParams } from "../types/types";

const initialState: TParams = {
  value: {
    params: {
      color: null,
      text: null,
    },
  },
};

export const ParamsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    changeParams: (
      state,
      action: PayloadAction<{
        paramName: string;
        paramValue: string | null;
      }>
    ) => {
      state.value.params = {
        ...state.value.params,
        [action.payload.paramName]: action.payload.paramValue,
      };
    },
    clearParams: (state) => {
      state.value.params = initialState.value.params;
    },
  },
});

export const { changeParams, clearParams } = ParamsSlice.actions;

export const selectParams = (state: RootState) => state.params.value;

export default ParamsSlice.reducer;
