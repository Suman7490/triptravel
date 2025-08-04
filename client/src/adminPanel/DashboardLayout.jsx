import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import '../styles/dashboardLayout.css';

const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        // <div className="dashboard__layout">
        //     <DashboardHeader toggleSidebar={toggleSidebar} />
        //     <div className="dashboard__content">
        //         <Sidebar isOpen={isSidebarOpen} />
        //         <div className="dashboard__main">
        //             <Outlet />
        //         </div>
        //     </div>
        // </div>
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
