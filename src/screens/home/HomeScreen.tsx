import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import TakeNote from "../../components/homeScreen/TakeNote";
import Note from "../../components/homeScreen/Note";
import { db } from "../../firebase/firebase";
import useNote from "../../hooks/useNote";
function HomeScreen() {
  const { note, setNote, notes, setNotes, clearNote } = useNote();
  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      orderBy("createdAt", "desc"),
      where("isArchived", "==", false),
      where("isTrashed", "==", false)
    );
    const usub = onSnapshot(q, (querySnaphot) => {
      setNotes(
        querySnaphot.docs.map((doc) => {
          return {
            noteTitle: doc.data().noteTitle,
            noteValue: doc.data().noteValue,
            createdAt: doc.data().createdAt,
            isArchived: doc.data().isArchived,
            isTrashed: doc.data().isTrashed,
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
      <div className="flex items-start gap-4 flex-wrap py-4 px-10">
        {notes.map((note) => {
          return (
            <Note
              noteTitle={note.noteTitle}
              noteValue={note.noteValue}
              noteId={note.noteId}
              isArchived={note.isArchived}
              isTrashed={note.isTrashed}
              key={note.noteId}
            />
          );
        })}
      </div>
    </div>
  );
}
export default HomeScreen;
