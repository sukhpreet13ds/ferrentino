import { useState, useEffect } from 'react';
import './style/style.css';
import ferrentino1Img from '../assets/ferrentino1.jpg';
import livingImg from '../assets/living.jpg';
import kitchenImg from '../assets/kitchen.jpg';
import projectsHeroBg from '../assets/projects-bg.jpg';
import SplitText from '../components/SplitText';
import ReadyCta from '../components/ReadyCta';

const ProjectView = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 3 Images for the Project Gallery Slider
    const projectGallery = [
        {
            id: 1,
            img: ferrentino1Img,
            caption: 'Modern Farmhouse Exterior & Timber Frame Beams',
            sub: 'Hand-crafted structural beams and wrap-around porch in Williston, FL.'
        },
        {
            id: 2,
            img: livingImg,
            caption: 'Custom Hardwood Living & Vaulted Ceiling',
            sub: 'Custom cabinetry, hardwood flooring, and spacious open living space.'
        },
        {
            id: 3,
            img: kitchenImg,
            caption: 'Chef’s Kitchen & Quartz Waterfall Island',
            sub: 'Commercial-grade kitchen setup with custom oak posts and quartz countertops.'
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % projectGallery.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + projectGallery.length) % projectGallery.length);
    };

    return (
        <div className="project-view-page contact-page">
            {/* Hero Section (Same style as Contact.jsx) */}
            <section
                className="contact-hero-section"
                style={{ backgroundImage: `url(${projectsHeroBg})` }}
            >
                <div className="contact-hero-overlay"></div>

                <div className="contact-hero-container">
                    <div className="contact-hero-content">
                        <span className="contact-hero-tag">
                            <SplitText
                                text="FEATURED PROJECT"
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
                                text="Modern Farmhouse Estate"
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

                        <p className="contact-hero-desc" style={{ fontFamily: "'Roboto', sans-serif" }}>
                            Proud custom construction of a modern farmhouse featuring generations-strength timber frame beams, state-of-the-art kitchen, wrap-around brick porch, and luxury master suite.
                        </p>
                    </div>
                </div>
            </section>

            {/* Project Overview & Main Image Section */}
            <section style={{ padding: '70px 20px', background: '#FFFFFF' }}>
                <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                    
                    {/* Category Tag */}
                    <div className="reveal-zoom" style={{ marginBottom: '16px' }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(217, 119, 6, 0.12)',
                            color: 'var(--primary-color)',
                            fontWeight: '700',
                            fontSize: '13px',
                            fontFamily: "'Roboto', sans-serif",
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            padding: '8px 16px',
                            borderRadius: '24px'
                        }}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--primary-color)">
                                <rect x="0" y="0" width="6.5" height="6.5" rx="1" />
                                <rect x="9.5" y="0" width="6.5" height="6.5" rx="1" />
                                <rect x="0" y="9.5" width="6.5" height="6.5" rx="1" />
                                <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1" />
                            </svg>
                            LiveWell Residential · Completed 2025
                        </span>
                    </div>

                    <h2 className="reveal-zoom" style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(28px, 4vw, 44px)',
                        color: '#111827',
                        marginBottom: '20px',
                        fontWeight: '700',
                        lineHeight: '1.2'
                    }}>
                        Project Overview &amp; Specifications
                    </h2>

                    {/* Main Featured Showcase Image (Wide & Prominent) */}
                    <div className="reveal-zoom" style={{
                        position: 'relative',
                        width: '100%',
                        maxHeight: '520px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                        margin: '28px 0 40px 0'
                    }}>
                        <img
                            src={ferrentino1Img}
                            alt="Modern Farmhouse Estate Primary View"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '520px',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                            padding: '24px 28px',
                            color: '#FFFFFF'
                        }}>
                            <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontWeight: '700' }}>
                                Primary Showcase
                            </span>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 3vw, 28px)', margin: '4px 0 0 0', color: '#FFFFFF', fontWeight: '700' }}>
                                Exterior Timber Frame Architecture
                            </h3>
                        </div>
                    </div>

                    {/* Content Columns: Descriptions & Specifications */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '40px',
                        alignItems: 'start'
                    }}>
                        {/* Narrative Left */}
                        <div className="reveal-zoom">
                            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: '17px', lineHeight: '1.7', color: '#4B5563', marginBottom: '18px' }}>
                                Built in Williston, Florida, this flagship custom home represents three generations of Ferrentino family construction craftsmanship. Blending timeless rustic warmth with modern residential engineering, the estate features solid timber structural framing, custom oak trim, and open indoor-outdoor entertaining spaces.
                            </p>
                            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: '17px', lineHeight: '1.7', color: '#4B5563', margin: 0 }}>
                                From heavy excavation and foundation setting to the hand-finished cabinetry and zero-threshold rain shower master bath, every square foot was custom built to exceed client expectations.
                            </p>

                            <ul className="kitchen-check-list" style={{ marginTop: '28px' }}>
                                <li>
                                    <span className="check-icon-gold">✓</span> Custom-engineered solid timber structural beam framing
                                </li>
                                <li>
                                    <span className="check-icon-gold">✓</span> Wrap-around brick porch with custom outdoor fireplace pad
                                </li>
                                <li>
                                    <span className="check-icon-gold">✓</span> Open-concept chef's kitchen with quartz waterfall island
                                </li>
                                <li>
                                    <span className="check-icon-gold">✓</span> Energy-efficient FL energy code compliance &amp; metal roofing
                                </li>
                            </ul>
                        </div>

                        {/* Specs Card Right */}
                        <div className="reveal-zoom" data-delay="150" style={{
                            background: '#F9FAFB',
                            borderRadius: '16px',
                            padding: '30px',
                            border: '1px solid #E5E7EB',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }}>
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '24px',
                                color: '#111827',
                                marginBottom: '20px',
                                fontWeight: '700'
                            }}>
                                Project Details
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px' }}>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '14px', color: '#6B7280' }}>Location</span>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '15px', fontWeight: '700', color: '#111827' }}>Williston, FL</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px' }}>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '14px', color: '#6B7280' }}>Project Category</span>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '15px', fontWeight: '700', color: '#111827' }}>Custom Estate</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px' }}>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '14px', color: '#6B7280' }}>Construction Time</span>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '15px', fontWeight: '700', color: '#111827' }}>6 Months</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px' }}>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '14px', color: '#6B7280' }}>Builder</span>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '15px', fontWeight: '700', color: '#111827' }}>Ferrentino &amp; Son, LLC</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '14px', color: '#6B7280' }}>Status</span>
                                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: '15px', fontWeight: '700', color: '#059669' }}>Completed 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 3 Images Gallery Slider Section */}
            <section style={{ background: '#111827', color: '#FFFFFF', padding: '80px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="reveal-zoom" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span style={{
                            color: 'var(--primary-color)',
                            fontSize: '13px',
                            fontFamily: "'Roboto', sans-serif",
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            fontWeight: '700'
                        }}>
                            PROJECT GALLERY
                        </span>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(30px, 4vw, 44px)',
                            color: '#FFFFFF',
                            marginTop: '8px',
                            fontWeight: '700'
                        }}>
                            Explore Project Showcase
                        </h2>
                        <p style={{
                            fontFamily: "'Roboto', sans-serif",
                            color: '#9CA3AF',
                            fontSize: '16px',
                            maxWidth: '600px',
                            margin: '10px auto 0'
                        }}>
                            Slide through 3 key highlights of this featured build.
                        </p>
                    </div>

                    {/* Slider Container (Wide aspect ratio for all viewports, no fixed square height) */}
                    <div className="reveal-zoom" data-delay="150" style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1080px',
                        margin: '0 auto',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                    }}>
                        {/* Responsive Image Aspect Box */}
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '16/9'
                        }}>
                            <img
                                src={projectGallery[currentSlide].img}
                                alt={projectGallery[currentSlide].caption}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    transition: 'all 0.5s ease'
                                }}
                            />
                            
                            {/* Gradient Caption Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: '0',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0) 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: 'clamp(16px, 4vw, 32px)'
                            }}>
                                <span style={{ color: 'var(--primary-color)', fontSize: '13px', fontWeight: '700', fontFamily: 'monospace' }}>
                                    {String(currentSlide + 1).padStart(2, '0')} / {String(projectGallery.length).padStart(2, '0')}
                                </span>
                                <h3 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: 'clamp(18px, 3.5vw, 28px)',
                                    color: '#FFFFFF',
                                    margin: '6px 0 4px 0',
                                    fontWeight: '700',
                                    lineHeight: '1.2'
                                }}>
                                    {projectGallery[currentSlide].caption}
                                </h3>
                                <p style={{
                                    fontFamily: "'Roboto', sans-serif",
                                    color: '#D1D5DB',
                                    fontSize: 'clamp(13px, 2vw, 16px)',
                                    margin: 0,
                                    lineHeight: '1.4'
                                }}>
                                    {projectGallery[currentSlide].sub}
                                </p>
                            </div>
                        </div>

                        {/* Navigation Arrow Buttons */}
                        <button
                            onClick={handlePrevSlide}
                            aria-label="Previous Slide"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '14px',
                                transform: 'translateY(-50%)',
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: 'rgba(0, 0, 0, 0.65)',
                                color: '#FFFFFF',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '24px',
                                backdropFilter: 'blur(4px)',
                                transition: 'all 0.2s ease',
                                zIndex: 10
                            }}
                        >
                            ‹
                        </button>

                        <button
                            onClick={handleNextSlide}
                            aria-label="Next Slide"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '14px',
                                transform: 'translateY(-50%)',
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: 'rgba(0, 0, 0, 0.65)',
                                color: '#FFFFFF',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '24px',
                                backdropFilter: 'blur(4px)',
                                transition: 'all 0.2s ease',
                                zIndex: 10
                            }}
                        >
                            ›
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
                        {projectGallery.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                style={{
                                    width: idx === currentSlide ? '30px' : '10px',
                                    height: '10px',
                                    borderRadius: '5px',
                                    background: idx === currentSlide ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.3)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>

                </div>
            </section>

            <ReadyCta />
        </div>
    );
};

export default ProjectView;