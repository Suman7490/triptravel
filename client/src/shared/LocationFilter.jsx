import React, { useEffect, useState, useRef } from "react";
import { BASE_URL } from "./../utils/config";

export const LocationFilter = ({ onFilterChange = () => { } }) => {
    const [countries, setCountries] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        international: false,
        domestic: false,
    });

    const prevFilters = useRef({ international: false, domestic: false });

    // Fetch country list on mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch(`${BASE_URL}/filters/countries`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setCountries(data);
                } else {
                    console.error("Invalid country response:", data);
                }
            } catch (err) {
                console.error("Error fetching countries:", err);
            }
        };

        fetchCountries();
    }, []);

    // Trigger filter change if values differ
    useEffect(() => {
        const current = selectedFilters;
        const prev = prevFilters.current;

        if (
            current.international !== prev.international ||
            current.domestic !== prev.domestic
        ) {
            onFilterChange(current);
            prevFilters.current = current;
        }
    }, [selectedFilters, onFilterChange]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedFilters((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleButtonClick = (filterType) => {
        setSelectedFilters((prev) => {
            // If clicking the same filter, toggle it
            if (prev[filterType]) {
                return {
                    ...prev,
                    [filterType]: false,
                };
            } else {
                // If clicking a different filter, deselect the other and select this one
                return {
                    international: filterType === 'international',
                    domestic: filterType === 'domestic',
                };
            }
        });
    };

    return (
        <div className="location-filter-wrapper">
            <div className="filter-content">
                <h3 className="filter-title">Explore best selling packages for</h3>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${selectedFilters.international ? 'active' : ''}`}
                        onClick={() => handleButtonClick('international')}
                    >
                        <span className="btn-icon">🌍</span>
                        <span className="btn-text">International</span>
                    </button>
                    <button
                        className={`filter-btn ${selectedFilters.domestic ? 'active' : ''}`}
                        onClick={() => handleButtonClick('domestic')}
                    >
                        <span className="btn-icon">🇮🇳</span>
                        <span className="btn-text">India</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
