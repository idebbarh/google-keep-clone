import React from "react";
import { useAppSelector } from "../../app/hooks";
import Note from "../../components/screens/Note";
import { selecteGridView } from "../../features/gridViewSlice";
import { TPropsScreens } from "../../types/types";

function ArchiveScreen({ notes }: TPropsScreens) {
  const currentGridView = useAppSelector(selecteGridView);
  return (
    <div
      className={`py-4 flex items-start gap-4 flex-wrap ${
        !currentGridView.isGrid ? "max-w-[680px] mx-auto flex-col" : ""
      }`}
    >
      {notes
        .filter((note) => {
          return note.isArchived === true && note.isTrashed === false;
        })
        .map((note) => {
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
export default ArchiveScreen;
