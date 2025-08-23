import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
// import '../styles/login.css';
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
        <section className="login-section">
            <Container>
                <Row className="align-items-center">
                    {/* Left Image */}
                    <Col lg="1" md="6" sm="12"></Col>
                    <Col lg="5" md="6" sm="12" className="">
                        <div className="login__img text-center w-100" style={{ background: 'beige' }}>
                            <img src={loginImg} alt="login" className="img-fluid" />
                        </div>
                    </Col>

                    {/* Right Form */}
                    <Col lg="4" md="6" sm="12">
                        <div className="login__form text-center w-100" style={{ background: 'goldenrod' }}>
                            <div className="user mb-3">
                                <img src={userIcon} alt="user icon" />
                            </div>
                            <h2 className="mb-4">Login Page</h2>

                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        id="email"
                                        required
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        id="password"
                                        required
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </FormGroup>
                                <Button
                                    className='btn secondary__btn auth__btn text-white w-100'
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Form>

                            <p className="mt-3">
                                Don't have an account? <Link to='/register'>Create</Link>
                            </p>
                        </div>
                    </Col>
                    <Col lg="2" md="6" sm="12"></Col>
                </Row>
            </Container>
        </section>
    )
};

export default Login;
