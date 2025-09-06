import React, { useState, useEffect } from 'react'
import TourCard from '../shared/TourCard'
import { Container, Row, Col } from 'reactstrap'

import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'

const FeaturedTourList = ({ filters = {} }) => {
    const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTour`)
    const [filteredTours, setFilteredTours] = useState([])

    // Filter tours based on the applied filters
    useEffect(() => {
        if (!featuredTours) return

        let filtered = [...featuredTours]

        // Filter by trip type
        if (filters.tripType) {
            if (filters.tripType === 'national') {
                filtered = filtered.filter(tour => tour.country === 'India')
            } else if (filters.tripType === 'international') {
                filtered = filtered.filter(tour => tour.country !== 'India')
            }
        }

        // Filter by theme
        if (filters.theme) {
            filtered = filtered.filter(tour => 
                tour.theme && tour.theme.toLowerCase().includes(filters.theme.toLowerCase())
            )
        }

        // Filter by duration
        if (filters.duration) {
            filtered = filtered.filter(tour => {
                const tourDuration = tour.duration || 0
                switch (filters.duration) {
                    case '1-3':
                        return tourDuration >= 1 && tourDuration <= 3
                    case '4-6':
                        return tourDuration >= 4 && tourDuration <= 6
                    case '7-9':
                        return tourDuration >= 7 && tourDuration <= 9
                    case '10-12':
                        return tourDuration >= 10 && tourDuration <= 12
                    case '13+':
                        return tourDuration >= 13
                    default:
                        return true
                }
            })
        }

        // Filter by month
        if (filters.month) {
            filtered = filtered.filter(tour => {
                const bestTime = tour.bestTime
                if (!bestTime) return true
                
                const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 
                                  'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
                const selectedMonthIndex = monthNames.indexOf(filters.month)
                
                if (bestTime.from && bestTime.to) {
                    const fromMonth = monthNames.indexOf(bestTime.from.toLowerCase())
                    const toMonth = monthNames.indexOf(bestTime.to.toLowerCase())
                    return selectedMonthIndex >= fromMonth && selectedMonthIndex <= toMonth
                }
                return true
            })
        }

        // Filter by budget
        if (filters.budget) {
            filtered = filtered.filter(tour => {
                const price = tour.price || 0
                return price >= filters.budget.min && price <= filters.budget.max
            })
        }

        setFilteredTours(filtered)
    }, [featuredTours, filters])

    return (
        <div className="featured-tours-grid">
            {
                loading && <div className="loading-state">Loading featured tours...</div>
            }
            {
                error && <div className="error-state">Error loading tours: {error}</div>
            }
            {!loading && !error && filteredTours.length === 0 && (
                <div className="no-results-state">
                    <h4>No tours found matching your filters</h4>
                    <p>Try adjusting your search criteria</p>
                </div>
            )}
            {!loading && !error && filteredTours.map(tour => (
                <div className="featured-tour-item" key={tour._id}>
                    <TourCard tour={tour} />
                </div>
            ))}
        </div>
    )
}

export default FeaturedTourList