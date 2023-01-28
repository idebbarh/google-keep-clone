import React from "react";
import { TPropsSelectedNotesOptions } from "../../types/types";
import { IconButton } from "@mui/material";
import useNoteOptions from "../../hooks/useNoteOptions";
import { useSelector } from "react-redux";
import {
  selectSelectedNotes,
  unSelectAllNotes,
} from "../../features/selectedNotesSlice";
import { useAppDispatch } from "../../app/hooks";

function SelectedNotesOptions({ Icon, action }: TPropsSelectedNotesOptions) {
  const {
    archiveNote,
    trashNote,
    pinAndUnpinNote,
    unArchiveNote,
    unTrashNote,
    deleteNote,
  } = useNoteOptions();
  const selectedNotes = useSelector(selectSelectedNotes);
  const availableActions: string[] = [
    "archive",
    "trash",
    "pin",
    "unArchive",
    "untrash",
    "deleteforever",
  ];
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    if (availableActions.includes(action)) {
      for (let noteId of selectedNotes.selectedNotes) {
        if (action === "archive") {
          archiveNote(noteId);
        } else if (action === "trash") {
          trashNote(noteId);
        } else if (action === "pin") {
          pinAndUnpinNote(noteId);
        } else if (action === "unArchive") {
          unArchiveNote(noteId);
        } else if (action === "untrash") {
          unTrashNote(noteId);
        } else {
          deleteNote(noteId);
        }
      }
      dispatch(unSelectAllNotes());
    }
  };
  return (
    <div className="text-[#8ab4f8]" onClick={handleClick}>
      <IconButton color="inherit" size="large">
        <Icon />
      </IconButton>
    </div>
  );
}
export default SelectedNotesOptions;
