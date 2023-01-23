import React, { forwardRef } from "react";
import BackgroundColorOption from "./BackgroundColorOption";
import InvertColorsOffIcon from "@mui/icons-material/InvertColorsOff";
import { TUseNote } from "../../types/types";
const BACKGROUND_COLORS = [
  "#5c2b29",
  "#614a19",
  "#635d19",
  "#345920",
  "#16504b",
  "#2d555e",
  "#1e3a5f",
  "#42275e",
  "#5b2245",
  "#442f19",
  "#3c3f43",
];
const BackgroundColorsContainer = forwardRef<
  HTMLDivElement,
  Pick<TUseNote, "note" | "setNote">
>(({ note, setNote }, ref) => {
  return (
    <div
      className="absolute shadow-bccs p-2 rounded-md bg-main-background-color top-[calc(100%-16px)] left-12 flex items-center justify-center gap-2"
      ref={ref}
    >
      <BackgroundColorOption
        color="default"
        Icon={InvertColorsOffIcon}
        note={note}
        setNote={setNote}
      />
      {BACKGROUND_COLORS.map((color) => {
        return (
          <BackgroundColorOption
            color={color}
            key={color}
            note={note}
            setNote={setNote}
          />
        );
      })}
    </div>
  );
});

export default BackgroundColorsContainer;
