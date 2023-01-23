import { TNote, TTakeNoteUseOptions, TUseNote } from "../types/types";
import { useState } from "react";
export default function useTakeNoteOptions(): TTakeNoteUseOptions {
  const [undoAndRedoStore, setUndoAndRedoStore] = useState<string[]>([""]);
  const [undoAndRedoStoreIndex, setUndoAndRedoStoreIndex] = useState<number>(0);
  const addInTheRedoAndUndoStore = (value: string): void => {
    const newStore = [
      ...undoAndRedoStore.slice(0, undoAndRedoStoreIndex + 1),
      value,
    ];
    setUndoAndRedoStore(() => newStore);
    setUndoAndRedoStoreIndex(newStore.length - 1);
  };
  const undo = (
    setNote: Pick<TUseNote, "setNote">,
    note: Pick<TNote, "noteTitle" | "noteValue" | "noteBackgroundColor">
  ): void => {
    if (undoAndRedoStoreIndex > 0) {
      setUndoAndRedoStoreIndex(() => undoAndRedoStoreIndex - 1);
      setNote.setNote(() => ({
        ...note,
        noteValue: undoAndRedoStore[undoAndRedoStoreIndex - 1],
      }));
    }
  };
  const redo = (
    setNote: Pick<TUseNote, "setNote">,
    note: Pick<TNote, "noteTitle" | "noteValue" | "noteBackgroundColor">
  ): void => {
    if (undoAndRedoStoreIndex < undoAndRedoStore.length - 1) {
      setUndoAndRedoStoreIndex(() => undoAndRedoStoreIndex + 1);
      setNote.setNote(() => ({
        ...note,
        noteValue: undoAndRedoStore[undoAndRedoStoreIndex + 1],
      }));
    }
  };
  const resitUndoAndRedoStoreAndIndex = (): void => {
    setUndoAndRedoStore([""]);
    setUndoAndRedoStoreIndex(0);
  };
  return {
    addInTheRedoAndUndoStore,
    undo,
    redo,
    undoAndRedoStore,
    undoAndRedoStoreIndex,
    resitUndoAndRedoStoreAndIndex,
  };
}
