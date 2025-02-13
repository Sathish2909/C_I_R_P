import React from 'react';
import './ContactForm.css';

const ContactForm = () => {
  return (
    <section id="four">
      <h1 id="even-h1">Contact-me</h1>
      <div className="contact-us">
        <form 
          className="gform" 
          method="POST" 
          data-email="ucoeproject@gmail.com" 
          name="google-sheet"
        >
          <div className="cnt-bx">
            <input 
              type="text" 
              id="name" 
              className="name" 
              name="name" 
              required="required"
            />
            <span>Full Name(XYZ)</span>
          </div>
          <div className="cnt-bx">
            <input 
              type="text" 
              id="email" 
              className="email" 
              name="email" 
              required="required"
            />
            <span>Email Address(xyz@email.com)</span>
          </div>
          <div className="cnt-bx">
            <textarea 
              name="message" 
              className="message" 
              id="message" 
              cols="80" 
              rows="10" 
              required="required"
            ></textarea>
            <span>Comments/Suggestions/Complaints</span>
          </div>
          <button 
            className="cnt-btn" 
            type="submit" 
            id="contact" 
            onClick={() => window.location.href = 'index.html'}
          >
            Submit
          </button>
        </form>
      </div>

      {/* mobile view code for contact form */}
      <div className="contact-us-mob">
        <div className="contact-us-form">
          <form 
            className="gform" 
            method="POST" 
            data-email="ucoeproject@gmail.com" 
            name="google-sheet"
          >
            <div className="cnt-img-mob">
              <img src="images/contact-image.svg" alt="Connect Image" />
            </div>
            <label htmlFor="fname">Full Name</label>
            <input 
              type="text" 
              id="fname" 
              name="fullname" 
              placeholder="Name"
            />

            <label htmlFor="email">Email Id</label>
            <input 
              type="text" 
              id="email" 
              className="email" 
              name="email" 
              placeholder="xyz@email.com" 
              required="required"
            />

            <label htmlFor="subject">Comments/Suggestions/Complaints</label>
            <textarea 
              id="subject" 
              name="subject" 
              placeholder="Comments....." 
              style={{ height: "200px" }}
            ></textarea>

            <button 
              className="cnt-mob-btn" 
              type="submit" 
              id="contact" 
              onClick={() => window.location.href = 'index.html'}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;