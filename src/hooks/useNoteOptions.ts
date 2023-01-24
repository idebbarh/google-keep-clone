import { TNoteUseOptions } from "../types/types";
import { db } from "../firebase/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
export default function useNoteOptions(): TNoteUseOptions {
  const archiveNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { isArchived: true });
  };
  const unArchiveNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { isArchived: false });
  };
  const trashNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { isTrashed: true });
  };
  const unTrashNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { isTrashed: false });
  };

  const deleteNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await deleteDoc(docRef);
  };
  const changeNoteBackground = async (
    id: string,
    newColor: string
  ): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { noteBackgroundColor: newColor });
  };
  return {
    archiveNote,
    unArchiveNote,
    trashNote,
    unTrashNote,
    deleteNote,
    changeNoteBackground,
  };
}
