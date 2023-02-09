import { TNoteUseOptions } from "../types/types";
import { db } from "../firebase/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import { selectUserInfo } from "../features/userInfoSlice";
export default function useNoteOptions(): TNoteUseOptions {
  const userInfo = useAppSelector(selectUserInfo);
  const archiveNote = async (id: string): Promise<void> => {
    const userId = userInfo?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const docRef = doc(userRef, "notes", id);
    await updateDoc(docRef, { isArchived: true });
    const curNoteInfo = await getNoteById(id);
    if (curNoteInfo?.isPinned) {
      await pinAndUnpinNote(id);
    }
  };
  const unArchiveNote = async (id: string): Promise<void> => {
    const userId = userInfo?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const docRef = doc(userRef, "notes", id);
    await updateDoc(docRef, { isArchived: false });
  };
  const trashNote = async (id: string): Promise<void> => {
    const userId = userInfo?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const docRef = doc(userRef, "notes", id);
    await updateDoc(docRef, { isTrashed: true });
    const curNoteInfo = await getNoteById(id);
    if (curNoteInfo?.isPinned) {
      await pinAndUnpinNote(id);
    }
  };
  const unTrashNote = async (id: string): Promise<void> => {
    const userId = userInfo?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const docRef = doc(userRef, "notes", id);
    await updateDoc(docRef, { isTrashed: false });
  };

  const deleteNote = async (id: string): Promise<void> => {
    const userId = userInfo?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const docRef = doc(userRef, "notes", id);
    await deleteDoc(docRef);
  };
  const changeNoteBackground = async (
    id: string | string[],
    newColor: string
  ): Promise<void> => {
    const userId = userInfo?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    if (!Array.isArray(id)) {
      const docRef = doc(userRef, "notes", id);
      await updateDoc(docRef, { noteBackgroundColor: newColor });
    } else {
      id.forEach(async (noteId: string) => {
        const docRef = doc(userRef, "notes", noteId);
        await updateDoc(docRef, { noteBackgroundColor: newColor });
      });
    }
  };
  const pinAndUnpinNote = async (id: string): Promise<void> => {
    const userId = userInfo?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const docRef = doc(userRef, "notes", id);
    let curNoteInfo = await getNoteById(id);
    await updateDoc(docRef, { isPinned: !curNoteInfo?.isPinned });
    curNoteInfo = await getNoteById(id);
    if (curNoteInfo?.isArchived && curNoteInfo?.isPinned) {
      await unArchiveNote(id);
    }
  };
  const getNoteById = async (id: string) => {
    const userId = userInfo?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const docRef = doc(userRef, "notes", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };
  const editNoteTitleAndValue = async (
    newValues: { noteTitle: string; noteValue: string },
    id: string
  ): Promise<void> => {
    const userId = userInfo?.uid;
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const docRef = doc(userRef, "notes", id);
    await updateDoc(docRef, newValues);
  };
  return {
    archiveNote,
    unArchiveNote,
    trashNote,
    unTrashNote,
    deleteNote,
    changeNoteBackground,
    pinAndUnpinNote,
    editNoteTitleAndValue,
  };
}
