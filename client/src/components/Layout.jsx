import React from 'react'
import Header from './Header';
import Routers from '../router/Routers'
import Footer from './Footer'
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <>
            <Header />
            <Routers />
            <Footer />
        </>
    )
}

export default Layout