import { useState, useEffect } from 'react';
import './style/style.css';
import {Link} from 'react-router-dom';
import logoImg from '../assets/ferrentino-logo.png';
import bbbLogo from '../assets/footer-business.png';
import bathroomImg from '../assets/bathroom.jpg';
import roomImg from '../assets/room.jpg';
import innerTwoImg from '../assets/inner-two2.jpg';
import outdoorProImg from '../assets/outdoor-pro.jpg';
import livingImg from '../assets/living.jpg';

const projectImages = [
    bathroomImg,
    roomImg,
    innerTwoImg,
    outdoorProImg,
    livingImg,
];

const Footer = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Loop project images every 1.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="footer-wrapper">
            {/* Have a Project in Mind Section */}
            <section className="project-mind-section">
                <div className="project-mind-container">
                    {/* Left Column: Heading & CTA */}
                    <div className="project-mind-left reveal-zoom">
                        <h2 className="project-mind-title">
                            Have a project<br />in mind?
                        </h2>
                        <Link to="/contact" className="project-mind-btn">
                            <div className="project-mind-arrow-circle">
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                            <span>Book Your <br/> Consultation</span>
                        </Link>
                    </div>

                    {/* Right Column: Image block with yellow offset accent */}
                    <div className="project-mind-right reveal-zoom" data-delay="200">
                        <div className="project-mind-image-wrapper">
                            <div className="project-mind-yellow-bg"></div>
                            <div className="project-mind-image-box">
                                {projectImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt="Project preview"
                                        className={`project-mind-img ${index === currentImageIndex ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Footer Section */}
            <section className="main-footer-section">
                <div className="main-footer-container">
                    {/* Header Row: Logo & Social Icons */}
                    <div className="footer-header-row reveal-zoom">
                        <div className="footer-logo">
                            <img src={logoImg} alt="Ferrentino & Son, LLC" />
                        </div>
                        <div className="footer-social-icons">
                            <a href="https://www.facebook.com/ferrentinoandson/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#instagram" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#linkedin" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="#youtube" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>

                    <div className="footer-divider-line"></div>

                    {/* Content Columns Row */}
                    <div className="footer-content-row">
                        {/* Col 1: Links */}
                        <div className="footer-col footer-links-col reveal-zoom" data-delay="100">
                            <ul className="footer-links-list">
                                <li><a href="/">Home</a></li>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/services">Services</a></li>
                                <li><a href="/meet-the-builders">Meet The Builders</a></li>
                                <li><a href="/projects">Projects</a></li>
                                <li><a href="/contractor">Contractor</a></li>
                                <li><a href="/contact">Contact</a></li>
                              
                            </ul>
                        </div>

                        {/* Col 2: Contact Info & BBB Rating */}
                        <div className="footer-col footer-info-col reveal-zoom" data-delay="250">
                            <p className="footer-address">
                                816 NE 31st Ave, Ocala,<br />
                                FL 34470, United States
                            </p>
                            <p className="footer-contact-item">
                                <span className="yellow-label">Office:</span> (352) 237-3368
                            </p>
                            <p className="footer-contact-item">
                                <span className="yellow-label">Email:</span> estimating@ferrentinoandson.com
                            </p>
                            <div className="footer-bbb-wrapper">
                                <img src={bbbLogo} alt="BBB Rating A+" className="footer-bbb-img" />
                            </div>
                        </div>

                        {/* Col 3: Newsletter Form */}
                        <div className="footer-col footer-newsletter-col reveal-zoom" data-delay="400">
                            <h4 className="newsletter-title">Subscribe to our newsletter</h4>
                            <p className="newsletter-desc">
                                join our newsletter to receive latest industry news, updates and insights from our team at Ever Built.
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

                {/* Copyright Bar */}
                <div className="footer-copyright-bar">
                    <div className="footer-copyright-container">
                        <p>Copyright &copy; 2026 Ferrentino and Son, LLC. All Rights Reserved.</p>
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
