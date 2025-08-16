import React, { useContext, useRef } from 'react'; // ✅
import { Container, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { AuthContext } from '../context/authContext';
import './style/header.css';

const Header = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    const isAdmin = user?.role === 'admin';
    const navbarCollapseRef = useRef(null);

    const filteredNavLinks = isAdmin
        ? [
            { path: '/', display: 'Dashboard' },
            { path: '/dashboard/create-tour', display: 'Create Tour' },
            { path: '/dashboard/tours', display: 'Tours' },
            { path: '/dashboard/bookings', display: 'Bookings' }
        ]
        : [
            { path: '/', display: 'Home' },
            { path: '/tours', display: 'Tours' },
        ];

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const handleNavClick = () => {
        if (navbarCollapseRef.current?.classList.contains('show')) {
            navbarCollapseRef.current.classList.remove('show');
        }
    };

    return (
        <header className="header sticky-top bg-white shadow-sm">
            <Container>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" className="img-fluid" style={{ width: '120px' }} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent" ref={navbarCollapseRef}>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {filteredNavLinks.map((item, index) => (
                                <li className="nav-item" key={index}>
                                    <NavLink
                                        to={item.path}
                                        onClick={handleNavClick}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'active text-primary fw-bold' : ''}`
                                        }
                                    >
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <div className="d-flex align-items-center gap-3 ms-lg-4 mt-3 mt-lg-0">
                            {user ? (
                                <>
                                    <span className="fw-semibold">{user.username}</span>
                                    <Button color="dark" size="sm" onClick={logout}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-outline-primary btn-sm" onClick={handleNavClick}>
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn btn-primary btn-sm" onClick={handleNavClick}>
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
