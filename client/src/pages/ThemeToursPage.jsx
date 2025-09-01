import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { BASE_URL } from "../utils/config";

const ThemeToursPage = () => {
    const { themeId } = useParams();
    const [tours, setTours] = useState([]);
    const [themeName, setThemeName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await fetch(`${BASE_URL}/themes/${themeId}/tours`);
                const result = await res.json();
                if (result.success) {
                    setTours(result.data);
                    setThemeName(result.theme);
                }
            } catch (err) {
                console.error("Error fetching tours by theme:", err);
            }
        };
        fetchTours();
    }, [themeId]);

    const handleRowClick = (tourId) => {
        navigate(`/tour/${tourId}`);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Tours under "{themeName}" Theme</h2>
            {tours.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Title</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Best Time</th>
                            <th>Duration</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map((tour) => (
                            <tr key={tour._id} onClick={() => handleRowClick(tour._id)} style={{ cursor: "pointer" }}>
                                <td>
                                    <img
                                        src={tour.photo}
                                        alt={tour.title}
                                        style={{ width: "80px", height: "60px", objectFit: "cover" }}
                                    />
                                </td>
                                <td>{tour.title}</td>
                                <td>{tour.city}</td>
                                <td>{tour.country}</td>
                                <td>{tour.bestTime.from} - {tour.bestTime.to}</td>
                                <td>{tour.duration.nights}N/{tour.duration.days}D</td>
                                <td>₹{tour.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <h5>No tours found for this theme.</h5>
            )}
        </Container>
    );
};

export default ThemeToursPage;
