import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import TrashScreen from "./screens/trash/TrashScreen";
import ArchiveScreen from "./screens/archive/ArchiveScreen";
import SearchScreen from "./screens/search/SearchScreen";
import SelectedNotesOptionsContainer from "./components/screens/SelectedNotesOptionsContainer";
import useNote from "./hooks/useNote";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase/firebase";
import SearchResult from "./screens/search/SearchResult";
function App(): JSX.Element {
  const { notes, setNotes } = useNote();
  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const usub = onSnapshot(q, (querySnaphot) => {
      setNotes(
        querySnaphot.docs.map((doc) => {
          return {
            noteTitle: doc.data().noteTitle,
            noteValue: doc.data().noteValue,
            createdAt: doc.data().createdAt,
            isArchived: doc.data().isArchived,
            isTrashed: doc.data().isTrashed,
            noteId: doc.id,
            noteBackgroundColor: doc.data().noteBackgroundColor,
            isPinned: doc.data().isPinned,
          };
        })
      );
    });
    return usub;
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <SelectedNotesOptionsContainer />
        <Header />
        <div className="relative flex pt-[65px]">
          <SideBar />
          <div className="px-10 w-full md:pl-[4.5rem]">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/home" replace={true} />}
              />
              <Route path="/home" element={<HomeScreen notes={notes} />} />
              <Route
                path="/archive"
                element={<ArchiveScreen notes={notes} />}
              />
              <Route path="/trash" element={<TrashScreen notes={notes} />} />
              <Route path="/search" element={<SearchScreen notes={notes} />} />
              <Route
                path="/search/result"
                element={<SearchResult notes={notes} />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
