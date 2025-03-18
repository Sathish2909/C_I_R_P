import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/HomePage/Home/Home";
import AboutUs from "./components/Pages/HomePage/AboutUs/AboutUs";
import TextShpere from "./components/Pages/HomePage/TextShpere/TextShpere";
import Ideas from "./components/Pages/HomePage/Ideas/Ideas";
import ContactForm from "./components/Pages/HomePage/ContactForm/ContactForm";
import DevelopersSection from "./components/Pages/HomePage/Developers/Developers";
import Navbar from "./components/Pages/HomePage/navbar/navbar";
import Footer from "./components/Pages/HomePage/Footer/Footer";
import DomainPage from "./components/Pages/DomainPage/DomainPage";
import TitlePage from "./components/Pages/TitlePage/TitlePage";
import ProjectPage from "./components/Pages/ProjectPage/ProjectPage";
import AddDomain from "./components/Pages/DomainPage/AddDomain";
import AddProject from "./components/Pages/TitlePage/AddProject";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
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

        {/* Domain Pages */}
        <Route path="/domains" element={<DomainPage />} />
        <Route path="/domains/:domainId/:level" element={<TitlePage />} />
        <Route path="/domains/:domainId/:level/:topicId" element={<ProjectPage />} />

        {/* Add Domain and Add Project Pages */}
        <Route path="/add-domain" element={<AddDomain />} />
        <Route path="/domains/:domainId/:level/add-project" element={<AddProject />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 Page (Fallback) */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;