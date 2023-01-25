import React, { forwardRef, useState } from "react";
import { TPropsNoteOptions } from "../../types/types";

const NoteOptions = forwardRef<HTMLDivElement, TPropsNoteOptions>(
  (
    {
      Icon,
      action = null,
      archive = null,
      unArchive = null,
      trash = null,
      unTrash = null,
      deleteForEver = null,
      setIsBackgroundColorContainerOpen = null,
      pinAndUnPin = null,
    },
    ref
  ) => {
    const clickHandler = (): void => {
      if (action === "archive" && archive) {
        archive();
        return;
      }
      if (action === "unArchive" && unArchive) {
        unArchive();
        return;
      }
      if (action === "trash" && trash) {
        trash();
        return;
      }

      if (action === "untrash" && unTrash) {
        unTrash();
        return;
      }
      if (action === "deleteforever" && deleteForEver) {
        deleteForEver();
        return;
      }
      if (action === "backgroundcolor" && setIsBackgroundColorContainerOpen) {
        setIsBackgroundColorContainerOpen();
        return;
      }
      if (action === "pin" && pinAndUnPin) {
        pinAndUnPin();
        return;
      }
    };
    return (
      <div
        className="cursor-pointer flex justify-center items-center w-9 h-9 rounded-full text-lg text-text-gray hover:bg-hover-gray"
        onClick={clickHandler}
        ref={ref}
      >
        {<Icon fontSize="inherit" />}
      </div>
    );
  }
);
export default NoteOptions;
