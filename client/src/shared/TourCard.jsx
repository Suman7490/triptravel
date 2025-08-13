import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'
import "../styles/tour-card.css"

const TourCard = ({ tour }) => {
    const { _id, title, city, photo, price, featured, reviews } = tour;
    // console.log("TourCard data:", tour);

    const { totalRating, avgRating } = calculateAvgRating(reviews)

    return (
        <>
            <div className='tour__card'>
                <Card className='mb-3'>
                    <div className='tour__img'>
                        {/* <img src={photo} alt='tour-img' /> */}
                        <img src={`http://localhost:4000${photo}`} alt='tour-img' />
                        {featured && <span>Featured</span>}
                    </div>

                    <CardBody>
                        <div className='card__top d-flex align-items-center justify-content-between'>
                            <span className='tour__location d-flex align-items-center gap-1'>
                                <i className="ri-map-pin-line"></i>
                                {city}
                            </span>
                            <span className='tour__rating d-flex align-items-center gap-1'>
                                <i className="ri-star-fill"></i>
                                {avgRating === 0 ? null : avgRating}
                                {totalRating === 0 ? ('Not rated') : (
                                    <span>({reviews.length})</span>
                                )}
                            </span>
                        </div>
                        <h5 className="tour__title">
                            <Link to={`/tour/${_id}`}>{title}</Link>
                        </h5>

                        <div className='card__bottom d-flex lign-items-center justify-content-between mt-3'>
                            <h5>
                                ₹{price} <span> /per person</span>
                            </h5>

                            <button className='btn booking__btn'>
                                <Link to={`/tour/${_id}`}>Book Now</Link>
                            </button>
                        </div>
                    </CardBody>
                </Card>


            </div>
        </>
    )
}

export default TourCard