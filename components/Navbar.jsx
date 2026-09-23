"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = ({ site }) => {
  const pathname = usePathname();
  const isDarkNavbarPage = pathname === "/estimator" || pathname?.startsWith("/projects/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileExtraOpen, setIsMobileExtraOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileExtraOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileExtraOpen(false);
  };

  const phone = site?.phone || "+1 352-237-3368";
  const email = site?.email || "estimating@ferrentinoandson.com";
  const social = site?.socialLinks || {};
  const logo = site?.logo || "/images/ferrentino-logo.png";
  const siteName = site?.siteName || "Ferrentino & Son, LLC";

  return (
    <header className={`site-header ${isDarkNavbarPage ? "site-header-dark-text" : ""} ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-right">
            <div className="social-icons">
              <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
              <a href={social.instagram || "#instagram"} aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href={social.linkedin || "#linkedin"} aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href={social.youtube || "#youtube"} aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
            <div className="top-contact-item">
              <i className="fa-solid fa-phone icon-yellow"></i>
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
            </div>
            <div className="top-contact-item">
              <i className="fa-solid fa-envelope icon-yellow"></i>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="lang-select">
              <a href="#en" className="lang-link">EN</a>
            </div>
          </div>
        </div>
      </div>

      <nav className="main-navbar">
        <div className="navbar-container">
          <div className="nav-logo">
            <Link href="/">
              <img src={logo} alt={siteName} />
            </Link>
          </div>

          <ul className="nav-menu">
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                <span className="nav-sub">Ferrentino <span className="highlight-yellow">& Son</span> </span>
                <span className="nav-main">Our Story</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services" className="nav-link">
                <span className="nav-sub">Our<span className="highlight-yellow"> Work</span></span>
                <span className="nav-main">Services</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/meet-the-builders" className="nav-link">
                <span className="nav-sub">Meet<span className="highlight-yellow"> The</span></span>
                <span className="nav-main">Builders</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/projects" className="nav-link nav-link-single">Projects</Link>
            </li>
            <li className="nav-item">
              <Link href="/estimator" className="nav-link nav-link-single">Project Estimator</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link nav-link-single">Contact</Link>
            </li>

            <li className="nav-item nav-dropdown-wrapper" ref={dropdownRef}>
              <button
                className={`nav-grip-btn ${isDropdownOpen ? "active" : ""}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="More Pages"
                aria-expanded={isDropdownOpen}
              >
                <i className="fa-solid fa-grip-lines"></i>
              </button>
              <div className={`nav-dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
                <Link href="/contractor" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                  <span>Subcontractor Application</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
                <Link href="/ask-to-expert" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                  <span>Ask to Expert</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
                <Link href="/area-we-serve" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                  <span>Area We Serve</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
                <Link href="/testimonials" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                  <span>Testimonials</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </Link>
              </div>
            </li>

            <li className="nav-item nav-consultation">
              <i className="fa-solid fa-phone icon-yellow consultation-icon"></i>
              <Link href="/contact" className="consultation-text">
                Book Your Design Consultation
              </Link>
            </li>
          </ul>

          <button
            className="mobile-hamburger-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>

      <div className={`mobile-nav-panel ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-bg"></div>

        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <div className="mobile-logo">
              <img src={logo} alt={siteName} />
            </div>
            <div className="mobile-header-actions">
              <a href="#en" className="mobile-lang-btn">EN</a>
              <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Close menu">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div className="mobile-social-bar-container">
            <div className="mobile-social-row">
              <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
              <a href={social.instagram || "#instagram"} aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href={social.linkedin || "#linkedin"} aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href={social.youtube || "#youtube"} aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
            <button
              className={`mobile-grip-toggle-btn ${isMobileExtraOpen ? "active" : ""}`}
              onClick={() => setIsMobileExtraOpen(!isMobileExtraOpen)}
              aria-label="Toggle extra pages"
            >
              <i className="fa-solid fa-grip-lines"></i>
            </button>
          </div>

          <div className={`mobile-extra-dropdown ${isMobileExtraOpen ? "open" : ""}`}>
            <div className="mobile-extra-header-badge">More Pages</div>
            <ul className="mobile-extra-links-list">
              <li>
                <Link href="/contractor" onClick={closeMobileMenu}>
                  <span>Subcontractor Application</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link href="/ask-to-expert" onClick={closeMobileMenu}>
                  <span>Ask to Expert</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link href="/area-we-serve" onClick={closeMobileMenu}>
                  <span>Area We Serve</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link href="/testimonials" onClick={closeMobileMenu}>
                  <span>Testimonials</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </div>

          <hr className="mobile-nav-divider" />

          <ul className="mobile-menu-list">
            <li><Link href="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link href="/about" onClick={closeMobileMenu}>Our Story</Link></li>
            <li><Link href="/services" onClick={closeMobileMenu}>Services</Link></li>
            <li><Link href="/meet-the-builders" onClick={closeMobileMenu}>Meet The Builders</Link></li>
            <li><Link href="/projects" onClick={closeMobileMenu}>Projects</Link></li>
            <li><Link href="/estimator" onClick={closeMobileMenu}>Project Estimator</Link></li>
            <li><Link href="/contact" onClick={closeMobileMenu}>Contact</Link></li>
          </ul>

          <div className="mobile-consultation-container">
            <Link href="/contact" className="mobile-consultation-card" onClick={closeMobileMenu}>
              <div className="consultation-card-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="consultation-card-info">
                <span className="consultation-card-title">Book Your Design Consultation</span>
                <span className="consultation-card-subtitle">Connect with our construction team</span>
              </div>
              <i className="fa-solid fa-chevron-right consultation-card-arrow"></i>
            </Link>
          </div>

          <div className="mobile-nav-footer">
            <div className="mobile-contact-item">
              <i className="fa-solid fa-phone icon-yellow"></i>
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
            </div>
            <div className="mobile-contact-item">
              <i className="fa-solid fa-envelope icon-yellow"></i>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
