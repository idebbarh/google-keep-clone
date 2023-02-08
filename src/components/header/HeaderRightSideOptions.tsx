import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../../features/userInfoSlice";
import { auth } from "../../firebase/firebase";
import { TPropsHeaderRightSideOptions } from "../../types/types";

function HeaderRightSideOptions({
  Icon,
  type,
  toggleGridView = null,
}: TPropsHeaderRightSideOptions): JSX.Element {
  const userInfo = useAppSelector(selectUserInfo);
  const clickHandler = (): void => {
    switch (type) {
      case "changeView":
        toggleGridView && toggleGridView();
        break;
      case "account":
        signOutHandler();
        break;
      default:
        console.log("default");
    }
  };
  const signOutHandler = (): void => {
    try {
      signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div onClick={clickHandler}>
      {type === "account" ? (
        <Icon
          alt="ismail"
          src={userInfo?.photoURL ? userInfo.photoURL : ""}
          sx={{ width: 30, height: 30 }}
        >
          {userInfo?.displayName ? userInfo.displayName[0] : "?"}
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
