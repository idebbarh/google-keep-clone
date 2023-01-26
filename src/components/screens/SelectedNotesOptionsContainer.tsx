import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedNotes } from "../../features/selectedNotesSlice";
import CloseIcon from "@mui/icons-material/Close";

function SelectedNotesOptionsContainer() {
  const selectedNotes = useSelector(selectSelectedNotes);

  return (
    <div
      className={`fixed left-0 top-0 w-full min-h-[65px] z-50 flex justify-between items-center p-2 gap-9 border-b-border-gray border-solid border-b bg-main-background-color ${
        selectedNotes.selectedNotes.length > 0
          ? "translate-y-0 opacity-100"
          : "translate-y-[-100%] opacity-0"
      } transition-all duration-500 ease-in-out`}
    >
      <div className="flex items-center gap-2">
        <div>
          <CloseIcon />
        </div>
        <span className="">
          {selectedNotes.selectedNotes.length > 0
            ? selectedNotes.selectedNotes.length
            : 1}
        </span>
      </div>
    </div>
  );
}
export default SelectedNotesOptionsContainer;
