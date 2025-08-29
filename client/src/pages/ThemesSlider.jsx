import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";

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

    if (!themes.length) return <h5 className="text-center mt-5">No themes found</h5>;

    // Break themes into chunks of 4 per slide
    const chunkedThemes = [];
    for (let i = 0; i < themes.length; i += 4) {
        chunkedThemes.push(themes.slice(i, i + 4));
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Explore destinations by theme</h2>
                <p className="mb-0">
                    For best packages, call us at{" "}
                    <a href="tel:18001235555" className="text-success fw-bold">
                        1800-123-5555
                    </a>
                </p>
            </div>

            <div id="themesCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {chunkedThemes.map((group, idx) => (
                        <div
                            className={`carousel-item ${idx === 0 ? "active" : ""}`}
                            key={idx}
                        >
                            <div className="row">
                                {group.map((theme) => (
                                    <div className="col-6 col-md-3" key={theme._id}>
                                        <div className="card border-0 h-100 shadow-sm">
                                            <img
                                                src={theme.photo}
                                                className="card-img-top"
                                                alt={theme.name}
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                            <div className="card-body text-center">
                                                <h6 className="fw-bold">{theme.name}</h6>
                                                <small className="text-muted">
                                                    {Math.floor(Math.random() * 100) + 20}+ destinations
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#themesCarousel"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon bg-dark rounded-circle p-2" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#themesCarousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon bg-dark rounded-circle p-2" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default ThemesSlider;
