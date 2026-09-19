import { useEffect } from 'react';
import './style/style.css';
import serviceHeroBg from '../assets/service-bg.png';
import SplitText from '../components/SplitText';

const ThankYou = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="thankyou-page">
            {/* Hero Section */}
            <section
                className="thankyou-hero-section"
                style={{ backgroundImage: `url(${serviceHeroBg})` }}
            >
                <div className="thankyou-hero-overlay"></div>

                <div className="thankyou-hero-container">
                    <div className="thankyou-card">
                        {/* Animated SVG Tick Mark */}
                        <div className="thankyou-icon-wrapper">
                            <svg
                                className="thankyou-checkmark-svg"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 52 52"
                            >
                                <circle
                                    className="thankyou-checkmark-circle"
                                    cx="26"
                                    cy="26"
                                    r="25"
                                    fill="none"
                                />
                                <path
                                    className="thankyou-checkmark-check"
                                    fill="none"
                                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                />
                            </svg>
                        </div>

                        <span className="thankyou-subtag">MESSAGE RECEIVED</span>

                        <h1 className="thankyou-title">
                            <SplitText
                                text="Thank You!"
                                className="thankyou-title-text"
                                delay={45}
                                duration={1}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 30 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.01}
                                rootMargin="0px"
                                textAlign="center"
                                tag="span"
                            />
                        </h1>

                        <p className="thankyou-desc">
                            We appreciate you reaching out to <strong>Ferrentino &amp; Son, LLC</strong>. Our team has received your submission and will review your request promptly. Expect to hear from one of our specialists soon!
                        </p>

                        <div className="thankyou-btn-group">
                            <a href="/" className="btn-thankyou-primary">
                                <i className="fa-solid fa-house"></i> Return To Home
                            </a>
                            <a href="/projects" className="btn-thankyou-secondary">
                                View Our Projects <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ThankYou;