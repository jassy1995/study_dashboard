import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "components/Header";
import HomePage from "./pages/Home";
import PropertyDetailsPage from "./pages/PropertyDetails";
import { PropertyPage } from "./pages/PropertyPage";
import LoginPage from "pages/loginPage";
import SignUpPage from "pages/signUpPage";
import OrderPage from "pages/OrderPage";
import AddPropertyPage from "pages/AddPropertyPage";
import Navbar from './components/Navbar';
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
