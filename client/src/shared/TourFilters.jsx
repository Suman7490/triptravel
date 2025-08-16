// components/TourFilters.jsx
import React from 'react';

const TourFilters = ({ filters, setFilters }) => {
    return (
        <div className="tour-filters p-3 border rounded shadow-sm">
            <h5>Filters</h5>

            {/* City */}
            <div className="filter-group mb-3">
                <label>City:</label>
                <select
                    className="form-select"
                    value={filters.city}
                    onChange={e => setFilters(prev => ({ ...prev, city: e.target.value }))}
                >
                    <option value="">All</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Agra">Agra</option>
                    <option value="Jaipur">Jaipur</option>
                </select>
            </div>

            {/* Category */}
            <div className="filter-group mb-3">
                <label>Category:</label>
                <select
                    className="form-select"
                    value={filters.category}
                    onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
                >
                    <option value="">All</option>
                    <option value="Family">Family Trip</option>
                    <option value="Solo">Solo Trip</option>
                    <option value="Friends">Friends</option>
                    <option value="Group">Group</option>
                </select>
            </div>

            {/* State */}
            <div className="filter-group mb-3">
                <label>State:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter state"
                    value={filters.state}
                    onChange={e => setFilters(prev => ({ ...prev, state: e.target.value }))}
                />
            </div>

            {/* Country */}
            <div className="filter-group mb-3">
                <label>Country:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter country"
                    value={filters.country}
                    onChange={e => setFilters(prev => ({ ...prev, country: e.target.value }))}
                />
            </div>

            {/* Price */}
            <div className="filter-group mb-3">
                <label>Price:</label>
                <select
                    className="form-select"
                    value={filters.priceSort}
                    onChange={e => setFilters(prev => ({ ...prev, priceSort: e.target.value }))}
                >
                    <option value="">Default</option>
                    <option value="asc">Lowest to Highest</option>
                    <option value="desc">Highest to Lowest</option>
                </select>
            </div>

            {/* Best Season */}
            <div className="filter-group mb-3">
                <label>Best Season:</label>
                <select
                    className="form-select"
                    value={filters.season}
                    onChange={e => setFilters(prev => ({ ...prev, season: e.target.value }))}
                >
                    <option value="">All</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                    <option value="Monsoon">Monsoon</option>
                    <option value="Spring">Spring</option>
                </select>
            </div>
        </div>
    );
};

export default TourFilters;
