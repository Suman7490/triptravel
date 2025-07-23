import React, { useState, useContext } from 'react'
import CommonSection from '../shared/CommonSection';
import Newsletter from './../shared/Newsletter';

const CreateTour = () => {
    return (
        <>
            <CommonSection title={"Create Tour"} />

            <section>
                <h1>Create Tour Form heere</h1>
            </section>

            <Newsletter />
        </>
    )
}

export default CreateTour