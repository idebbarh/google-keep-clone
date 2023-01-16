import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import TakeNote from "../../components/homeScreen/TakeNote";
interface TNote {
  noteTitle: string;
  noteValue: string;
}
export interface TUseNote {
  note: TNote;
  setNote: Dispatch<SetStateAction<TNote>>;
  notes: TNote[];
  setNotes: Dispatch<SetStateAction<TNote[]>>;
  clearNote: () => void;
}
function useNote(): TUseNote {
  const noteInitValue = { noteTitle: "", noteValue: "" };
  const [note, setNote] = useState<TNote>(noteInitValue);
  const [notes, setNotes] = useState<TNote[]>([]);
  const clearNote = (): void => {
    setNote(noteInitValue);
  };
  return { note, setNote, notes, setNotes, clearNote };
}
function HomeScreen() {
  const { note, setNote, notes, setNotes, clearNote } = useNote();
  console.log(notes);
  return (
    <div>
      <TakeNote
        note={note}
        setNote={setNote}
        setNotes={setNotes}
        clearNote={clearNote}
        notes={notes}
      />
      <div>
        {notes.map((note, index) => {
          return (
            <p key={index}>
              {note.noteValue}
              {note.noteTitle}
            </p>
          );
        })}
      </div>
    </div>
  );
}
export default HomeScreen;
