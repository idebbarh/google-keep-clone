import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { TUserInfo } from "../types/types";

const initialState: TUserInfo = {
  value: {
    userInfo: undefined,
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    changeUserInfo: (
      state,
      action: PayloadAction<TUserInfo["value"]["userInfo"]>
    ) => {
      state.value.userInfo = action.payload;
    },
  },
});

export const { changeUserInfo } = userInfoSlice.actions;

export const selectUserInfo = (state: RootState) =>
  state.userInfo.value.userInfo;

export default userInfoSlice.reducer;
