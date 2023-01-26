import React, { useEffect, useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ImageIcon from "@mui/icons-material/Image";
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
  const {
    archiveNote,
    unArchiveNote,
    trashNote,
    unTrashNote,
    deleteNote,
    changeNoteBackground,
    pinAndUnpinNote,
  } = useNoteOptions();

  const backgroundColorsContainerRef = useRef<HTMLDivElement>(null);
  const openBackgroundColorsContainerIconRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const selectedNotes = useAppSelector(selectSelectedNotes);

  useEffect(() => {
    const bgcRef = backgroundColorsContainerRef.current;
    const iconRef = openBackgroundColorsContainerIconRef.current;
    if (bgcRef && iconRef) {
      document.addEventListener("click", handleClickToEveryDomElem);
    }
    return () => {
      if (bgcRef && iconRef) {
        document.removeEventListener("click", handleClickToEveryDomElem);
      }
    };
  }, [isBackgroundColorContainerOpen]);

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
  return (
    <div
      className={`flex ${
        colorVariant[noteBackgroundColor]
      } flex-col justify-between relative w-60 min-h-[100px] border-solid border ${
        isNoteSelected() ? "border-transparent" : "border-border-gray"
      }
       rounded-lg text-main-text-color transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
      <div className="p-4 text-lg flex flex-col gap-0.5">
        {noteTitle.length > 0 && (
          <div>
            <p className="break-all">{noteTitle}</p>
          </div>
        )}
        {noteValue.length > 0 && (
          <div>
            <p className="break-all">{noteValue}</p>
          </div>
        )}
      </div>
      <div
        className={`flex items-center px-2 pb-1 ${
          isHover && selectedNotes.selectedNotes.length === 0
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ease-in-out`}
      >
        {/* {!isTrashed && <NoteOptions Icon={AddAlertIcon} />} */}
        {/* {!isTrashed && <NoteOptions Icon={PersonAddAlt1Icon} />} */}
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
        {/* {!isTrashed && <NoteOptions Icon={ImageIcon} />} */}
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
            pinAndUnPin={() => pinAndUnpinNote(noteId, isPinned)}
          />
        )}
      </div>
      {isBackgroundColorContainerOpen && (
        <BackgroundColorsContainer
          ref={backgroundColorsContainerRef}
          noteCurrentColor={noteBackgroundColor}
          changeNoteBackground={(newColor: string) =>
            changeNoteBackground(noteId, newColor)
          }
          fromWho="note"
        />
      )}
    </div>
  );
}
export default Note;
