import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
function TakeNoteFooterOptions({ Icon }: Props) {
  return (
    <div className="cursor-pointer w-9 h-9 rounded-full text-lg flex items-center justify-center text-text-gray hover:bg-hover-gray">
      <Icon fontSize="inherit" />
    </div>
  );
}
export default TakeNoteFooterOptions;
