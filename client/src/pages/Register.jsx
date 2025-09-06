import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from './../context/authContext'
import { BASE_URL } from './../utils/config'

const Register = () => {

    const [credentials, setCredentials] = useState({
        userName: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined
    });

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();

        // Validate password confirmation
        if (credentials.password !== credentials.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Remove confirmPassword from credentials before sending
        const { confirmPassword, ...registerData } = credentials;

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(registerData)
            })
            const result = await res.json()

            if (!res.ok) {
                alert(result.message);
                return;
            }

            dispatch({ type: 'REGISTER_SUCCESS' })
            navigate('/login')

        } catch (error) {
            alert(error.message)
        }
    }

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
                                        Join Our
                                        <span className="brand-name"> Travel Community</span>
                                    </h1>
                                    <p className="welcome-subtitle">
                                        Start your journey with us today! Create your account and unlock 
                                        access to amazing travel experiences, exclusive deals, and personalized recommendations.
                                    </p>
                                </div>
                                
                                <div className="login-image-wrapper">
                                    <img src={registerImg} alt="Travel Register" className="login-image" />
                                    <div className="image-overlay">
                                        <div className="overlay-content">
                                            <i className="ri-user-add-line"></i>
                                            <h4>Join Thousands of Travelers</h4>
                                            <p>Be part of our growing community of adventure seekers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Right Side - Register Form */}
                        <Col lg="6" md="12" className="order-1 order-lg-2">
                            <div className="login-form-container">
                                <div className="login-form-card">
                                    <div className="form-header">
                                        <div className="user-avatar">
                                            <img src={userIcon} alt="User" />
                                        </div>
                                        <h2 className="form-title">Create Account</h2>
                                        <p className="form-subtitle">Fill in your details to get started</p>
                                    </div>

                                    <Form onSubmit={handleClick} className="login-form">
                                        <FormGroup className="form-group">
                                            <div className="input-wrapper">
                                                <i className="ri-user-line input-icon"></i>
                                                <input
                                                    type='text'
                                                    placeholder='Enter your username'
                                                    id="userName"
                                                    required
                                                    onChange={handleChange}
                                                    className="form-input"
                                                />
                                            </div>
                                        </FormGroup>
                                        
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
                                                    placeholder='Create a password'
                                                    id="password"
                                                    required
                                                    onChange={handleChange}
                                                    className="form-input"
                                                />
                                            </div>
                                        </FormGroup>

                                        <FormGroup className="form-group">
                                            <div className="input-wrapper">
                                                <i className="ri-lock-unlock-line input-icon"></i>
                                                <input
                                                    type='password'
                                                    placeholder='Confirm your password'
                                                    id="confirmPassword"
                                                    required
                                                    onChange={handleChange}
                                                    className="form-input"
                                                />
                                            </div>
                                        </FormGroup>

                                        <div className="form-options">
                                            <div className="remember-me">
                                                <input type="checkbox" id="terms" className="checkbox" required />
                                                <label htmlFor="terms">I agree to the <Link to="/terms" className="terms-link">Terms & Conditions</Link></label>
                                            </div>
                                        </div>

                                        <Button
                                            className='login-btn'
                                            type="submit"
                                        >
                                            <i className="ri-user-add-line"></i>
                                            Create Account
                                        </Button>
                                    </Form>

                                    <div className="form-footer">
                                        <p className="signup-text">
                                            Already have an account? 
                                            <Link to='/login' className="signup-link">
                                                Sign In
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
}

export default Register