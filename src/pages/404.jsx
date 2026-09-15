import { useEffect } from 'react';
import './style/style.css';
import serviceHeroBg from '../assets/service-bg.png';
import SplitText from '../components/SplitText';

const ErrorPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="error-page-wrapper">
            <section
                className="error-hero-section"
                style={{ backgroundImage: `url(${serviceHeroBg})` }}
            >
                <div className="error-hero-overlay"></div>

                <div className="error-hero-container">
                    <div className="error-card">
                        <span className="error-subtag">ERROR 404</span>

                        <h1 className="error-title">
                            <SplitText
                                text="Page Not Found"
                                className="error-title-text"
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

                        <p className="error-desc">
                            The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
                        </p>

                        <div className="error-btn-group">
                            <a href="/" className="btn-error-primary">
                                <i className="fa-solid fa-house"></i> Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;