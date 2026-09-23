import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './style/style.css';
import logo from '../assets/ferrentino-logo.png';

const Navbar = () => {
    const location = useLocation();
    const isDarkNavbarPage = location.pathname === '/estimator' || location.pathname === '/project-view';
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

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close desktop dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close menus when route changes
    useEffect(() => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileExtraOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileExtraOpen(false);
    };

    return (
        <header className={`site-header ${isDarkNavbarPage ? 'site-header-dark-text' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
            {/* Top Utility Bar */}
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="top-bar-right">
                        <div className="social-icons">
                            <a href="https://www.facebook.com/ferrentinoandson/" aria-label="Facebook" target='_blank' rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
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
                        <Link to="/">
                            <img src={logo} alt="Ferrentino & Son, LLC" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                <span className="nav-sub">Ferrentino <span className="highlight-yellow">& Son</span> </span>
                                <span className="nav-main">Our Story</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="nav-link">
                                <span className="nav-sub">Our<span className="highlight-yellow"> Work</span></span>
                                <span className="nav-main">Services</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/meet-the-builders" className="nav-link">
                                <span className="nav-sub">Meet<span className="highlight-yellow"> The</span></span>
                                <span className="nav-main">Builders</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/projects" className="nav-link nav-link-single">Projects</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/estimator" className="nav-link nav-link-single">Project Estimator</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link nav-link-single">Contact</Link>
                        </li>
                        
                        {/* More Pages Dropdown (FontAwesome Grip Lines Icon) */}
                        <li className="nav-item nav-dropdown-wrapper" ref={dropdownRef}>
                            <button
                                className={`nav-grip-btn ${isDropdownOpen ? 'active' : ''}`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-label="More Pages"
                                aria-expanded={isDropdownOpen}
                            >
                                <i className="fa-solid fa-grip-lines"></i>
                            </button>
                            <div className={`nav-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                                <Link to="/contractor" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                                    <span>Subcontractor Application</span>
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                </Link>
                                <Link to="/ask-to-expert" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                                    <span>Ask to Expert</span>
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                </Link>
                                <Link to="/area-we-serve" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                                    <span>Area We Serve</span>
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                </Link>
                                <Link to="/testimonials" className="nav-dropdown-link" onClick={() => setIsDropdownOpen(false)}>
                                    <span>Testimonials</span>
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item nav-consultation">
                            <i className="fa-solid fa-phone icon-yellow consultation-icon"></i>
                            <Link to="/contact" className="consultation-text">
                                Book Your Design Consultation
                            </Link>
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

                    {/* Social Icons row + FontAwesome Grip Lines Icon on Right */}
                    <div className="mobile-social-bar-container">
                        <div className="mobile-social-row">
                            <a href="https://www.facebook.com/ferrentinoandson/" aria-label="Facebook" target='_blank' rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#instagram" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#linkedin" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="#youtube" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                        <button
                            className={`mobile-grip-toggle-btn ${isMobileExtraOpen ? 'active' : ''}`}
                            onClick={() => setIsMobileExtraOpen(!isMobileExtraOpen)}
                            aria-label="Toggle extra pages"
                        >
                            <i className="fa-solid fa-grip-lines"></i>
                        </button>
                    </div>

                    {/* Expandable Extra Pages on Mobile when grip icon clicked */}
                    <div className={`mobile-extra-dropdown ${isMobileExtraOpen ? 'open' : ''}`}>
                        <div className="mobile-extra-header-badge">More Pages</div>
                        <ul className="mobile-extra-links-list">
                            <li>
                                <Link to="/contractor" onClick={closeMobileMenu}>
                                    <span>Subcontractor Application</span>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/ask-to-expert" onClick={closeMobileMenu}>
                                    <span>Ask to Expert</span>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/area-we-serve" onClick={closeMobileMenu}>
                                    <span>Area We Serve</span>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/testimonials" onClick={closeMobileMenu}>
                                    <span>Testimonials</span>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Horizontal Divider line */}
                    <hr className="mobile-nav-divider" />

                    {/* Nav items list left aligned large text */}
                    <ul className="mobile-menu-list">
                        <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
                        <li><Link to="/about" onClick={closeMobileMenu}>Our Story</Link></li>
                        <li><Link to="/services" onClick={closeMobileMenu}>Services</Link></li>
                        <li><Link to="/meet-the-builders" onClick={closeMobileMenu}>Meet The Builders</Link></li>
                        <li><Link to="/projects" onClick={closeMobileMenu}>Projects</Link></li>
                        <li><Link to="/estimator" onClick={closeMobileMenu}>Project Estimator</Link></li>
                        <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
                    </ul>

                    {/* Featured Design Consultation CTA Block */}
                    <div className="mobile-consultation-container">
                        <Link to="/contact" className="mobile-consultation-card" onClick={closeMobileMenu}>
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