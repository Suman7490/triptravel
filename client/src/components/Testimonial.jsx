import React from 'react'
import Slider from 'react-slick'
import './style/testimonial.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ava01 from '../assets/images/ava-1.jpg'
import ava02 from '../assets/images/ava-2.jpg'
import ava03 from '../assets/images/ava-3.jpg'

const Testimonial = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    }

    const testimonials = [
        { img: ava01, name: "John Doe", role: "Customer" },
        { img: ava02, name: "Sarah Smith", role: "Traveler" },
        { img: ava03, name: "Mike Johnson", role: "Adventurer" },
        { img: ava02, name: "Emily White", role: "Explorer" },
    ];

    return (
        <div className="container mt-5">
            <Slider {...settings}>
                {testimonials.map((t, index) => (
                    <div key={index} className='testimonial py-4 px-3'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sit nemo asperiores, minima tempora delectus maxime, porro et repellendus deleniti accusamus libero quas quisquam neque ea laborum dolorum alias exercitationem.
                        </p>

                        <div className='d-flex align-items-center gap-4 mt-3'>
                            <img
                                src={t.img}
                                alt='avatar'
                                className='img-fluid rounded-circle'
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                            <div>
                                <h5 className='mb-0 mt-3'>{t.name}</h5>
                                <p className='mb-0'>{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )

}

export default Testimonial