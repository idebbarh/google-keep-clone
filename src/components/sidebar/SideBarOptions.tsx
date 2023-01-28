import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectMenuState } from "../../features/menuStateSlice";
import { unSelectAllNotes } from "../../features/selectedNotesSlice";
import { TPropsSideBarOptions } from "../../types/types";

function SideBarOptions({
  Icon,
  title,
  page,
  isLink,
}: TPropsSideBarOptions): JSX.Element {
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  const menuState = useAppSelector(selectMenuState);
  const dispatch = useAppDispatch();
  const clickHandler = (): void => {
    if (path === "/" + page) return;
    dispatch(unSelectAllNotes());
    navigate(`/${page}`);
  };
  return (
    <div
      className={`flex items-center${
        path === "/" + page ? " bg-active-yellow" : ""
      } ${
        menuState.tempState || menuState.originState ? "px-5" : "px-3"
      } py-3 ${
        path === "/" + page ? "text-main-text-color" : "text-icons-color"
      } rounded-r-full cursor-pointer ${
        path === "/" + page ? "hover:bg-active-yellow" : "hover:bg-hover-gray"
      } ${
        menuState.tempState || menuState.originState ? "" : "rounded-l-full"
      } ${
        menuState.tempState || menuState.originState ? "" : "mx-2"
      } transition-all duration-100 ease-in-out`}
      onClick={isLink ? clickHandler : undefined}
    >
      <Icon />
      {(menuState.tempState || menuState.originState) && (
        <span className="w-48 pl-8 text-main-text-color">{title}</span>
      )}
    </div>
  );
}

export default SideBarOptions;
