import React from 'react'
import './style/footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo3.png'

const quickLinks = [
    { path: '/home', display: 'Home', icon: 'ri-home-line' },
    { path: '/about', display: 'About Us', icon: 'ri-information-line' },
    { path: '/tours', display: 'Tours', icon: 'ri-map-2-line' },
    { path: '/gallery', display: 'Gallery', icon: 'ri-gallery-line' }
]

const services = [
    { path: '/tours', display: 'Tour Packages', icon: 'ri-suitcase-line' },
    { path: '/booking', display: 'Book Now', icon: 'ri-calendar-check-line' },
    { path: '/hotels', display: 'Hotels', icon: 'ri-hotel-line' },
    { path: '/flights', display: 'Flights', icon: 'ri-flight-takeoff-line' }
]

const destinations = [
    { path: '/tours', display: 'Jaipur 3D 2N Package', icon: 'ri-map-pin-line' },
    { path: '/tours', display: 'Kashmir Special', icon: 'ri-snowflake-line' },
    { path: '/tours', display: 'Spiritual Mathura', icon: 'ri-temple-line' },
    { path: '/tours', display: 'Mount Abu Package', icon: 'ri-mountain-line' },
    { path: '/tours', display: 'Nainital Package', icon: 'ri-lake-line' }
]

const support = [
    { path: '/contact', display: 'Contact Us', icon: 'ri-customer-service-line' },
    { path: '/faq', display: 'FAQ', icon: 'ri-question-line' },
    { path: '/help', display: 'Help Center', icon: 'ri-question-answer-line' },
    { path: '/privacy', display: 'Privacy Policy', icon: 'ri-shield-check-line' }
]

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='footer'>
            {/* Newsletter Section */}
            <div className='footer-newsletter'>
                <Container>
                    <Row className='align-items-center'>
                        <Col lg='6' md='12'>
                            <div className='newsletter-content'>
                                <h3>Subscribe Now to Get Useful Travelling Information</h3>
                                <p>Get exclusive travel tips, amazing deals, and destination guides delivered straight to your inbox.</p>
                            </div>
                        </Col>
                        <Col lg='6' md='12'>
                            <div className='newsletter-form'>
                                <div className='input-group'>
                                    <input type='email' className='form-control' placeholder='Enter your email address' />
                                    <button className='btn btn-primary' type='button'>
                                        <i className='ri-send-plane-line'></i> Subscribe
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Main Footer Content */}
            <div className='footer-main'>
                <Container>
                    <Row className="gy-4">
                        {/* Company Info */}
                        <Col lg='4' md='6' sm='12'>
                            <div className='footer-brand'>
                                <div className='logo'>
                                    <img src={logo} alt='TripTravel' />
                                    <h4>TripTravel</h4>
                                </div>
                                <p className='brand-description'>
                                    Your trusted travel companion for unforgettable journeys. We specialize in creating 
                                    magical experiences that last a lifetime, from exotic destinations to cultural adventures, 
                                    ensuring every trip becomes a cherished memory.
                                </p>
                                <div className='social__links'>
                                    <h6>Follow Us</h6>
                                    <div className='social-icons'>
                                        <Link to='#' className='social-icon'><i className='ri-facebook-fill'></i></Link>
                                        <Link to='#' className='social-icon'><i className='ri-twitter-fill'></i></Link>
                                        <Link to='#' className='social-icon'><i className='ri-instagram-fill'></i></Link>
                                        <Link to='#' className='social-icon'><i className='ri-youtube-fill'></i></Link>
                                        <Link to='#' className='social-icon'><i className='ri-linkedin-fill'></i></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Quick Links */}
                        <Col lg='2' md='6' sm='6'>
                            <div className='footer-section'>
                                <h5 className='footer__link-title'>
                                    <i className='ri-links-line'></i> Quick Links
                                </h5>
                                <ListGroup className='footer__quick-links'>
                                    {quickLinks.map((item, index) => (
                                        <ListGroupItem key={index} className='ps-0 border-0'>
                                            <Link to={item.path}>
                                                <i className={item.icon}></i>
                                                {item.display}
                                            </Link>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>

                        {/* Services */}
                        <Col lg='2' md='6' sm='6'>
                            <div className='footer-section'>
                                <h5 className='footer__link-title'>
                                    <i className='ri-service-line'></i> Services
                                </h5>
                                <ListGroup className='footer__quick-links'>
                                    {services.map((item, index) => (
                                        <ListGroupItem key={index} className='ps-0 border-0'>
                                            <Link to={item.path}>
                                                <i className={item.icon}></i>
                                                {item.display}
                                            </Link>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>

                        {/* Popular Destinations */}
                        <Col lg='2' md='6' sm='6'>
                            <div className='footer-section'>
                                <h5 className='footer__link-title'>
                                    <i className='ri-map-pin-3-line'></i> Destinations
                                </h5>
                                <ListGroup className='footer__quick-links'>
                                    {destinations.map((item, index) => (
                                        <ListGroupItem key={index} className='ps-0 border-0'>
                                            <Link to={item.path}>
                                                <i className={item.icon}></i>
                                                {item.display}
                                            </Link>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>

                        {/* Support & Contact */}
                        <Col lg='2' md='6' sm='6'>
                            <div className='footer-section'>
                                <h5 className='footer__link-title'>
                                    <i className='ri-customer-service-2-line'></i> Support
                                </h5>
                                <ListGroup className='footer__quick-links'>
                                    {support.map((item, index) => (
                                        <ListGroupItem key={index} className='ps-0 border-0'>
                                            <Link to={item.path}>
                                                <i className={item.icon}></i>
                                                {item.display}
                                            </Link>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Contact Info Bar */}
            <div className='footer-contact-bar'>
                <Container>
                    <Row className='align-items-center'>
                        <Col md='4' sm='12'>
                            <div className='contact-item'>
                                <i className='ri-map-pin-line'></i>
                                <div>
                                    <h6>Our Location</h6>
                                    <p>Noida, Uttar Pradesh, India</p>
                                </div>
                            </div>
                        </Col>
                        <Col md='4' sm='12'>
                            <div className='contact-item'>
                                <i className='ri-mail-line'></i>
                                <div>
                                    <h6>Email Us</h6>
                                    <p>Travel@go4holidays.com</p>
                                </div>
                            </div>
                        </Col>
                        <Col md='4' sm='12'>
                            <div className='contact-item'>
                                <i className='ri-phone-line'></i>
                                <div>
                                    <h6>Call Us</h6>
                                    <p>+91 9971-347-577</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Footer Bottom */}
            <div className='footer-bottom'>
                <Container>
                    <Row className='align-items-center'>
                        <Col md='6' sm='12'>
                            <p className='copyright'>
                                &copy; {year} TripTravel. All rights reserved. Designed and developed by Suman Pal.
                            </p>
                        </Col>
                        <Col md='6' sm='12'>
                            <div className='footer-bottom-links'>
                                <Link to='/privacy'>Privacy Policy</Link>
                                <Link to='/terms'>Terms of Service</Link>
                                <Link to='/cookies'>Cookie Policy</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    )
}

export default Footer
