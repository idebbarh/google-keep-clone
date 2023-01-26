import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import menuStateReducer from "../features/menuStateSlice";
import selectedNotesReducer from "../features/selectedNotesSlice";

export const store = configureStore({
  reducer: {
    menuState: menuStateReducer,
    selectedNotes: selectedNotesReducer,
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
