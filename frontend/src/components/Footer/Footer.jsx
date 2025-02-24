import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footerup">
        <div className="logoleft">
          <div className="flogo">
            <svg viewBox="0 0 85 103" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 1H1V25C1 25 36.5 23.5 45.5 25C54.5 26.5 55 32 55 36C55 40 51.5504 46.0249 45.5 46H29V65H32.5L52.5 102.5H84L61.5 62.5C77.5976 55.9167 85.5 47.5 83 27.5C80.5 7.5 55 0.999994 50 1Z" fill="#E7EAEE"/>
            </svg>
          </div>
          <span>3R ( Reduce, Reuse, Recycle ) + 1R ( Redivivus ) for a better future
          </span>
        </div>
        <div className="finfo">
          <h3>Reach us</h3>
          <div className="reach-us">
            <p><img src="images/email.png" alt="email" />
              Email:ucoeproject@gmail.com</p>
            <p><img src="images/smartphone.png" alt="phone" />
              Phone:+91 9999999999</p>
            <p><img src="images/pin.png" alt="location" />
              Location:Mumbai</p>
          </div>
        </div>
        <div className="quicklinks">
          <ul>
            <li>
              <h3>Quicklinks</h3>
            </li>
            <li>About</li>
            <li>F.A.Q</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="footerdown">
        <div className="copyrights">
          <p>
            {new Date().getFullYear()}&copy; Redivivus.
          </p>
          <p>All Rights Reserved.</p>
          <em>(This website was created by the Dev Team for Miniproject 20-21 for SE-Computer Department, Universal College of Engineering)</em>
        </div>
      </div>
    </footer>
  );
};

export default Footer;