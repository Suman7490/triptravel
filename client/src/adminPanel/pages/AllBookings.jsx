import React, { useEffect, useState } from 'react';
import CommonSection from '../../shared/CommonSection';
import Newsletter from '../../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/allBookings.css';

const AllBookings = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);

    const { data: bookings, loading, error } = useFetch(`${BASE_URL}/booking?page=${page}`);
    const { data: bookingsCount } = useFetch(`${BASE_URL}/booking/search/getBookingCount`);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.role === 'admin') {
            setIsAdmin(true);
        } else {
            toast.error("Unauthorized access – Admins only");
        }
    }, []);

    useEffect(() => {
        const pages = Math.ceil(bookingsCount / 8);
        setPageCount(pages);
        window.scrollTo(0, 0);
    }, [page, bookingsCount, bookings]);

    if (!isAdmin) {
        return <p className='text-center mt-5'>You are not authorized to access this page.</p>;
    }

    return (
        <>
            <CommonSection title={"All bookings"} />
            <section className='pt-0'>
                <Container>
                    {loading && <h4 className='text-center pt-5'>Loading...</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}


                    <Row>
                        <Col lg='12'>
                            <table className="table table-bordered table-hover text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Tour</th>
                                        <th>Guest Size</th>
                                        <th>Phone</th>
                                        <th>Booked At</th>
                                    </tr>
                                </thead>
                                {!loading && !error &&
                                    <tbody>
                                        {bookings?.map((booking, index) => (
                                            <tr key={booking._id}>
                                                <td>{index + 1}</td>
                                                <td>{booking.fullName}</td>
                                                <td>{booking.userEmail}</td>
                                                <td>{booking.tourName}</td>
                                                <td>{booking.guestSize}</td>
                                                <td>{booking.phone}</td>
                                                <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
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
            </section>
            <Newsletter />
            <ToastContainer position="top-center" />
        </>
    );
};

export default AllBookings;
