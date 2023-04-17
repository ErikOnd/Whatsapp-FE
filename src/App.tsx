import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/sign-in/login";
import Registration from "./components/Registration";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Registration />} path="/registration" />
        </Routes>
      </Router>

      <Router>
        <Routes>
          <Route path="/" element={<MainApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
