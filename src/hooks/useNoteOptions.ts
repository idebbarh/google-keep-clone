import { TNoteUseOptions } from "../types/types";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
export default function useNoteOptions(): TNoteUseOptions {
  const archiveNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { isArchived: true });
  };
  const unArchiveNote = async (id: string): Promise<void> => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { isArchived: false });
  };

  return { archiveNote, unArchiveNote };
}
