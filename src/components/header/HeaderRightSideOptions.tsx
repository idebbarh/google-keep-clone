import { IconButton } from "@mui/material";
import React from "react";

interface TPropsHeaderRightSideOptions {
  Icon: any;
  type: string;
  toggleGridView?: (() => void) | null;
}

function HeaderRightSideOptions({
  Icon,
  type,
  toggleGridView = null,
}: TPropsHeaderRightSideOptions): JSX.Element {
  const clickHandler = (): void => {
    switch (type) {
      case "changeView":
        toggleGridView && toggleGridView();
        break;
      case "account":
        console.log("account");
        break;
      default:
        console.log("default");
    }
  };
  return (
    <div onClick={clickHandler}>
      {type === "account" ? (
        <Icon alt="ismail" src="" sx={{ width: 30, height: 30 }}>
          I
        </Icon>
      ) : (
        <IconButton color="inherit" size="large">
          <Icon />
        </IconButton>
      )}
    </div>
  );
}
export default HeaderRightSideOptions;
