import React, { useEffect, useState } from "react";
import TakeNote from "../../components/screens/TakeNote";
import Note from "../../components/screens/Note";
import useNote from "../../hooks/useNote";
import { useAppSelector } from "../../app/hooks";
import { selecteGridView } from "../../features/gridViewSlice";
import { TPropsScreens } from "../../types/types";
function HomeScreen({ notes }: TPropsScreens) {
  const currentGridView = useAppSelector(selecteGridView);
  const { note, setNote, clearNote } = useNote();
  const [numberOfPinnedNotes, setNumberOfPinnedNotes] = useState<number>(
    notes.filter((note) => note.isPinned).length
  );
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
        className={`py-4 flex flex-col gap-y-20 ${
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
              {/* where("isArchived", "==", false), */}
              {/* where("isTrashed", "==", false) */}
              {notes
                .filter(
                  (note) => note.isPinned && !note.isArchived && !note.isTrashed
                )
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
                .filter(
                  (note) =>
                    !note.isPinned && !note.isArchived && !note.isTrashed
                )
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
