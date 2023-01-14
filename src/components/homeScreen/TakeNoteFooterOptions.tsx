import { SvgIconComponent } from "@mui/icons-material";
import { SvgIconProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
function TakeNoteFooterOptions({ Icon }: Props) {
  return (
    <div>
      <Icon />
    </div>
  );
}
export default TakeNoteFooterOptions;
