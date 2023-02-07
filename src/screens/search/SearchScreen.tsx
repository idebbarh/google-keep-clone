import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Note from "../../components/screens/Note";
import SearchByColorContainer from "../../components/search/SearchByColorContainer";
import { selecteGridView } from "../../features/gridViewSlice";
import { selectParams } from "../../features/paramsSlice";
import { TNote, TPropsScreens } from "../../types/types";
import { createURL } from "../../utils/createSeachUrl";

function SearchScreen({ notes }: TPropsScreens) {
  const [searchParams] = useSearchParams();
  const currentGridView = useAppSelector(selecteGridView);
  const { params } = useAppSelector(selectParams);
  const navigate = useNavigate();
  const searchColor = searchParams.get("color");
  const searchText = searchParams.get("text");
  const [foundNotes, setFoundNotes] = useState<TNote[]>([]);
  useEffect(() => {
    const url = createURL(params);
    if (url) {
      navigate("/search" + url);
    }
  }, [params]);

  useEffect(() => {
    setFoundNotes(
      notes.filter((note) => {
        if (note.isTrashed) return false;
        const hasColor =
          searchColor !== null && note.noteBackgroundColor === searchColor;

        const hasTitle =
          searchText !== null &&
          note.noteTitle.toLowerCase().includes(searchText.toLowerCase());

        const hasValue =
          searchText !== null &&
          note.noteValue.toLowerCase().includes(searchText.toLowerCase());

        if (!searchText) {
          return hasColor;
        }

        if (!searchColor) {
          return hasTitle || hasValue;
        }

        return hasColor && (hasTitle || hasValue);
      })
    );
  }, [searchColor, searchText, notes]);
  return (
    <div className="py-4">
      {foundNotes.length > 0 ? (
        <div
          className={`flex items-start gap-4 flex-wrap ${
            !currentGridView.isGrid ? "max-w-[680px] mx-auto flex-col" : ""
          }`}
        >
          {foundNotes.map((note) => {
            return (
              <Note
                noteTitle={note.noteTitle}
                noteValue={note.noteValue}
                noteId={note.noteId}
                isArchived={note.isArchived}
                isTrashed={note.isTrashed}
                key={note.noteId}
                noteBackgroundColor={note.noteBackgroundColor}
                isPinned={note.isPinned}
                fromSearch={{ searchValue: searchText }}
              />
            );
          })}
        </div>
      ) : (
        <SearchByColorContainer
          colors={new Set(notes.map((note) => note.noteBackgroundColor))}
        />
      )}
    </div>
  );
}
export default SearchScreen;
