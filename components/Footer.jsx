"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Footer = ({ site }) => {
  const projectImages = site?.footerProjectImages?.length
    ? site.footerProjectImages
    : ["/images/bathroom.jpg", "/images/room.jpg", "/images/inner-two2.jpg", "/images/outdoor-pro.jpg", "/images/living.jpg"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [projectImages.length]);

  const social = site?.socialLinks || {};
  const logo = site?.logo || "/images/ferrentino-logo.png";
  const siteName = site?.siteName || "Ferrentino & Son, LLC";
  const address = site?.address || "816 NE 31st Ave, Ocala, FL 34470, United States";
  const phone = site?.phone || "+1 352-237-3368";
  const email = site?.email || "estimating@ferrentinoandson.com";
  const bbbImage = "/images/CEP-Logo.png";
  const bbbImage1 = "/images/mcbi-logo.webp";
  const bbbImage2 = "/images/FHBA-logo.png";
  const bbbImage3 = "/images/nahb-logo.png";
  const copyrightText = site?.copyrightText || "Copyright © 2026 Ferrentino and Son, LLC. All Rights Reserved.";

  return (
    <footer className="footer-wrapper">
      <section className="project-mind-section">
        <div className="project-mind-container">
          <div className="project-mind-left reveal-zoom">
            <h2 className="project-mind-title">
              Have a project<br />in mind?
            </h2>
            <Link href="/contact" className="project-mind-btn">
              <div className="project-mind-arrow-circle">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <span>Book Your <br /> Consultation</span>
            </Link>
          </div>

          <div className="project-mind-right reveal-zoom" data-delay="200">
            <div className="project-mind-image-wrapper">
              <div className="project-mind-yellow-bg"></div>
              <div className="project-mind-image-box">
                {projectImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Project preview"
                    className={`project-mind-img ${index === currentImageIndex ? "active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="main-footer-section">
        <div className="main-footer-container">
          <div className="footer-header-row reveal-zoom">
            <div className="footer-logo">
              <img src={logo} alt={siteName} />
            </div>
            <div className="footer-social-icons">
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href={social.instagram || "#instagram"} aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href={social.linkedin || "#linkedin"} aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href={social.youtube || "#youtube"} aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-divider-line"></div>

          <div className="footer-content-row">
            <div className="footer-col footer-links-col reveal-zoom" data-delay="100">
              <ul className="footer-links-list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">Our Story</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/meet-the-builders">Meet The Builders</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/contractor">Subcontractor Application</Link></li>
                {/* <li><Link href="/ask-to-expert">Ask to Expert</Link></li> */}
                <li><Link href="/area-we-serve">Area We Serve</Link></li>
                <li><Link href="/testimonials">Testimonials</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-col footer-info-col reveal-zoom" data-delay="250">
              <p className="footer-address">{address}</p>
              <p className="footer-contact-item">
                <span className="yellow-label">Office:</span> {phone}
              </p>
              <p className="footer-contact-item">
                <span className="yellow-label">Email:</span> {email}
              </p>
              <div className="footer-bbb-wrapper" style={{display:"flex",flexDirection:"column",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:2}}>

                <a href="https://ocalacep.com/" target="_blank"><img src={bbbImage} alt="BBB Rating A+" className="footer-bbb-img" style={{backgroundColor:"white"}} /></a>
                <a href="https://mcbia.org/" target="_blank"><img src={bbbImage1} alt="BBB Rating A+" className="footer-bbb-img" style={{backgroundColor:"white"}}/></a>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:2}}>
                <a href="https://fhba.com/" target="_blank"><img src={bbbImage2} alt="BBB Rating A+" className="footer-bbb-img" style={{backgroundColor:"white"}}/></a>
                <a href="https://www.nahb.org/" target="_blank"><img src={bbbImage3} alt="BBB Rating A+" className="footer-bbb-img" style={{backgroundColor:"black"}}/></a>
                </div>
              </div>
            </div>

            <div className="footer-col footer-newsletter-col reveal-zoom" data-delay="400">
              <h4 className="newsletter-title">Subscribe to our newsletter</h4>
              <p className="newsletter-desc">
                join our newsletter to receive latest industry news, updates and insights from our team Ferrentino & Son.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter Your Email....."
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-copyright-bar">
          <div className="footer-copyright-container">
            <p>{copyrightText}</p>
            <div className="footer-legal-links">
              <a href="/privacy-and-policy">Privacy Policy</a>
              <span className="separator">|</span>
              <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
