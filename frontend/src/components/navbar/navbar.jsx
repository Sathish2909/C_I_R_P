import React, { useEffect, useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navlinks a');

    const handleScroll = () => {
      let currentSection = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3 && section.id) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveSection(currentSection);

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logobox">
        <svg className="logo" viewBox="0 0 85 103" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 1H1V25C1 25 36.5 23.5 45.5 25C54.5 26.5 55 32 55 36C55 40 51.5504 46.0249 45.5 46H29V65H32.5L52.5 102.5H84L61.5 62.5C77.5976 55.9167 85.5 47.5 83 27.5C80.5 7.5 55 0.999994 50 1Z"/>
        </svg>
      </div>
      <div className="navlinks" id="navlinks">
        <a href="#one" className={activeSection === 'one' ? 'active' : ''}>Home</a>
        <a href="#two" className={activeSection === 'two' ? 'active' : ''}>Ideas</a>
        <a href="#TextShpere" className={activeSection === 'TextShpere' ? 'active' : ''}>TextShpere</a>
        <a href="#four" className={activeSection === 'four' ? 'active' : ''}>Contact</a>
        <a href="#dev" className={activeSection === 'dev' ? 'active' : ''}>Dev</a>
      </div>
      <div className="ham-right">
        <div className="hamburger-menu" id="hamburger-menu">
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



/*import React from 'react';
import './navbar.css';

const Navbar = () => {
  const toggleMenu = () => {
    const navlinks = document.getElementById('navlinks');
    const hamburger = document.getElementById('hamburger-menu');
    
    navlinks.classList.toggle('openPage');
    hamburger.classList.toggle('open');
  };

  return (
    <nav className="navbar">
      <div className="logobox">
        <svg className="logo" viewBox="0 0 85 103" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 1H1V25C1 25 36.5 23.5 45.5 25C54.5 26.5 55 32 55 36C55 40 51.5504 46.0249 45.5 46H29V65H32.5L52.5 102.5H84L61.5 62.5C77.5976 55.9167 85.5 47.5 83 27.5C80.5 7.5 55 0.999994 50 1Z"/>
        </svg>
      </div>
      <div className="navlinks" id="navlinks">
        <a className="one" href="#one">Home</a>
        <a className="two" href="#two">Ideas</a>
        <a className="three" href="#TextShpere">TextShpere</a>
        <a className="four" href="#four">Contact</a>
        <a className="five" href="#dev">Dev</a>
      </div>
      <div className="ham-right">
        <div 
          className="hamburger-menu"
          id="hamburger-menu"
          onClick={toggleMenu}
        >
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

export default Navbar;*/