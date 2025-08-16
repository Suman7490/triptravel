// components/TourFilters.jsx
import React from 'react';

const TourFilters = ({ filters, setFilters }) => {


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
                </select>
            </div>
        </div>
    );
};

export default TourFilters;
