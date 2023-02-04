import React, { ChangeEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchValue, setSearchValue] = useState<{
    value: string;
    isCleaer: boolean;
  }>({ value: "", isCleaer: false });
  const navigate = useNavigate();
  const prevPath = React.useRef<string>();

  //this changes prevPath every time when we change the path and it is not /search and /search/ + any value
  React.useEffect(() => {
    if (
      window.location.pathname !== "/search" &&
      !window.location.pathname.match(/^\/search\/.+/)
    ) {
      prevPath.current = window.location.pathname;
    }
  }, [window.location.pathname]);

  //this changes path every time when we type something in search bar and it is not empty if it is empty it will go to /search or if we clear the search bar it will go to /home
  React.useEffect(() => {
    if (!["/home", "/archive", "/trash"].includes(window.location.pathname)) {
      if (searchValue.value) {
        navigate(`/search/text/${searchValue.value}`);
      } else {
        if (!searchValue.isCleaer) {
          navigate("/search");
        }
      }
    }
  }, [searchValue.value]);

  //this navigates to /search when we focus on search bar and it is not /search or /search/+ any value
  const focusHandler = (): void => {
    if (
      window.location.pathname !== "/search" &&
      !window.location.pathname.match(/^\/search\/.+/)
    ) {
      navigate("/search");
    }
  };

  //this clears the search bar and navigates to /home or to the previous path if not null
  const closeSearchHandler = (): void => {
    setSearchValue({ value: "", isCleaer: true });
    if (prevPath.current && prevPath.current !== "/search") {
      navigate(prevPath.current);
    } else {
      navigate("/home");
    }
  };

  //this changes the search value and isCleaer to false when we type something in search bar
  //(isCleaer is used to navigate to /home or to the previous path when we clear the search bar, when it is false it will not navigate to /home or to the previous path)
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue({ value: e.target.value, isCleaer: false });
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
          value={searchValue.value}
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
