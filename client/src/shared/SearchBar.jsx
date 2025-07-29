import React, { useState, useRef, useEffect } from 'react'
import './search-bar.css'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from './../utils/config'

const SearchBar = () => {
    const [citySuggestions, setCitySuggestions] = useState([])
    const [allCities, setAllCities] = useState([])
    const [locationInput, setLocationInput] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [showDurationDropdown, setShowDurationDropdown] = useState(false)
    const [selectedDurations, setSelectedDurations] = useState([])
    const [travelDate, setTravelDate] = useState('')

    const distanceRef = useRef(0)
    const maxGroupSizeRef = useRef(0)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch(`${BASE_URL}/tours`)
                const result = await res.json()
                if (result.success) {
                    const uniqueCities = [...new Set(result.data.map(tour => tour.city.trim()))]
                    setAllCities(uniqueCities)
                }
            } catch (err) {
                console.error('Error fetching cities:', err)
            }
        }

        fetchCities()
    }, [])

    const handleLocationChange = (e) => {
        const input = e.target.value
        setLocationInput(input)
        if (!input) {
            setShowSuggestions(false)
            return
        }
        const filtered = allCities
            .filter(city => city.toLowerCase().startsWith(input.toLowerCase()))
            .slice(0, 5)

        setCitySuggestions(filtered)
        setShowSuggestions(true)
    }

    const selectSuggestion = (city) => {
        setLocationInput(city)
        setShowSuggestions(false)
    }

    const handleDurationChange = (e) => {
        const value = e.target.value
        setSelectedDurations(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        )
    }

    const searchHandler = async () => {
        const location = locationInput.trim()
        const distance = distanceRef.current.value
        const maxGroupSize = maxGroupSizeRef.current.value

        if (!location || !distance || !maxGroupSize || !travelDate) {
            alert('Please fill in all fields')
            return
        }

        const res = await fetch(
            `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
        )

        if (!res.ok) return alert('Search failed')

        const result = await res.json()
        navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}&date=${travelDate}`, {
            state: result.data
        })
    }

    return (
        <div className='search-wrapper'>
            <div className='search-card'>
                <div className='input-group'>
                    <i className='ri-map-pin-line'></i>
                    <input
                        type='text'
                        value={locationInput}
                        onChange={handleLocationChange}
                        placeholder='Where to?'
                        className='styled-input'
                    />
                    {showSuggestions && (
                        <ul className='suggestion-list'>
                            {citySuggestions.map((city, idx) => (
                                <li key={idx} onClick={() => selectSuggestion(city)}>{city}</li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='input-group' onClick={() => setShowDurationDropdown(prev => !prev)}>
                    <i className='ri-time-line'></i>
                    <div className='styled-input dropdown-toggle'>
                        {selectedDurations.length > 0 ? selectedDurations.join(', ') : 'Select Duration'}
                    </div>
                    {showDurationDropdown && (
                        // <div className='dropdown-menu'>
                        //     {['1-3 Days', '4-6 Days', '7-9 Days', '10+ Days'].map((label, idx) => (
                        //         <label key={idx} className='dropdown-item'>
                        //             <input
                        //                 type='checkbox'
                        //                 value={label}
                        //                 checked={selectedDurations.includes(label)}
                        //                 onChange={handleDurationChange}
                        //             />
                        //             {label}
                        //         </label>
                        //     ))}
                        // </div>

                        <div style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', width: '100%', top: '100%', padding: '5px 10px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', zIndex: 1000 }}>
                            {['1-3 Days', '4-6 Days', '7-9 Days', '10+ Days'].map((label, idx) => (
                                <label key={idx} className='dropdown-item'>
                                    <input
                                        type='checkbox'
                                        value={label}
                                        checked={selectedDurations.includes(label)}
                                        onChange={handleDurationChange}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>


                    )}
                </div>

                <div className='input-group'>
                    <i className='ri-calendar-line'></i>
                    <input
                        type='date'
                        className='styled-input'
                        min={new Date().toISOString().split('T')[0]}
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                    />
                </div>

                <div className='input-group'>
                    <i className='ri-group-line'></i>
                    <input
                        type='number'
                        ref={maxGroupSizeRef}
                        className='styled-input'
                        placeholder='Max People'
                    />
                </div>

                <div className='input-group'>
                    <i className='ri-road-map-line'></i>
                    <input
                        type='number'
                        ref={distanceRef}
                        className='styled-input'
                        placeholder='Distance (km)'
                    />
                </div>

                <button className='explore-btn' onClick={searchHandler}>
                    <i className='ri-search-line'></i> Explore
                </button>
            </div>
        </div >
    )
}

export default SearchBar
