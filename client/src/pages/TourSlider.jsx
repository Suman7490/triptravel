import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import { Container, Row, Col, Button } from 'reactstrap';
import { BASE_URL } from "../utils/config";

const TourSlider = ({ filters }) => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            let query = "";

            if (filters?.domestic && !filters?.international) {
                // Only domestic selected
                query = `country=India`;
            } else if (!filters?.domestic && filters?.international) {
                // Only international selected
                query = `country_ne=India`; // backend must support this
            } else if ((filters?.domestic && filters?.international) || (!filters?.domestic && !filters?.international)) {
                // Both selected OR none selected → fetch all
                query = "";
            }

            try {
                const res = await fetch(`${BASE_URL}/tours${query ? `?${query}` : ""}`);
                const result = await res.json();
                console.log("Fetched tours with filters:", filters, result);

                if (result.success) setTours(result.data);
                else setTours([]);
            } catch (err) {
                console.error("Error fetching tours:", err);
                setTours([]);
            }
        };

        fetchTours();
    }, [filters]);

    const NextArrow = ({ className, style, onClick }) => (
        <button
            className={`${className} custom-arrow next`}
            style={{ ...style, display: "block", background: "#000", color: "#fff", borderRadius: "50%" }}
            onClick={onClick}
        >
            ➜
        </button>
    );

    const PrevArrow = ({ className, style, onClick }) => (
        <button
            className={`${className} custom-arrow prev`}
            style={{ ...style, display: "block", background: "#000", color: "#fff", borderRadius: "50%" }}
            onClick={onClick}
        >
            ←
        </button>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        centerMode: false,
        focusOnSelect: false,
        variableWidth: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (!tours.length) return <h5 className="text-center mt-5">No tours found</h5>;

    return (
        <Container>
            <Row>
                <Col lg='12'>
                    <Slider {...settings}>
                        {tours.map((tour) => (
                            <div key={tour._id} className="tour-item">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-img-wrapper">
                                        <img
                                            src={tour.photo}
                                            className="card-img-top"
                                            alt={tour.title}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <div className="tour-header">
                                            <h6 className="tour-city">{tour.city}</h6>
                                            <span className="tour-time">
                                                {tour.bestTime?.from || 'N/A'} - {tour.bestTime?.to || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="tour-footer">
                                            <div className="tour-price">₹{tour.price}</div>
                                            <Link to={`/tour/${tour._id}`} className="tour-btn">
                                                View Packages
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
        </Container>
    );
};

export default TourSlider;
