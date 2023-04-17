import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Registration from "./components/Registration";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
