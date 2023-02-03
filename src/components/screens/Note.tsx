import React, { useEffect, useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ArchiveIcon from "@mui/icons-material/Archive";
import NoteOptions from "./NoteOptions";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TNote } from "../../types/types";
import useNoteOptions from "../../hooks/useNoteOptions";
import { colorVariant } from "../../utils/colorVariant";
import BackgroundColorsContainer from "./BackgroundColorsContainer";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  selectNote,
  selectSelectedNotes,
  unSelectNote,
} from "../../features/selectedNotesSlice";
import { selecteGridView } from "../../features/gridViewSlice";

function Note({
  noteTitle,
  noteValue,
  isArchived,
  isTrashed,
  noteId,
  noteBackgroundColor,
  isPinned,
}: Pick<
  TNote,
  | "noteTitle"
  | "noteValue"
  | "noteId"
  | "isArchived"
  | "isTrashed"
  | "noteBackgroundColor"
  | "isPinned"
>) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isBackgroundColorContainerOpen, setIsBackgroundColorContainerOpen] =
    useState<boolean>(false);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const {
    archiveNote,
    unArchiveNote,
    trashNote,
    unTrashNote,
    deleteNote,
    changeNoteBackground,
    pinAndUnpinNote,
    editNoteTitleAndValue,
  } = useNoteOptions();

  const backgroundColorsContainerRef = useRef<HTMLDivElement>(null);
  const openBackgroundColorsContainerIconRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const [noteWH, setNoteWH] = useState<{ w: number; h: number } | null>(null);
  const noteTitleDivRef = useRef<HTMLDivElement>(null);
  const noteValueDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const selectedNotes = useAppSelector(selectSelectedNotes);
  const currentGridView = useAppSelector(selecteGridView);

  useEffect(() => {
    document.addEventListener("click", handleClickToEveryDomElem);
    return () => {
      document.removeEventListener("click", handleClickToEveryDomElem);
    };
  }, [isBackgroundColorContainerOpen]);

  useEffect(() => {
    const noteW = noteRef.current?.clientWidth;
    const noteH = noteRef.current?.clientHeight;
    if (noteW && noteH) {
      setNoteWH(() => ({ w: noteW, h: noteH }));
    }
  }, [currentGridView]);

  useEffect(() => {
    if (noteTitleDivRef.current) {
      noteTitleDivRef.current.innerHTML = noteTitle;
    }
    if (noteValueDivRef.current) {
      noteValueDivRef.current.innerHTML = noteValue;
    }
  }, [noteTitle, noteValue]);

  const handleClickToEveryDomElem = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (
      !backgroundColorsContainerRef.current?.isSameNode(target) &&
      !backgroundColorsContainerRef.current?.contains(target) &&
      !openBackgroundColorsContainerIconRef.current?.isSameNode(target) &&
      !openBackgroundColorsContainerIconRef.current?.contains(target)
    ) {
      setIsBackgroundColorContainerOpen(false);
    }
    if (
      !noteRef.current?.isSameNode(target) &&
      !noteRef.current?.contains(target)
    ) {
      updataNoteInfo();
    }
  };

  const isNoteSelected = (): boolean => {
    return selectedNotes.selectedNotes.includes(noteId);
  };

  const selectAndUnselectNoteHandler = (): void => {
    if (isNoteSelected()) {
      dispatch(unSelectNote({ noteId: noteId }));
    } else {
      dispatch(selectNote({ noteId: noteId }));
    }
  };

  const updataNoteInfo = (): void => {
    setIsInEditMode(false);
    if (noteTitleDivRef.current && noteValueDivRef.current) {
      const noteValue: string = noteValueDivRef.current?.innerHTML;
      const noteTitle: string = noteTitleDivRef.current?.innerHTML;
      editNoteTitleAndValue({ noteValue, noteTitle }, noteId);
    }
  };
  return (
    <div
      className={`${!currentGridView.isGrid ? "w-full" : "w-60"} md:w-full`}
      style={{
        height: `${noteWH?.h}px`,
      }}
    >
      <div
        className={`flex ${
          colorVariant[noteBackgroundColor]
        } flex-col justify-between border-solid border ${
          isNoteSelected() ? "border-transparent" : "border-border-gray"
        }
rounded-lg text-main-text-color transition-[border-color,background] duration-300 ease-in-out ${
          isInEditMode
            ? "fixed left-1/2 top-[170px] translate-x-[-50%] w-[600px] h-40 z-[9999]"
            : "relative"
        } min-h-[100px]`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        ref={noteRef}
      >
        <div
          className={`absolute w-[calc(100%+6px)] h-[calc(100%+6px)] border-[3px] border-slid border-white left-[-3px] top-[-3px] rounded-lg transition-all duration-300 ease-in-out ${
            isNoteSelected() ? "opacity-100" : "opacity-0"
          } z-[-1]`}
        ></div>
        <div
          className={`absolute -left-2.5 -top-2.5 cursor-pointer ${
            isHover || isNoteSelected() ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300 ease-in-out z-50 flex justify-center items-center bg-white w-20px h-20px rounded-full text-main-background-color`}
          onClick={selectAndUnselectNoteHandler}
        >
          <CheckIcon color="inherit" />
        </div>
        <div
          className="p-4 text-lg flex flex-col gap-0.5 cursor-pointer"
          onClick={() => setIsInEditMode(true)}
        >
          {(noteTitle.length > 0 || isInEditMode) && (
            <div
              role="textbox"
              className="break-all outline-none empty:before:content-[attr(aria-label)]"
              contentEditable="true"
              aria-label="title"
              aria-multiline="true"
              ref={noteTitleDivRef}
            ></div>
          )}
          {(noteValue.length > 0 || isInEditMode) && (
            <div
              role="textbox"
              className="break-all outline-none empty:before:content-[attr(aria-label)]"
              contentEditable="true"
              aria-label="note"
              aria-multiline="true"
              ref={noteValueDivRef}
            ></div>
          )}
          <div
            className={`text-gray-400 text-xl font-normal ${
              noteTitle.length === 0 && noteValue.length === 0 && !isInEditMode
                ? "block"
                : "hidden"
            }`}
          >
            Empty note
          </div>
        </div>
        <div
          className={`flex items-center px-2 pb-1 ${
            isHover && selectedNotes.selectedNotes.length === 0
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } transition-opacity duration-300 ease-in-out`}
        >
          {!isTrashed && (
            <NoteOptions
              Icon={ColorLensIcon}
              action="backgroundcolor"
              setIsBackgroundColorContainerOpen={() =>
                setIsBackgroundColorContainerOpen((prevState) => !prevState)
              }
              ref={openBackgroundColorsContainerIconRef}
            />
          )}
          {isArchived && !isTrashed && (
            <NoteOptions
              Icon={UnarchiveIcon}
              action="unArchive"
              unArchive={() => unArchiveNote(noteId)}
            />
          )}
          {!isArchived && !isTrashed && (
            <NoteOptions
              Icon={ArchiveIcon}
              action="archive"
              archive={() => archiveNote(noteId)}
            />
          )}
          {isTrashed && (
            <NoteOptions
              Icon={DeleteForeverIcon}
              action="deleteforever"
              deleteForEver={() => {
                deleteNote(noteId);
              }}
            />
          )}
          {isTrashed && (
            <NoteOptions
              Icon={RestoreFromTrashIcon}
              action="untrash"
              unTrash={() => {
                unTrashNote(noteId);
              }}
            />
          )}
          {!isTrashed && (
            <NoteOptions
              Icon={DeleteIcon}
              action="trash"
              trash={() => {
                trashNote(noteId);
              }}
            />
          )}
          {!isTrashed && (
            <NoteOptions
              Icon={isPinned ? PushPinIcon : PushPinOutlinedIcon}
              action="pin"
              pinAndUnPin={() => pinAndUnpinNote(noteId)}
            />
          )}

          {isInEditMode && (
            <button
              className="bg-none border-none capitalize text-main-text-color text-base font-normal ml-auto rounded-md py-1 px-6 hover:bg-hover-gray"
              onClick={updataNoteInfo}
            >
              close
            </button>
          )}
        </div>
        {isBackgroundColorContainerOpen && (
          <BackgroundColorsContainer
            ref={backgroundColorsContainerRef}
            noteCurrentColor={noteBackgroundColor}
            changeNoteBackground={(newColor: string) =>
              changeNoteBackground(noteId, newColor)
            }
          />
        )}
      </div>
      {isInEditMode && (
        <div className="w-screen h-screen fixed left-0 top-0 bg-[rgb(0,0,0,0.7)] z-[9998]"></div>
      )}
    </div>
  );
}
export default Note;
