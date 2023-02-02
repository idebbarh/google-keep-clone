import React, { ChangeEvent, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, IconButton } from "@mui/material";
import logo from "../../assets/images/header-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import HeaderRightSideOptions from "../header/HeaderRightSideOptions";
import GridViewIcon from "@mui/icons-material/GridView";
import { useAppDispatch, useAppSelector } from "../..//app/hooks";
import { toggleOriginState } from "../../features/menuStateSlice";
import { changeGridView, selecteGridView } from "../../features/gridViewSlice";

function Header(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const currentGridView = useAppSelector(selecteGridView);
  return (
    <header className="fixed left-0 top-0 w-full flex justify-between items-center p-2 gap-9 border-b-border-gray border-solid border-b z-[998] bg-main-background-color">
      <div className="flex justify-start items-center gap-2 text-main-text-color pr-9">
        <div onClick={() => dispatch(toggleOriginState())}>
          <IconButton color="inherit" size="large">
            <MenuIcon />
          </IconButton>
        </div>
        <div className="flex items-center cursor-pointer">
          <img src={logo} alt="google keep logo" className="w-10 h-10" />
          <span className="ml-1 text-2xl font-normal">Keep</span>
        </div>
      </div>
      <div className="flex-1">
        <form className="h-12 text-main-text-color flex items-center p-1 bg-input-gray rounded-lg max-w-[700px]">
          <IconButton color="inherit" size="large">
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            name="searchValue"
            value={searchValue}
            className="block h-full border-none outline-none bg-transparent w-full text-main-text-color placeholder:text-main-text-color"
            placeholder="Search"
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setSearchValue(e.target.value)
            }
          />

          <IconButton color="inherit" size="large">
            <CloseIcon />
          </IconButton>
        </form>
      </div>
      <div className="flex justify-end items-center gap-2 text-icons-color">
        <HeaderRightSideOptions
          Icon={currentGridView.isGrid ? SplitscreenIcon : GridViewIcon}
          type="changeView"
          toggleGridView={() => dispatch(changeGridView())}
        />
        <HeaderRightSideOptions Icon={Avatar} type="account" />
      </div>
    </header>
  );
}
export default Header;
