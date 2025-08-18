import React, { useEffect, useRef, useState, useContext } from 'react'
import '../styles/tourDetail.css'
import { Container, Row, Col, Form, ListGroup, ListGroupItemHeading } from 'reactstrap'
import { useParams } from 'react-router-dom'
import calculateAvgRating from './../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import BookingForm from './BookingForm'
import Newsletter from '../shared/Newsletter'
import useFetch from './../hooks/useFetch'
import { BASE_URL } from './../utils/config'
import { AuthContext } from './../context/authContext'

const TourDetails = () => {
    const { id } = useParams();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null)
    const { user } = useContext(AuthContext)

    // Fetch data from database
    const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [tour])

    if (!tour) {
        return <h4>Loading...</h4>;
    }

    const { photo, title, desc, price, reviews, city, maxGroupSize } = tour;

    const { totalRating, avgRating } = calculateAvgRating(reviews);
    const options = { day: "numeric", month: "long", year: "numeric" }

    const submitHandler = async e => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;

        try {
            if (!user || user === undefined || user === null) {
                alert('Please sign in')
            }
            const reviewObj = {
                username: user?.username,
                reviewText,
                rating: tourRating
            }
            const res = await fetch(`${BASE_URL}/review/${id}`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(reviewObj)
            })

            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            }
            alert(result.message)
        } catch (err) {
            alert(err.message)
        }
    }



    return (
        <>
            <section>
                <Container>

                    {loading && <h4 className='text-center pt-5'>Loading...</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}

                    {
                        !loading && !error && <Row>
                            <Col lg='8'>
                                <div className='tour__content'>
                                    <img src={tour.photo} alt={title} />
                                    <div className='tour__info'>
                                        <h2>{title}</h2>
                                        <div className='d-flex align-items-center gap-5'>
                                            <span className='tour__rating d-flex align-items-center gap-1'>
                                                <i className="ri-star-fill" style={{ 'color': "var(--secondary-color)" }}></i>
                                                {avgRating === 0 ? null : avgRating}
                                                {totalRating === 0 ? (
                                                    "not rated"
                                                ) : (
                                                    <span>({reviews?.length})</span>
                                                )}
                                            </span>
                                        </div>

                                        <div className='tour__extra-details'>
                                            <span>
                                                <i className='ri-map-pin-2-line'></i>{city}
                                            </span>
                                            <span>
                                                <i className='ri-money-dollor-circle-line'></i><b>₹</b>{price}/per person
                                            </span>
                                            <span>
                                                <i className='ri-group-line'></i>{maxGroupSize} people
                                            </span>
                                        </div>
                                        <h2 style={{ textDecoration: 'underline', fontSize: '25px', fontWeight: 'bolder' }}>Detailed itinerary</h2>
                                        {/* <p>{desc}</p> */}
                                        <div
                                            dangerouslySetInnerHTML={{ __html: desc }}
                                        />
                                    </div>

                                    {/* ******************************** */}
                                    <div className='tour__reviews mt-4'>
                                        <h4>Reviews ({reviews?.length})</h4>
                                        <Form onSubmit={submitHandler}>
                                            <div className='d-flex align-item-center gap-2 mb-4 rating__group'>
                                                <span onClick={() => setTourRating(1)}><i className='ri-star-s-fill'></i></span>
                                                <span onClick={() => setTourRating(2)}><i className='ri-star-s-fill'></i></span>
                                                <span onClick={() => setTourRating(3)}><i className='ri-star-s-fill'></i></span>
                                                <span onClick={() => setTourRating(4)}><i className='ri-star-s-fill'></i></span>
                                                <span onClick={() => setTourRating(5)}><i className='ri-star-s-fill'></i></span>
                                            </div>

                                            <div className='review__input'>
                                                <input type='text' ref={reviewMsgRef} placeholder='share your thoughts' required />
                                                <button className='btn primary__btn text-white' type='submit'>Submit</button>
                                            </div>
                                        </Form>

                                        <ListGroup className='user__reviews'>
                                            {
                                                reviews?.map(review => (
                                                    <div className='review__item'>
                                                        <img src={avatar} alt='' />

                                                        <div className='w-100'>
                                                            <div className='d-flex align-items-center justify-content-between'>
                                                                <div>
                                                                    <h5>{review.username}</h5>
                                                                    <p>
                                                                        {new Date(review.createdAt).toLocaleDateString("en-us", options)}
                                                                    </p>
                                                                </div>
                                                                <span className='d-flex align-items-center'>
                                                                    {review.rating}
                                                                    <i className='ri-star-s-fill'></i>
                                                                </span>
                                                            </div>
                                                            <h6>{review.reviewText}</h6>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </ListGroup>
                                    </div>
                                </div>
                            </Col>
                            <Col lg='4'>
                                <BookingForm tour={tour} avgRating={avgRating} />
                            </Col>
                        </Row>
                    }
                </Container>
            </section>
            <Newsletter />
        </>
    )
}

export default TourDetails