import React from "react";
import { TPropsBackgroundColorOption } from "../../types/types";
import { colorVariant } from "../../utils/colorVariant";
import CheckIcon from "@mui/icons-material/Check";
function BackgroundColorOption({
  Icon = null,
  color,
  note,
  setNote,
}: TPropsBackgroundColorOption): JSX.Element {
  return (
    <div
      className={`${
        colorVariant[color]
      } relative w-8 h-8 rounded-full border-2 border-solid text-lg text-main-text-color ${
        note.noteBackgroundColor === color
          ? "border-[#a142f4]"
          : color === "default"
          ? "border-[#5f6368]"
          : "border-transparent"
      } flex justify-center items-center cursor-pointer ${
        note.noteBackgroundColor === color ? "" : "hover:border-white"
      }`}
      onClick={() => {
        setNote(() => ({ ...note, noteBackgroundColor: color }));
      }}
    >
      {color === "default" && Icon && <Icon fontSize="inherit" />}
      {note.noteBackgroundColor === color && (
        <div className="h-4 w-4 rounded-full absolute bg-[#a142f4] left-1/2 top-[-6px] text-sm flex items-center justify-center text-main-text-color">
          <CheckIcon fontSize="inherit" />
        </div>
      )}
    </div>
  );
}
export default BackgroundColorOption;
