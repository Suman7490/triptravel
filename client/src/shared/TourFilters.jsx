// components/TourFilters.jsx
import React from 'react';

const TourFilters = ({ filters, setFilters }) => {
    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        setFilters(prev => ({
            ...prev,
            duration: checked
                ? [...prev.duration, value]
                : prev.duration.filter(d => d !== value)
        }));
    };

    return (
        <div className="tour-filters">
            <h5>Filters</h5>

            <div className="filter-group">
                <label>City:</label>
                <select
                    value={filters.city}
                    onChange={e => setFilters(prev => ({ ...prev, city: e.target.value }))}
                >
                    <option value="">All</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Agra">Agra</option>
                    <option value="Jaipur">Jaipur</option>
                    {/* Add more cities as needed */}
                </select>
            </div>
        </div>
    );
};

export default TourFilters;
