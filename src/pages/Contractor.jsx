import { useState, useEffect } from 'react';
import './style/style.css';
import contractorHeroBg from '../assets/contractor-bg.jpg';
import SplitText from '../components/SplitText';
import Footer from '../components/Footer';

const Contractor = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="contractor-page">
            {/* Hero Section */}
            <section
                className="contractor-hero-section"
                style={{ backgroundImage: `url(${contractorHeroBg})` }}
            >
                <div className="contractor-hero-overlay"></div>

                <div className="contractor-hero-container">
                    <div className="contractor-hero-content">
                        <span className="contractor-hero-tag">
                            <SplitText
                                text="FERRENTINO & SON"
                                className="contractor-tag-text"
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

                        <h1 className="contractor-hero-title">
                            <SplitText
                                text="Contractor"
                                className="contractor-title-line"
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
                                text="Application"
                                className="contractor-title-line"
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

                        <p className="contractor-hero-desc">
                            Partner with Ocala's premier contracting and development crew. Join our direct database to receive competitive bid requests for new custom homes, remodeling, and commercial builds.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Application Form Section */}
            <section className="contractor-main-section">
                <div className="contractor-main-container">
                    <div className="contractor-form-card">
                        <h2 className="contractor-form-title">Interested in being one of our contractors?</h2>
                        <p className="contractor-form-sub">
                            Please fill out the form below to be entered into our contractor database to be sent direct bid requests.
                        </p>

                        {isSubmitted && (
                            <div className="form-success-alert">
                                <i className="fa-solid fa-circle-check"></i> Thank you! Your contractor application has been submitted successfully. Our team will review your details shortly.
                            </div>
                        )}

                        <form className="contractor-app-form" onSubmit={handleSubmit}>
                            {/* Section 1: Company Info */}
                            <div className="contractor-form-block">
                                <h3 className="form-block-heading">Company Info</h3>
                                <div className="block-divider"></div>

                                <div className="form-group">
                                    <label>Company Name *</label>
                                    <input type="text" placeholder="e.g. Ever Built Construction LLC" required />
                                </div>

                                <div className="form-group">
                                    <label>Years in Business *</label>
                                    <input type="text" placeholder="e.g. 12" required />
                                </div>
                            </div>

                            {/* Section 2: Company Address */}
                            <div className="contractor-form-block">
                                <h3 className="form-block-heading">Company Address</h3>
                                <div className="block-divider"></div>

                                <div className="form-group">
                                    <label>Country</label>
                                    <input type="text" defaultValue="United States" />
                                </div>

                                <div className="form-group">
                                    <label>Address Line 1 *</label>
                                    <input type="text" placeholder="Street address, P.O. box, company location" required />
                                </div>

                                <div className="form-group">
                                    <label>Address Line 2</label>
                                    <input type="text" placeholder="Apartment, suite, unit, building, floor, etc. (optional)" />
                                </div>

                                <div className="form-row-three">
                                    <div className="form-group">
                                        <label>City *</label>
                                        <input type="text" placeholder="e.g. Ocala" required />
                                    </div>
                                    <div className="form-group">
                                        <label>State *</label>
                                        <input type="text" placeholder="e.g. Florida" required />
                                    </div>
                                    <div className="form-group">
                                        <label>ZIP Code *</label>
                                        <input type="text" placeholder="e.g. 34470" required />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Primary Contact */}
                            <div className="contractor-form-block">
                                <h3 className="form-block-heading">Primary Contact</h3>
                                <div className="block-divider"></div>

                                <div className="form-row-two">
                                    <div className="form-group">
                                        <label>First Name *</label>
                                        <input type="text" placeholder="e.g. John" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name *</label>
                                        <input type="text" placeholder="e.g. Ferrentino" required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Contact Email *</label>
                                    <input type="email" placeholder="e.g. contact@company.com" required />
                                </div>

                                <div className="form-group">
                                    <label>Contact Phone *</label>
                                    <input type="tel" placeholder="e.g. +1 (352) 555-0199" required />
                                </div>
                            </div>

                            <button type="submit" className="btn-send-application">
                                Send Application
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default Contractor;