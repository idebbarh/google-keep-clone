import { TNote, TUseNote } from "../types/types";
import { useState } from "react";
const noteInitValue: Pick<
  TNote,
  "noteTitle" | "noteValue" | "noteBackgroundColor"
> = {
  noteTitle: "",
  noteValue: "",
  noteBackgroundColor: "default",
};
export default function useNote(): TUseNote {
  const [note, setNote] =
    useState<Pick<TNote, "noteTitle" | "noteValue" | "noteBackgroundColor">>(
      noteInitValue
    );
  const [notes, setNotes] = useState<TNote[]>([]);
  const clearNote = (): void => {
    setNote(noteInitValue);
  };
  return { note, setNote, notes, setNotes, clearNote };
}
