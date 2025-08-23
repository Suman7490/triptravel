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
        password: undefined
    });

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const result = await res.json()

            if (!res.ok) alert(result.message)

            dispatch({ type: 'REGISTER_SUCCESS' })
            navigate('/login')

        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <section className="login-section">
            <Container>
                <Row className="align-items-center">
                    <Col lg="1" md="6" sm="12"></Col>
                    <Col lg="5" md="6" sm="12" className="">
                        <div className="login__img text-center w-100" style={{ background: 'beige' }}>
                            <img src={registerImg} alt="login" className="img-fluid" />
                        </div>
                    </Col>
                    <Col lg="4" md="6" sm="12">
                        <div className="login__form text-center w-100" style={{ background: 'goldenrod' }}>
                            <div className='user mb-3'>
                                <img src={userIcon} alt='' />
                            </div>
                            <h2>Register</h2>
                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input type='text' placeholder='Username' id="username" required onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <input type='email' placeholder='Email' id="email" required onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <input type='password' placeholder='Password' id="password"
                                        required onChange={handleChange} />
                                </FormGroup>
                                <Button className='btn secondary__btn auth__btn text-white' type="submit">Create Account</Button>
                            </Form>
                            <p>Already have an account? <Link to='/login'>Login</Link> </p>
                        </div>
                    </Col>
                    <Col lg="2" md="6" sm="12"></Col>
                </Row>
            </Container >
        </section >
    )
}

export default Register