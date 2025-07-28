import React, { useState, useRef, useEffect } from 'react'
import './search-bar.css'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { BASE_URL } from './../utils/config'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [locationInput, setLocationInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showDurationDropdown, setShowDurationDropdown] = useState(false);
    const [selectedDurations, setSelectedDurations] = useState([]);

    const toggleDropdown = () => {
        setShowDurationDropdown(!showDurationDropdown);
    };

    const handleDurationChange = (e) => {
        const value = e.target.value;
        setSelectedDurations(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const distanceRef = useRef(0)
    const maxGroupSizeRef = useRef(0)
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch(`${BASE_URL}/tours`);
                const result = await res.json();

                if (result.success) {
                    const uniqueCities = [...new Set(result.data.map(tour => tour.city.trim()))];
                    setAllCities(uniqueCities);
                }
            } catch (err) {
                console.error('Error fetching cities:', err);
            }
        };

        fetchCities();
    }, []);


    // Handle live filtering
    const handleLocationChange = (e) => {
        const input = e.target.value;
        setLocationInput(input);

        if (input.length === 0) {
            setShowSuggestions(false);
            return;
        }

        const filtered = allCities
            .filter(city => city.toLowerCase().startsWith(input.toLowerCase()))
            .slice(0, 6); // limit to 6 suggestions

        setCitySuggestions(filtered);
        setShowSuggestions(true);
    };

    const selectSuggestion = (city) => {
        setLocationInput(city);
        setShowSuggestions(false);
    };

    const searchHandler = async () => {
        const location = locationInput.trim();
        const distance = distanceRef.current.value
        const maxGroupSize = maxGroupSizeRef.current.value;


        if (!location || !distance || !maxGroupSize) {
            return alert("All fields are required!");
        }


        const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)

        if (!res.ok) alert('Something went wrong')

        const result = await res.json()

        navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, { state: result.data })
    }
    return (
        <Col lg='12'>
            <div className='search__bar'>
                <Form className='d-flex flex-wrap align-items-center gap-4'>
                    <FormGroup className='d-flex gap-3 form__group form__group-fast flex-grow-1' style={{ position: 'relative' }}>
                        <span><i className='ri-map-pin-line'></i></span>
                        <div>
                            <h6>Location</h6>
                            <input type='text' placeholder='Where are you going?' value={locationInput}
                                onChange={handleLocationChange} />
                            {showSuggestions && (
                                <ul className='suggestion-box' style={{ paddingLeft: '0', background: '#eaeaea', border: '1px solid black', position: 'absolute', width: '100%', top: '4.5rem', left: '0', zIndex: '999' }}>
                                    {citySuggestions.map((city, idx) => (
                                        <li key={idx} onClick={() => selectSuggestion(city)} style={{ cursor: 'pointer', borderBottom: '1px solid black', padding: '1px 2px' }}>
                                            {city}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </FormGroup>
                    <FormGroup className='d-flex gap-3 form__group form__group-fast flex-grow-1' style={{ position: 'relative' }}>
                        <span><i className='ri-map-pin-time-line'></i></span>
                        <div>
                            <h6>Duration</h6>
                            <div onClick={toggleDropdown} className="custom-dropdown-toggle" style={{
                                border: 'none',
                                padding: '0',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                width: '150px'
                            }}>
                                {selectedDurations.length > 0 ? selectedDurations.join(', ') : 'Select Days'}
                            </div>

                            {showDurationDropdown && (
                                <div className="duration-dropdown" style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '0',
                                    zIndex: '1000',
                                    background: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    width: '200px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                }}>
                                    {['1-3 Days', '4-6 Days', '7-9 Days', '10+ Days'].map((label, idx) => (
                                        <div key={idx} style={{ marginBottom: '5px' }}>
                                            <input
                                                type="checkbox"
                                                value={label}
                                                checked={selectedDurations.includes(label)}
                                                onChange={handleDurationChange}
                                                id={`duration-${idx}`}
                                            />
                                            <label htmlFor={`duration-${idx}`} style={{ marginLeft: '5px' }}>{label}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </FormGroup>

                    <FormGroup className='d-flex gap-3 form__group form__group-fast flex-grow-1'>
                        <span><i className='ri-group-line'></i></span>
                        <div>
                            <h6>Max People</h6>
                            <input type='number' placeholder='0' ref={maxGroupSizeRef} />
                        </div>
                    </FormGroup>

                    <span className='search__icon' type='submit' onClick={searchHandler}>
                        <i className='ri-search-line'></i>
                    </span>
                </Form>
            </div>
        </Col>
    )
}

export default SearchBar