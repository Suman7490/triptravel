import React, { useContext, useRef } from 'react';
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

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        if (navbarCollapseRef.current?.classList.contains('show')) {
            navbarCollapseRef.current.classList.remove('show');
        }
    };

    const handleNavClick = () => {
        if (navbarCollapseRef.current?.classList.contains('show')) {
            navbarCollapseRef.current.classList.remove('show');
            const toggler = document.querySelector('.navbar-toggler');
            if (toggler) {
                toggler.setAttribute('aria-expanded', 'false');
                toggler.classList.add('collapsed');
            }
        }
    };



    return (
        <header className="header sticky-top bg-white shadow-sm">
            {/* 🔹 Top Header Bar */}
            <div className="top-header bg-light py-1 border-bottom">
                <Container className="d-flex justify-content-between align-items-center flex-wrap">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" className="img-fluid" style={{ width: '60px' }} />
                    </Link>
                    <div className="d-flex align-items-center gap-3 small">
                        <a
                            href="https://thesumantech.wordpress.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-dark text-decoration-none"
                        >
                            📰 Blog
                        </a>
                        <Link to="/offers" className="text-dark text-decoration-none">🎁 Offers</Link>
                        <a
                            href="https://wa.me/916299397622"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-dark text-decoration-none"
                        >
                            📱 Chat with us
                        </a>

                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-dark fw-semibold">
                            <a
                                href="tel:+916299397622"
                                className="text-dark fw-semibold text-decoration-none"
                            >
                                📞 6299-397-622
                            </a>
                        </span>
                        <span className="text-dark fw-semibold">
                            📞 9971-347-577
                        </span>
                        <Link to="/agent" className="text-decoration-none text-dark small">
                            👤 Travel Agent? Join Us
                        </Link>
                        {user ? (
                            <Button color="dark" size="sm" onClick={logout}>Logout</Button>
                        ) : (
                            <Link to="/login" className="text-dark fw-semibold text-decoration-none">LOGIN</Link>
                        )}
                    </div>
                </Container>
            </div>

            {/* 🔹 Main Navbar */}
            <Container>
                <nav className="navbar navbar-expand-lg navbar-light">


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent" ref={navbarCollapseRef}>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    onClick={handleNavClick}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active text-primary fw-bold' : ''}`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            {/* 🔹 Example Mega Dropdown */}
                            <li className="nav-item dropdown position-static">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="honeymoonDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ background: 'transparent', border: 'none' }}
                                >
                                    Honeymoon Packages
                                </a>
                                <div className="dropdown-menu mt-0 p-4" aria-labelledby="honeymoonDropdown">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h6 className="fw-bold">Indian Destinations</h6>
                                            <ul className="list-unstyled">
                                                <li><Link to="/state/kerala" className="dropdown-item">Kerala</Link></li>
                                                <li><Link to="/state/goa" className="dropdown-item">Goa</Link></li>
                                                <li><Link to="/state/uttarakhand" className="dropdown-item">Uttarakhand</Link></li> <li><Link to="/state/uttar-pradesh" className="dropdown-item">Uttar Pradesh</Link></li>
                                                <li><Link to="/destinations/view-all" className="dropdown-item text-primary">View All</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4">
                                            <h6 className="fw-bold">International Destinations</h6>
                                            <ul className="list-unstyled">
                                                <li><Link to="/destinations/bali" className="dropdown-item">Bali</Link></li>
                                                <li><Link to="/destinations/maldives" className="dropdown-item">Maldives</Link></li>
                                                <li><Link to="/destinations/thailand" className="dropdown-item">Thailand</Link></li>
                                                <li><Link to="/destinations/view-all-intl" className="dropdown-item text-primary">View All</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4 d-none d-md-block">
                                            <img src={gallery2} alt="Promo" className="img-fluid rounded" style={{ height: '300px' }} />
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-item dropdown position-static">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="honeymoonDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ background: 'transparent', border: 'none' }}
                                >
                                    Family Packages
                                </a>
                                <div className="dropdown-menu mt-0 p-4" aria-labelledby="honeymoonDropdown">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h6 className="fw-bold">Indian Destinations</h6>
                                            <ul className="list-unstyled">
                                                <li><Link to="/destinations/kerala" className="dropdown-item">Uttar Pradesh</Link></li>
                                                <li><Link to="/destinations/goa" className="dropdown-item">Goa</Link></li>
                                                <li><Link to="/destinations/uttarakhand" className="dropdown-item">Uttarakhand</Link></li>
                                                <li><Link to="/destinations/view-all" className="dropdown-item text-primary">View All</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4">
                                            <h6 className="fw-bold">International Destinations</h6>
                                            <ul className="list-unstyled">
                                                <li><Link to="/destinations/bali" className="dropdown-item">Bali</Link></li>
                                                <li><Link to="/destinations/maldives" className="dropdown-item">Maldives</Link></li>
                                                <li><Link to="/destinations/thailand" className="dropdown-item">Thailand</Link></li>
                                                <li><Link to="/destinations/view-all-intl" className="dropdown-item text-primary">View All</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4 d-none d-md-block">
                                            <img src={gallery} alt="Promo" className="img-fluid rounded" />
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-item dropdown position-static">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="honeymoonDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ background: 'transparent', border: 'none' }}
                                >
                                    Destination Guide
                                </a>
                                <div className="dropdown-menu mt-0 p-4" aria-labelledby="honeymoonDropdown">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h6 className="fw-bold">Indian Destinations</h6>
                                            <ul className="list-unstyled">
                                                <li><Link to="/destinations/kerala" className="dropdown-item">Kerala</Link></li>
                                                <li><Link to="/destinations/goa" className="dropdown-item">Goa</Link></li>
                                                <li><Link to="/destinations/uttarakhand" className="dropdown-item">Uttarakhand</Link></li>
                                                <li><Link to="/destinations/view-all" className="dropdown-item text-primary">View All</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4">
                                            <h6 className="fw-bold">International Destinations</h6>
                                            <ul className="list-unstyled">
                                                <li><Link to="/destinations/bali" className="dropdown-item">Bali</Link></li>
                                                <li><Link to="/destinations/maldives" className="dropdown-item">Maldives</Link></li>
                                                <li><Link to="/destinations/thailand" className="dropdown-item">Thailand</Link></li>
                                                <li><Link to="/destinations/view-all-intl" className="dropdown-item text-primary">View All</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4 d-none d-md-block">
                                            <img src={gallery} alt="Promo" className="img-fluid rounded" />
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-item dropdown position-static">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="honeymoonDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ background: 'transparent', border: 'none' }}
                                >
                                    Holidays Themes
                                </a>
                                <div className="dropdown-menu mt-0 p-4" aria-labelledby="honeymoonDropdown">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h6 className="fw-bold">Indian Destinations</h6>
                                            <ul className="list-unstyled">
                                                <li><Link to="/destinations/kerala" className="dropdown-item">Kerala</Link></li>
                                                <li><Link to="/destinations/goa" className="dropdown-item">Goa</Link></li>
                                                <li><Link to="/destinations/uttarakhand" className="dropdown-item">Uttarakhand</Link></li>
                                                <li><Link to="/destinations/view-all" className="dropdown-item text-primary">View All</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4">
                                            <h6 className="fw-bold">International Destinations</h6>
                                            <ul className="list-unstyled">
                                                <li><Link to="/destinations/bali" className="dropdown-item">Bali</Link></li>
                                                <li><Link to="/destinations/maldives" className="dropdown-item">Maldives</Link></li>
                                                <li><Link to="/destinations/thailand" className="dropdown-item">Thailand</Link></li>
                                                <li><Link to="/destinations/view-all-intl" className="dropdown-item text-primary">View All</Link></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4 d-none d-md-block">
                                            <img src={gallery} alt="Promo" className="img-fluid rounded" />
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/luxury-holidays"
                                    onClick={handleNavClick}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active text-primary fw-bold' : ''}`
                                    }
                                >
                                    Luxury Holidays
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
