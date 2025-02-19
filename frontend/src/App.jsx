import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage/HomePage";
import TextShpere from "./components/TextShpere/TextShpere";
import Ideas from "./components/Ideas/Ideas";
import ContactForm from "./components/ContactForm/ContactForm";
import DevelopersSection from "./components/Developers/Developers";
import Navbar from "./components/navbar/navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Ideas />
      <TextShpere />
      <ContactForm/>
      <DevelopersSection />
    </Router>
  );
}

export default App;