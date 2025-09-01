import React from "react";
import { FaClock } from "react-icons/fa";
import { FaUser, FaUserFriends, FaHeart, FaUmbrellaBeach } from "react-icons/fa";

export const TripTypeFilter = () => (
    <div className="mb-4">
        <label className="fw-semibold mb-2 d-block">Trip Type</label>
        <div className="btn-group w-100">
            <button className="btn btn-outline-primary">National</button>
            <button className="btn btn-outline-primary">International</button>
        </div>
    </div>
);

// components/BudgetFilter.jsx
export const BudgetFilter = () => (
    <div className="mb-4">
        <label className="fw-semibold mb-2 d-block">Budget (₹)</label>
        <input type="range" className="form-range" min="1000" max="100000" step="1000" />
        <div className="d-flex justify-content-between small text-muted">
            <span>₹1k</span><span>₹100k+</span>
        </div>
    </div>
);

// components/LocationFilter.jsx
export const LocationFilter = () => (
    <div className="mb-4">
        <label className="fw-semibold mb-2 d-block">Location</label>
        <select className="form-select mb-2">
            <option>Country</option>
            <option>India</option>
            <option>USA</option>
        </select>
        <select className="form-select">
            <option>State</option>
            <option>Delhi</option>
            <option>Maharashtra</option>
        </select>
    </div>
);

// components/TourThemeFilter.jsx

export const TourThemeFilter = () => (
    <div className="mb-4">
        <label className="fw-semibold mb-2 d-block">Tour Themes</label>
        <div className="d-flex flex-wrap gap-2">
            {[
                { icon: <FaUser />, label: "Solo" },
                { icon: <FaUserFriends />, label: "Friends/Group" },
                { icon: <FaHeart />, label: "Honeymoon" },
                { icon: <FaUmbrellaBeach />, label: "Family" },
            ].map(({ icon, label }) => (
                <button
                    key={label}
                    className="btn btn-light border rounded-pill d-flex align-items-center gap-2 px-3"
                >
                    {icon} {label}
                </button>
            ))}
        </div>
    </div>
);

// components/DurationFilter.jsx

export const DurationFilter = () => (
    <div className="mb-4">
        <label className="fw-semibold mb-2 d-block">Trip Duration</label>
        <div className="d-flex flex-wrap gap-2">
            {["1-3 Days", "4-6 Days", "7-9 Days", "10-12 Days", "13 Days or more"].map((d) => (
                <button key={d} className="btn btn-outline-secondary btn-sm rounded-pill">
                    <FaClock className="me-1" /> {d}
                </button>
            ))}
        </div>
    </div>
);

// components/SeasonFilter.jsx
export const SeasonFilter = () => (
    <div className="mb-4">
        <label className="fw-semibold mb-2 d-block">Best Season</label>
        <select className="form-select mb-3">
            <option>Any Season</option>
            <option>Summer</option>
            <option>Winter</option>
            <option>Monsoon</option>
        </select>
    </div>
);

// components/MonthFilter.jsx
export const MonthFilter = () => (
    <div className="mb-4">
        <label className="fw-semibold mb-2 d-block">Month</label>
        <select className="form-select">
            <option>Any Month</option>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                <option key={m}>{m}</option>
            ))}
        </select>
    </div>
);


// components/ApplyResetButtons.jsx
export const ApplyResetButtons = () => (
    <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary btn-sm">Reset</button>
        <button className="btn btn-primary btn-sm">Apply</button>
    </div>
);
