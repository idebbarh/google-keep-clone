import React from "react";
import { useSearchParams } from "react-router-dom";
import { TPropsScreens } from "../../types/types";

function SearchResult({ notes }: TPropsScreens) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchColor = searchParams.get("color");
  const searchText = searchParams.get("text");
  console.log(searchColor, searchText);
  return (
    <div>
      <h1>{searchColor ? searchColor : "no color"}</h1>
      <h1>{searchText ? searchText : "no text"}</h1>
    </div>
  );
}
export default SearchResult;
