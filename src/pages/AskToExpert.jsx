import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';

// Assets
import contactHeroBg from '../assets/ask-expert-bg.jpg';
import projectRoofingImg from '../assets/expert11.png';
import bathImg from '../assets/expert22.png';
import feature1Img from '../assets/expert33.png';
import feature2Img from '../assets/expert44.png';
import ferrentino2Img from '../assets/expert55.png';
import ferrentino3Img from '../assets/expert66.png';
import makingRightImg from '../assets/expert77.png';
import livingImg from '../assets/expert88.png';
import kitchenImg from '../assets/expert99.png';
import projectOutdoorImg from '../assets/expert0.png';
import roomImg from '../assets/expert00.png';
import SplitText from '../components/SplitText';

const AskToExpert = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        question: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', question: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const articles = [
        {
            id: 1,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '11/22/25',
            img: projectRoofingImg,
            title: 'Industry Overview and Career Pathway to Construction & Utilities',
            stats: [
                { label: 'Total Employed', val: '32,650' },
                { label: 'Average Wage - Journeyman', val: '$53,365' },
                { label: 'Average Wage - Utilities', val: '$118,521' },
                { label: 'Expected Demand (5 years)', val: '28,490' }
            ]
        },
        {
            id: 2,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '11/22/25',
            img: bathImg,
            title: 'Industry Overview and Career Pathway to Plumbing and HVAC',
            stats: [
                { label: 'Total Employed', val: '11,128' },
                { label: 'Average Wage', val: '$62,110' },
                { label: 'Expected Demand (5 years)', val: '9,545' }
            ]
        },
        {
            id: 3,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '11/22/25',
            img: feature1Img,
            title: 'Industry Overview and Career Pathway to Electrical',
            stats: [
                { label: 'Total Employed', val: '4,428' },
                { label: 'Average Wage', val: '$58,720' },
                { label: 'Expected Demand (5 years)', val: '2,745' }
            ]
        },
        {
            id: 4,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '11/22/25',
            img: feature2Img ,
            title: 'Industry Overview and Career Pathway to Carpentry',
            stats: [
                { label: 'Total Employed', val: '1,784' },
                { label: 'Average Wage', val: '$43,760' },
                { label: 'Expected Demand (5 years)', val: '865' }
            ]
        },
        {
            id: 5,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '10/18/25',
            img:  ferrentino2Img,
            title: '6 Steps of a Successful Remodel',
            desc: 'Your 6 steps remodel guide for an exciting home transformation! Strategize the way you live in your home. Use this guide to plan thoroughly, know what to expect, and enjoy the process.'
        },
        {
            id: 6,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '9/28/25',
            img: ferrentino3Img,
            title: 'Is an Addition The Best Way to Develop your Properties Value in Ocala, FL?',
            desc: 'When you are thinking about improving your home, major upgrades offer a better return on investment than a small planned addition. Whether you are building out a new bedroom, expanding the kitchen, or adding a sunroom, a home addition not only enhances your living space—it also increases resale value.'
        },
        {
            id: 7,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '7/12/25',
            img:  makingRightImg,
            title: 'How Long Does it Take to Get a Permit in Ocala, FL – and What is the Process?',
            desc: 'As Ferrentino & Son Construction, we know how important it is to stay on schedule with your home improvement or construction project. One of the most common questions we hear from clients is: “How long does it take to get a permit in Ocala, Florida?” The answer depends on...'
        },
        {
            id: 8,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '6/22/25',
            img: livingImg,
            title: 'How Much does a Kitchen Remodel Cost in Ocala?',
            desc: 'The cost of a kitchen remodel in Ocala depends on numerous factors, including the size and condition of your kitchen, the materials and finishes you choose, the scope of work, and whether any structural changes are involved. With so many variables, estimating the cost of a remodel...'
        },
        {
            id: 9,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '5/12/25',
            img: kitchenImg,
            title: 'What is the Typical Timeline for a Home Remodeling Project? From First Idea to Final Walkthrough',
            desc: 'If you are thinking about remodeling your home, you may be wondering how long total structural process takes. Where to start? While most people focus on the construction phase, the full remodel journey begins...'
        },
        {
            id: 10,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '4/25/25',
            img:   projectOutdoorImg,
            title: 'What Should My Builder be Charging for Their Overhead and Profit?',
            desc: 'Remodeling contractors should aim to achieve a gross profit margin of approximately 25% to 40%, which includes their overhead and profit. This typically translates into a profit margin of 4% to 7%, representing profit after all operating expenses are accounted for.'
        },
        {
            id: 11,
            author: 'EDWARD "CICC" FERRENTINO',
            date: '3/15/25',
            img: roomImg,
            title: 'Why Hire a Licensed Contractor?',
            desc: 'Why is it so important to hire a licensed contractor in the first place? Anyone can claim to have 20-30+ years in construction, but can they prove it? Without proof, not just anyone can build. Mandatory licensing sets accountable standards.'
        }
    ];

    return (
        <div className="ask-to-expert-page contact-page">
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
                                text="ASK TO EXPERT"
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
                                text="Knowledge Base"
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
                                text="& Insights"
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
                            Articles, Guides, &amp; Expert Advice from our master builders to help you make informed decisions for your custom construction project.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Articles Section */}
            <section className="ate-articles-section">
                <div className="ate-articles-container">
                    <div className="ate-header-text reveal-zoom">
                        <span className="ate-subtag">KNOWLEDGE BASE &amp; INSIGHTS</span>
                        <h2 className="ate-main-title">Articles, Guides, &amp; Expert Advice</h2>
                    </div>

                    <div className="ate-cards-grid">
                        {articles.map((item, index) => (
                            <Link
                                key={item.id}
                                to="/articles"
                                className="ate-card reveal-zoom"
                                data-delay={(index % 3) * 120}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="ate-card-top-meta">
                                    <span className="ate-author">{item.author}</span>
                                    <span className="ate-date">{item.date}</span>
                                </div>

                                <div className="ate-card-img-box">
                                    <img src={item.img} alt={item.title} />
                                </div>

                                <div className="ate-card-body">
                                    <h3 className="ate-card-title">{item.title}</h3>

                                    {item.stats ? (
                                        <div className="ate-card-stats-list">
                                            {item.stats.map((st, i) => (
                                                <p key={i} className="ate-stat-row">
                                                    <span className="ate-stat-label">{st.label}:</span>{' '}
                                                    <span className="ate-stat-val">{st.val}</span>
                                                </p>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="ate-card-desc">{item.desc}</p>
                                    )}

                                    <div className="ate-card-footer">
                                        <span className="ate-read-more">
                                            READ MORE <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Questions Yellow Banner & Submit Form Section */}
            <section className="ate-questions-section">
                <div className="ate-questions-container">
                    <div className="ate-questions-grid">
                        {/* Left Info Column */}
                        <div className="ate-questions-left reveal-zoom">
                            <h2 className="ate-q-title">Questions?</h2>
                            <p className="ate-q-desc">
                                Do you have a question that we haven't answered? Fill out the form below and we will Ask The Expert! Edward and our design crews will review your inquiry and publish a detailed roadmap.
                            </p>

                            {/* <div className="ate-badge-circle">
                                <span className="ate-badge-year">1984</span>
                                <span className="ate-badge-text">SERVING FLORIDA SINCE 1984</span>
                                <span className="ate-badge-sub">Generations of Mindful Craftsmanship</span>
                            </div> */}
                        </div>

                        {/* Right Form Card */}
                        <div className="ate-questions-right reveal-zoom" data-delay="150">
                            <div className="ate-form-card">
                                <h3 className="ate-form-title">Submit Your Question</h3>

                                {isSubmitted && (
                                    <div className="ate-success-msg">
                                        ✓ Thank you! Your question has been submitted to our master builders.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="ate-form">
                                    <div className="ate-form-row">
                                        <div className="ate-form-group">
                                            <label>FIRST NAME</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="ate-form-group">
                                            <label>LAST NAME</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="ate-form-row">
                                        <div className="ate-form-group">
                                            <label>EMAIL</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="johndoe@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="ate-form-group">
                                            <label>PHONE</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="(352) 555-0199"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="ate-form-group full-width">
                                        <label>YOUR QUESTION</label>
                                        <textarea
                                            name="question"
                                            rows="4"
                                            placeholder="Describe your remodeling, timeline, or structural question..."
                                            value={formData.question}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="ate-btn-submit">
                                        SUBMIT QUESTION <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AskToExpert;
