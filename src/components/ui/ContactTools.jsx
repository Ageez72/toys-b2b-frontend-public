'use client'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ContactTools = () => {
  const [showButton, setShowButton] = useState(false);
  const [profile, setProfile] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setMounted(true);

    // Setup scroll listener
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Read cookie on client only
    const profileCookie = Cookies.get('profile');
    if (profileCookie) {
      try {
        setProfile(JSON.parse(profileCookie));
      } catch (e) {
        console.error('Invalid profile cookie:', e);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleOpen = (e) => {
    e.stopPropagation();
    document.querySelector(".socials")?.classList.toggle("open");
    document.querySelector(".contact-tools")?.classList.toggle("open");
  };

  function getWhatsAppLink(phone) {
  // Remove any non-digit characters for safety
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('962')) {
    // If it starts with +962 or 00962 (cleaned becomes 962...)
    return `https://wa.me/+${cleaned}`;
  } else if (cleaned.startsWith('00962')) {
    return `https://wa.me/+${cleaned.slice(2)}`; // remove the 00
  } else {
    // Default to adding +962 before the number
    return `https://wa.me/+962${cleaned}`;
  }
}


  if (!mounted) return null; // prevent rendering until mounted
  
  return (
    <div className='contact-tools'>
      <button onClick={scrollToTop} className={`back-to-top circle-icon-container ${showButton ? "show" : "not-allowed"}`}>
        <i className="icon-arrow-up"></i>
      </button>
      {
        profile?.contactEmail || profile?.contactPhone && (
      <div className='contact-link circle-icon-container contact-btn' onClick={toggleOpen}>
        <i className="icon-multiplication-sign close"></i>
        <i className="icon-call-center call"></i>
      </div>
        )
      }
      {
        profile?.contactEmail || profile?.contactPhone && (
          <div className="socials">
            {
              profile?.contactEmail && (
                <a
                  href={`mailto:${profile?.contactEmail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='contact-link circle-icon-container mb-2 contact-email'
                >
                  <i className="icon-sms"></i>
                </a>
              )
            }
            {
              profile?.contactPhone && (
                <a
                  href={`${getWhatsAppLink(profile?.contactPhone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='contact-link circle-icon-container mb-2 contact-phone'
                >
                  <i className="icon-whatsapp-brands"></i>
                </a>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default ContactTools;
