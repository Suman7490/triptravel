import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { getUniqueStates } from "../utils/getStates";
import { BASE_URL } from "../utils/config";

const StateDropdown = () => {
    const [states, setStates] = useState([]);

    const getUniqueStates = (tours) => {
        const states = tours.map((tour) => tour.state);
        return [...new Set(states)];
    };

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch(`${BASE_URL}/tours`);
                const data = await res.json();
                if (data.success) {
                    setStates(getUniqueStates(data.data));
                }
            } catch (err) {
                console.error("Failed to fetch states", err);
            }
        };
        fetchTours();
    }, []);

    return (
        <ul className="dropdown-menu">
            {states.map((state) => (
                <li key={state}>
                    <Link to={`/state/${state}`} className="dropdown-item">
                        {state}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default StateDropdown;
