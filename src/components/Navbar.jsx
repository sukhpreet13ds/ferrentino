import React, { useState, useEffect } from 'react';
import './style/style.css';
import logo from '../assets/ferrentino-logo.png';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="site-header">
            {/* Top Utility Bar */}
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="top-bar-right">
                        <div className="social-icons">
                            <a href="#facebook" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#instagram" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#linkedin" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="#youtube" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                        <div className="top-contact-item">
                            <i className="fa-solid fa-phone icon-yellow"></i>
                            <a href="tel:+13522373368">+1 352-237-3368</a>
                        </div>
                        <div className="top-contact-item">
                            <i className="fa-solid fa-envelope icon-yellow"></i>
                            <a href="mailto:estimating@ferrentinoandson.com">estimating@ferrentinoandson.com</a>
                        </div>
                        <div className="lang-select">
                            <a href="#en" className="lang-link">EN</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="main-navbar">
                <div className="navbar-container">
                    {/* Logo */}
                    <div className="nav-logo">
                        <a href="/">
                            <img src={logo} alt="Ferrentino & Son, LLC" />
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <a href="#about" className="nav-link">
                                <span className="nav-sub">Ferrentino <span className="highlight-yellow">& Son</span> </span>
                                <span className="nav-main">About Us</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#residential" className="nav-link">
                                <span className="nav-sub">Live<span className="highlight-yellow">Well</span></span>
                                <span className="nav-main">Residential</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#commercial" className="nav-link">
                                <span className="nav-sub">Work<span className="highlight-yellow">Well</span></span>
                                <span className="nav-main">Commercial</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#projects" className="nav-link nav-link-single">Projects</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contractor" className="nav-link nav-link-single">Contractor</a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link nav-link-single">Contact</a>
                        </li>
                        <li className="nav-item nav-consultation">
                            <i className="fa-solid fa-phone icon-yellow consultation-icon"></i>
                            <a href="#consultation" className="consultation-text">
                                Book Your Design Consultation
                            </a>
                        </li>
                    </ul>

                    {/* Mobile Hamburger Button */}
                    <button 
                        className="mobile-hamburger-btn" 
                        onClick={toggleMobileMenu}
                        aria-label="Toggle navigation menu"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Nav Side Panel (Full Overlay) */}
            <div className={`mobile-nav-panel ${isMobileMenuOpen ? 'open' : ''}`}>
                {/* Background image overlay */}
                <div className="mobile-nav-bg"></div>

                {/* Content layer */}
                <div className="mobile-nav-content">
                    {/* Header: Logo left, EN + Cross icon right */}
                    <div className="mobile-nav-header">
                        <div className="mobile-logo">
                            <img src={logo} alt="Ferrentino & Son" />
                        </div>
                        <div className="mobile-header-actions">
                            <a href="#en" className="mobile-lang-btn">EN</a>
                            <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Close menu">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>

                    {/* 4 Social Icons in one row */}
                    <div className="mobile-social-row">
                        <a href="#facebook" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#instagram" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#linkedin" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="#youtube" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                    </div>

                    {/* Horizontal Divider line */}
                    <hr className="mobile-nav-divider" />

                    {/* Nav items list left aligned large text */}
                    <ul className="mobile-menu-list">
                        <li><a href="#about" onClick={closeMobileMenu}>About Us</a></li>
                        <li><a href="#residential" onClick={closeMobileMenu}>Residential</a></li>
                        <li><a href="#commercial" onClick={closeMobileMenu}>Commercial</a></li>
                        <li><a href="#projects" onClick={closeMobileMenu}>Projects</a></li>
                        <li><a href="#contractor" onClick={closeMobileMenu}>Contractor</a></li>
                        <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
                    </ul>

                    {/* Featured Design Consultation CTA Block */}
                    <div className="mobile-consultation-container">
                        <a href="#consultation" className="mobile-consultation-card" onClick={closeMobileMenu}>
                            <div className="consultation-card-icon">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="consultation-card-info">
                                <span className="consultation-card-title">Book Your Design Consultation</span>
                                <span className="consultation-card-subtitle">Connect with our construction team</span>
                            </div>
                            <i className="fa-solid fa-chevron-right consultation-card-arrow"></i>
                        </a>
                    </div>

                    {/* Footer with contact number & email */}
                    <div className="mobile-nav-footer">
                        <div className="mobile-contact-item">
                            <i className="fa-solid fa-phone icon-yellow"></i>
                            <a href="tel:+13522373368">+1 352-237-3368</a>
                        </div>
                        <div className="mobile-contact-item">
                            <i className="fa-solid fa-envelope icon-yellow"></i>
                            <a href="mailto:estimating@ferrentinoandson.com">estimating@ferrentinoandson.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;