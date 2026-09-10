import React, { useState, useEffect } from 'react';
import './style/style.css';
import heroImg from '../assets/ferrentino1.jpg';
import heroImg2 from '../assets/ferrentino2.jpg';
import heroImg3 from '../assets/ferrentino3.jpg';
import SplitText from '../components/SplitText';

const Home = () => {
    // 3 slide images using ferrentino1.jpg as requested
    const slides = [
        { id: 1, img: heroImg, titleTop: "On These BEAMS", titleBottom: "We Build DREAMS" },
        { id: 2, img: heroImg2, titleTop: "On These BEAMS", titleBottom: "We Build DREAMS" },
        { id: 3, img: heroImg3, titleTop: "On These BEAMS", titleBottom: "We Build DREAMS" },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                {/* Background Slider */}
                <div className="hero-slider">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            <div className="hero-overlay"></div>
                        </div>
                    ))}
                </div>

                {/* Hero Content */}
                <div className="hero-content-wrapper">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <SplitText
                                text="On These BEAMS"
                                className="hero-title-top"
                                delay={50}
                                duration={1.25}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-100px"
                                textAlign="center"
                                tag="span"
                            />
                            <SplitText
                                text="We Build DREAMS"
                                className="hero-title-bottom"
                                delay={50}
                                duration={1.25}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-100px"
                                textAlign="center"
                                tag="span"
                            />
                        </h1>

                        <p className="hero-subtitle">
                            Ferrentino & Son is your Marion County Builder of choice for new home,
                            commercial and remodeling construction projects.
                        </p>

                        <div className="hero-btn-container">
                            <a href="#estimate" className="btn-get-estimate">
                                Get a Free Estimate <i className="fa-solid fa-arrow-right btn-icon"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Carousel Navigation Dots (Bottom Center) */}
                <div className="hero-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Learn More Link (Bottom Left) */}
                <div className="hero-learn-more">
                    <a href="#about" className="learn-more-link">
                        <div className="arrow-circle">
                            <i className="fa-solid fa-arrow-down"></i>
                        </div>
                        <span>Learn More</span>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;