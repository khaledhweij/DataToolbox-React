import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import DocumentsPage from "./DocumentsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/DocumentsPage" element={<DocumentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;