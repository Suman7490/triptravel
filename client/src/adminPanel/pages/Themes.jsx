import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import CreateTheme from "./CreateTheme";

const Themes = () => {
    const [themes, setThemes] = useState([]);
    const [editingTheme, setEditingTheme] = useState(null);

    // Fetch all themes
    const fetchThemes = async () => {
        try {
            const res = await fetch(`${BASE_URL}/themes`);
            const data = await res.json();
            if (data.success) setThemes(data.data);
        } catch (err) {
            console.error("Error fetching themes:", err);
        }
    };

    useEffect(() => {
        fetchThemes();
    }, []);

    // Delete theme
    // Delete theme
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this theme?")) return;

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${BASE_URL}/themes/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();
            if (data.success) {
                fetchThemes();
                alert("Theme deleted successfully ✅");
            } else {
                alert(data.message || "Failed to delete theme ❌");
            }
        } catch (err) {
            console.error("Error deleting theme:", err);
        }
    };


    return (
        <>
            {/* Pass editingTheme and fetchThemes so CreateTheme can update */}
            <CreateTheme editingTheme={editingTheme} fetchThemes={fetchThemes} clearEditing={() => setEditingTheme(null)} />

            <table className="table table-bordered table-hover text-center mt-4">
                <thead className="table-dark">
                    <tr>
                        <th>Theme Name</th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {themes.map((theme) => (
                        <tr key={theme._id}>
                            <td>{theme.name}</td>
                            <td>
                                <img src={theme.photo} alt={theme.name} width="80" />
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => setEditingTheme(theme)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(theme._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {themes.length === 0 && (
                        <tr>
                            <td colSpan="3">No themes found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Themes;
