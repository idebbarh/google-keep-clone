import React from "react";
import SearchByColorContainer from "../../components/search/SearchByColorContainer";
import { TPropsScreens } from "../../types/types";

function SearchScreen({ notes }: TPropsScreens) {
  return (
    <div className="py-4">
      <SearchByColorContainer
        colors={new Set(notes.map((note) => note.noteBackgroundColor))}
      />
    </div>
  );
}
export default SearchScreen;
