import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bathroomImg from '../assets/bathroom.jpg';
import roomImg from '../assets/room.jpg';
import innerTwo2Img from '../assets/inner-two2.jpg';
import outdoorProImg from '../assets/outdoor-pro.jpg';
import livingImg from '../assets/living.jpg';

const projectsData = [
    { id: 1, title: 'Bathroom Remodel', img: bathroomImg },
    { id: 2, title: 'Room Remodel', img: roomImg },
    { id: 3, title: 'Home Remodel', img: innerTwo2Img },
    { id: 4, title: 'Outdoor Living', img: outdoorProImg },
    { id: 5, title: 'Living Space', img: livingImg },
];

const Projects = () => {
    const navigate = useNavigate();
    // Clone array 3 times for seamless infinite loop
    const extendedProjects = [...projectsData, ...projectsData, ...projectsData];

    // Start index at the start of the middle set
    const [currentIndex, setCurrentIndex] = useState(projectsData.length);
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Drag / Swipe State
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    // Cursor Follower State
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isCursorVisible, setIsCursorVisible] = useState(false);

    const wrapperRef = useRef(null);
    const isHoveredRef = useRef(false);

    // Auto-advance every 4 seconds (only when tab is active)
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isDragging && !isHoveredRef.current && !document.hidden) {
                handleNext();
            }
        }, 4000);

        return () => clearInterval(timer);
    }, [isDragging]);

    // Handle tab visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                setCurrentIndex((prev) => {
                    if (prev >= projectsData.length * 2 || prev < projectsData.length) {
                        setIsTransitioning(false);
                        return (prev % projectsData.length) + projectsData.length;
                    }
                    return prev;
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    const handleNext = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    // Seamless infinite loop jump on transition end (only target main track container)
    const handleTransitionEnd = (e) => {
        if (e && e.target !== e.currentTarget) return;

        if (currentIndex >= projectsData.length * 2) {
            setIsTransitioning(false);
            setCurrentIndex((prev) => prev - projectsData.length);
        } else if (currentIndex < projectsData.length) {
            setIsTransitioning(false);
            setCurrentIndex((prev) => prev + projectsData.length);
        }
    };

    // Re-enable transition after index jump
    useEffect(() => {
        if (!isTransitioning) {
            const frame = requestAnimationFrame(() => {
                setIsTransitioning(true);
            });
            return () => cancelAnimationFrame(frame);
        }
    }, [isTransitioning]);

    // Mouse Movement & Drag Handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setDragOffset(0);
        setIsCursorVisible(false);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const currentX = e.clientX;
            const diff = currentX - startX;
            setDragOffset(diff);
            return;
        }

        // Update cursor position relative to wrapper container
        if (wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setCursorPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragOffset < -50) {
            handleNext();
        } else if (dragOffset > 50) {
            handlePrev();
        }
        setDragOffset(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
        isHoveredRef.current = false;
        setIsCursorVisible(false);
    };

    const handleMouseEnter = () => {
        isHoveredRef.current = true;
    };

    // Touch Swipe Handlers
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setDragOffset(0);
        setIsCursorVisible(false);
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
            handleNext();
        } else if (dragOffset > 50) {
            handlePrev();
        }
        setDragOffset(0);
    };

    return (
        <section className="projects-section" id="projects">
            <h2 className="projects-title reveal-zoom">Our Projects</h2>

            <div
                ref={wrapperRef}
                className="projects-slider-wrapper reveal-zoom"
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
                {/* Custom Capsule Cursor Follower Button */}
                <div
                    className={`projects-cursor-btn ${isCursorVisible && !isDragging ? 'visible' : ''}`}
                    style={{
                        left: `${cursorPos.x}px`,
                        top: `${cursorPos.y}px`,
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/project-view')}
                >
                    <span>Explore Project</span>
                    <i className="fa-solid fa-arrow-right projects-tilt-icon"></i>
                </div>

                {/* Left Navigation Arrow */}
                <button
                    className="projects-nav-btn btn-left"
                    onClick={handlePrev}
                    aria-label="Previous Project"
                >
                    <svg viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2L2 16L20 30"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Right Navigation Arrow */}
                <button
                    className="projects-nav-btn btn-right"
                    onClick={handleNext}
                    aria-label="Next Project"
                >
                    <svg viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L20 16L2 30"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Slider Track */}
                <div
                    className="projects-slider-track"
                    style={{
                        transform: `translateX(calc(50% - (${currentIndex} * (var(--projects-card-width) + var(--projects-card-gap))) - (var(--projects-card-width) / 2) + ${dragOffset}px))`,
                        transition: isDragging || !isTransitioning ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {extendedProjects.map((project, index) => {
                        const isActive = index === currentIndex;

                        return (
                            <div
                                key={`${project.id}-${index}`}
                                className={`projects-card ${isActive ? 'active' : ''}`}
                                onMouseEnter={() => {
                                    if (isActive) {
                                        setIsCursorVisible(true);
                                    } else {
                                        setIsCursorVisible(false);
                                    }
                                }}
                                onMouseLeave={() => {
                                    setIsCursorVisible(false);
                                }}
                                onClick={() => {
                                    if (index === currentIndex - 1) handlePrev();
                                    else if (index === currentIndex + 1) handleNext();
                                    else if (isActive) navigate('/project-view');
                                }}
                            >
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="projects-card-img"
                                    draggable="false"
                                />

                                {/* Dark Gradient Overlay */}
                                <div className="projects-card-overlay"></div>

                                {/* Content on Active Card */}
                                <div className="projects-card-content">
                                    <h3 className="projects-card-heading">{project.title}</h3>
                                    <Link to="/project-view" className="projects-read-more" onClick={(e) => e.stopPropagation()}>
                                        Read More <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
