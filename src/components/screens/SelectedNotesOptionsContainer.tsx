import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedNotes } from "../../features/selectedNotesSlice";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import SelectedNotesOptions from "./SelectedNotesOptions";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useLocation } from "react-router-dom";

function SelectedNotesOptionsContainer() {
  const selectedNotes = useSelector(selectSelectedNotes);
  const { pathname } = useLocation();
  return (
    <div
      className={`fixed left-0 top-0 w-full min-h-[65px] z-50 flex justify-between items-center p-2 gap-9 border-b-border-gray border-solid border-b bg-main-background-color ${
        selectedNotes.selectedNotes.length > 0
          ? "translate-y-0 opacity-100"
          : "translate-y-[-100%] opacity-0"
      } transition-all duration-500 ease-in-out`}
    >
      <div className="flex items-center gap-2">
        <div className="text-icons-color">
          <IconButton color="inherit" size="large">
            <CloseIcon />
          </IconButton>
        </div>
        <span className="pl-3 text-main-text-color font-medium text-xl">
          {selectedNotes.selectedNotes.length > 0
            ? selectedNotes.selectedNotes.length
            : 1}{" "}
          selected
        </span>
      </div>
      <div className="flex items-start gap-2">
        {["/home", "/archive"].includes(pathname) && (
          <SelectedNotesOptions Icon={ColorLensIcon} action="backgroundcolor" />
        )}

        {["/home"].includes(pathname) && (
          <SelectedNotesOptions Icon={ArchiveIcon} action="archive" />
        )}

        {["/archive"].includes(pathname) && (
          <SelectedNotesOptions Icon={UnarchiveIcon} action="unArchive" />
        )}

        {["/home", "/archive"].includes(pathname) && (
          <SelectedNotesOptions Icon={DeleteIcon} action="trash" />
        )}

        {["/home", "/archive"].includes(pathname) && (
          <SelectedNotesOptions Icon={PushPinOutlinedIcon} action="pin" />
        )}

        {["/trash"].includes(pathname) && (
          <SelectedNotesOptions
            Icon={DeleteForeverIcon}
            action="deleteforever"
          />
        )}

        {["/trash"].includes(pathname) && (
          <SelectedNotesOptions Icon={RestoreFromTrashIcon} action="untrash" />
        )}
      </div>
    </div>
  );
}
export default SelectedNotesOptionsContainer;
