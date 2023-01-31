import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import TakeNote from "../../components/screens/TakeNote";
import Note from "../../components/screens/Note";
import { db } from "../../firebase/firebase";
import useNote from "../../hooks/useNote";
import { useAppSelector } from "../../app/hooks";
import { selecteGridView } from "../../features/gridViewSlice";
function HomeScreen() {
  const currentGridView = useAppSelector(selecteGridView);
  const { note, setNote, notes, setNotes, clearNote } = useNote();
  const [numberOfPinnedNotes, setNumberOfPinnedNotes] = useState<number>(
    notes.filter((note) => note.isPinned).length
  );
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
            noteBackgroundColor: doc.data().noteBackgroundColor,
            isPinned: doc.data().isPinned,
          };
        })
      );
    });
    return usub;
  }, []);
  useEffect(() => {
    setNumberOfPinnedNotes(notes.filter((note) => note.isPinned).length);
  }, [notes]);
  return (
    <div>
      <TakeNote
        note={note}
        setNote={setNote}
        clearNote={clearNote}
        notes={notes}
      />
      <div
        className={`py-4 px-10 flex flex-col gap-y-20 ${
          !currentGridView.isGrid ? "max-w-[680px] mx-auto" : ""
        }`}
      >
        {numberOfPinnedNotes > 0 && (
          <div>
            {numberOfPinnedNotes > 0 && (
              <h3 className="text-[#9aa0a6] pl-4 pb-2 uppercase font-normal text-xs">
                pinned
              </h3>
            )}
            <div
              className={`flex ${
                !currentGridView.isGrid ? "flex-col" : ""
              } items-start gap-4 flex-wrap`}
            >
              {notes
                .filter((note) => note.isPinned)
                .map((note) => {
                  return (
                    <Note
                      noteTitle={note.noteTitle}
                      noteValue={note.noteValue}
                      noteId={note.noteId}
                      isArchived={note.isArchived}
                      isTrashed={note.isTrashed}
                      noteBackgroundColor={note.noteBackgroundColor}
                      isPinned={note.isPinned}
                      key={note.noteId}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {numberOfPinnedNotes !== notes.length && (
          <div>
            {numberOfPinnedNotes > 0 && (
              <h3 className="text-[#9aa0a6] pl-4 pb-2 uppercase font-normal text-xs">
                other
              </h3>
            )}
            <div
              className={`flex ${
                !currentGridView.isGrid ? "flex-col" : ""
              } items-start gap-4 flex-wrap`}
            >
              {notes
                .filter((note) => !note.isPinned)
                .map((note) => {
                  return (
                    <Note
                      noteTitle={note.noteTitle}
                      noteValue={note.noteValue}
                      noteId={note.noteId}
                      isArchived={note.isArchived}
                      isTrashed={note.isTrashed}
                      noteBackgroundColor={note.noteBackgroundColor}
                      isPinned={note.isPinned}
                      key={note.noteId}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
