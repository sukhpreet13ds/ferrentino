import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style/style.css';
import projectsHeroBg from '../assets/projects-bg.jpg';
import SplitText from '../components/SplitText';

// Project Images imported from assets
import ferrentino1Img from '../assets/ferrentino1.jpg';
import livingImg from '../assets/living.jpg';
import kitchenImg from '../assets/kitchen.jpg';
import bathroomImg from '../assets/bathroom.jpg';
import outdoorProImg from '../assets/outdoor-pro.jpg';
import innerTwo2Img from '../assets/inner-two2.jpg';
import ReadyCta from '../components/ReadyCta';

const projectsList = [
    {
        id: 1,
        category: 'LiveWell Residential',
        year: 'Completed 2025',
        title: 'Modern Farmhouse Estate',
        location: 'Williston, FL',
        description: 'Proud custom construction of a modern farmhouse featuring generations-strength timber frame beams, state-of-the-art kitchen, wrap-around brick porch, and luxury master suite.',
        img: ferrentino1Img,
    },
    {
        id: 2,
        category: 'LiveWell Residential',
        year: 'Completed 2024',
        title: 'Ocala Oak-Wood Remodel',
        location: 'Ocala, FL',
        description: 'A complete whole-home remodel highlighting custom cabinetry, vaulted ceilings, and meticulous hardwood finishings tailored exactly to client entertaining styles.',
        img: livingImg,
    },
    {
        id: 3,
        category: 'Custom Kitchens',
        year: 'Completed 2025',
        title: "The Marion County Chef's Kitchen",
        location: 'Ocala, FL',
        description: 'High-end remodel featuring commercial-grade range setups, warm solid oak structural posts, custom quartz waterfalls, and a custom build layout designed to last generations.',
        img: kitchenImg,
    },
    {
        id: 4,
        category: 'Luxury Bathrooms',
        year: 'Completed 2024',
        title: 'Lake Weir Spa Sanctuary',
        location: 'Lake Weir, FL',
        description: 'Bespoke master bath remodel emphasizing zero-threshold rain shower systems, natural stone masonry work, custom lighting, and dedicated floor-heating integrations.',
        img: bathroomImg,
    },
    {
        id: 5,
        category: 'WorkWell Commercial',
        year: 'Completed 2025',
        title: 'Silver Springs Equestrian Pavilion',
        location: 'Silver Springs, FL',
        description: 'Commercial grade timber and masonry structure crafted for equestrian events and outdoor hosting with custom architectural beamwork.',
        img: outdoorProImg,
    },
    {
        id: 6,
        category: 'WorkWell Commercial',
        year: 'Completed 2024',
        title: 'Historic Downtown Ocala Loft',
        location: 'Ocala, FL',
        description: 'Comprehensive restoration of a historic commercial building transformed into modern executive suites and lounge spaces.',
        img: innerTwo2Img,
    }
];

const categories = [
    'All Projects',
    'LiveWell Residential',
    'WorkWell Commercial',
    'Custom Kitchens',
    'Luxury Bathrooms'
];

const Projects = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All Projects');

    const filteredProjects = activeCategory === 'All Projects'
        ? projectsList
        : projectsList.filter((p) => p.category === activeCategory);

    return (
        <div className="projects-page">
            {/* Hero Section */}
            <section
                className="projects-hero-section"
                style={{ backgroundImage: `url(${projectsHeroBg})` }}
            >
                <div className="projects-hero-overlay"></div>

                <div className="projects-hero-container">
                    <div className="projects-hero-content">
                        <span className="projects-hero-tag">
                            <SplitText
                                text="THE FERRENTINO PORTFOLIO"
                                className="projects-tag-text"
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

                        <h1 className="projects-hero-title">
                            <SplitText
                                text="Our Built Dreams"
                                className="projects-title-line"
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

                        <p className="projects-hero-desc">
                            A showcase of generations of craftsmanship, custom masonry, high-end remodeling, and custom home construction across central Florida.
                        </p>
                    </div>
                </div>
            </section>

            {/* Portfolio Grid Section */}
            <section className="projects-portfolio-section">
                <div className="projects-portfolio-container">

                    {/* Filter Bar */}
                    <div className="projects-filter-bar reveal-zoom">
                        <div className="filter-tabs-group">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <span className="filter-count-text">
                            Showing {filteredProjects.length} Premium {filteredProjects.length === 1 ? 'Project' : 'Projects'}
                        </span>
                    </div>

                    {/* 6 Boxes Grid */}
                    <div className="projects-grid-container">
                        {filteredProjects.map((project, idx) => (
                            <div
                                key={project.id}
                                className="portfolio-project-card reveal-zoom"
                                data-delay={(idx % 3 + 1) * 120}
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate('/project-view')}
                            >
                                <div className="portfolio-card-img-wrapper">
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="portfolio-card-img"
                                    />
                                </div>

                                <div className="portfolio-card-body">
                                    <div className="card-tag-row">
                                        <span className="card-category-tag">
                                          
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--primary-color)">
                                            <rect x="0" y="0" width="6.5" height="6.5" rx="1" />
                                            <rect x="9.5" y="0" width="6.5" height="6.5" rx="1" />
                                            <rect x="0" y="9.5" width="6.5" height="6.5" rx="1" />
                                            <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1" />
                                        </svg>
                                        {project.category}
                                        </span>
                                        <span className="card-year-tag">{project.year}</span>
                                    </div>

                                    <h2 className="card-title">{project.title}</h2>
                                    <span className="card-location">Location: {project.location}</span>
                                    <p className="card-desc">{project.description}</p>

                                    <Link to="/project-view" className="card-case-study-link" onClick={(e) => { e.stopPropagation(); }}>
                                        View Project Case Study
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <ReadyCta/>
        </div>
    );
};

export default Projects;