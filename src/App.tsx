import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import TrashScreen from "./screens/trash/TrashScreen";
import ArchiveScreen from "./screens/archive/ArchiveScreen";
function App(): JSX.Element {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="flex">
          <SideBar />
          <div className="w-full">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/home" replace={true} />}
              />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/reminders" element={<h1>reminders</h1>} />
              <Route path="/archive" element={<ArchiveScreen />} />
              <Route path="/trash" element={<TrashScreen />} />
              <Route path="/search" element={<h1>search</h1>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
