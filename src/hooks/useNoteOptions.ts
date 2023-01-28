import { TNoteUseOptions } from "../types/types";
import { db } from "../firebase/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
export default function useNoteOptions(): TNoteUseOptions {
  const archiveNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { isArchived: true });
    const curNoteInfo = await getNoteById(id);
    if (curNoteInfo?.isPinned) {
      await pinAndUnpinNote(id);
    }
  };
  const unArchiveNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { isArchived: false });
  };
  const trashNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { isTrashed: true });
    const curNoteInfo = await getNoteById(id);
    if (curNoteInfo?.isPinned) {
      await pinAndUnpinNote(id);
    }
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
  const pinAndUnpinNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    let curNoteInfo = await getNoteById(id);
    await updateDoc(docRef, { isPinned: !curNoteInfo?.isPinned });
    curNoteInfo = await getNoteById(id);
    if (curNoteInfo?.isArchived && curNoteInfo?.isPinned) {
      await unArchiveNote(id);
    }
  };
  const getNoteById = async (id: string) => {
    const docRef = doc(db, "notes", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };
  return {
    archiveNote,
    unArchiveNote,
    trashNote,
    unTrashNote,
    deleteNote,
    changeNoteBackground,
    pinAndUnpinNote,
  };
}
