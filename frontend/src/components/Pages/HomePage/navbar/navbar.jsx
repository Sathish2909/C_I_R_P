import React, { useEffect, useState, useRef } from "react";
import "./navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Refs for section elements
  const oneRef = useRef(null);
  const aboutUsRef = useRef(null);
  const twoRef = useRef(null);
  const textSphereRef = useRef(null);
  const fourRef = useRef(null);
  const devRef = useRef(null);

  // Refs for navigation elements
  const logoRef = useRef(null);
  const navlinksRef = useRef(null);
  const homeNavRef = useRef(null);
  const aboutUsNavRef = useRef(null);
  const ideasNavRef = useRef(null);
  const textSphereNavRef = useRef(null);
  const contactNavRef = useRef(null);
  const devNavRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout");
      localStorage.removeItem("token"); // Clear token from localStorage
      setIsLoggedIn(false); // Update login state
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:5000/api/users/check-auth", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsLoggedIn(response.data.isAuthenticated);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windoo = window.pageYOffset;

      if (!oneRef.current || !aboutUsRef.current || !twoRef.current || !textSphereRef.current || 
          !fourRef.current || !devRef.current) {
        return;
      }

      if (windoo >= oneRef.current.offsetTop && windoo < aboutUsRef.current.offsetTop) {
        homeNavRef.current.setAttribute("id", "active");
        aboutUsNavRef.current.removeAttribute("id");
        ideasNavRef.current.removeAttribute("id");
        textSphereNavRef.current.removeAttribute("id");
        contactNavRef.current.removeAttribute("id");
        devNavRef.current.removeAttribute("id");
        logoRef.current.removeAttribute("id", "blue");
      } else if (windoo >= aboutUsRef.current.offsetTop && windoo < twoRef.current.offsetTop) {
        aboutUsNavRef.current.setAttribute("id", "active6");
        homeNavRef.current.removeAttribute("id");
        ideasNavRef.current.removeAttribute("id");
        textSphereNavRef.current.removeAttribute("id");
        contactNavRef.current.removeAttribute("id");
        devNavRef.current.removeAttribute("id");
        logoRef.current.setAttribute("id", "blue");
      } else if (windoo >= twoRef.current.offsetTop && windoo < textSphereRef.current.offsetTop) {
        ideasNavRef.current.setAttribute("id", "active2");
        homeNavRef.current.removeAttribute("id");
        aboutUsNavRef.current.removeAttribute("id");
        textSphereNavRef.current.removeAttribute("id");
        contactNavRef.current.removeAttribute("id");
        devNavRef.current.removeAttribute("id");
        logoRef.current.setAttribute("id", "blue");
      } else if (windoo >= textSphereRef.current.offsetTop && windoo < fourRef.current.offsetTop) {
        textSphereNavRef.current.setAttribute("id", "active3");
        homeNavRef.current.removeAttribute("id");
        aboutUsNavRef.current.removeAttribute("id");
        ideasNavRef.current.removeAttribute("id");
        contactNavRef.current.removeAttribute("id");
        devNavRef.current.removeAttribute("id");
        logoRef.current.removeAttribute("id", "blue");
      } else if (windoo >= fourRef.current.offsetTop && windoo < devRef.current.offsetTop) {
        contactNavRef.current.setAttribute("id", "active4");
        homeNavRef.current.removeAttribute("id");
        aboutUsNavRef.current.removeAttribute("id");
        ideasNavRef.current.removeAttribute("id");
        textSphereNavRef.current.removeAttribute("id");
        devNavRef.current.removeAttribute("id");
        logoRef.current.setAttribute("id", "blue");
      } else if (windoo >= devRef.current.offsetTop) {
        devNavRef.current.setAttribute("id", "active5");
        homeNavRef.current.removeAttribute("id");
        aboutUsNavRef.current.removeAttribute("id");
        ideasNavRef.current.removeAttribute("id");
        textSphereNavRef.current.removeAttribute("id");
        contactNavRef.current.removeAttribute("id");
        logoRef.current.removeAttribute("id", "blue");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logobox">
        <svg className="logo" ref={logoRef} viewBox="0 0 85 103" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 1H1V25C1 25 36.5 23.5 45.5 25C54.5 26.5 55 32 55 36C55 40 51.5504 46.0249 45.5 46H29V65H32.5L52.5 102.5H84L61.5 62.5C77.5976 55.9167 85.5 47.5 83 27.5C80.5 7.5 55 0.999994 50 1Z"/>
        </svg>
      </div>
      <div className={menuOpen ? "openPage" : "navlinks"} id="navlinks" ref={navlinksRef}>
        <a className="one" href="#one" ref={homeNavRef}>Home</a>
        <a className="aboutUs" href="#aboutUs" ref={aboutUsNavRef}>About Us</a>
        <a className="two" href="#two" ref={ideasNavRef}>Ideas</a>
        <a className="three" href="#TextShpere" ref={textSphereNavRef}>TextShpere</a>
        <a className="four" href="#four" ref={contactNavRef}>Contact</a>
        <a className="five" href="#dev" ref={devNavRef}>Dev</a>
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="login-button" onClick={handleLogin}>Login</button>
        )}
      </div>
      <div className="ham-right">
        <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} id="hamburger-menu" onClick={toggleMenu}>
          <svg viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="top-line" d="M0 1H11H22" stroke="#E7EAEE"/>
            <line id="bottom-line" y1="22.5" x2="22" y2="22.5" stroke="#E7EAEE"/>
            <line id="middle-line" y1="11.5" x2="22" y2="11.5" stroke="#E7EAEE"/>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;