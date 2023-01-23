import { Timestamp } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface TNoteUseOptions {
  archiveNote: (id: string) => Promise<void>;
  unArchiveNote: (id: string) => Promise<void>;
  trashNote: (id: string) => Promise<void>;
  unTrashNote: (id: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}
export interface TNote {
  noteTitle: string;
  noteValue: string;
  noteBackgroundColor: string;
  createdAt: Timestamp;
  noteId: string;
  isArchived: boolean;
  isTrashed: boolean;
}
export interface TUseNote {
  note: Pick<TNote, "noteTitle" | "noteValue" | "noteBackgroundColor">;
  setNote: Dispatch<
    SetStateAction<
      Pick<TNote, "noteTitle" | "noteValue" | "noteBackgroundColor">
    >
  >;
  notes: TNote[];
  setNotes: Dispatch<SetStateAction<TNote[]>>;
  clearNote: () => void;
}
export interface MenuStateState {
  value: {
    originState: boolean;
    tempState: boolean;
  };
}

export interface TPropsTakeNoteOptions {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  action?: string | null;
  undo?: (() => void) | null;
  redo?: (() => void) | null;
  setIsBackgroundColorContainerOpen?: (() => void) | null;
  undoAndRedoStoreSize?: number | null;
  undoAndRedoStoreIndex?: number | null;
}
export interface TTakeNoteUseOptions {
  addInTheRedoAndUndoStore: (value: string) => void;
  undo: (
    setNote: Pick<TUseNote, "setNote">,
    note: Pick<TNote, "noteTitle" | "noteValue" | "noteBackgroundColor">
  ) => void;
  redo: (
    setNote: Pick<TUseNote, "setNote">,
    note: Pick<TNote, "noteTitle" | "noteValue" | "noteBackgroundColor">
  ) => void;
  undoAndRedoStore: string[];
  undoAndRedoStoreIndex: number;
  resitUndoAndRedoStoreAndIndex: () => void;
}

export interface TPropsNoteOptions {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  action?: string | null;
  archive?: (() => void) | null;
  unArchive?: (() => void) | null;
  trash?: (() => void) | null;
  unTrash?: (() => void) | null;
  deleteForEver?: (() => void) | null;
}
export interface TPropsBackgroundColorOption
  extends Pick<TUseNote, "note" | "setNote"> {
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> | null;
  color: string;
}