import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import Note from "../../components/screens/Note";
import { db } from "../../firebase/firebase";
import useNote from "../../hooks/useNote";

function TrashScreen() {
  const { notes, setNotes } = useNote();
  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      orderBy("createdAt", "desc"),
      where("isTrashed", "==", true)
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
            noteBackgroundColor: doc.data().noteBackgroundColor,
            isPinned: doc.data().isPinned,
          };
        })
      );
    });
    return usub;
  }, []);
  return (
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
            noteBackgroundColor={note.noteBackgroundColor}
            isPinned={note.isPinned}
          />
        );
      })}
    </div>
  );
}
export default TrashScreen;
