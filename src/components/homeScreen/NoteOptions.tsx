import React from "react";
import { TPropsNoteOptions } from "../../types/types";

function NoteOptions({
  Icon,
  action = null,
  archive = null,
  unArchive = null,
}: TPropsNoteOptions) {
  const clickHandler = (): void => {
    if (action === "archive" && archive) {
      archive();
      return;
    }
    if (action === "unArchive" && unArchive) {
      unArchive();
      return;
    }
  };
  return (
    <div
      className="cursor-pointer flex justify-center items-center w-9 h-9 rounded-full text-lg text-text-gray hover:bg-hover-gray"
      onClick={clickHandler}
    >
      {<Icon fontSize="inherit" />}
    </div>
  );
}
export default NoteOptions;
