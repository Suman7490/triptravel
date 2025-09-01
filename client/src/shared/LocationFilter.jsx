import React, { useEffect, useState } from "react";
import { BASE_URL } from './../utils/config';

export const LocationFilter = ({ onFilterChange }) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");

    // Fetch countries on mount
    useEffect(() => {
        fetch(`${BASE_URL}/filters/countries`)
            .then((res) => res.json())
            .then((data) => setCountries(data))
            .catch((err) => console.error(err));
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        if (selectedCountry) {
            fetch(`${BASE_URL}/filters/states/${selectedCountry}`)
                .then((res) => res.json())
                .then((data) => setStates(data))
                .catch((err) => console.error(err));
        } else {
            setStates([]);
            setSelectedState("");
        }
    }, [selectedCountry]);

    useEffect(() => {
        onFilterChange({ country: selectedCountry, state: selectedState });
    }, [selectedCountry, selectedState]);

    return (
        <div className="mb-4">
            <label className="fw-semibold mb-2 d-block">Location</label>

            <select
                className="form-select mb-2"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
            >
                <option value="">Select Country</option>
                {countries.map((country, idx) => (
                    <option key={idx} value={country}>
                        {country}
                    </option>
                ))}
            </select>

            <select
                className="form-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={!selectedCountry}
            >
                <option value="">Select State</option>
                {states.map((state, idx) => (
                    <option key={idx} value={state}>
                        {state}
                    </option>
                ))}
            </select>
        </div>
    );
};
