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
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();
  const prevPath = useRef<string>();
  const dispatch = useAppDispatch();
  const { params } = useAppSelector(selectParams);

  const [searchParams] = useSearchParams();
  const searchColor = searchParams.get("color");

  React.useEffect(() => {
    if (!window.location.pathname.includes("/search")) {
      prevPath.current = window.location.pathname;
    }
  }, [window.location.pathname]);

  const focusHandler = (e: React.FocusEvent<HTMLInputElement>): void => {
    setIsInputFocused(true);
    if (e.target.value.length === 0 && !searchColor) {
      navigate("/search");
    }
  };

  const closeSearchHandler = (): void => {
    dispatch(clearParams());
    if (prevPath.current) {
      navigate(prevPath.current);
    } else {
      navigate("/home");
    }
  };

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
      <form
        className={`h-12 flex items-center p-1 ${
          isInputFocused
            ? "bg-white text-main-background-color"
            : "bg-input-gray text-main-text-color"
        } rounded-lg max-w-[700px] transition-all duration-300 ease-in-out`}
      >
        <IconButton color="inherit" size="large">
          <SearchIcon />
        </IconButton>
        <input
          type="text"
          name="searchValue"
          value={params.text || ""}
          className={`block h-full border-none outline-none bg-transparent w-full ${
            isInputFocused
              ? "text-main-background-color"
              : "text-main-text-color"
          } placeholder:${
            isInputFocused
              ? "text-main-background-color"
              : "text-main-text-color"
          }`}
          placeholder="Search"
          onChange={inputChangeHandler}
          onFocus={focusHandler}
          onBlur={() => setIsInputFocused(false)}
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
