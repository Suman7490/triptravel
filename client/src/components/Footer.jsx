import React from 'react'
import './style/footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo3.png'

const quickLinks = [
    { path: '/home', display: 'Home' },
    { path: '/about', display: 'About' },
    { path: '/tours', display: 'Tours' }
]

const quickLinks2 = [
    { path: '/gallery', display: 'Gallery' },
    { path: '/login', display: 'Login' },
    { path: '/register', display: 'Register' }
]

const quickLinks3 = [
    { path: '/gallery', display: 'Jaipur 3D 2N Package' },
    { path: '/login', display: 'Kashmir Special' },
    { path: '/register', display: 'Spritual Mathura' },
    { path: '/register', display: 'Mount Abu Package' },
    { path: '/register', display: 'Nanital Package' },
]

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='footer'>
            <Container>
                <Row className="gy-4">
                    <Col lg='3' md='6' sm='12'>
                        <div className='logo'>
                            <img src={logo} alt='' />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                            <div className='social__links d-flex align-items-center gap-3'>
                                <span><Link to='#'><i className='ri-youtube-line ri-2x'></i></Link></span>
                                <span><Link to='#'><i className='ri-twitter-line ri-2x'></i></Link></span>
                                <span><Link to='#'><i className='ri-facebook-circle-line ri-2x'></i></Link></span>
                                <span><Link to='#'><i className='ri-instagram-line ri-2x'></i></Link></span>
                            </div>
                        </div>
                    </Col>

                    <Col lg='2' md='6' sm='6'>
                        <h5 className='footer__link-title'>Discover</h5>
                        <ListGroup className='footer__quick-links'>
                            {quickLinks.map((item, index) => (
                                <ListGroupItem key={index} className='ps-0 border-0'>
                                    <Link to={item.path}>{item.display}</Link>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col lg='2' md='6' sm='6'>
                        <h5 className='footer__link-title'>Quick Links</h5>
                        <ListGroup className='footer__quick-links'>
                            {quickLinks2.map((item, index) => (
                                <ListGroupItem key={index} className='ps-0 border-0'>
                                    <Link to={item.path}>{item.display}</Link>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col lg='3' md='6' sm='6'>
                        <h5 className='footer__link-title'>Popular Tour Packages</h5>
                        <ListGroup className='footer__quick-links'>
                            {quickLinks3.map((item, index) => (
                                <ListGroupItem key={index} className='ps-0 border-0'>
                                    <Link to={item.path}>{item.display}</Link>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col lg='2' md='6' sm='12'>
                        <h5 className='footer__link-title'>Contact</h5>
                        <ListGroup className='footer__quick-links'>

                            <ListGroupItem className='ps-0 border-0 d-flex align-items-start gap-2'>
                                <i className='ri-map-pin-line'></i>
                                <p className='mb-0'>Noida, India</p>
                            </ListGroupItem>

                            <ListGroupItem className='ps-0 border-0 d-flex align-items-start gap-2'>
                                <i className='ri-mail-line'></i>
                                <p className='mb-0'>Travel@go4holidays.com</p>
                            </ListGroupItem>

                            <ListGroupItem className='ps-0 border-0 d-flex align-items-start gap-2'>
                                <i className='ri-phone-fill'></i>
                                <p className='mb-0'>+91 9971-347-577</p>
                            </ListGroupItem>

                        </ListGroup>
                    </Col>

                    <Col lg='12' className='text-center pt-4'>
                        <p className='copyright'>
                            &copy; {year}, designed and developed by Suman Pal. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
