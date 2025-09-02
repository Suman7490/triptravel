import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const ToursByState = () => {
    const { state } = useParams();
    const [tours, setTours] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch(`${BASE_URL}/tours/state/${state}?page=${page}&limit=10`);
                const data = await res.json();
                if (data.success) {
                    setTours(data.data || []);
                    setTotalPages(data.totalPages);
                }
            } catch (err) {
                console.error("Error fetching state tours:", err);
            }
        };
        fetchTours();
    }, [state, page]);

    return (
        <div className="container mt-4">
            <h2>Tours in {state}</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>City</th>
                        <th>Duration</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour._id}>
                            <td>{tour.title}</td>
                            <td>{tour.city}</td>
                            <td>{tour.duration.days} Days / {tour.duration.nights} Nights</td>
                            <td>₹{tour.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav>
                <ul className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setPage(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default ToursByState;
