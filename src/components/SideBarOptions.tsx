import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  Icon: any;
  title: string;
  page?: string;
  isLink: true | false;
};
function SideBarOptions({ Icon, title, page, isLink }: Props): JSX.Element {
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate(`/${page}`);
  };
  return (
    <div
      className={`flex items-center${
        path === "/" + page ? " bg-active-yellow" : ""
      } px-5 py-3 text-icons-color rounded-r-full cursor-pointer ${
        path === "/" + page ? "hover:bg-active-yellow" : "hover:bg-hover-gray"
      }`}
      onClick={isLink ? clickHandler : undefined}
    >
      <Icon />
      <span className="w-48 pl-8 text-main-text-color">{title}</span>
    </div>
  );
}

export default SideBarOptions;
