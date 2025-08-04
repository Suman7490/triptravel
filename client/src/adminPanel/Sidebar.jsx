import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <button onClick={() => setCollapsed(!collapsed)} className="toggle-btn">
                {collapsed ? '→' : '←'}
            </button>
            <nav>
                <NavLink to="/dashboard/bookings" activeClassName="active"><FaTachometerAlt />Bookings</NavLink>
                <NavLink to="/dashboard/users" activeClassName="active"><FaUsers />Users</NavLink>
                <NavLink to="/dashboard/create-tour" activeClassName="active"><FaSignOutAlt />Create Tour</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
