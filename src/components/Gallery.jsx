import React, { useState, useEffect, useRef } from 'react';
import './style/style.css';
import gallery1 from '../assets/gallary1.jpg';
import gallery2 from '../assets/gallery2.jpg';
import gallery3 from '../assets/gallery3.jpg';
import gallery4 from '../assets/gallery4.jpg';
import gallery5 from '../assets/gallery5.jpg';
import gallery6 from '../assets/gallery6.jpg';
import gallery7 from '../assets/gallery7.jpg';
import gallery8 from '../assets/gallery8.jpg';

const galleryImages = [
    { id: 1, img: gallery1 },
    { id: 2, img: gallery2 },
    { id: 3, img: gallery3 },
    { id: 4, img: gallery4 },
    { id: 5, img: gallery5 },
    { id: 6, img: gallery6 },
    { id: 7, img: gallery7 },
    { id: 8, img: gallery8 },
];

const Gallery = () => {
    // Clone array 3 times for seamless infinite loop
    const extendedGallery = [...galleryImages, ...galleryImages, ...galleryImages];

    const [currentIndex, setCurrentIndex] = useState(galleryImages.length);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [visibleSlides, setVisibleSlides] = useState(5);

    // Drag / Swipe State
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const isHoveredRef = useRef(false);

    // Calculate visible slides based on window size
    useEffect(() => {
        const updateVisibleSlides = () => {
            const width = window.innerWidth;
            if (width <= 576) {
                setVisibleSlides(1.5);
            } else if (width <= 991) {
                setVisibleSlides(3);
            } else if (width <= 1200) {
                setVisibleSlides(4);
            } else {
                setVisibleSlides(5);
            }
        };

        updateVisibleSlides();
        window.addEventListener('resize', updateVisibleSlides);
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, []);

    // Auto-advance slides every 2.8 seconds (only when tab is active)
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isDragging && !isHoveredRef.current && !document.hidden) {
                setIsTransitioning(true);
                setCurrentIndex((prev) => {
                    const next = prev + 1;
                    if (next >= galleryImages.length * 2) {
                        return next - galleryImages.length;
                    }
                    return next;
                });
            }
        }, 2800);

        return () => clearInterval(timer);
    }, [isDragging]);

    // Handle tab visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                setCurrentIndex((prev) => {
                    if (prev >= galleryImages.length * 2 || prev < galleryImages.length) {
                        setIsTransitioning(false);
                        return (prev % galleryImages.length) + galleryImages.length;
                    }
                    return prev;
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    // Seamless infinite loop jump on transition end
    const handleTransitionEnd = () => {
        if (currentIndex >= galleryImages.length * 2) {
            setIsTransitioning(false);
            setCurrentIndex((prev) => prev - galleryImages.length);
        } else if (currentIndex < galleryImages.length) {
            setIsTransitioning(false);
            setCurrentIndex((prev) => prev + galleryImages.length);
        }
    };

    // Re-enable transition after state reset
    useEffect(() => {
        if (!isTransitioning) {
            const animationFrame = requestAnimationFrame(() => {
                setIsTransitioning(true);
            });
            return () => cancelAnimationFrame(animationFrame);
        }
    }, [isTransitioning]);

    // Mouse drag handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setDragOffset(0);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diff = currentX - startX;
        setDragOffset(diff);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragOffset < -40) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        } else if (dragOffset > 40) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev - 1);
        }
        setDragOffset(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
        isHoveredRef.current = false;
    };

    const handleMouseEnter = () => {
        isHoveredRef.current = true;
    };

    // Touch swipe handlers
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setDragOffset(0);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        setDragOffset(diff);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragOffset < -40) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        } else if (dragOffset > 40) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev - 1);
        }
        setDragOffset(0);
    };

    return (
        <section className="gallery-section reveal-zoom">
            <div
                className={`gallery-slider-wrapper ${isDragging ? 'dragging' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="gallery-slider-track"
                    style={{
                        transform: `translateX(calc(-${currentIndex * (100 / visibleSlides)}% + ${dragOffset}px))`,
                        transition: isDragging || !isTransitioning ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {extendedGallery.map((item, index) => (
                        <div className="gallery-slide-card" key={`${item.id}-${index}`}>
                            <div className="gallery-image-box">
                                <img src={item.img} alt={`Gallery ${item.id}`} draggable="false" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
