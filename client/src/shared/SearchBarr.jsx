import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './searchbarr.css';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_API_KEY';

const durationOptions = ['1–3 days', '3–6 days', '6–10 days', '10+ days'];

const getRemainingMonths = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return months.slice(currentMonth).map((month, i) => `${month}, ${currentYear}`);
};

const SearchBarr = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const monthList = getRemainingMonths();
    const [isDurationOpen, setIsDurationOpen] = useState(false);


    const inputRef = useRef(null);

    const [locationInput, setLocationInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Fetch location suggestions
    // ⬅️ Move this function OUTSIDE of useEffect
    const fetchLocationSuggestions = async (query) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await res.json();
            setSuggestions(data.map(item => item.display_name));
        } catch (err) {
            console.error("Nominatim error", err);
        }
    };

    useEffect(() => {
        if (locationInput.length > 2) {
            fetchLocationSuggestions(locationInput);
        } else {
            setSuggestions([]);
        }
    }, [locationInput]);


    const handleDurationChange = (duration) => {
        setSelectedDurations((prev) =>
            prev.includes(duration)
                ? prev.filter((d) => d !== duration)
                : [...prev, duration]
        );
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedLocation) params.append('location', selectedLocation);
        if (selectedDurations.length > 0) params.append('duration', selectedDurations.join(','));
        if (selectedMonth) params.append('month', selectedMonth);

        navigate(`/tours/search?${params.toString()}`);
    };

    return (
        <div className="search-bar-container">
            <div className="dropdown-wrapper">

                {/* Location Input */}
                <div className="dropdown location">
                    <i className="ri-map-pin-line"></i>
                    <input
                        type="text"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="Where are you going?"
                        className="..."
                    />
                    <ul className="bg-white border shadow-md absolute z-10 w-full max-h-40 overflow-y-auto">
                        {suggestions.map((suggestion, idx) => (
                            <li
                                key={idx}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setLocationInput(suggestion);
                                    setSuggestions([]);
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Duration Dropdown */}

                <div className="dropdown duration">

                    <i className="ri-timer-line"></i>
                    <div
                        className="dropdown-toggle"
                        onClick={() => setIsDurationOpen((prev) => !prev)}
                    >
                        Select duration
                    </div>

                    {isDurationOpen && (
                        <div className="dropdown-menu checkbox-dropdown" style={{ border: '2px solid red', background: 'white' }}>
                            {durationOptions.map((option) => (
                                <label key={option} className="block">
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={selectedDurations.includes(option)}
                                        onChange={() => handleDurationChange(option)}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    )}
                </div>


                {/* Month Dropdown */}
                <div className="dropdown month">
                    <i className="ri-calendar-line"></i>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">Select month</option>
                        {monthList.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Explore Button */}
                <button className="explore-btn" onClick={handleSearch}>
                    Explore
                </button>
            </div>
        </div>
    );
};

export default SearchBarr;
