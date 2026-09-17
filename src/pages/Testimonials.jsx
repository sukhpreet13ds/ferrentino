import { useState, useEffect, useRef } from 'react';
import './style/style.css';
import contactHeroBg from '../assets/testi-bg.jpg';
import SplitText from '../components/SplitText';
import googleIcon from '../assets/google.png';

// Images for Success Stories Cards
import service1Img from '../assets/testi111.png';
import bathImg from '../assets/testi222.png';
import livingImg from '../assets/testi333.png';
import feature1Img from '../assets/testi444.png';

const Testimonials = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 4 Stories Cards
    const successStories = [
        {
            id: 1,
            category: 'KITCHEN REMODELING',
            stars: 5,
            quote: 'The design process was completely seamless. They re-architected our tight kitchen space into an open-plan culinary dream with exquisite cabinet details.',
            author: 'Robert & Janice S.',
            location: 'Marion County Homeowners',
            img: service1Img
        },
        {
            id: 2,
            category: 'BATHROOM REMODELING',
            stars: 5,
            quote: 'From gorgeous porcelain tile work to custom vanity carpentry, the master bath feels like a high-end spa. Every trade crew they brought in was polite and precise.',
            author: 'Elena G.',
            location: 'Ocala Resident',
            img: bathImg
        },
        {
            id: 3,
            category: 'WHOLE-HOME RENOVATION',
            stars: 5,
            quote: 'We preserved the historic bones of our estate while completely modernizing structural framing, electric, and luxury finishes. Stunning execution and complete transparency.',
            author: 'The Sterling Family',
            location: 'Central Florida',
            img: livingImg
        },
        {
            id: 4,
            category: 'NEW CUSTOM BUILD',
            stars: 5,
            quote: 'Building our dream home was a major undertaking, but their team’s multi-generational construction expertise gave us total confidence from the foundation to the roof beams.',
            author: 'Marcus & Clara B.',
            location: 'Williston Landowners',
            img: feature1Img
        }
    ];

    // 5 Google Reviews total
    const googleReviews = [
        {
            id: 1,
            author: 'Allysen Fitzpatrick',
            stats: '5 reviews · 1 photo · a month ago',
            stars: 5,
            text: 'If I could give more than five stars I would! We have been so pleased with the communication and openness of cisc and Shawna. They made what seemed like a super complicated endeavor, to turn our carport into livable space, seem so flawless. The attention to detail, the quality of products, the fact that they use other small businesses in town where they can ... just simply the best. God hand picked them for our project and I feel like we have life long friends because of it . We will forever be grateful for them!!!',
            avatarBg: '#EA4335',
            avatarLetter: 'A'
        },
        {
            id: 2,
            author: 'Kenneth La Combe',
            stats: 'Local Guide · 39 reviews · 1 photo · 3 months ago',
            stars: 5,
            text: 'Great price\nCheech and Shawn are down to earth easy to talk to and stand up people great to work with',
            tags: ['Positive: General construction'],
            avatarBg: '#4285F4',
            avatarLetter: 'K'
        },
        {
            id: 3,
            author: 'Shaun Pert',
            stats: 'Local Guide · 14 reviews · 3 years ago',
            stars: 5,
            text: 'They do great work at a great price. Do yourself a favor and call them for your needs. Truly professional and reliable.',
            avatarBg: '#34A853',
            avatarLetter: 'S'
        },
        {
            id: 4,
            author: 'David Richardson',
            stats: 'Local Guide · 22 reviews · 5 months ago',
            stars: 5,
            text: 'Ferrentino & Son remodeled our master bathroom and built a custom closet. The craftsmanship is second to none. Reliable, punctuality, and great value throughout the entire project!',
            avatarBg: '#FBBC05',
            avatarLetter: 'D'
        },
        {
            id: 5,
            author: 'Maria Gonzalez',
            stats: '8 reviews · 6 months ago',
            stars: 5,
            text: 'Amazing team! They took care of everything including permits and design blueprints. Super communicative and finished ahead of schedule.',
            avatarBg: '#9C27B0',
            avatarLetter: 'M'
        }
    ];

    // Carousel state
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto sliding one by one every 3.5s (pauses on hover)
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % googleReviews.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [isHovered, googleReviews.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + googleReviews.length) % googleReviews.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % googleReviews.length);
    };

    return (
        <div className="testimonials-page contact-page">
            {/* Hero Section (Same style as Contact.jsx) */}
            <section
                className="contact-hero-section"
                style={{ backgroundImage: `url(${contactHeroBg})` }}
            >
                <div className="contact-hero-overlay"></div>

                <div className="contact-hero-container">
                    <div className="contact-hero-content">
                        <span className="contact-hero-tag">
                            <SplitText
                                text="Generations of Craftsmanship"
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
                                text="Reviews & "
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
                                text="Testimonials"
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
                            Discover how our generational craft, transparent communication, and meticulous attention to detail have helped families throughout Central Florida build and remodel their dream homes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Top Dark Hero Testimonial Block */}
            <section className="test-hero-featured-section">
                <div className="test-hero-featured-container reveal-zoom">
                    <div className="test-featured-stars">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </div>

                    <span className="test-featured-tag">FEATURED KITCHEN CLIENT</span>

                    <div className="test-featured-quote-icon">
                        <svg width="32" height="24" viewBox="0 0 34 26" fill="var(--primary-color)">
                            <path d="M0 26V14.5C0 6.5 5.5 1 13.5 0L15.5 3.5C10.5 4.5 7.5 7.5 7 11.5H13.5V26H0ZM18.5 26V14.5C18.5 6.5 24 1 32 0L34 3.5C29 4.5 26 7.5 25.5 11.5H32V26H18.5Z" />
                        </svg>
                    </div>

                    <blockquote className="test-featured-quote">
                        After talking with several designers and remodeling contractors, we decided on Ferrentino &amp; Son. They got what we wanted straight away and had plans done in less than a week. The best part is how the kitchen actually turned out. Amazing, simply amazing!
                    </blockquote>

                    <div className="test-featured-author-row">
                        <span className="test-featured-dash">—</span>
                        <span className="test-featured-author-name">John &amp; Trisha D.</span>
                        <span className="test-featured-author-loc">Ocala Homeowners</span>
                    </div>
                </div>
            </section>

            {/* Section 2: Client Success Stories (4 Cards Grid, 2x2 on Desktop and 2x2 on Mobile) */}
            <section className="test-stories-section">
                <div className="test-section-container">
                    <div className="test-header-block reveal-zoom">
                        <span className="test-pill-tag">STORIES</span>
                        <h2 className="test-main-title">Client Success Stories</h2>
                        <p className="test-sub-desc">
                            Explore authentic experiences from our kitchen remodeling, bathroom remodeling, whole-home renovations, and custom build projects.
                        </p>
                    </div>

                    <div className="test-stories-grid">
                        {successStories.map((story, idx) => (
                            <div key={story.id} className="test-story-card reveal-zoom" data-delay={(idx % 2) * 150}>
                                <div className="test-story-img-wrapper">
                                    <img src={story.img} alt={story.category} />
                                </div>
                                <div className="test-story-body">
                                    <div className="test-story-meta-row">
                                        <span className="test-story-category">{story.category}</span>
                                        <div className="test-story-stars">
                                            {[...Array(story.stars)].map((_, i) => (
                                                <i key={i} className="fa-solid fa-star"></i>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="test-story-quote">{story.quote}</p>

                                    <div className="test-story-author-row">
                                        <span className="test-story-dash">—</span>
                                        <span className="test-story-author-name">{story.author}</span>
                                        <span className="test-story-author-loc">{story.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Google Reviews Section (Auto-sliding 5 Cards, One by One) */}
            <section className="test-google-section">
                <div className="test-section-container">
                    <div className="test-google-header-row reveal-zoom">
                        <div className="test-google-title-group">
                            <div className="test-google-badge">
                                <img src={googleIcon} alt="Google" className="test-google-icon-img" />
                                <span className="test-google-badge-text">Google Reviews</span>
                            </div>
                            <h2 className="test-google-title">What Our Community Says on Google</h2>
                        </div>

                        <div className="test-google-action-buttons">
                            <a
                                href="https://www.google.com/search?q=Ferrentino+%26+Son,+LLC#lrd=0x88e62d6c82d40beb:0x97e5f30d1e18441f,1,,,,"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="test-btn-read-reviews"
                            >
                                Read Reviews on Google
                            </a>
                            <a
                                href="https://www.google.com/search?q=Ferrentino+%26+Son,+LLC#lrd=0x88e62d6c82d40beb:0x97e5f30d1e18441f,3,,,"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="test-btn-write-review"
                            >
                                Write a Review
                            </a>
                        </div>
                    </div>

                    {/* Auto-sliding Carousel Track with 5 Cards */}
                    <div
                        className="test-google-slider-wrapper"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div
                            className="test-google-slider-track"
                            style={{
                                transform: `translateX(calc(-${currentIndex} * (var(--card-width) + var(--card-gap))))`,
                            }}
                        >
                            {googleReviews.map((rev) => (
                                <div key={rev.id} className="test-google-card">
                                    <div className="test-google-card-header">
                                        <div className="test-google-author-block">
                                            <div
                                                className="test-google-avatar"
                                                style={{ backgroundColor: rev.avatarBg }}
                                            >
                                                {rev.avatarLetter}
                                            </div>
                                            <div className="test-google-author-info">
                                                <h4 className="test-google-author-name">{rev.author}</h4>
                                                <span className="test-google-author-stats">{rev.stats}</span>
                                            </div>
                                        </div>
                                        <div className="test-google-badge-small">
                                            <img src={googleIcon} alt="Google" className="test-g-icon" />
                                            <span>Google Review</span>
                                        </div>
                                    </div>

                                    <div className="test-google-stars-row">
                                        {[...Array(rev.stars)].map((_, i) => (
                                            <i key={i} className="fa-solid fa-star"></i>
                                        ))}
                                    </div>

                                    <p className="test-google-review-text">{rev.text}</p>

                                    {rev.tags && (
                                        <div className="test-google-tags-row">
                                            {rev.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="test-google-tag">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls & Pagination (Navigation Arrows + 01 / 05 Counter + Clickable Dots) */}
                    <div className="test-google-pagination reveal-zoom">
                        <div className="test-slider-nav-controls">
                            <button
                                type="button"
                                className="test-slider-arrow-btn prev"
                                onClick={handlePrev}
                                aria-label="Previous review"
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <span className="test-pagination-counter">
                                {String(currentIndex + 1).padStart(2, '0')} / {String(googleReviews.length).padStart(2, '0')}
                            </span>
                            <button
                                type="button"
                                className="test-slider-arrow-btn next"
                                onClick={handleNext}
                                aria-label="Next review"
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>

                        <div className="test-pagination-dots">
                            {googleReviews.map((_, pIdx) => (
                                <button
                                    key={pIdx}
                                    type="button"
                                    className={`test-page-dot ${pIdx === currentIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(pIdx)}
                                    aria-label={`Go to review ${pIdx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
