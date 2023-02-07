import React, { useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  changeParams,
  clearParams,
  selectParams,
} from "../../features/paramsSlice";

function SearchBar() {
  const navigate = useNavigate();
  const prevPath = useRef<string>();
  const dispatch = useAppDispatch();
  const { params } = useAppSelector(selectParams);

  const [searchParams] = useSearchParams();
  const searchColor = searchParams.get("color");
  //this changes prevPath every time when we change the path and it is not /search and /search/ + any thing after it
  React.useEffect(() => {
    if (!window.location.pathname.includes("/search")) {
      prevPath.current = window.location.pathname;
    }
  }, [window.location.pathname]);

  //this navigates to /search when we focus on search bar and it is not /search or /search/+ any value
  const focusHandler = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.target.value.length === 0 && !searchColor) {
      navigate("/search");
    }
  };

  //this clears the search bar and navigates to /home or to the previous path if not null
  const closeSearchHandler = (): void => {
    dispatch(clearParams());
    if (prevPath.current) {
      navigate(prevPath.current);
    } else {
      navigate("/home");
    }
  };

  //this changes the search value and isCleaer to false when we type something in search bar
  //(isCleaer is used to navigate to /home or to the previous path when we clear the search bar, when it is false it will not navigate to /home or to the previous path)
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      changeParams({
        paramName: "text",
        paramValue: e.target.value.length > 0 ? e.target.value : null,
      })
    );
    if (e.target.value.length === 0) {
      navigate("/search");
    }
  };

  return (
    <div className="flex-1">
      <form className="h-12 text-main-text-color flex items-center p-1 bg-input-gray rounded-lg max-w-[700px]">
        <IconButton color="inherit" size="large">
          <SearchIcon />
        </IconButton>
        <input
          type="text"
          name="searchValue"
          value={params.text || ""}
          className="block h-full border-none outline-none bg-transparent w-full text-main-text-color placeholder:text-main-text-color"
          placeholder="Search"
          onChange={inputChangeHandler}
          onFocus={focusHandler}
        />
        <div onClick={closeSearchHandler}>
          <IconButton color="inherit" size="large">
            <CloseIcon />
          </IconButton>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
