import React, { ChangeEvent, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, IconButton } from "@mui/material";
import logo from "../assets/images/header-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import HeaderRightSideOptions from "./HeaderRightSideOptions";
import { useAppDispatch } from "../app/hooks";
import { toggleOriginState } from "../features/menuStateSlice";

function Header(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  return (
    <header className="flex justify-between items-center p-2 gap-9 border-b-border-gray border-solid border-b">
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
        <form className="h-12 text-main-text-color flex items-center p-1 bg-input-gray w-fit rounded-lg">
          <IconButton color="inherit" size="large">
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            name="searchValue"
            value={searchValue}
            className="block h-full border-none outline-none bg-transparent w-[700px] text-main-text-color placeholder:text-main-text-color"
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
        <HeaderRightSideOptions Icon={RefreshIcon} type="refresh" />
        <HeaderRightSideOptions Icon={ViewStreamIcon} type="changeView" />
        <HeaderRightSideOptions Icon={SettingsIcon} type="setting" />
        <HeaderRightSideOptions Icon={AppsIcon} type="apps" />
        <HeaderRightSideOptions Icon={Avatar} type="account" />
      </div>
    </header>
  );
}
export default Header;
