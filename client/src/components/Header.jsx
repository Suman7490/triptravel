import React, { useContext, useRef, useState, useEffect } from 'react';
import { Container, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import logo from '../assets/images/logo3.png';
import gallery from '../assets/images/logo3.png';
import gallery2 from '../assets/images/gallery-05.jpg';
import './style/header.css';

const Header = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    const navbarCollapseRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        if (navbarCollapseRef.current?.classList.contains('show')) {
            navbarCollapseRef.current.classList.remove('show');
        }
    };

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
        const collapse = navbarCollapseRef.current;
        if (collapse && collapse.classList.contains('show')) {
            collapse.classList.remove('show');
        }

        const toggler = document.querySelector('.navbar-toggler');
        if (toggler) {
            toggler.setAttribute('aria-expanded', 'false');
            toggler.classList.remove('active');
            toggler.classList.add('collapsed');
        }
    };


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };



    return (
        <header className={`header sticky-top ${isScrolled ? 'header-scrolled' : ''}`}>
            {/* 🔹 Top Header Bar */}
            <div className="top-header">
                <Container className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex align-items-center gap-4">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="Logo" className="img-fluid header-logo" />
                        </Link>
                        <div className="d-none d-lg-flex align-items-center gap-3">
                            <a
                                href="https://thesumantech.wordpress.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="top-link"
                            >
                                <i className="ri-newspaper-line"></i> Blog
                            </a>
                            <Link to="/offers" className="top-link">
                                <i className="ri-gift-line"></i> Offers
                            </Link>
                            <a
                                href="https://wa.me/916299397622"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="top-link"
                            >
                                <i className="ri-whatsapp-line"></i> Chat with us
                            </a>
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="d-none d-md-flex align-items-center gap-3">
                            <a href="tel:+916299397622" className="contact-link">
                                <i className="ri-phone-line"></i> 6299-397-622
                            </a>
                            <a href="tel:+919971347577" className="contact-link">
                                <i className="ri-phone-line"></i> 9971-347-577
                            </a>
                        </div>
                        <Link to="/agent" className="agent-link">
                            <i className="ri-user-line"></i> Travel Agent? Join Us
                        </Link>
                        {user ? (
                            <Button className="auth-btn logout-btn" onClick={logout}>
                                <i className="ri-logout-box-line"></i> Logout
                            </Button>
                        ) : (
                            <Link to="/login" className="auth-btn login-btn">
                                <i className="ri-login-box-line"></i> LOGIN
                            </Link>
                        )}
                    </div>
                </Container>
            </div>

            {/* 🔹 Main Navbar */}
            <div className="main-navbar">
                <Container>
                    <nav className="navbar navbar-expand-lg">
                        <button
                            className={`navbar-toggler ${isMobileMenuOpen ? 'active' : ''}`}
                            type="button"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle navigation"
                            aria-controls="navbarContent"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>

                        <div id="navbarContent" className={`navbar-collapse collapse ${isMobileMenuOpen ? 'show' : ''}`} ref={navbarCollapseRef}>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink
                                        to="/"
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'active' : ''}`
                                        }
                                    >
                                        <i className="ri-home-line"></i> Home
                                    </NavLink>
                                </li>

                                {/* 🔹 Honeymoon Packages Dropdown */}
                                <li className="nav-item dropdown mega-dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="ri-heart-line"></i> Honeymoon Packages
                                    </a>
                                    <div className="dropdown-menu mega-menu" style={{ minWidth: '1000px', maxWidth: '1200px', width: '100vw' }}>
                                        <div className="mega-menu-content">
                                            <div className="row">
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mega-menu-section">
                                                        <h6 className="section-title">
                                                            <i className="ri-map-pin-line"></i> Indian Destinations
                                                        </h6>
                                                        <ul className="mega-menu-list">
                                                            <li><Link to="/state/kerala" className="mega-menu-item" onClick={handleNavClick}>Kerala</Link></li>
                                                            <li><Link to="/state/goa" className="mega-menu-item" onClick={handleNavClick}>Goa</Link></li>
                                                            <li><Link to="/state/uttarakhand" className="mega-menu-item">Uttarakhand</Link></li>
                                                            <li><Link to="/state/uttar-pradesh" onClick={handleNavClick} className="mega-menu-item">Uttar Pradesh</Link></li>
                                                            <li><Link to="/state/rajasthan" onClick={handleNavClick} className="mega-menu-item">Rajasthan</Link></li>
                                                            <li><Link to="/state/himachal-pradesh" onClick={handleNavClick} className="mega-menu-item">Himachal Pradesh</Link></li>
                                                            <li><Link to="/destinations/view-all" onClick={handleNavClick} className="mega-menu-item view-all">View All</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mega-menu-section">
                                                        <h6 className="section-title">
                                                            <i className="ri-global-line"></i> International Destinations
                                                        </h6>
                                                        <ul className="mega-menu-list">
                                                            <li><Link to="/destinations/bali" className="mega-menu-item">Bali</Link></li>
                                                            <li><Link to="/destinations/maldives" className="mega-menu-item" onClick={handleNavClick}>Maldives</Link></li>
                                                            <li><Link to="/destinations/thailand" className="mega-menu-item" onClick={handleNavClick}>Thailand</Link></li>
                                                            <li><Link to="/destinations/dubai" className="mega-menu-item" onClick={handleNavClick}>Dubai</Link></li>
                                                            <li><Link to="/destinations/singapore" className="mega-menu-item" onClick={handleNavClick}>Singapore</Link></li>
                                                            <li><Link to="/destinations/malaysia" className="mega-menu-item" onClick={handleNavClick}>Malaysia</Link></li>
                                                            <li><Link to="/destinations/view-all-intl" className="mega-menu-item view-all">View All</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mega-menu-section">
                                                        <h6 className="section-title">
                                                            <i className="ri-heart-line"></i> Special Packages
                                                        </h6>
                                                        <ul className="mega-menu-list">
                                                            <li><Link to="/packages/beach-honeymoon" className="mega-menu-item" onClick={handleNavClick}>Beach Honeymoon</Link></li>
                                                            <li><Link to="/packages/hill-station" className="mega-menu-item">Hill Station</Link></li>
                                                            <li><Link to="/packages/luxury-honeymoon" className="mega-menu-item" onClick={handleNavClick}>Luxury Honeymoon</Link></li>
                                                            <li><Link to="/packages/budget-honeymoon" className="mega-menu-item" onClick={handleNavClick}>Budget Honeymoon</Link></li>
                                                            <li><Link to="/packages/adventure-honeymoon" className="mega-menu-item" onClick={handleNavClick}>Adventure Honeymoon</Link></li>
                                                            <li><Link to="/packages/view-all-packages" className="mega-menu-item view-all">View All Packages</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 d-none d-lg-block">
                                                    <div className="mega-menu-image">
                                                        <img src={gallery2} alt="Honeymoon Destinations" className="img-fluid" />
                                                        <div className="image-overlay">
                                                            <h6>Romantic Getaways</h6>
                                                            <p>Create unforgettable memories</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="nav-item dropdown mega-dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="ri-group-line"></i> Family Packages
                                    </a>
                                    <div className="dropdown-menu mega-menu" style={{ minWidth: '1000px', maxWidth: '1200px', width: '100vw' }}>
                                        <div className="mega-menu-content">
                                            <div className="row">
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mega-menu-section">
                                                        <h6 className="section-title">
                                                            <i className="ri-map-pin-line"></i> Indian Destinations
                                                        </h6>
                                                        <ul className="mega-menu-list">
                                                            <li><Link to="/destinations/kerala" className="mega-menu-item">Kerala</Link></li>
                                                            <li><Link to="/destinations/goa" className="mega-menu-item">Goa</Link></li>
                                                            <li><Link to="/destinations/uttarakhand" className="mega-menu-item">Uttarakhand</Link></li>
                                                            <li><Link to="/destinations/rajasthan" className="mega-menu-item">Rajasthan</Link></li>
                                                            <li><Link to="/destinations/kashmir" className="mega-menu-item">Kashmir</Link></li>
                                                            <li><Link to="/destinations/himachal" className="mega-menu-item">Himachal Pradesh</Link></li>
                                                            <li><Link to="/destinations/view-all" className="mega-menu-item view-all">View All</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mega-menu-section">
                                                        <h6 className="section-title">
                                                            <i className="ri-global-line"></i> International Destinations
                                                        </h6>
                                                        <ul className="mega-menu-list">
                                                            <li><Link to="/destinations/bali" className="mega-menu-item">Bali</Link></li>
                                                            <li><Link to="/destinations/maldives" className="mega-menu-item">Maldives</Link></li>
                                                            <li><Link to="/destinations/thailand" className="mega-menu-item">Thailand</Link></li>
                                                            <li><Link to="/destinations/dubai" className="mega-menu-item">Dubai</Link></li>
                                                            <li><Link to="/destinations/singapore" className="mega-menu-item">Singapore</Link></li>
                                                            <li><Link to="/destinations/malaysia" className="mega-menu-item">Malaysia</Link></li>
                                                            <li><Link to="/destinations/view-all-intl" className="mega-menu-item view-all">View All</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="mega-menu-section">
                                                        <h6 className="section-title">
                                                            <i className="ri-group-line"></i> Family Activities
                                                        </h6>
                                                        <ul className="mega-menu-list">
                                                            <li><Link to="/activities/beach-vacation" className="mega-menu-item">Beach Vacation</Link></li>
                                                            <li><Link to="/activities/hill-station" className="mega-menu-item">Hill Station</Link></li>
                                                            <li><Link to="/activities/wildlife-safari" className="mega-menu-item">Wildlife Safari</Link></li>
                                                            <li><Link to="/activities/theme-parks" className="mega-menu-item">Theme Parks</Link></li>
                                                            <li><Link to="/activities/cultural-tours" className="mega-menu-item">Cultural Tours</Link></li>
                                                            <li><Link to="/activities/view-all-activities" className="mega-menu-item view-all">View All Activities</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 d-none d-lg-block">
                                                    <div className="mega-menu-image">
                                                        <img src={gallery} alt="Family Destinations" className="img-fluid" />
                                                        <div className="image-overlay">
                                                            <h6>Family Adventures</h6>
                                                            <p>Memories for a lifetime</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="ri-map-2-line"></i> Destination Guide
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/destinations/kerala" className="dropdown-item">Kerala</Link></li>
                                        <li><Link to="/destinations/goa" className="dropdown-item">Goa</Link></li>
                                        <li><Link to="/destinations/uttarakhand" className="dropdown-item">Uttarakhand</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link to="/destinations/view-all" className="dropdown-item">View All Destinations</Link></li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="ri-calendar-event-line"></i> Holiday Themes
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/themes/adventure" className="dropdown-item">Adventure</Link></li>
                                        <li><Link to="/themes/beach" className="dropdown-item">Beach</Link></li>
                                        <li><Link to="/themes/cultural" className="dropdown-item">Cultural</Link></li>
                                        <li><Link to="/themes/wildlife" className="dropdown-item">Wildlife</Link></li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/luxury-holidays"
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'active' : ''}`
                                        }
                                    >
                                        <i className="ri-diamond-line"></i> Luxury Holidays
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </Container>
            </div>
        </header>
    );
};

export default Header;
