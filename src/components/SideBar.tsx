import React from "react";
import SideBarOptions from "./SideBarOptions";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectMenuState, toggleTempState } from "../features/menuStateSlice";

function SideBar(): JSX.Element {
  const menuState = useAppSelector(selectMenuState);
  const dispatch = useAppDispatch();
  return (
    <div
      className="h-[calc(100vh-65px)] w-fit flex flex-col justify-start pt-2"
      onMouseEnter={
        menuState.originState ? undefined : () => dispatch(toggleTempState())
      }
      onMouseLeave={
        menuState.originState ? undefined : () => dispatch(toggleTempState())
      }
    >
      <SideBarOptions
        Icon={LightbulbIcon}
        title="notes"
        page="home"
        isLink={true}
      />
      <SideBarOptions
        Icon={NotificationsIcon}
        title="reminders"
        page="reminders"
        isLink={true}
      />
      <SideBarOptions Icon={EditIcon} title="edit labels" isLink={false} />
      <SideBarOptions
        Icon={ArchiveIcon}
        title="archive"
        page="archive"
        isLink={true}
      />
      <SideBarOptions
        Icon={DeleteIcon}
        title="trash"
        page="trash"
        isLink={true}
      />
    </div>
  );
}
export default SideBar;
