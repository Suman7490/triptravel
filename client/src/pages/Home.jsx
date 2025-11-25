import React, { useState, useEffect, useRef } from 'react'
import '../styles/home.css'

import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import experienceImg from '../assets/images/experience.png'
import Subtitle from '../shared/Subtitle'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonial from '../components/Testimonial'
import { TripTypeFilter, BudgetFilter, TourThemeFilter, DurationFilter, SeasonFilter, MonthFilter, ApplyResetButtons } from "../shared/TourFilters";
import { LocationFilter } from '../shared/LocationFilter'
import ThemesSlider from './ThemesSlider'
import TourSlider from './TourSlider'

const Home = () => {
    const [filters, setFilters] = useState({ country: "", state: "" });
    const [featuredFilters, setFeaturedFilters] = useState({
        tripType: "",
        theme: "",
        duration: "",
        month: "",
        budget: { min: 1000, max: 100000 }
    });
    const [tempFilters, setTempFilters] = useState({
        tripType: "",
        theme: "",
        duration: "",
        month: "",
        budget: { min: 1000, max: 100000 }
    });
    const [filterKey, setFilterKey] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const refs = useRef({});

    const handleFilterChange = (filters) => {
        setFilters(filters);
    };

    const handleFeaturedFilterChange = (filterType, value) => {
        setTempFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleApplyFilters = () => {
        setFeaturedFilters(tempFilters);
    };

    const handleResetFilters = () => {
        const resetFilters = {
            tripType: "",
            theme: "",
            duration: "",
            month: "",
            budget: { min: 1000, max: 100000 }
        };
        setTempFilters(resetFilters);
        setFeaturedFilters(resetFilters);
        setFilterKey(prev => prev + 1); // Force re-render of filter components
    };

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        // Observe all sections
        Object.values(refs.current).forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const setRef = (id) => (el) => {
        if (el) {
            refs.current[id] = el;
            el.id = id;
        }
    };

    return (

        <>
            <section className="hero-section" ref={setRef('hero')}>
                <div className="hero-background">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                        <div className="shape shape-4"></div>
                        <div className="shape shape-5"></div>
                    </div>
                    <div className="hero-particles">
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                        <div className="particle"></div>
                    </div>
                </div>
                <Container>
                    <Row className="align-items-center min-vh-100">
                        <Col lg='6'>
                            <div className={`hero__content ${isVisible.hero ? 'animate-fade-in-up' : ''}`}>
                                <div className="hero__subtitle d-flex align-items-center">
                                    <span><Subtitle subtitle={"Know before you go"} /></span>
                                    <img src={worldImg} alt='' className="world-icon" />
                                </div>
                                <h1 className="hero-title">
                                    Explore the World, Create{" "}
                                    <span className='highlight gradient-text'>Unforgettable Adventures</span>
                                </h1>
                                <p className="hero-description">
                                    From exotic beaches to mountain peaks, from ancient cities to modern metropolises - discover your next adventure with our curated travel experiences. Book your dream trip today!
                                </p>
                                <div className="hero-buttons">
                                    <button className="primary__btn hero-btn">
                                        <a href="#tours">Start Your Journey</a>
                                    </button>
                                    <button className="secondary__btn hero-btn">
                                        <a href="#gallery">See Destinations</a>
                                    </button>
                                </div>
                                <div className="hero-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">500+</span>
                                        <span className="stat-label">Destinations</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">50K+</span>
                                        <span className="stat-label">Happy Travelers</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">24/7</span>
                                        <span className="stat-label">Support</span>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg='6' className='hero-images-col'>
                            <div className={`hero__images ${isVisible.hero ? 'animate-fade-in-right' : ''}`}>
                                <div className="hero__img-box hero-img-1">
                                    <img src={heroImg} alt='' />
                                    <div className="img-overlay"></div>
                                </div>
                                <div className="hero__img-box hero-img-2">
                                    <video src={heroVideo} controls />
                                    <div className="img-overlay"></div>
                                </div>
                                <div className="hero__img-box hero-img-3">
                                    <img src={heroImg02} alt='' />
                                    <div className="img-overlay"></div>
                                </div>
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

            {/******************************** Themes Section ********************************/}
            <section className="themes-section" ref={setRef('themes')}>
                <div className={`themes-container ${isVisible.themes ? 'animate-fade-in-up' : ''}`}>
                    <ThemesSlider />
                </div>
            </section>

            {/******************************** Tours Section ********************************/}
            <section className="tours-section" ref={setRef('tours')}>
                <Container>
                    <Row>
                        <Col lg='12' className="mb-4">
                            <div className={`section-header ${isVisible.tours ? 'animate-fade-in-up' : ''}`}>
                                <h2 className="section-title">Discover Amazing Tours</h2>
                                <p className="section-subtitle">Find your perfect adventure with our curated selection</p>
                            </div>
                        </Col>
                        <Col lg='12' className='mb-4'>
                            <div className={`location-filter-wrapper ${isVisible.tours ? 'animate-fade-in-up' : ''}`}>
                                <LocationFilter onFilterChange={handleFilterChange} />
                            </div>
                        </Col>
                        <Col lg='12'>
                            <div className={`tour-slider-wrapper ${isVisible.tours ? 'animate-fade-in-up' : ''}`}>
                                <TourSlider filters={filters} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/******************************** Services Section ********************************/}
            <section className="services-section" ref={setRef('services')}>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5">
                            <div className={`services-header text-center ${isVisible.services ? 'animate-fade-in-up' : ''}`}>
                                <h5 className='services__subtitle'>Travel Services</h5>
                                <h2 className='services__title'>Your Complete Travel Solution</h2>
                                <p className="services__description">
                                    From booking flights to planning itineraries, we provide everything you need for the perfect getaway. Let us handle the details while you focus on making memories.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12">
                            <div className={`services-content ${isVisible.services ? 'animate-fade-in-up' : ''}`}>
                                <ServiceList />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/******************************** Featured Tours Section ********************************/}
            <section className="featured-tours-section" ref={setRef('featured-tours')}>
                <Container>
                    <Row>
                        <Col lg='12' className='mb-5'>
                            <div className={`section-header text-center ${isVisible['featured-tours'] ? 'animate-fade-in-up' : ''}`}>
                                <h5 className='services__subtitle'>Explore</h5>
                                <h2 className='featured__tour-title'>Our featured tours</h2>
                                <p className="section-subtitle">Handpicked experiences that will create lasting memories</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='3'>
                            <div className={`filters-sidebar ${isVisible['featured-tours'] ? 'animate-fade-in-left' : ''}`}>
                                <div className="filters-card">
                                    <h6 className="filters-title">Filter Tours</h6>
                                    <TripTypeFilter
                                        key={`tripType-${filterKey}`}
                                        onFilterChange={handleFeaturedFilterChange}
                                        currentValue={tempFilters.tripType}
                                    />
                                    <TourThemeFilter
                                        key={`theme-${filterKey}`}
                                        onFilterChange={handleFeaturedFilterChange}
                                        currentValue={tempFilters.theme}
                                    />
                                    <DurationFilter
                                        key={`duration-${filterKey}`}
                                        onFilterChange={handleFeaturedFilterChange}
                                        currentValue={tempFilters.duration}
                                    />
                                    <MonthFilter
                                        key={`month-${filterKey}`}
                                        onFilterChange={handleFeaturedFilterChange}
                                        currentValue={tempFilters.month}
                                    />
                                    <BudgetFilter
                                        key={`budget-${filterKey}`}
                                        onFilterChange={handleFeaturedFilterChange}
                                        currentValue={tempFilters.budget}
                                    />
                                    <ApplyResetButtons
                                        onReset={handleResetFilters}
                                        onApply={handleApplyFilters}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col lg='9'>
                            <div className={`tours-grid ${isVisible['featured-tours'] ? 'animate-fade-in-right' : ''}`}>
                                <FeaturedTourList filters={featuredFilters} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/********************************* Experience Section ********************************/}
            <section className="experience-section" ref={setRef('experience')}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg="6">
                            <div className={`experience__content ${isVisible.experience ? 'animate-fade-in-left' : ''}`}>
                                <h5 className='services__subtitle'>Experience</h5>
                                <h2 className="experience-title">
                                    With our all experience <br />
                                    <span className="gradient-text">we will serve you</span>
                                </h2>
                                <p className="experience-description">
                                    With years of expertise in travel planning and a passion for creating unforgettable experiences,
                                    we've helped thousands of travelers discover the world's most beautiful destinations.
                                    Our commitment to excellence ensures every journey is extraordinary.
                                </p>
                            </div>
                            <div className={`counter__wrapper ${isVisible.experience ? 'animate-fade-in-up' : ''}`}>
                                <div className='counter__box'>
                                    <span className="counter-number">12k+</span>
                                    <h6>Successful Trips</h6>
                                </div>
                                <div className='counter__box'>
                                    <span className="counter-number">2k+</span>
                                    <h6>Happy Clients</h6>
                                </div>
                                <div className='counter__box'>
                                    <span className="counter-number">15</span>
                                    <h6>Years Experience</h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div className={`experience-image-wrapper ${isVisible.experience ? 'animate-fade-in-right' : ''}`}>
                                <div className="experience-image-container">
                                    <img src={experienceImg} alt='Experience' className='experience-image' />
                                    <div className="image-decoration"></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/********************************* Gallery Section ********************************/}
            <section className="gallery-section" ref={setRef('gallery')}>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className={`section-header text-center ${isVisible.gallery ? 'animate-fade-in-up' : ''}`}>
                                <h5 className='services__subtitle'>Gallery</h5>
                                <h2 className='gallery__title'>
                                    Visit our customer tour gallery
                                </h2>
                                <p className="section-subtitle">Capturing moments from our amazing journeys around the world</p>
                            </div>
                        </Col>
                        <Col lg='12'>
                            <div className={`gallery-container ${isVisible.gallery ? 'animate-fade-in-up' : ''}`}>
                                <MasonryImagesGallery />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/********************************* Testimonial Section ********************************/}
            <section className="testimonial-section" ref={setRef('testimonial')}>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className={`section-header text-center ${isVisible.testimonial ? 'animate-fade-in-up' : ''}`}>
                                <h5 className='services__subtitle'>Fans Love</h5>
                                <h2 className='testimonial_title'>What our fans say about us</h2>
                                <p className="section-subtitle">Real stories from real travelers who experienced the magic</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="testimonial-content-section">
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className={`testimonial-container ${isVisible.testimonial ? 'animate-fade-in-up' : ''}`}>
                                <Testimonial />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


        </>
    )
}

export default Home