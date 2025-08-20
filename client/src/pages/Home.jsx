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
import FeaturedTourList from '../components/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonial from '../components/Testimonial'
import Newsletter from '../shared/Newsletter'
import TourFilters from '../shared/TourFilters'
import CompositeFilters from '../shared/CompositeFilters'
import { TripTypeFilter, BudgetFilter, LocationFilter, TourThemeFilter, DurationFilter, SeasonMonthFilter, ApplyResetButtons } from "../shared/TourFilters";

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

                        <Col lg='6' className='d-flex gap-3 mt-4'>
                            <div className="hero__img-box flex-fill">
                                <img src={heroImg} alt='' />
                            </div>
                            <div className="hero__img-box flex-fill mt-2">
                                <video src={heroVideo} controls />
                            </div>
                            <div className="hero__img-box flex-fill mt-4">
                                <img src={heroImg02} alt='' />
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>

            {/******************************** Search Bar ********************************/}
            {/* <section className='search-bar-wrapper'>
                <Container>
                    <Row>
                        <SearchBar />
                    </Row>
                </Container>
            </section> */}

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
                            <h5 className='services__subtitle'>Explore</h5>
                            <h2 className='featured__tour-title'>Our featured tours</h2>
                        </Col>
                    </Row>
                    <Row>
                        {/* <Col lg='4'>
                            <TripTypeFilter />
                            <BudgetFilter />
                            <LocationFilter />
                            <TourThemeFilter />
                            <DurationFilter />
                            <SeasonMonthFilter />
                            <ApplyResetButtons />
                        </Col> */}
                        {/* <FeaturedTourList /> */}
                        <Col lg='3 border'>
                            <TripTypeFilter />
                            <BudgetFilter />
                            <LocationFilter />
                            <TourThemeFilter />
                            <DurationFilter />
                            <SeasonMonthFilter />
                            <ApplyResetButtons />
                        </Col>
                        <Col lg='9 border d-flex flex-wrap justify-content-between'>
                            <FeaturedTourList />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/********************************* Experience section start **************************/}
            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className='experience__content'>
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
                            <img src={experienceImg} alt='' className='img-fluid rounded' />
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
                            <h5 className='services__subtitle'>Fans Love</h5>
                            <h2 className='testimonial_title'> What our fans say about us</h2>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <Testimonial />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*********************************  Testimonial section end **************************/}
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <Newsletter />
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default Home