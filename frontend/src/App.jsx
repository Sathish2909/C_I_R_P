import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from "./components/Pages/HomePage/Home/Home";
import AboutUs from "./components/Pages/HomePage/AboutUs/AboutUs";
import TextShpere from "./components/Pages/HomePage/TextShpere/TextShpere";
import Ideas from "./components/Pages/HomePage/Ideas/Ideas";
import ContactForm from "./components/Pages/HomePage/ContactForm/ContactForm";
import DevelopersSection from "./components/Pages/HomePage/Developers/Developers";
import Navbar from "./components/Pages/HomePage/navbar/navbar";
import Footer from "./components/Pages/HomePage/Footer/Footer";
import DomainPage from "./components/Pages/DomainPage/DomainPage";
import TitlePage from "./components/Pages/TitlePage/TitlePage"; // Import TitlePage
import ProjectPage from "./components/Pages/ProjectPage/ProjectPage"; // Import ProjectPage
=======
import Login from "./components/Login";
import HomePage from "./components/HomePage/HomePage";
import AboutUs from "./components/AboutUs/AboutUs";
import TextShpere from "./components/TextShpere/TextShpere";
import Ideas from "./components/Ideas/Ideas";
import ContactForm from "./components/ContactForm/ContactForm";
import DevelopersSection from "./components/Developers/Developers";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/Footer/Footer";
import IdeaPage from "./components/IdeaPage";
>>>>>>> 3b1ae00a0bec47426fe2cc08582447eede55a2a5

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <AboutUs />
              <Ideas />
              <TextShpere />
              <ContactForm />
              <DevelopersSection />
              <Footer />
            </>
          }
        />
        <Route path="/domains" element={<DomainPage />} />
        {/* Add routes for TitlePage and ProjectPage */}
        <Route path="/domains/:domainId/:level" element={<TitlePage />} />
        <Route path="/domains/:domainId/:level/:topicId" element={<ProjectPage />} />
      </Routes>
=======
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ideas-page" element={<IdeaPage />} />
      </Routes>
      <AboutUs />
      <Ideas />
      <TextShpere />
      <ContactForm />
      <DevelopersSection />
      <Footer />
>>>>>>> 3b1ae00a0bec47426fe2cc08582447eede55a2a5
    </Router>
  );
}

export default App;
