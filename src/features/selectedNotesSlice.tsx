import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { TSelectedNotes } from "../types/types";

const initialState: TSelectedNotes = {
  value: {
    selectedNotes: [],
  },
};

export const selectedNotesSlice = createSlice({
  name: "selectedNotes",
  initialState,
  reducers: {
    selectNote: (state, action: PayloadAction<{ noteId: string }>) => {
      state.value.selectedNotes = [
        ...state.value.selectedNotes,
        action.payload.noteId,
      ];
    },
    unSelectNote: (state, action: PayloadAction<{ noteId: string }>) => {
      state.value.selectedNotes = state.value.selectedNotes.filter(
        (id) => id !== action.payload.noteId
      );
    },
    unSelectAllNotes: (state) => {
      state.value.selectedNotes = initialState.value.selectedNotes;
    },
  },
});

export const { selectNote, unSelectNote, unSelectAllNotes } =
  selectedNotesSlice.actions;

export const selectSelectedNotes = (state: RootState) =>
  state.selectedNotes.value;

export default selectedNotesSlice.reducer;
