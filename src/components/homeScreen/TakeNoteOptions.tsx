import React, { useState } from "react";
import { TPropsTakeNoteOptions } from "../../types/types";
function TakeNoteOptions({
  Icon,
  action = null,
  undo = null,
  redo = null,
  undoAndRedoStoreSize = null,
  undoAndRedoStoreIndex = null,
}: TPropsTakeNoteOptions) {
  const clickHandler = (): void => {
    if (action === "undo" && undo) {
      undo();

      return;
    }
    if (action === "redo" && redo) {
      redo();
      return;
    }
  };
  return (
    <div
      className={`cursor-pointer w-9 h-9 rounded-full text-lg flex items-center justify-center text-text-gray hover:bg-hover-gray ${
        undo
          ? undoAndRedoStoreIndex === 0
            ? "opacity-50 pointer-events-none"
            : ""
          : ""
      } ${
        redo
          ? undoAndRedoStoreIndex === undoAndRedoStoreSize
            ? "opacity-50 pointer-events-none"
            : ""
          : ""
      }`}
      onClick={clickHandler}
    >
      <Icon fontSize="inherit" />
    </div>
  );
}
export default TakeNoteOptions;
