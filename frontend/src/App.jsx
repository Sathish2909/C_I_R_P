import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage/HomePage";
import AboutUs from "./components/AboutUs/AboutUs";
import TextShpere from "./components/TextShpere/TextShpere";
import Ideas from "./components/Ideas/Ideas";
import ContactForm from "./components/ContactForm/ContactForm";
import DevelopersSection from "./components/Developers/Developers";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <AboutUs/>
      <Ideas />
      <TextShpere />
      <ContactForm/>
      <DevelopersSection />
      <Footer/>
    </Router>
  );
}

export default App;