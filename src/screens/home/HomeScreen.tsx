import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import TakeNote from "../../components/homeScreen/TakeNote";
import Note from "../../components/homeScreen/Note";
import { db } from "../../firebase/firebase";
export interface TNote {
  noteTitle: string;
  noteValue: string;
  createdAt: Timestamp;
  noteId: string;
}
export interface TUseNote {
  note: Pick<TNote, Exclude<keyof TNote, "createdAt" | "noteId">>;
  setNote: Dispatch<
    SetStateAction<Pick<TNote, Exclude<keyof TNote, "createdAt" | "noteId">>>
  >;
  notes: TNote[];
  setNotes: Dispatch<SetStateAction<TNote[]>>;
  clearNote: () => void;
}
function useNote(): TUseNote {
  const noteInitValue = { noteTitle: "", noteValue: "" };
  const [note, setNote] =
    useState<Pick<TNote, Exclude<keyof TNote, "createdAt" | "noteId">>>(
      noteInitValue
    );
  const [notes, setNotes] = useState<TNote[]>([]);
  const clearNote = (): void => {
    setNote(noteInitValue);
  };
  return { note, setNote, notes, setNotes, clearNote };
}
const NUM_OF_COLS = 6;
function HomeScreen() {
  const { note, setNote, notes, setNotes, clearNote } = useNote();
  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const usub = onSnapshot(q, (querySnaphot) => {
      setNotes(
        querySnaphot.docs.map((doc) => {
          return {
            noteTitle: doc.data().noteTitle,
            noteValue: doc.data().noteValue,
            createdAt: doc.data().createdAt,
            noteId: doc.id,
          };
        })
      );
    });
    return usub;
  }, []);

  return (
    <div>
      <TakeNote
        note={note}
        setNote={setNote}
        clearNote={clearNote}
        notes={notes}
      />
      <div className="flex items-start gap-4 flex-wrap">
        {notes.map((note) => {
          return (
            <Note
              noteTitle={note.noteTitle}
              noteValue={note.noteValue}
              key={note.noteId}
            />
          );
        })}
      </div>
    </div>
  );
}
export default HomeScreen;
