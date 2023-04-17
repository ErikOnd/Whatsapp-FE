import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/sign-in/login";
import Registration from "./components/Registration";
import MainApp from "./components/MainApp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Registration />} path="/registration" />
          <Route path="/home" element={<MainApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
