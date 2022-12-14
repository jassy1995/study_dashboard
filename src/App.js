import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudyPage from './pages/StudyPage';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" limit={1} />
      <Routes>
        <Route path="/" element={<StudyPage />} />
        <Route path="*" element={<StudyPage />} />
      </Routes>
    </Router>

  );
}
export default App;
