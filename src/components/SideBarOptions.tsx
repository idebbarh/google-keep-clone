import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectMenuState } from "../features/menuStateSlice";

type Props = {
  Icon: any;
  title: string;
  page?: string;
  isLink: true | false;
};
function SideBarOptions({ Icon, title, page, isLink }: Props): JSX.Element {
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  const menuState = useAppSelector(selectMenuState);
  const clickHandler = (): void => {
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
        menuState.tempState || menuState.originState ? "" : "ml-2"
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
