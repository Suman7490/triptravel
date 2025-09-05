import React from 'react'
import '../styles/service-card.css'

const ServiceCard = ({ item }) => {
    const { imgUrl, title, desc, icon } = item;
    return (
        <div className='service__card'>
            <div className='service__card-inner'>
                <div className='service__icon-wrapper'>
                    <div className='service__icon'>
                        <img src={imgUrl} alt={title} />
                    </div>
                    <div className='service__icon-bg'></div>
                </div>
                <div className='service__content'>
                    <h3 className='service__title'>{title}</h3>
                    <p className='service__description'>{desc}</p>
                    <div className='service__action'>
                        <span className='service__btn'>
                            Learn More <i className="ri-arrow-right-line"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard