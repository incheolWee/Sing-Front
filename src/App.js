import React from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home_page'
import WorkPage from "./pages/work_page";
import LandingPage from "./pages/lading_page";
import SignPage from "./pages/sign_page";
import PDFSignatureApp from "./pages/test_page";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/test" element={<PDFSignatureApp />} />
      </Routes>
    </div>

  );
}

export default App;