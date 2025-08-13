import React, { useState, useEffect } from 'react'
// import "../styles/tours.css"
import CommonSection from '../../shared/CommonSection'
// import TourCard from './../shared/TourCard'
// import SearchBar from './../shared/SearchBar'
// import Newsletter from './../shared/Newsletter'
import { Container, Row, Col } from 'reactstrap'

import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'

const Tours = () => {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);

    const [filters, setFilters] = useState({
        city: '',
        price: '',
    });

    const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`)
    const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`)

    useEffect(() => {
        const pages = Math.ceil(tourCount / 8);
        setPageCount(pages);
        window.scrollTo(0, 0);
    }, [page, tourCount, tours]);

    return (
        <>
            <CommonSection title={"All Tours"} />

            <section className='pt-0'>
                <Container>

                    {loading && <h4 className='text-center pt-5'>Loading...</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}

                    < Row >


                        <Col lg='12'>
                            <table className="table table-bordered table-hover text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Tour Name</th>
                                        <th>Price</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                        {/* <th>Tour</th>
                                                <th>Guest Size</th>
                                                <th>Phone</th> */}
                                    </tr>
                                </thead>
                                {
                                    !loading && !error &&
                                    <tbody>

                                        {tours?.map((tour, index) => (
                                            <tr key={tour._id}>
                                                <td>{index + 1}</td>
                                                <td>{tour.title}</td>
                                                <td>{tour.price}</td>
                                                <td>Edit</td>
                                                <td>Delete</td>
                                                {/* <td>{booking.tourName}</td>
                                                    <td>{booking.guestSize}</td>
                                                    <td>{booking.phone}</td> */}
                                            </tr>
                                        ))}

                                    </tbody>
                                }
                            </table>
                        </Col>

                        <Col lg='12'>
                            <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                                {[...Array(pageCount).keys()].map(number => (
                                    <span key={number} onClick={() => setPage(number)} className={page === number ? "active__page" : ""}>
                                        {number + 1}
                                    </span>
                                ))}
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section >
        </>
    )
}

export default Tours