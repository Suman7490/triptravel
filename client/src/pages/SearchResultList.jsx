import React, { useState, useEffect } from 'react';
import CommonSection from './../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import Newsletter from './../shared/Newsletter';
import { useLocation } from 'react-router-dom';
import TourCard from './../shared/TourCard';
import { BASE_URL } from '../utils/config';

const SearchResultList = () => {
    const location = useLocation();

    // Get search query from query params or state
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('city') || location.state?.location || '';

    const [filteredTours, setFilteredTours] = useState([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const toursPerPage = 8;

    // Fetch from backend using query param
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${searchQuery}`);
                const result = await res.json();

                if (result.success) {
                    setFilteredTours(result.data);
                } else {
                    setFilteredTours([]);
                }
            } catch (err) {
                console.error('Search fetch error:', err);
                setFilteredTours([]);
            }
        };

        if (searchQuery) {
            fetchTours();
        }
    }, [searchQuery]);

    // Pagination calculation
    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

    const totalPages = Math.ceil(filteredTours.length / toursPerPage);

    return (
        <>
            <CommonSection title="Tour Search Result" />
            <section>
                <Container>
                    <Row>
                        {currentTours.length === 0 ? (
                            <h4 className="text-center">No tours found</h4>
                        ) : (
                            currentTours.map((tour) => (
                                <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
                                    <TourCard tour={tour} />
                                </Col>
                            ))
                        )}
                    </Row>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <nav>
                                <ul className="pagination">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li
                                            key={i}
                                            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(i + 1)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <span className="page-link">{i + 1}</span>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    )}
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default SearchResultList;
