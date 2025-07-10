import React from 'react'
import '../styles/home.css'

import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import experienceImg from '../assets/images/experience.png'
import Subtitle from '../shared/Subtitle'
import SearchBar from '../shared/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/FeaturedTours/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonial from '../components/Testimonial/Testimonial'
import Newsletter from '../shared/Newsletter'

const Home = () => {
    return (

        <>
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className='hero__content'>
                                <div className="hero__subtitle d-flex align-items-center">
                                    <span><Subtitle subtitle={"Know before you go"} /></span>
                                    <img src={worldImg} alt='' />
                                </div>
                                <h1>Travelling opens the door to creating{" "}
                                    <span className='highlight'>memories</span>
                                </h1>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure doloremque accusantium, ab ut cupiditate sint repudiandae eum est saepe voluptate libero, fuga excepturi! Nostrum culpa optio quasi deleniti illum.</p>
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box">
                                <img src={heroImg} alt='' />
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box mt-4">
                                <video src={heroVideo} alt='' controls />
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box mt-5">
                                <img src={heroImg02} alt='' />
                            </div>
                        </Col>

                        <SearchBar />
                    </Row>
                </Container>
            </section>

            {/******************************** Hero section start ********************************/}
            <section>
                <Container>
                    <Row>
                        <Col lg="3">
                            <h5 className='services__subtitle'>What we serve</h5>
                            <h2 className='services__title'>we offer our best services</h2>
                        </Col>
                        <ServiceList />
                    </Row>
                </Container>
            </section>

            {/********************** Featured tour section start **************************/}
            <section>
                <Container>
                    <Row>
                        <Col lg='12' className='mb-5'>
                            {/* <Subtitle subtitle={"Explore"} /> */}
                            <h5 className='services__subtitle'>Explore</h5>
                            <h2 className='featured__tour-title'>Our featured tours</h2>
                        </Col>
                        <FeaturedTourList />
                    </Row>
                </Container>
            </section>

            {/********************************* Experience section start **************************/}
            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className='experience__content'>
                                {/* <Subtitle subtitle={"Experience"} /> */}
                                <h5 className='services__subtitle'>Experience</h5>
                                <h2>With our all experience <br /> we will serve you</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br /> Itaque voluptatibus in reprehenderit ullam, qui laboriosam quis est ea. Harum voluptatem repellendus consequatur fugiat culpa repudiandae reprehenderit atque. Soluta, odit facilis.</p>
                            </div>
                            <div className="conter__wrapper d-flex align-items-center gap-5">
                                <div className='counter__box'>
                                    <span>12k+</span>
                                    <h6>Successful Trip</h6>
                                </div>
                                <div className='counter__box'>
                                    <span>2k+</span>
                                    <h6>Regular Clients</h6>
                                </div>
                                <div className='counter__box'>
                                    <span>15</span>
                                    <h6>Year Experience</h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg="6">
                            <img src={experienceImg} alt='' />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/********************************* Experience section end**************************/}

            {/********************************* Gallery section start**************************/}
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            {/* <Subtitle subtitle={"Experience"} /> */}
                            <h5 className='services__subtitle'>Gallery</h5>
                            <h2 className='gallery__title'>
                                Visit our customer tour gallery
                            </h2>
                        </Col>
                        <Col lg='12'>
                            <MasonryImagesGallery />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*********************************  Gallery section end **************************/}

            {/*********************************  Testimonial section start **************************/}
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            {/* <Subtitle subtitle={"Experience"} /> */}
                            <h5 className='services__subtitle'>Fans Love</h5>
                            <h2 className='testimonial_title'> What our fans say about us</h2>
                        </Col>
                        <Col lg='12'>
                            <Testimonial />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*********************************  Testimonial section end **************************/}
            <Newsletter />
        </>
    )
}

export default Home