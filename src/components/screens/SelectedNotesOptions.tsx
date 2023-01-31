import React, { forwardRef } from "react";
import { TPropsSelectedNotesOptions } from "../../types/types";
import { IconButton } from "@mui/material";
import useNoteOptions from "../../hooks/useNoteOptions";
import { useSelector } from "react-redux";
import {
  selectSelectedNotes,
  unSelectAllNotes,
} from "../../features/selectedNotesSlice";
import { useAppDispatch } from "../../app/hooks";

const SelectedNotesOptions = forwardRef<
  HTMLDivElement,
  TPropsSelectedNotesOptions
>(({ Icon, action, setIsBackgroundColorContainerOpen = null }, ref) => {
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
        } else if (action === "deleteforever") {
          deleteNote(noteId);
        }
      }
      if (action !== "backgroundcolor") {
        dispatch(unSelectAllNotes());
      }
    }
  };
  return (
    <div
      className="text-[#8ab4f8]"
      onClick={
        action === "backgroundcolor" && setIsBackgroundColorContainerOpen
          ? () => setIsBackgroundColorContainerOpen()
          : handleClick
      }
      ref={ref}
    >
      <IconButton color="inherit" size="large">
        <Icon />
      </IconButton>
    </div>
  );
});
export default SelectedNotesOptions;
