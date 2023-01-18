import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { useState } from "react";
interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  action?: string | null;
  actionHandler?: (() => boolean) | null;
}
function TakeNoteOptions({ Icon, action = null, actionHandler = null }: Props) {
  const [isUndoActive, setIsUndoActive] = useState<boolean>(false);
  const [isRedoctive, setIsRedoActive] = useState<boolean>(false);
  const clickHandler = (): void => {
    if (actionHandler) {
      if (action === "undo") {
        setIsUndoActive(actionHandler());
        return;
      }
      if (action === "redo") {
        setIsRedoActive(actionHandler());
        return;
      }
    }
  };
  return (
    <div
      className="cursor-pointer w-9 h-9 rounded-full text-lg flex items-center justify-center text-text-gray hover:bg-hover-gray"
      onClick={clickHandler}
    >
      <Icon fontSize="inherit" />
    </div>
  );
}
export default TakeNoteOptions;
