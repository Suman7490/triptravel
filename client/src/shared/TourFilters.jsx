import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { FaUser, FaUserFriends, FaHeart, FaUmbrellaBeach } from "react-icons/fa";

export const TripTypeFilter = ({ onFilterChange, currentValue = "" }) => {
    const handleClick = (type) => {
        const newValue = currentValue === type ? "" : type;
        onFilterChange && onFilterChange('tripType', newValue);
    };

    return (
        <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">Trip Type</label>
            <div className="btn-group w-100">
                <button 
                    className={`btn ${currentValue === 'national' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleClick('national')}
                >
                    National
                </button>
                <button 
                    className={`btn ${currentValue === 'international' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleClick('international')}
                >
                    International
                </button>
            </div>
        </div>
    );
};

// components/BudgetFilter.jsx
export const BudgetFilter = ({ onFilterChange, currentValue = { min: 1000, max: 100000 } }) => {
    const handleChange = (e) => {
        const newBudget = { ...currentValue, max: parseInt(e.target.value) };
        onFilterChange && onFilterChange('budget', newBudget);
    };

    return (
        <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">Budget (₹)</label>
            <input 
                type="range" 
                className="form-range" 
                min="1000" 
                max="100000" 
                step="1000"
                value={currentValue.max}
                onChange={handleChange}
            />
            <div className="d-flex justify-content-between small text-muted">
                <span>₹{currentValue.min.toLocaleString()}</span>
                <span>₹{currentValue.max.toLocaleString()}</span>
            </div>
        </div>
    );
};

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

export const TourThemeFilter = ({ onFilterChange, currentValue = "" }) => {
    const handleClick = (theme) => {
        const newValue = currentValue === theme ? "" : theme;
        onFilterChange && onFilterChange('theme', newValue);
    };

    const themes = [
        { icon: <FaUser />, label: "Solo", value: "solo" },
        { icon: <FaUserFriends />, label: "Friends/Group", value: "group" },
        { icon: <FaHeart />, label: "Honeymoon", value: "honeymoon" },
        { icon: <FaUmbrellaBeach />, label: "Family", value: "family" },
    ];

    return (
        <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">Tour Themes</label>
            <div className="d-flex flex-wrap gap-2">
                {themes.map(({ icon, label, value }) => (
                    <button
                        key={value}
                        className={`btn ${currentValue === value ? 'btn-primary' : 'btn-light border'} rounded-pill d-flex align-items-center gap-2 px-3`}
                        onClick={() => handleClick(value)}
                    >
                        {icon} {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// components/DurationFilter.jsx

export const DurationFilter = ({ onFilterChange, currentValue = "" }) => {
    const handleClick = (duration) => {
        const newValue = currentValue === duration ? "" : duration;
        onFilterChange && onFilterChange('duration', newValue);
    };

    const durations = [
        { label: "1-3 Days", value: "1-3" },
        { label: "4-6 Days", value: "4-6" },
        { label: "7-9 Days", value: "7-9" },
        { label: "10-12 Days", value: "10-12" },
        { label: "13 Days or more", value: "13+" },
    ];

    return (
        <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">Trip Duration</label>
            <div className="d-flex flex-wrap gap-2">
                {durations.map(({ label, value }) => (
                    <button 
                        key={value} 
                        className={`btn ${currentValue === value ? 'btn-primary' : 'btn-outline-secondary'} btn-sm rounded-pill`}
                        onClick={() => handleClick(value)}
                    >
                        <FaClock className="me-1" /> {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

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
export const MonthFilter = ({ onFilterChange, currentValue = "" }) => {
    const handleChange = (e) => {
        const newValue = e.target.value;
        onFilterChange && onFilterChange('month', newValue);
    };

    return (
        <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">Month</label>
            <select className="form-select" value={currentValue} onChange={handleChange}>
                <option value="">Any Month</option>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                    <option key={m} value={m.toLowerCase()}>{m}</option>
                ))}
            </select>
        </div>
    );
};


// components/ApplyResetButtons.jsx
export const ApplyResetButtons = ({ onReset, onApply }) => (
    <div className="d-flex justify-content-between gap-2">
        <button className="btn btn-outline-secondary btn-sm flex-fill" onClick={onReset}>
            Reset All
        </button>
        <button className="btn btn-primary btn-sm flex-fill" onClick={onApply}>
            Apply Filters
        </button>
    </div>
);


