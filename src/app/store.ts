import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import menuStateReducer from "../features/menuStateSlice";
import selectedNotesReducer from "../features/selectedNotesSlice";
import gridViewReducer from "../features/gridViewSlice";
import paramsReducer from "../features/paramsSlice";
import userInfoReducer from "../features/userInfoSlice";

export const store = configureStore({
  reducer: {
    menuState: menuStateReducer,
    selectedNotes: selectedNotesReducer,
    gridView: gridViewReducer,
    params: paramsReducer,
    userInfo: userInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
