"use client"
import React, { useState, useEffect } from 'react';

const ContactTools = () => {
  const [showButton, setShowButton] = useState(false);

  // Show "Back to Top" button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleOpen = (e) => {
    e.stopPropagation()
    document.querySelector(".socials").classList.toggle("open");
    document.querySelector(".contact-tools").classList.toggle("open");
  }

  return (
    <div className='contact-tools'>
      <button onClick={scrollToTop} className={`back-to-top circle-icon-container ${showButton ? "show" : "not-allowed"}`}>
        <i className="icon-arrow-up"></i>
      </button>
      <div className='contact-link circle-icon-container contact-btn' onClick={(e) => toggleOpen(e)}>
        <i class="icon-multiplication-sign close" onClick={(e) => toggleOpen(e)}></i>
        <i className="icon-call-center call" onClick={(e) => toggleOpen(e)}></i>
      </div>

      <div className="socials">
        <a
          href="mailto:youremail@example.com"
          target="_blank"
          rel="noopener noreferrer"
          className='contact-link circle-icon-container mb-2 contact-email'
        >
          <i className="icon-sms"></i>
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className='contact-link circle-icon-container contact-whatsapp'
        >
          <i className="icon-whatsapp-brands"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactTools;
