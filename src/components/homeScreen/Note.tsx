import React, { useState } from "react";
import { TNote } from "../../screens/home/HomeScreen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ImageIcon from "@mui/icons-material/Image";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NoteOptions from "./NoteOptions";
function Note({ noteTitle, noteValue }: Omit<TNote, "noteId" | "createdAt">) {
  const [isHover, setIsHover] = useState<boolean>(false);
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
        <NoteOptions Icon={AddAlertIcon} />
        <NoteOptions Icon={PersonAddAlt1Icon} />
        <NoteOptions Icon={ColorLensIcon} />
        <NoteOptions Icon={ImageIcon} />
        <NoteOptions Icon={ArchiveIcon} />
        <NoteOptions Icon={MoreVertIcon} />
      </div>
    </div>
  );
}
export default Note;
