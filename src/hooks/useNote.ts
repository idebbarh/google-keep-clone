import { TNote, TUseNote } from "../types/types";
import { useState } from "react";
export default function useNote(): TUseNote {
  const noteInitValue = { noteTitle: "", noteValue: "" };
  const [note, setNote] =
    useState<Pick<TNote, "noteTitle" | "noteValue">>(noteInitValue);
  const [notes, setNotes] = useState<TNote[]>([]);
  const clearNote = (): void => {
    setNote(noteInitValue);
  };
  return { note, setNote, notes, setNotes, clearNote };
}
