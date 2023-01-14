import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  Icon: any;
  type: string;
};

function HeaderRightSideOptions({ Icon, type }: Props): JSX.Element {
  const clickHandler = (): void => {
    console.log(type);
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
