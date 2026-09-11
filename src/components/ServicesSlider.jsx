import React, { useState, useEffect, useRef } from 'react';
import kitchenImg from '../assets/kitchen.jpg';
import bathImg from '../assets/bath.jpg';
import wholeHomeImg from '../assets/whole-home.jpg';
import roofingImg from '../assets/roofing.jpg';
import interiorImg from '../assets/interier.jpg';
import outdoorImg from '../assets/outdoor.jpg';

const servicesData = [
    { id: 1, title: 'Kitchen Remodeling', img: kitchenImg },
    { id: 2, title: 'Bath Remodeling', img: bathImg },
    { id: 3, title: 'Whole-Home Renovation', img: wholeHomeImg },
    { id: 4, title: 'Roofing & Exterior', img: roofingImg },
    { id: 5, title: 'Interior Finishes', img: interiorImg },
    { id: 6, title: 'Outdoor Living', img: outdoorImg },
];

const ServicesSlider = () => {
    // Clone array 3 times for seamless infinite loop
    const extendedServices = [...servicesData, ...servicesData, ...servicesData];
    
    // Start index at first real set
    const [currentIndex, setCurrentIndex] = useState(servicesData.length);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [visibleSlides, setVisibleSlides] = useState(3);

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
                setVisibleSlides(1);
            } else if (width <= 991) {
                setVisibleSlides(2);
            } else {
                setVisibleSlides(3);
            }
        };

        updateVisibleSlides();
        window.addEventListener('resize', updateVisibleSlides);
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, []);

    // Auto-advance slides every 3.5 seconds (only when tab is active)
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isDragging && !isHoveredRef.current && !document.hidden) {
                setIsTransitioning(true);
                setCurrentIndex((prev) => {
                    const next = prev + 1;
                    if (next >= servicesData.length * 2) {
                        return next - servicesData.length;
                    }
                    return next;
                });
            }
        }, 3500);

        return () => clearInterval(timer);
    }, [isDragging]);

    // Handle tab visibility change so slider never gets lost out of bounds when returning to tab
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                setCurrentIndex((prev) => {
                    if (prev >= servicesData.length * 2 || prev < servicesData.length) {
                        setIsTransitioning(false);
                        return (prev % servicesData.length) + servicesData.length;
                    }
                    return prev;
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    // Handle seamless infinite loop jump on transition end
    const handleTransitionEnd = () => {
        if (currentIndex >= servicesData.length * 2) {
            setIsTransitioning(false);
            setCurrentIndex((prev) => prev - servicesData.length);
        } else if (currentIndex < servicesData.length) {
            setIsTransitioning(false);
            setCurrentIndex((prev) => prev + servicesData.length);
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
        if (dragOffset < -50) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        } else if (dragOffset > 50) {
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
        if (dragOffset < -50) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        } else if (dragOffset > 50) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev - 1);
        }
        setDragOffset(0);
    };

    return (
        <section className="services-slider-section">
            <div className="services-slider-container">
                <h2 className="services-slider-title reveal-zoom">Our Services</h2>

                <div
                    className="services-slider-wrapper reveal-zoom"
                    data-delay="200"
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
                        className="services-slider-track"
                        style={{
                            transform: `translateX(calc(-${currentIndex * (100 / visibleSlides)}% + ${dragOffset}px))`,
                            transition: isDragging || !isTransitioning ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {extendedServices.map((service, index) => (
                            <div className="services-slide-card" key={`${service.id}-${index}`}>
                                <div className="services-image-box">
                                    <img src={service.img} alt={service.title} draggable="false" />
                                </div>
                                <h3 className="services-card-title">{service.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSlider;
