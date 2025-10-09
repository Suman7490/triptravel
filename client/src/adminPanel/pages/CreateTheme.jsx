import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";

const CreateTheme = ({ editingTheme, fetchThemes, clearEditing }) => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (editingTheme) {
            setName(editingTheme?.name || "");
            setPhoto(null);
        } else {
            setName("");
            setPhoto(null);
        }
    }, [editingTheme]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        if (photo) formData.append("photo", photo);

        try {
            let url = `${BASE_URL}/themes`;
            let method = "POST";

            if (editingTheme) {
                url = `${BASE_URL}/themes/${editingTheme._id}`;
                method = "PUT";
            }
            const res = await fetch(url, {
                method,
                credentials: "include",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                alert(
                    editingTheme
                        ? "Theme updated successfully ✅"
                        : "Theme created successfully ✅"
                );
                fetchThemes();
                clearEditing();
            } else {
                alert(data.message || "Something went wrong ❌");
            }
        } catch (err) {
            console.error("Error saving theme:", err);
        }
    };

    return (
        <>
            <h4 className="w-100">{editingTheme ? "Update Theme" : "Create Theme"}</h4>

            <form
                onSubmit={handleSubmit}
                className="p-3 border rounded shadow-sm d-flex flex-column flex-lg-row gap-3 align-items-center"
            >

                {/* Form Inputs */}
                <div className="flex-grow-1 d-flex flex-column flex-md-row gap-3 w-100">
                    <div className="mb-3 flex-grow-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Theme Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 flex-grow-1">
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            accept="image/*"
                        />
                    </div>

                    <div className="">
                        <button type="submit" className="btn btn-success">
                            {editingTheme ? "Update" : "Create"}
                        </button>

                        {editingTheme && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={clearEditing}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

            </form>
        </>
    );
};

export default CreateTheme;
