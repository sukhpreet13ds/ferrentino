import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';
import heroImg from '../assets/ferrentino1.jpg';
import heroImg2 from '../assets/ferrentino2.jpg';
import heroImg3 from '../assets/ferrentino3.jpg';
import navBg from '../assets/nav-bg.png';
import videoSrc from '../assets/ferr-video.mp4';
import thumbnailImg from '../assets/thumbnail-ferr.jpg';
import mapImg from '../assets/map.png';
import locationIcon from '../assets/location.png';
import bg102 from '../assets/102-bg.jpg';
import SplitText from '../components/SplitText';
import FoldText from '../components/FoldText';
import ServicesSlider from '../components/ServicesSlider';
import Projects from '../components/Projects';
import ReadyCta from '../components/ReadyCta';


const Home = () => {

    // 3 slide images using ferrentino1.jpg as requested
    const slides = [
        { id: 1, img: heroImg, titleTop: "On These BEAMS", titleBottom: "We Build DREAMS" },
        { id: 2, img: heroImg2, titleTop: "On These BEAMS", titleBottom: "We Build DREAMS" },
        { id: 3, img: heroImg3, titleTop: "On These BEAMS", titleBottom: "We Build DREAMS" },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Words array for cycling animation
    const animatedWords = ['built', 'crafted', 'designed'];
    const [wordIndex, setWordIndex] = useState(0);

    // Video Play State
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    // Locality Section Animation Trigger State
    const [isLocalityVisible, setIsLocalityVisible] = useState(false);
    const localityRef = useRef(null);

    const mapPins = [
        { id: 1, name: "Alachua", top: "24%", left: "69%", size: "48px", delay: "0.1s" },
        { id: 2, name: "Putnam", top: "27%", left: "78%", size: "40px", delay: "0.25s" },
        { id: 3, name: "Levy", top: "35%", left: "66%", size: "52px", delay: "0.4s" },
        { id: 4, name: "Marion", top: "36%", left: "73%", size: "58px", delay: "0.55s" },
        { id: 5, name: "Volusia", top: "40%", left: "84%", size: "44px", delay: "0.7s" },
        { id: 6, name: "Citrus", top: "48%", left: "68%", size: "46px", delay: "0.85s" },
        { id: 7, name: "Sumter", top: "52%", left: "73%", size: "52px", delay: "1.0s" },
        { id: 8, name: "Lake", top: "48%", left: "78%", size: "55px", delay: "1.15s" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLocalityVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        if (localityRef.current) {
            observer.observe(localityRef.current);
        }

        return () => {
            if (localityRef.current) {
                observer.unobserve(localityRef.current);
            }
        };
    }, []);

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    // Cycle animated words every 3 seconds
    useEffect(() => {
        const wordTimer = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % animatedWords.length);
        }, 3000);
        return () => clearInterval(wordTimer);
    }, [animatedWords.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const toggleVideoPlay = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
            } else {
                videoRef.current.play();
                setIsVideoPlaying(true);
            }
        }
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
                            Ferrentino &amp; Son is your Marion County Builder of choice for new home,
                            commercial and remodeling construction projects.
                        </p>

                        <div className="hero-btn-container">
                            <Link to="/estimator" className="btn-get-estimate">
                                Get an Instant Estimate <i className="fa-solid fa-arrow-right btn-icon"></i>
                            </Link>
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

            {/* Design & Build Section */}
            <section className="design-build-section" id='about'>
                {/* Left Blueprint Background Image */}
                <div
                    className="design-build-bg-left"
                    style={{ backgroundImage: `url(${navBg})` }}
                ></div>

                <div className="design-build-container">
                    {/* Top Content Row */}
                    <div className="design-build-top-row">
                        <div className="design-build-top-spacer"></div>
                        {/* Right Top: Main Heading, Subheading & Paragraph */}
                        <div className="design-build-right-content">
                            <h2 className="design-build-main-title reveal-zoom">Design &amp; Build</h2>
                            <h3 className="design-build-subtitle reveal-zoom" data-delay="150">
                                From New Home Construction to Complete Home Remodeling
                            </h3>
                            <p className="design-build-description reveal-zoom" data-delay="300">
                                The foundation of our construction expertise lies in generations of hard work and dedication. Our family values are reflected in the quality and standard we hold for every home, and we've been proud to serve our local communities throughout central Florida since 1984.
                            </p>
                        </div>
                    </div>

                    {/* Middle Accent Text (Positioned above bottom grid, aligned towards left) */}
                    <div className="design-build-middle-accent">
                        <h2 className="built-around-text reveal-zoom" data-delay="200">
                            <span className="built-italic">
                                <FoldText
                                    key={animatedWords[wordIndex]}
                                    text={animatedWords[wordIndex]}
                                    splitBy="char"
                                    hinge="top"
                                    trigger="mount"
                                    duration={0.65}
                                    stagger={0.045}
                                    ease="power3.out"
                                    perspective={700}
                                    creaseShading={0.55}
                                />
                            </span> <span>around you</span>
                        </h2>
                    </div>

                    {/* Bottom Content Grid (3 Columns) */}
                    <div className="design-build-bottom-grid">
                        {/* Column 1: Projects Link */}
                        <div className="design-build-col col-projects reveal-zoom" data-delay="100">
                            <Link to="/projects" className="projects-circle-link">
                                <div className="projects-arrow-circle">
                                    <i className="fa-solid fa-arrow-right"></i>
                                </div>
                                <span>Look At Our Projects</span>
                            </Link>
                        </div>

                        {/* Column 2: What Sets Us Apart */}
                        <div className="design-build-col col-apart reveal-zoom" data-delay="250">
                            <h4 className="col-title">What Sets Us Apart</h4>
                            <p className="col-bold-sub">Learn more about our process.</p>
                            <p className="col-desc">
                                Ferrentino &amp; Son uses a customized process to help buyers through the rewarding experience of remodeling or building a custom home.
                            </p>
                            <Link to="/estimator" className="btn-design-estimate">
                                Get an Instant Estimate <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>

                        {/* Column 3: Our Services */}
                        <div className="design-build-col col-services reveal-zoom" data-delay="400">
                            <h4 className="col-title">Our Services</h4>
                            <ul className="services-list">
                                <li style={{ cursor: 'pointer' }}>
                                    <Link to="/service-view" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className="services-grid-icon">
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--primary-color)">
                                                <rect x="0" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="0" y="9.5" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1" />
                                            </svg>
                                        </span>
                                        <span>Kitchen Remodels</span>
                                    </Link>
                                </li>
                                <li style={{ cursor: 'pointer' }}>
                                    <Link to="/service-view" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className="services-grid-icon">
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--primary-color)">
                                                <rect x="0" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="0" y="9.5" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1" />
                                            </svg>
                                        </span>
                                        <span>Bath Remodels</span>
                                    </Link>
                                </li>
                                <li style={{ cursor: 'pointer' }}>
                                    <Link to="/service-view" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className="services-grid-icon">
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--primary-color)">
                                                <rect x="0" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="0" y="9.5" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1" />
                                            </svg>
                                        </span>
                                        <span>Home Renovations </span>
                                    </Link>
                                </li>
                                <li style={{ cursor: 'pointer' }}>
                                    <Link to="/service-view" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className="services-grid-icon">
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--primary-color)">
                                                <rect x="0" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="0" y="9.5" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1" />
                                            </svg>
                                        </span>
                                        <span>Home Additions</span>
                                    </Link>
                                </li>
                                <li style={{ cursor: 'pointer' }}>
                                    <Link to="/service-view" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className="services-grid-icon">
                                            <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--primary-color)">
                                                <rect x="0" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="0" width="6.5" height="6.5" rx="1" />
                                                <rect x="0" y="9.5" width="6.5" height="6.5" rx="1" />
                                                <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1" />
                                            </svg>
                                        </span>
                                        <span>Outdoor Living</span>
                                    </Link>
                                </li>
                            </ul>
                            <Link to="/services" className="view-all-services">
                                VIEW ALL
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Services Slider Section */}
            <ServicesSlider />

            {/* Our Projects Section */}
            <Projects />

            {/* Renovate With Confidence Video Section */}
            <section className="video-confidence-section">
                <div className="video-confidence-container">
                    <h2 className="video-confidence-title reveal-zoom">Renovate With Confidence</h2>

                    <div className="video-player-wrapper reveal-zoom" data-delay="200" onClick={toggleVideoPlay}>
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            poster={thumbnailImg}
                            playsInline
                            controls={isVideoPlaying}
                            onEnded={() => setIsVideoPlaying(false)}
                            onPause={() => setIsVideoPlaying(false)}
                            onPlay={() => setIsVideoPlaying(true)}
                            className="confidence-video-element"
                        />
                        {!isVideoPlaying && (
                            <div className="video-play-overlay">
                                <button className="video-play-circle-btn" aria-label="Play Video">
                                    <i className="fa-solid fa-play"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Renovate Banner & Testimonial Section */}
            <section className="reno-banner-section">
                {/* Yellow Renovation Banner */}
                <div className="reno-yellow-banner">
                    <div className="reno-banner-container">
                        <div className="reno-banner-grid">
                            {/* Left Column */}
                            <div className="reno-banner-left reveal-zoom">
                                <h2 className="reno-banner-left-title">
                                    Renovate With a<br />Team You Trust
                                </h2>
                                <Link to="/meet-the-builders" className="reno-learn-link">
                                    <div className="reno-arrow-circle">
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                    <span>Learn More</span>
                                </Link>
                            </div>

                            {/* Right Column */}
                            <div className="reno-banner-right reveal-zoom" data-delay="200">
                                <h3 className="reno-banner-right-title">
                                    High End Remodeling To Realize Your<br />Dream Home Makeover
                                </h3>
                                <p className="reno-banner-right-desc">
                                    DETAILS and CRAFTSMANSHIP make the difference, especially when it comes to home remodeling and design. Ferrentino &amp; Son, LLC has a remarkable and experienced design team, placing an emphasis on creating one of a kind kitchen, bath, and home designs that are AFFORDABLE.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dark Client Testimonial Block */}
                <div className="reno-testimonial-block">
                    <div className="reno-testimonial-container">
                        <div className="testimonial-stars reveal-zoom">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>

                        <span className="testimonial-label reveal-zoom" data-delay="100">CLIENT TESTIMONIAL</span>

                        <div className="testimonial-quote-icon reveal-zoom" data-delay="150">
                            <svg width="34" height="26" viewBox="0 0 34 26" fill="var(--primary-color)">
                                <path d="M0 26V14.5C0 6.5 5.5 1 13.5 0L15.5 3.5C10.5 4.5 7.5 7.5 7 11.5H13.5V26H0ZM18.5 26V14.5C18.5 6.5 24 1 32 0L34 3.5C29 4.5 26 7.5 25.5 11.5H32V26H18.5Z" />
                            </svg>
                        </div>

                        <blockquote className="testimonial-quote-text reveal-zoom" data-delay="250">
                            After talking with several designers and remodeling contractors, we decided on Ferrentino &amp; Son. They got what we wanted straight away and had plans done in less than a week. The best part is how the kitchen actually turned out. Amazing, simply amazing!
                        </blockquote>

                        <div className="testimonial-attribution reveal-zoom" data-delay="350">
                            <span className="author-name">&mdash; John &amp; Trisha D.</span>
                            <span className="author-location">Ocala Homeowners</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locality / Proudly Serving Central Florida Section */}
            <section className={`locality-section ${isLocalityVisible ? 'animate-in' : ''}`} ref={localityRef}>
                <div className="locality-bg-map-wrapper">
                    <div className="locality-map-box">
                        <img src={mapImg} alt="Central Florida Map" className="locality-map-img" />
                        {mapPins.map((pin) => (
                            <div
                                key={pin.id}
                                className="locality-pin-wrapper"
                                style={{
                                    top: pin.top,
                                    left: pin.left,
                                    width: pin.size,
                                    height: pin.size,
                                    animationDelay: pin.delay,
                                }}
                                title={pin.name}
                            >
                                <img src={locationIcon} alt={pin.name} className="locality-pin-img" />
                                <span className="pin-pulse"></span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="locality-container">
                    <div className="locality-content">
                        <span className="locality-tag reveal-zoom">LOCALITY</span>
                        <h2 className="locality-title reveal-zoom" data-delay="150">
                            Proudly Serving<br />Central Florida
                        </h2>
                        <p className="locality-desc reveal-zoom" data-delay="300">
                            Rooted in Ocala, our fleet and craft crews cover eight counties, delivering generational masonry, carpentry, and architectural finishes right to your property.
                        </p>

                        <div className="locality-counties-grid reveal-zoom" data-delay="450">
                            <div className="locality-counties-col">
                                <ul className="locality-list">
                                    <li><span className="bullet-dot">•</span> Marion</li>
                                    <li><span className="bullet-dot">•</span> Lake</li>
                                    <li><span className="bullet-dot">•</span> Citrus</li>
                                    <li><span className="bullet-dot">•</span> Sumter</li>
                                </ul>
                            </div>
                            <div className="locality-counties-col">
                                <ul className="locality-list">
                                    <li><span className="bullet-dot">•</span> Levy</li>
                                    <li><span className="bullet-dot">•</span> Volusia</li>
                                    <li><span className="bullet-dot">•</span> Putnam</li>
                                    <li><span className="bullet-dot">•</span> Alachua</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 102 Years Craftsmanship Section */}
            <section className="years-102-section" style={{ backgroundImage: `url(${bg102})` }}>
                <div className="years-102-overlay"></div>
                <div className="years-102-container">
                    <div className="years-102-left reveal-zoom">
                        <h2 className="years-102-number">102</h2>
                    </div>
                    <div className="years-102-right reveal-zoom" data-delay="200">
                        <span className="years-102-subtitle">Quality Craftsmanship for over 102 Years</span>
                        <h3 className="years-102-title">
                            Family-owned.<br />
                            <em>Detail-obsessed.</em><br />
                            Built for a life well<br />
                            lived.
                        </h3>
                    </div>
                </div>
            </section>

            {/* Ready to Build Your Dream CTA Section */}
            <ReadyCta />

        </div>
    );
};

export default Home;