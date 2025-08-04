import React from 'react';
import { FaBars } from 'react-icons/fa';

const DashboardHeader = ({ toggleSidebar }) => {
    return (
        <div className="dashboard__header">
            <button className="menu__toggle" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <h2>Admin Dashboard</h2>
        </div>
    );
};

export default DashboardHeader;
