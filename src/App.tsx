import React from "react";
import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App(): JSX.Element {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="flex">
          <SideBar />
          <div>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/home" replace={true} />}
              />
              <Route path="/home" element={<h1>home</h1>} />
              <Route path="/reminders" element={<h1>reminders</h1>} />
              <Route path="/archive" element={<h1>archive</h1>} />
              <Route path="/trash" element={<h1>trash</h1>} />
              <Route path="/search" element={<h1>search</h1>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
