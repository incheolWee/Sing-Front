import React from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout";
import HomePage from './pages/home_page'
import WorkPage from "./pages/work_page";
import SignPage from "./pages/sign_page";
import LandingPage from "./pages/landing_page";
import PDFSignatureApp from "./pages/test_page";
import PDFPage from "./pages/pdf_page";
import TrashPage from "./pages/trash_page";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/test" element={<PDFSignatureApp />} />
        <Route path="/pdf" element={<PDFPage />} />
        <Route path="/trash" element={<TrashPage />} />
      </Route>
      <Route path="/" element={<LandingPage />} />
    </Routes >
  );
}

export default App;
