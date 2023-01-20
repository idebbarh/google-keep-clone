import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ImageIcon from "@mui/icons-material/Image";
import ArchiveIcon from "@mui/icons-material/Archive";
import NoteOptions from "./NoteOptions";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TNote } from "../../types/types";
import useNoteOptions from "../../hooks/useNoteOptions";
function Note({
  noteTitle,
  noteValue,
  isArchived,
  isTrashed,
  noteId,
}: Pick<
  TNote,
  "noteTitle" | "noteValue" | "noteId" | "isArchived" | "isTrashed"
>) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { archiveNote, unArchiveNote, trashNote, unTrashNote } =
    useNoteOptions();
  return (
    <div
      className="flex flex-col justify-between relative w-60 min-h-[100px] border-solid border border-border-gray rounded-lg text-main-text-color"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`absolute -left-2.5 -top-2.5 cursor-pointer ${
          isHover ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 ease-in-out`}
      >
        <CheckCircleIcon />
      </div>
      <div className="p-4 text-lg flex flex-col gap-0.5">
        {noteTitle.length > 0 && (
          <div>
            <p className="break-all">{noteTitle}</p>
          </div>
        )}
        {noteValue.length > 0 && (
          <div>
            <p className="break-all">{noteValue}</p>
          </div>
        )}
      </div>
      <div
        className={`flex items-center px-2 pb-1 ${
          isHover ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 ease-in-out`}
      >
        {!isTrashed && <NoteOptions Icon={AddAlertIcon} />}
        {!isTrashed && <NoteOptions Icon={PersonAddAlt1Icon} />}
        {!isTrashed && <NoteOptions Icon={ColorLensIcon} />}
        {!isTrashed && <NoteOptions Icon={ImageIcon} />}
        {isArchived && !isTrashed && (
          <NoteOptions
            Icon={UnarchiveIcon}
            action="unArchive"
            unArchive={() => unArchiveNote(noteId)}
          />
        )}
        {!isArchived && !isTrashed && (
          <NoteOptions
            Icon={ArchiveIcon}
            action="archive"
            archive={() => archiveNote(noteId)}
          />
        )}
        {isTrashed && <NoteOptions Icon={DeleteForeverIcon} action="delete" />}
        {isTrashed && (
          <NoteOptions
            Icon={RestoreFromTrashIcon}
            action="untrash"
            unTrash={() => {
              unTrashNote(noteId);
            }}
          />
        )}
        {!isTrashed && (
          <NoteOptions
            Icon={DeleteIcon}
            action="trash"
            trash={() => {
              trashNote(noteId);
            }}
          />
        )}
      </div>
    </div>
  );
}
export default Note;
