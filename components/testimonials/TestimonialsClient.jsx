"use client";

import { useState, useEffect } from "react";
import SplitText from "../SplitText";

const TestimonialsClient = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stories = data.stories || [];
  const reviews = data.reviews || [];
  const featured = data.featured || {};

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto sliding one by one every 3.5s (pauses on hover)
  useEffect(() => {
    if (isHovered || reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <div className="testimonials-page contact-page">
      {/* Hero Section (Same style as Contact.jsx) */}
      <section className="contact-hero-section" style={{ backgroundImage: `url(${data.heroBg})` }}>
        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-container">
          <div className="contact-hero-content">
            <span className="contact-hero-tag">
              <SplitText
                text={data.heroTag}
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
                text={data.heroTitleLine1}
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
                text={data.heroTitleLine2}
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

            <p className="contact-hero-desc">{data.heroDescription}</p>
          </div>
        </div>
      </section>

      {/* Top Dark Hero Testimonial Block */}
      <section className="test-hero-featured-section">
        <div className="test-hero-featured-container reveal-zoom">
          <div className="test-featured-stars">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="fa-solid fa-star"></i>
            ))}
          </div>

          <span className="test-featured-tag">{featured.tag}</span>

          <div className="test-featured-quote-icon">
            <svg width="32" height="24" viewBox="0 0 34 26" fill="var(--primary-color)">
              <path d="M0 26V14.5C0 6.5 5.5 1 13.5 0L15.5 3.5C10.5 4.5 7.5 7.5 7 11.5H13.5V26H0ZM18.5 26V14.5C18.5 6.5 24 1 32 0L34 3.5C29 4.5 26 7.5 25.5 11.5H32V26H18.5Z" />
            </svg>
          </div>

          <blockquote className="test-featured-quote">{featured.quote}</blockquote>

          <div className="test-featured-author-row">
            <span className="test-featured-dash">&mdash;</span>
            <span className="test-featured-author-name">{featured.author}</span>
            <span className="test-featured-author-loc">{featured.location}</span>
          </div>
        </div>
      </section>

      {/* Section 2: Client Success Stories (4 Cards Grid, 2x2 on Desktop and 2x2 on Mobile) */}
      <section className="test-stories-section">
        <div className="test-section-container">
          <div className="test-header-block reveal-zoom">
            <span className="test-pill-tag">{data.storiesTag}</span>
            <h2 className="test-main-title">{data.storiesTitle}</h2>
            <p className="test-sub-desc">{data.storiesDesc}</p>
          </div>

          <div className="test-stories-grid">
            {stories.map((story, idx) => (
              <div key={story.id} className="test-story-card reveal-zoom" data-delay={(idx % 2) * 150}>
                <div className="test-story-img-wrapper">
                  <img src={story.image} alt={story.category} />
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
                    <span className="test-story-dash">&mdash;</span>
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
                <img src={data.googleIcon} alt="Google" className="test-google-icon-img" />
                <span className="test-google-badge-text">Google Reviews</span>
              </div>
              <h2 className="test-google-title">{data.googleTitle}</h2>
            </div>

            <div className="test-google-action-buttons">
              <a href={data.googleReadReviewsHref} target="_blank" rel="noopener noreferrer" className="test-btn-read-reviews">
                Read Reviews on Google
              </a>
              <a href={data.googleWriteReviewHref} target="_blank" rel="noopener noreferrer" className="test-btn-write-review">
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
              {reviews.map((rev) => (
                <div key={rev.id} className="test-google-card">
                  <div className="test-google-card-header">
                    <div className="test-google-author-block">
                      <div className="test-google-avatar" style={{ backgroundColor: rev.avatarBg }}>
                        {rev.avatarLetter}
                      </div>
                      <div className="test-google-author-info">
                        <h4 className="test-google-author-name">{rev.author}</h4>
                        <span className="test-google-author-stats">{rev.stats}</span>
                      </div>
                    </div>
                    <div className="test-google-badge-small">
                      <img src={data.googleIcon} alt="Google" className="test-g-icon" />
                      <span>Google Review</span>
                    </div>
                  </div>

                  <div className="test-google-stars-row">
                    {[...Array(rev.stars)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>

                  <p className="test-google-review-text">{rev.text}</p>

                  {rev.tags && rev.tags.length > 0 && (
                    <div className="test-google-tags-row">
                      {rev.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="test-google-tag">
                          {tag}
                        </span>
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
              <button type="button" className="test-slider-arrow-btn prev" onClick={handlePrev} aria-label="Previous review">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <span className="test-pagination-counter">
                {String(currentIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
              </span>
              <button type="button" className="test-slider-arrow-btn next" onClick={handleNext} aria-label="Next review">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <div className="test-pagination-dots">
              {reviews.map((_, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  className={`test-page-dot ${pIdx === currentIndex ? "active" : ""}`}
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

export default TestimonialsClient;
