import React, { useState, useEffect } from 'react'
import CommonSection from '../../shared/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'
import { Link, useNavigate } from 'react-router-dom'

const Tours = () => {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}&refresh=${refresh}`)
    const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`)

    useEffect(() => {
        const pages = Math.ceil(tourCount / 8);
        setPageCount(pages);
        window.scrollTo(0, 0);
    }, [page, tourCount, tours]);




    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tour?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${BASE_URL}/tours/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await res.json();

            if (res.ok) {
                alert("Tour deleted successfully");
                setRefresh(prev => !prev);
            } else {
                alert(result.message || "Failed to delete tour");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting tour");
        }
    };



    return (
        <>

            <section className='pt-0'>
                <Container>

                    {loading && <h4 className='text-center pt-5'>Loading...</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}

                    < Row >
                        <Col lg='12'>
                            <Link to='/dashboard/create-tour'>
                                <button className='btn btn-success'>
                                    Create Tour
                                </button>
                            </Link>
                            <table className="table table-bordered table-hover text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Tour Name</th>
                                        <th>Price</th>
                                        <th>Country</th>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {
                                    !loading && !error &&
                                    <tbody>

                                        {tours?.map((tour, index) => (
                                            <tr key={tour._id}>
                                                <td>{page * 8 + index + 1}</td>
                                                <td>{tour.title}</td>
                                                <td>{tour.price}</td>
                                                <td>{tour.country}</td>
                                                <td>{tour.state}</td>
                                                <td>{tour.city}</td>
                                                <td>
                                                    <div className='d-flex justify-content-around align-items-center'>
                                                        <button
                                                            className='btn btn-primary'
                                                            onClick={() => navigate(`/dashboard/create-tour/${tour._id}`)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className='btn btn-danger'
                                                            onClick={() => handleDelete(tour._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
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