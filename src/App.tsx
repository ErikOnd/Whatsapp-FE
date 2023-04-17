import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/mainApp.css";
import "./App.css";
import MainApp from "./components/MainApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
