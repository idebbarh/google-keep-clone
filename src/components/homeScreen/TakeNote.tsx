import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import TakeNoteFooterOptions from "./TakeNoteFooterOptions";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ImageIcon from "@mui/icons-material/Image";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { TUseNote } from "../../screens/home/HomeScreen";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function TakeNote({
  note,
  setNote,
  clearNote,
  notes,
}: Omit<TUseNote, "setNotes">) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const takeNoteRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{ note: typeof note; notes: typeof notes }>({
    note: note,
    notes: notes,
  });

  useEffect(() => {
    stateRef.current = {
      note: note,
      notes: notes,
    };
  }, [note, notes]);

  useEffect(() => {
    const noteRef = takeNoteRef.current;
    if (noteRef) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      if (noteRef) {
        document.removeEventListener("click", handleClick);
      }
    };
  }, []);

  const handleClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (
      !takeNoteRef.current?.isSameNode(target) &&
      !takeNoteRef.current?.contains(target)
    ) {
      handleUnfocus();
    }
  };
  const handleUnfocus = (): void => {
    if (stateRef.current?.note.noteTitle || stateRef.current?.note.noteValue) {
      addNoteToNotes();
    }
    clearNote();
    setIsFocus(false);
  };

  const addNoteToNotes = async () => {
    try {
      await addDoc(collection(db, "notes"), {
        ...stateRef.current?.note,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div
      className="mt-8 mb-4 mx-auto border-border-gray border-solid border flex flex-col rounded-md max-w-[600px] shadow-tns text-main-text-color"
      ref={takeNoteRef}
    >
      {isFocus && (
        <input
          type="text"
          placeholder="Title"
          value={note.noteTitle}
          className="block bg-transparent border-none outline-none px-4 pt-3 text-main-text-color placeholder:font-bold placeholder:text-text-gray placeholder:text-base placeholder:tracking-wide"
          name="noteTitle"
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setNote(() => ({
              ...note,
              [e.target.name]: e.target.value,
            }))
          }
        />
      )}
      <input
        type="text"
        placeholder="Take a note..."
        value={note.noteValue}
        className={`block bg-transparent border-none outline-none px-4 ${
          isFocus ? "py-5" : "py-3"
        } text-main-text-color placeholder:font-semibold placeholder:text-text-gray ${
          isFocus ? "placeholder:text-sm" : "palceholder:text-base"
        } placeholder:tracking-wide`}
        name="noteValue"
        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
          setNote(() => ({
            ...note,
            [e.target.name]: e.target.value,
          }))
        }
        onFocus={() => setIsFocus(true)}
      />
      {isFocus && (
        <div className="flex items-center gap-4 px-4 pb-3">
          <TakeNoteFooterOptions Icon={AddAlertIcon} />
          <TakeNoteFooterOptions Icon={PersonAddAlt1Icon} />
          <TakeNoteFooterOptions Icon={ColorLensIcon} />
          <TakeNoteFooterOptions Icon={ImageIcon} />
          <TakeNoteFooterOptions Icon={ArchiveIcon} />
          <TakeNoteFooterOptions Icon={MoreVertIcon} />
          <TakeNoteFooterOptions Icon={UndoIcon} />
          <TakeNoteFooterOptions Icon={RedoIcon} />
          <button
            className="bg-none border-none capitalize text-main-text-color text-base font-normal ml-auto rounded-md py-1 px-6 hover:bg-hover-gray"
            onClick={handleUnfocus}
          >
            close
          </button>
        </div>
      )}
    </div>
  );
}
export default TakeNote;
