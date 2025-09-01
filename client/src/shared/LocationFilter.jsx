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

    return (
        <div className="mb-4 d-flex align-items-center gap-4">
            <h2 className="me-2">Explore best selling packages for</h2>

            <label className="d-flex align-items-center gap-1">
                <input
                    type="checkbox"
                    name="international"
                    checked={selectedFilters.international}
                    onChange={handleCheckboxChange}
                />
                <span>International Destinations</span>
            </label>

            <label className="d-flex align-items-center gap-1">
                <input
                    type="checkbox"
                    name="domestic"
                    checked={selectedFilters.domestic}
                    onChange={handleCheckboxChange}
                />
                <span>Destinations within India</span>
            </label>
        </div>
    );
};
