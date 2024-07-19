import React from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout";
import HomePage from './pages/home_page'
import WorkPage from "./pages/work_page";

import LandingPage from "./pages/landing_page";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
         <Route path="/work" element={<SignPage />} />
      </Route>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
