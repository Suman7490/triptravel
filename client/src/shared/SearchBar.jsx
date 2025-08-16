import React, { useState, useEffect } from 'react'
import '../styles/search-bar.css'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/config'

const SearchBar = () => {
    const [citySuggestions, setCitySuggestions] = useState([])
    const [allCities, setAllCities] = useState([])
    const [locationInput, setLocationInput] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)

    const navigate = useNavigate()

    // Fetch all unique cities
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

    // Handle input and suggestions
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
        autoSearch(input)
    }

    const selectSuggestion = (city) => {
        setLocationInput(city)
        setShowSuggestions(false)
    }

    // Search by location only
    const autoSearch = async (location) => {
        const trimmed = location.trim()
        if (!trimmed) return

        try {
            const res = await fetch(
                `${BASE_URL}/tours/search/getTourBySearch?city=${trimmed}`
            )

            if (!res.ok) {
                console.error("Search failed")
                return
            }

            const result = await res.json()
            navigate(`/tours/search?city=${trimmed}`, {
                state: result.data
            })
        } catch (err) {
            console.error('Search error:', err)
        }
    }
    const searchHandler = () => {
        autoSearch(locationInput)
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

                <button className='explore-btn' onClick={searchHandler}>
                    <i className='ri-search-line'></i> Explore
                </button>
            </div>
        </div>
    )
}

export default SearchBar
