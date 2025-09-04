import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from "reactstrap"

import weatherImg from "../assets/images/weather.png"
import guideImg from "../assets/images/guide.png"
import customizationImg from "../assets/images/customization.png"

const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Weather Forecast",
        desc: "Get accurate weather predictions for your travel destinations. Plan your trips with confidence knowing the perfect weather conditions for your adventures.",
        icon: "ri-sun-line"
    },
    {
        imgUrl: guideImg,
        title: "Expert Tour Guides",
        desc: "Experience destinations like never before with our certified local guides. Discover hidden gems and authentic experiences that only locals know.",
        icon: "ri-user-star-line"
    },
    {
        imgUrl: customizationImg,
        title: "Custom Itineraries",
        desc: "Tailored travel experiences designed just for you. From luxury getaways to budget adventures, we create the perfect journey for your preferences.",
        icon: "ri-settings-3-line"
    },
]



const serviceList = () => {
    return (
        <div className="services-grid">
            {servicesData.map((item, index) => (
                <ServiceCard item={item} key={index} />
            ))}
        </div>
    )
}

export default serviceList