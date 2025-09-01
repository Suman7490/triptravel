import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'reactstrap'
import Slider from "react-slick";
import { BASE_URL } from "../utils/config";
import { Link } from 'react-router-dom'

const ThemesSlider = () => {
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const res = await fetch(`${BASE_URL}/themes`);
                const result = await res.json();
                if (result.success) setThemes(result.data);
            } catch (err) {
                console.error("Error fetching themes:", err);
            }
        };
        fetchThemes();
    }, []);

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
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (!themes.length) return <h5 className="text-center mt-5">No themes found</h5>;

    return (
        <Container>
            <Row>
                <Col lg='12'>
                    <h2 className="text-2xl font-bold mb-4">Explore Themes</h2>
                    <Slider {...settings}>
                        {themes.map((theme) => (
                            <div
                                key={theme._id}
                                className="col-6 col-md-3 col-lg-3 px-2 themes-slide"
                                style={{ flex: "0 0 auto" }}
                            >
                                <Link to={`/themes/${theme._id}/tours`} style={{ textDecoration: "none" }}>
                                    <div className="card border-0 shadow-sm h-100">
                                        <img
                                            src={theme.photo}
                                            className="card-img-top"
                                            alt={theme.name}
                                            style={{ height: 160, objectFit: "cover" }}
                                        />
                                        <div className="card-body text-center">
                                            <h6 className="fw-bold">{theme.name}</h6>
                                            <small className="text-muted">
                                                {Math.floor(Math.random() * 100) + 20}+ destinations
                                            </small>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
        </Container>

    );
};

export default ThemesSlider;
