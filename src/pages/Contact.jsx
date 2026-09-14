import { useState, useEffect } from 'react';
import './style/style.css';
import contactHeroBg from '../assets/contact-us-hero.jpg';
import SplitText from '../components/SplitText';
import Footer from '../components/Footer';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [selectedServices, setSelectedServices] = useState(['']);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const availableServices = [
        'New Custom Home',
        'Home Remodeling',
        'Commercial Build',
        'Additions & Extensions',
        'Roofing Service'
    ];

    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter((s) => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section
                className="contact-hero-section"
                style={{ backgroundImage: `url(${contactHeroBg})` }}
            >
                <div className="contact-hero-overlay"></div>

                <div className="contact-hero-container">
                    <div className="contact-hero-content">
                        <span className="contact-hero-tag">
                            <SplitText
                                text="CONTACT US"
                                className="contact-tag-text"
                                delay={40}
                                duration={0.85}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 20 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.01}
                                rootMargin="0px"
                                textAlign="left"
                                tag="span"
                            />
                        </span>

                        <h1 className="contact-hero-title">
                            <SplitText
                                text="Let’s Build"
                                className="contact-title-line"
                                delay={45}
                                duration={1.2}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.01}
                                rootMargin="0px"
                                textAlign="left"
                                tag="span"
                            />
                            <SplitText
                                text="Your Dream"
                                className="contact-title-line"
                                delay={45}
                                duration={1.2}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.01}
                                rootMargin="0px"
                                textAlign="left"
                                tag="span"
                            />
                        </h1>

                        <p className="contact-hero-desc">
                            You already know what you want your home to feel like. We help figure out how to make it real. Get in touch with our Ocala team today.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Contact Information & Form Section */}
            <section className="contact-main-section">
                <div className="contact-main-container">
                    {/* Left Column: Contact Information */}
                    <div className="contact-info-col">
                        <h2 className="contact-info-title">Contact Information</h2>
                        <p className="contact-info-sub">
                            Thinking about remodeling, renovating, or adding on? We’d love to hear what you have in mind.
                        </p>

                        <div className="contact-details-list">
                            <div className="contact-detail-item">
                                <div className="contact-icon-circle">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="contact-detail-text">
                                    <span className="detail-label">HQ Office Address</span>
                                    <span className="detail-value">816 NE 31st Ave, Ocala, FL 34470</span>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="contact-icon-circle">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div className="contact-detail-text">
                                    <span className="detail-label">Call or Text Office</span>
                                    <a href="tel:3522373368" className="detail-value-link">+1 (352) 237-3368</a>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="contact-icon-circle">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className="contact-detail-text">
                                    <span className="detail-label">Direct Estimation Email</span>
                                    <a href="mailto:estimating@ferrentinoandson.com" className="detail-value-link">estimating@ferrentinoandson.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Office Hours Box */}
                        <div className="office-hours-card">
                            <h3 className="office-hours-title">Office Hours</h3>
                            <div className="hours-row">
                                <span className="day-label">Monday – Friday</span>
                                <span className="time-value">8:00 AM – 5:00 PM</span>
                            </div>
                            <div className="hours-row">
                                <span className="day-label">Saturday</span>
                                <span className="time-value">By Appointment Only</span>
                            </div>
                            <div className="hours-row">
                                <span className="day-label">Sunday</span>
                                <span className="time-value status-closed">Closed</span>
                            </div>
                        </div>

                        {/* Locality Block */}
                        <div className="contact-locality-block">
                            <span className="locality-pill">LOCALITY</span>
                            <h3 className="contact-locality-title">Proudly Serving Central Florida</h3>
                            <p className="contact-locality-desc">
                                Rooted in Ocala, our fleets and project crews cover eight counties, delivering generational masonry, custom carpentry, and architectural finishes.
                            </p>
                            <div className="locality-counties-grid">
                                <ul>
                                    <li><span className="yellow-dot">•</span> Marion County</li>
                                    <li><span className="yellow-dot">•</span> Lake County</li>
                                    <li><span className="yellow-dot">•</span> Citrus County</li>
                                    <li><span className="yellow-dot">•</span> Sumter County</li>
                                </ul>
                                <ul>
                                    <li><span className="yellow-dot">•</span> Levy County</li>
                                    <li><span className="yellow-dot">•</span> Volusia County</li>
                                    <li><span className="yellow-dot">•</span> Putnam County</li>
                                    <li><span className="yellow-dot">•</span> Alachua County</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Card */}
                    <div className="contact-form-col">
                        <div className="contact-form-card">
                            <h2 className="form-card-title">Contact Our Team</h2>
                            <p className="form-card-sub">
                                Tell us about your upcoming project and a specialist will get back to you with next steps.
                            </p>

                            {isSubmitted && (
                                <div className="form-success-alert">
                                    <i className="fa-solid fa-circle-check"></i> Thank you! Your inquiry has been sent successfully. Our team will contact you shortly.
                                </div>
                            )}

                            <form className="inquiry-form" onSubmit={handleSubmit}>
                                <div className="form-row-two">
                                    <div className="form-group">
                                        <label>Your Name *</label>
                                        <input type="text" placeholder="John Doe" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number *</label>
                                        <input type="tel" placeholder="+1 (352) 555-0199" required />
                                    </div>
                                </div>

                                <div className="form-row-two">
                                    <div className="form-group">
                                        <label>Email Address *</label>
                                        <input type="email" placeholder="john@example.com" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Project Location (City/County) *</label>
                                        <input type="text" placeholder="Ocala / Marion County" required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>What services are you looking for? *</label>
                                    <div className="services-pills-container">
                                        {availableServices.map((service) => {
                                            const isSelected = selectedServices.includes(service);
                                            return (
                                                <button
                                                    key={service}
                                                    type="button"
                                                    className={`service-pill-btn ${isSelected ? 'active' : ''}`}
                                                    onClick={() => toggleService(service)}
                                                >
                                                    {isSelected && <i className="fa-solid fa-check check-icon"></i>}
                                                    {service}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Estimated Budget Range</label>
                                    <input type="text" placeholder="e.g. $150,000 - $300,000" />
                                </div>

                                <div className="form-group">
                                    <label>Project Details &amp; Vision</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Describe your dream project, specific ideas, or timeline constraints..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-submit-inquiry">
                                    <span>Submit Inquiry Details</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button>

                                <p className="privacy-note">
                                    * Your privacy is fully respected. Your details are safe with the Ferrentino family.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Map Section */}
            <section className="contact-map-section">
                <iframe
                    title="Ferrentino & Son, LLC Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4494.279644759225!2d-82.0943676!3d29.1955004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e62d6c82d40beb%3A0x97e5f30d1e18441f!2sFerrentino%20%26%20Son%2C%20LLC%20Remodeling%20and%20Renovations!5e1!3m2!1sen!2sin!4v1789386824838!5m2!1sen!2sin"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>

            {/* Bottom 3-Features Strip */}
            <section className="contact-features-strip">
                <div className="features-strip-container">
                    <div className="feature-strip-item">
                        <div className="feature-icon-badge">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <div className="feature-text">
                            <h4 className="feature-title">Generational Expertise</h4>
                            <p className="feature-sub">Serving Florida families since 1984</p>
                        </div>
                    </div>

                    <div className="feature-strip-item">
                        <div className="feature-icon-badge">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <div className="feature-text">
                            <h4 className="feature-title">Detail-Obsessed Crews</h4>
                            <p className="feature-sub">No subcontractors cutting corners</p>
                        </div>
                    </div>

                    <div className="feature-strip-item">
                        <div className="feature-icon-badge">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <div className="feature-text">
                            <h4 className="feature-title">Fully Licensed &amp; Insured</h4>
                            <p className="feature-sub">Peace of mind through every build state</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default Contact;
