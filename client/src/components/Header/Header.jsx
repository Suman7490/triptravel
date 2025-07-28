import React, { useContext } from 'react';
import { Container, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { AuthContext } from './../../context/authContext';
import './header.css';

const navLinks = [
    { path: '/home', display: 'Home' },
    { path: '/tours', display: 'Tours' },
    { path: '/createTour', display: 'Create Tour' },
    { path: '/bookings', display: 'Bookings' },
];

const Header = () => {
    const navigation = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigation('/');
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

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {navLinks.map((item, index) => (
                                <li className="nav-item" key={index}>
                                    <NavLink
                                        to={item.path}
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
                                    <Link to="/login" className="btn btn-outline-primary btn-sm">
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn btn-primary btn-sm">
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
