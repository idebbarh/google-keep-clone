import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

function NoteOptions({ Icon }: Props) {
  return (
    <div className="cursor-pointer flex justify-center items-center w-9 h-9 rounded-full text-lg text-text-gray hover:bg-hover-gray">
      {<Icon fontSize="inherit" />}
    </div>
  );
}
export default NoteOptions;
