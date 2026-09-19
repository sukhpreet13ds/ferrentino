"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SplitText from "../SplitText";
import ReadyCta from "../ReadyCta";

const ProjectsListClient = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const router = useRouter();
  const items = data.items || [];
  const categories = data.categories || ["All Projects"];
  const [activeCategory, setActiveCategory] = useState(categories[0] || "All Projects");

  const filteredProjects =
    activeCategory === categories[0]
      ? items
      : items.filter((p) => p.category === activeCategory);

  return (
    <div className="projects-page">
      <section className="projects-hero-section" style={{ backgroundImage: `url(${data.heroBg})` }}>
        <div className="projects-hero-overlay"></div>

        <div className="projects-hero-container">
          <div className="projects-hero-content">
            <span className="projects-hero-tag">
              <SplitText
                text={data.heroTag}
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
                text={data.heroTitle}
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

            <p className="projects-hero-desc">{data.heroDescription}</p>
          </div>
        </div>
      </section>

      <section className="projects-portfolio-section">
        <div className="projects-portfolio-container">
          <div className="projects-filter-bar reveal-zoom">
            <div className="filter-tabs-group">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="filter-count-text">
              Showing {filteredProjects.length} Premium {filteredProjects.length === 1 ? "Project" : "Projects"}
            </span>
          </div>

          <div className="projects-grid-container">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="portfolio-project-card is-visible"
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/projects/${project.slug}`)}
              >
                <div className="portfolio-card-img-wrapper">
                  <img src={project.heroImage} alt={project.title} className="portfolio-card-img" />
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

                  <a
                    href={`/projects/${project.slug}`}
                    className="card-case-study-link"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    View Project Case Study
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReadyCta />
    </div>
  );
};

export default ProjectsListClient;
