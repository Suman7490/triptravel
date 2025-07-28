import React from 'react'
import Header from './../Header/Header';
import Routers from '../../router/Routers'
import Footer from './../Footer/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <>
            <Header />
            <Routers />
            {/* <ToastContainer position="top-right" autoClose={3000} /> */}
            <Footer />
        </>
    )
}

export default Layout