// Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlane, FaClipboardList, FaPalette, FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`${isOpen ? "sidebar-expanded" : "sidebar-collapsed"}`}>
            {/* Sidebar */}
            <div className="sidebar bg-light border-end p-2">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="m-0 fw-bold">Admin</h5>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsOpen(!isOpen)}>
                        <FaBars />
                    </button>
                </div>

                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <NavLink to="/dashboard" className="nav-link">
                            <MdDashboard className="me-2" /> Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink to="/dashboard/tours" className="nav-link">
                            <FaPlane className="me-2" /> Tours
                        </NavLink>
                    </li>

                    <li className="nav-item mb-2">
                        <NavLink to="/dashboard/bookings" className="nav-link">
                            <FaClipboardList className="me-2" /> All Bookings
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink to="/dashboard/themes" className="nav-link">
                            <FaPalette className="me-2" /> All Themes
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
