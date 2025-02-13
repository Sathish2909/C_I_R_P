import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage/HomePage";
import TextShpere from "./components/TextShpere/TextShpere";
import Ideas from "./components/Ideas/Ideas";
import ContactForm from "./components/ContactForm/ContactForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Ideas />
      <TextShpere />
      <ContactForm/>
    </Router>
  );
}

export default App;