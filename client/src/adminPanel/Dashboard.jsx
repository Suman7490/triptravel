// DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar"; // sidebar component we made earlier
import { Outlet } from "react-router-dom"; // this will render nested routes

const DashboardLayout = () => {
    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                {/* Sidebar - 25% */}
                <div className="col-12 col-md-3 col-lg-3 p-0 border-end bg-light">
                    <Sidebar />
                </div>

                {/* Main Content - 75% */}
                <div className="col-12 col-md-9 col-lg-9 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="fw-bold">Admin Dashboard</h4>
                    </div>
                    <div className="main-content">
                        <Outlet /> {/* Nested routes will render here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
