import React, { ChangeEvent, useEffect, useRef, useState } from "react";
interface Note {
  noteValue: string;
  noteTitle: string;
}
function TakeNote() {
  const [note, setNote] = useState<Note>({ noteValue: "", noteTitle: "" });
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const takeNoteRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (takeNoteRef.current) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      if (takeNoteRef.current) {
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
      setIsFocus(false);
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
          className="block bg-transparent border-none outline-none px-4 py-3 text-main-text-color placeholder:font-bold placeholder:text-text-gray placeholder:text-base placeholder:tracking-wide"
          name="noteTitle"
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setNote((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
          }
        />
      )}
      <input
        type="text"
        placeholder="Take a note"
        value={note.noteValue}
        className="block bg-transparent border-none outline-none px-4 py-3 text-main-text-color placeholder:font-bold placeholder:text-text-gray placeholder:text-base placeholder:tracking-wide"
        name="noteValue"
        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
          setNote((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        }
        onFocus={() => setIsFocus(true)}
      />
    </div>
  );
}
export default TakeNote;
