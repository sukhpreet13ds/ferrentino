import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';

// Asset imports
import ferrentino1Img from '../assets/ferrentino1.jpg';
import ferrentino2Img from '../assets/ferrentino2.jpg';
import ferrentino3Img from '../assets/ferrentino3.jpg';
import kitchenImg from '../assets/projectview2.jpg';
import livingImg from '../assets/living.jpg';
import outdoorImg from '../assets/outdoor.jpg';
import wholeHomeImg from '../assets/living.jpg';
import kitchenBgImg from '../assets/outdoor-pro.jpg';
import ReadyCta from '../components/ReadyCta';

const ProjectView = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 6 Walkthrough Slides for Project Walkthrough section
    const walkthroughSlides = [
        {
            id: 0,
            label: 'EXTERIOR FACADE',
            img: ferrentino1Img,
            title: 'Generations-Strength Timber Frame Structural Detail',
            desc: 'Precision joinery showcase using native Florida timber-framing architecture designed to endure.'
        },
        {
            id: 1,
            label: "Wooden Design",
            img: kitchenImg,
            title: "Wooden Paneling Design",
            desc: 'Custom-crafted solid oak island, commercial gas range, and premium quartzite surfaces.'
        },
        {
            id: 2,
            label: 'GREAT ROOM',
            img: livingImg,
            title: 'Open-Concept Great Room & Vaulted Beams',
            desc: 'Expansive ceiling heights supported by exposed mortise-and-tenon interlocking timber trusses.'
        },
        {
            id: 3,
            label: 'COVERED PORCH',
            img: outdoorImg,
            title: 'Generational Outdoor Living & Brick Porch',
            desc: 'Seamless indoor-outdoor entertainment space with hand-laid brick columns and cypress ceiling.'
        },
        {
            id: 4,
            label: 'MASTER SUITE',
            img: ferrentino2Img,
            title: 'Master Suite Retreat & Custom Architecture',
            desc: 'Tranquil master sanctuary featuring custom architectural millwork and panoramic pasture views.'
        },
        {
            id: 5,
            label: 'CRAFTED DETAILS',
            img: ferrentino3Img,
            title: 'Hand-Forged Hardware & Precision Finish',
            desc: 'Every joint, latch, and beam corner meticulously finished by master tradespeople.'
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const thumbContainerRef = useRef(null);

    // Auto-sliding interval
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % walkthroughSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [walkthroughSlides.length]);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + walkthroughSlides.length) % walkthroughSlides.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % walkthroughSlides.length);
    };

    const scrollThumbnails = (direction) => {
        if (thumbContainerRef.current) {
            const scrollAmount = thumbContainerRef.current.clientWidth * 0.75;
            thumbContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="project-view-page">
            {/* Top Header Section (Replaces Hero) */}
            <header className="pv-header-section">
                <div className="pv-header-container">
                    {/* Back link */}
                    <Link to="/projects" className="pv-back-link">
                        ‹ BACK TO ALL PROJECTS
                    </Link>

                    {/* Badge & Meta Row */}
                    <div className="pv-meta-bar">
                        <div className="pv-meta-left">
                            <span className="pv-badge">LIVEWELL RESIDENTIAL</span>
                            <span className="pv-meta-date">Completed 2025</span>
                        </div>
                        <div className="pv-location">
                            <i className="fa-solid fa-location-dot"></i> Williston, FL
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="pv-main-title">Modern Farmhouse Estate</h1>

                    {/* Main Feature Hero Image */}
                    <div className="pv-hero-img-box reveal-zoom">
                        <img src={ferrentino1Img} alt="Modern Farmhouse Estate" />
                    </div>
                </div>
            </header>

            {/* Section 2: Explore the Craftsmanship (Walkthrough Slider) */}
            <section className="pv-walkthrough-section">
                <div className="pv-walkthrough-container">
                    {/* Header row */}
                    <div className="pv-section-header-row">
                        <div className="pv-header-text-group">
                            <span className="pv-subtag">PROJECT WALKTHROUGH</span>
                            <h2 className="pv-section-title">Explore the Craftsmanship</h2>
                        </div>

                        <div className="pv-slider-controls">
                            <span className="pv-slide-counter">
                                {String(currentSlide + 1).padStart(2, '0')} / {String(walkthroughSlides.length).padStart(2, '0')}
                            </span>
                            <button onClick={handlePrevSlide} className="pv-arrow-btn" aria-label="Previous Slide">
                                ‹
                            </button>
                            <button onClick={handleNextSlide} className="pv-arrow-btn" aria-label="Next Slide">
                                ›
                            </button>
                        </div>
                    </div>

                    {/* Main Active Slide Display Box */}
                    <div className="pv-main-slider-card reveal-zoom">
                        <img
                            src={walkthroughSlides[currentSlide].img}
                            alt={walkthroughSlides[currentSlide].title}
                            className="pv-slider-img"
                        />
                        <div className="pv-slider-overlay">
                            <div className="pv-overlay-content">
                                <h3 className="pv-overlay-title">{walkthroughSlides[currentSlide].title}</h3>
                                <p className="pv-overlay-desc">{walkthroughSlides[currentSlide].desc}</p>
                            </div>
                            <div className="pv-slider-dots">
                                {walkthroughSlides.map((_, idx) => (
                                    <span
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`pv-dot ${idx === currentSlide ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Thumbnails Row with Mobile Scroll Buttons & Touch Swipe support */}
                    <div className="pv-thumbnails-wrapper">
                        <button
                            className="pv-thumb-scroll-btn left"
                            onClick={() => scrollThumbnails('left')}
                            aria-label="Scroll mini images left"
                        >
                            ‹
                        </button>

                        <div className="pv-thumbnails-row" ref={thumbContainerRef}>
                            {walkthroughSlides.map((slide, idx) => (
                                <div
                                    key={slide.id}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`pv-thumb-item ${idx === currentSlide ? 'active' : ''}`}
                                >
                                    <div className="pv-thumb-img-wrapper">
                                        <img src={slide.img} alt={slide.label} />
                                    </div>
                                    <span className="pv-thumb-label">{slide.label}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            className="pv-thumb-scroll-btn right"
                            onClick={() => scrollThumbnails('right')}
                            aria-label="Scroll mini images right"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </section>

            {/* Section 3: Generations of Timber & Stone (The Project Mandate) */}
            <section className="pv-mandate-section">
                <div className="pv-mandate-container">
                    <div className="pv-header-text-group reveal-zoom">
                        <span className="pv-subtag">THE PROJECT MANDATE</span>
                        <h2 className="pv-section-title">Generations of Timber &amp; Stone</h2>
                    </div>

                    <div className="pv-mandate-grid">
                        {/* Left Card: Project Specifics */}
                        <div className="pv-specs-card reveal-zoom">
                            <h3 className="pv-specs-title">Project Specifics</h3>
                            <div className="pv-specs-list">
                                <div className="pv-specs-row">
                                    <span className="pv-specs-label">Client Scope</span>
                                    <span className="pv-specs-value">Custom Residential</span>
                                </div>
                                <div className="pv-specs-row">
                                    <span className="pv-specs-label">Timber Source</span>
                                    <span className="pv-specs-value">Central Florida Pine &amp; Oak</span>
                                </div>
                                <div className="pv-specs-row">
                                    <span className="pv-specs-label">Speciality Craft</span>
                                    <span className="pv-specs-value">Mortise &amp; Tenon Joinery</span>
                                </div>
                                <div className="pv-specs-row">
                                    <span className="pv-specs-label">Square Footage</span>
                                    <span className="pv-specs-value">4,650 sq ft</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content: Challenge & Solution + Quote */}
                        <div className="pv-mandate-right reveal-zoom" data-delay="150">
                            <div className="pv-text-block">
                                <h4 className="pv-block-subtitle">THE CHALLENGE</h4>
                                <p className="pv-block-p">
                                    Our clients envisioned a timeless estate that looked as if it had sat on their Williston acreage for a hundred years, yet possessed the energy-efficiency and luxurious open layouts of modern builds. Structurally, the great room required massive, raw structural timber spans without visible heavy steel connectors, demanding old-world precision joinery.
                                </p>
                            </div>

                            <div className="pv-text-block">
                                <h4 className="pv-block-subtitle">THE SOLUTION</h4>
                                <p className="pv-block-p">
                                    Ferrentino &amp; Son engineered a pure timber frame architecture, leveraging authentic Florida pine beams and custom mortise-and-tenon interlocking joints. Our custom design team wrapped the home in high-performance insulation, framing gorgeous viewports facing the pasture. The state-of-the-art kitchen integrates commercial-grade power behind solid oak cabinetry, balancing new homestead charm with refined culinary luxury.
                                </p>
                            </div>

                            <div className="pv-quote-box">
                                <p className="pv-quote-text">
                                    “The level of detail Ferrentino &amp; Son brought to our timber frame joints is absolutely stellar. It is a genuine masterpiece that our grandchildren will enjoy.”
                                </p>
                                <span className="pv-quote-author">— THE WILLISTON ESTATE FAMILY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Other Premium Portfolios */}
            <section className="pv-portfolios-section">
                <div className="pv-portfolios-container">
                    <div className="pv-section-header-row reveal-zoom">
                        <div className="pv-header-text-group">
                            <span className="pv-subtag">CONTINUE EXPLORING</span>
                            <h2 className="pv-section-title">Other Premium Portfolios</h2>
                        </div>
                        <Link to="/projects" className="pv-view-all-link">
                            VIEW ALL CASE STUDIES
                        </Link>
                    </div>

                    <div className="pv-portfolios-grid">
                        {/* Card 1 */}
                        <div className="pv-portfolio-card reveal-zoom">
                            <div className="pv-portfolio-img-wrapper">
                                <img src={wholeHomeImg} alt="Ocala Oak-Wood Remodel" />
                                <div className="pv-card-badge-bar">
                                    <span className="pv-card-badge">LIVING AREA</span>
                                    <span className="pv-card-location">Ocala, FL</span>
                                </div>
                            </div>
                            <div className="pv-portfolio-card-body">
                                <h3 className="pv-card-title">Living Room Makeover</h3>
                                <p className="pv-card-desc">
                                    Transforming a cozy living room into a spacious entertainment haven with modern finishes and thoughtful design.
                                </p>
                                <Link to="/project-view" className="pv-card-link">
                                    View Project Case Study →
                                </Link>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="pv-portfolio-card reveal-zoom" data-delay="150">
                            <div className="pv-portfolio-img-wrapper">
                                <img src={kitchenBgImg} alt="Marion County Chef's Kitchen" />
                                <div className="pv-card-badge-bar">
                                    <span className="pv-card-badge">OUTDOOR LIVING</span>
                                    <span className="pv-card-location">Ocala, FL</span>
                                </div>
                            </div>
                            <div className="pv-portfolio-card-body">
                                <h3 className="pv-card-title">Marion County Outdoor Living</h3>
                                <p className="pv-card-desc">
                                    Creating inviting outdoor living spaces that blend seamlessly with the natural beauty of Marion County.
                                </p>
                                <Link to="/project-view" className="pv-card-link">
                                    View Project Case Study →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <ReadyCta />
        </div>
    );
};

export default ProjectView;