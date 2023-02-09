import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import TrashScreen from "./screens/trash/TrashScreen";
import ArchiveScreen from "./screens/archive/ArchiveScreen";
import SearchScreen from "./screens/search/SearchScreen";
import SelectedNotesOptionsContainer from "./components/screens/SelectedNotesOptionsContainer";
import useNote from "./hooks/useNote";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeUserInfo, selectUserInfo } from "./features/userInfoSlice";
import LoginScreen from "./screens/login/LoginScreen";
import { onAuthStateChanged } from "firebase/auth";
import LoadingScreen from "./screens/loading/LoadingScreen";

function App(): JSX.Element {
  const { notes, setNotes } = useNote();
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const LoginRedicter = () =>
    useRoutes([
      ...["/", "/home", "/archive", "/trash", "/search"].map((path) => ({
        path,
        element: <Navigate to="/login" replace={true} />,
      })),
      { path: "/login", element: <LoginScreen /> },
    ]);

  useEffect(() => {
    const userId = userInfo?.uid;
    if (userId) {
      const userRef = doc(db, "users", userId);
      const q = query(
        collection(userRef, "notes"),
        orderBy("createdAt", "desc")
      );
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
    } else {
      setNotes([]);
    }
  }, [userInfo]);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          changeUserInfo({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          })
        );
      } else {
        dispatch(changeUserInfo(null));
      }
    });
    return () => unsub();
  }, []);

  if (userInfo === undefined) {
    return <LoadingScreen />;
  }

  if (userInfo === null) {
    return <LoginRedicter />;
  }

  return (
    <div className="app">
      <SelectedNotesOptionsContainer />
      <Header />
      <div className="relative flex pt-[65px]">
        <SideBar />
        <div className="px-10 w-full md:pl-[4.8rem]">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route
              path="/login"
              element={<Navigate to="/home" replace={true} />}
            />
            <Route path="/home" element={<HomeScreen notes={notes} />} />
            <Route path="/archive" element={<ArchiveScreen notes={notes} />} />
            <Route path="/trash" element={<TrashScreen notes={notes} />} />
            <Route path="/search" element={<SearchScreen notes={notes} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
