import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from "reactstrap"

import weatherImg from "../assets/images/weather.png"
import guideImg from "../assets/images/guide.png"
import customizationImg from "../assets/images/customization.png"

const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Calculate weather",
        desc: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, facere. Eos iste tempora rem, distinctio animi recusandae voluptate corporis. Ad ab repudiandae deleniti autem natus, at delectus consectetur aliquid enim.",
    },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, facere. Eos iste tempora rem, distinctio animi recusandae voluptate corporis. Ad ab repudiandae deleniti autem natus, at delectus consectetur aliquid enim.",
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, facere. Eos iste tempora rem, distinctio animi recusandae voluptate corporis. Ad ab repudiandae deleniti autem natus, at delectus consectetur aliquid enim.",
    },
]



const serviceList = () => {
    return (
        <>
            {servicesData.map((item, index) => (
                <Col lg='3' key={index}>
                    <ServiceCard item={item} />
                </Col>
            ))}

        </>
    )
}

export default serviceList