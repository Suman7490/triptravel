import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/dashboardLayout.css';

const DashboardLayout = () => {


    return (
        <div className="dashboard__layout">
            <div className="dashboard__content">
                <div className="dashboard__main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
