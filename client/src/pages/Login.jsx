import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from './../context/authContext';
import { BASE_URL } from './../utils/config';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();

        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(credentials),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message);
                dispatch({ type: 'LOGIN_FAILED', payload: result.message });
                return;
            }

            dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });

            if (result.data.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }

        } catch (error) {
            dispatch({ type: 'LOGIN_FAILED', payload: error.message });
        }
    };

    return (
        <>
            <section className="login-section">
                <div className="login-background">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                        <div className="shape shape-4"></div>
                    </div>
                </div>
                
                <Container>
                    <Row className="align-items-center min-vh-100">
                    {/* Left Side - Image and Content */}
                    <Col lg="6" md="12" className="order-2 order-lg-1">
                        <div className="login-content">
                            <div className="login-welcome">
                                <h1 className="welcome-title">
                                    Welcome Back to
                                    <span className="brand-name"> TripTravel</span>
                                </h1>
                                <p className="welcome-subtitle">
                                    Your journey to amazing destinations starts here. 
                                    Sign in to continue your adventure and discover the world.
                                </p>
                            </div>
                            
                            <div className="login-image-wrapper">
                                <img src={loginImg} alt="Travel Login" className="login-image" />
                                <div className="image-overlay">
                                    <div className="overlay-content">
                                        <i className="ri-plane-line"></i>
                                        <h4>Explore the World</h4>
                                        <p>Join thousands of travelers discovering amazing destinations</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Right Side - Login Form */}
                    <Col lg="6" md="12" className="order-1 order-lg-2">
                        <div className="login-form-container">
                            <div className="login-form-card">
                                <div className="form-header">
                                    <div className="user-avatar">
                                        <img src={userIcon} alt="User" />
                                    </div>
                                    <h2 className="form-title">Sign In</h2>
                                    <p className="form-subtitle">Enter your credentials to access your account</p>
                                </div>

                                <Form onSubmit={handleClick} className="login-form">
                                    <FormGroup className="form-group">
                                        <div className="input-wrapper">
                                            <i className="ri-mail-line input-icon"></i>
                                            <input
                                                type='email'
                                                placeholder='Enter your email address'
                                                id="email"
                                                required
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </FormGroup>
                                    
                                    <FormGroup className="form-group">
                                        <div className="input-wrapper">
                                            <i className="ri-lock-line input-icon"></i>
                                            <input
                                                type='password'
                                                placeholder='Enter your password'
                                                id="password"
                                                required
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </FormGroup>

                                    <div className="form-options">
                                        <div className="remember-me">
                                            <input type="checkbox" id="remember" className="checkbox" />
                                            <label htmlFor="remember">Remember me</label>
                                        </div>
                                        <Link to="/forgot-password" className="forgot-password">
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <Button
                                        className='login-btn'
                                        type="submit"
                                    >
                                        <i className="ri-login-box-line"></i>
                                        Sign In
                                    </Button>
                                </Form>

                                <div className="form-footer">
                                    <p className="signup-text">
                                        Don't have an account? 
                                        <Link to='/register' className="signup-link">
                                            Create Account
                                        </Link>
                                    </p>
                                    
                                    <div className="divider">
                                        <span>Or continue with</span>
                                    </div>
                                    
                                    <div className="social-login">
                                        <button className="social-btn google-btn">
                                            <i className="ri-google-fill"></i>
                                            Google
                                        </button>
                                        <button className="social-btn facebook-btn">
                                            <i className="ri-facebook-fill"></i>
                                            Facebook
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
};

export default Login;
