import React, { useEffect, useState } from 'react';
import CommonSection from '../../shared/CommonSection';
import Newsletter from '../../shared/Newsletter';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Country, State } from "country-state-city";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


const countries = {
    India: ["Maharashtra", "Delhi", "Karnataka", "Rajasthan", "Kerala", "Jammu & Kashmir"],
    USA: ["California", "Texas", "New York", "Florida", "Washington"],
    UK: ["England", "Scotland", "Wales", "Northern Ireland"],
    Singapur: ["England", "Scotland", "Wales", "Northern Ireland"]
};

const CreateTour = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [themes, setThemes] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        title: '',
        country: 'India',
        countryCode: '',
        state: '',
        city: '',
        category: [],
        bestTime: { from: '', to: '' },
        duration: { nights: 0, days: 1 },
        desc: '',
        price: '',
        featured: false,
    });
    const countriesList = Country.getAllCountries();
    const statesList = formData.countryCode
        ? State.getStatesOfCountry(formData.countryCode)
        : [];
    // Simulated admin check from cookie/localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.role === 'admin') {
            setIsAdmin(true);
        } else {
            toast.error("Unauthorized access – Admins only");
        }
    }, []);

    // Fetch themes (categories)
    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const res = await fetch(`${BASE_URL}/themes`);
                const data = await res.json();
                if (data.success) setThemes(data.data);
            } catch (err) {
                console.error("Error fetching themes:", err);
            }
        };
        fetchThemes();
    }, []);


    useEffect(() => {
        if (isEdit) {
            const fetchTour = async () => {
                try {
                    const res = await fetch(`${BASE_URL}/tours/${id}`);
                    const result = await res.json();
                    if (res.ok && result.success) {
                        const foundCountry = countriesList.find(c => c.name === result.data.country);
                        setFormData({
                            title: result.data.title || '',
                            country: result.data.country || 'India',
                            countryCode: foundCountry ? foundCountry.isoCode : '',
                            state: result.data.state || '',
                            city: result.data.city || '',
                            category: result.data.category?.map(c => c._id) || [],
                            bestTime: result.data.bestTime || { from: '', to: '' },
                            duration: result.data.duration || { nights: 0, days: 1 },
                            desc: result.data.desc || '',
                            price: result.data.price || '',
                            featured: result.data.featured || false,
                        });

                        setPreviewURL(result.data.photo);
                    } else {
                        toast.error("Failed to load tour data");
                    }
                } catch (err) {
                    console.error(err);
                    toast.error("Error fetching tour data");
                }
            };
            fetchTour();
        }
    }, [id, isEdit]);


    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        if (name === "category") return
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle bestTime
    const handleBestTime = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            bestTime: { ...prev.bestTime, [name]: value }
        }));
    };

    // Handle duration (nights auto updates days)
    const handleDurationChange = (e) => {
        const nights = parseInt(e.target.value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            duration: { nights, days: nights + 1 }
        }));
    };

    // Handle categories
    const handleCategoryChange = (id) => {
        setFormData(prev => {
            const already = prev.category.includes(id);
            return {
                ...prev,
                category: already
                    ? prev.category.filter(c => c !== id)
                    : [...prev.category, id],
            };
        });
    };

    const handlePhotoChange = e => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreviewURL(URL.createObjectURL(file));
        }
    };
    const handleCountryChange = (e) => {
        const code = e.target.value;
        const country = countriesList.find(c => c.isoCode === code);

        setFormData(prev => ({
            ...prev,
            countryCode: code,
            country: country ? country.name : '',
            state: '' // reset state when country changes
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => formDataToSend.append(key, v));
            } else if (typeof value === "object") {
                formDataToSend.append(key, JSON.stringify(value));
            } else {
                formDataToSend.append(key, value);
            }
        });

        if (photo) {
            formDataToSend.append("photo", photo);
        }

        try {
            const url = isEdit ? `${BASE_URL}/tours/${id}` : `${BASE_URL}/tours`;
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                credentials: "include",
                body: formDataToSend,
            });

            const result = await res.json();
            if (res.ok) {
                alert(isEdit ? "Tour updated successfully!" : "Tour added successfully!");
                navigate("/dashboard/tours");
            } else {
                toast.error(result.message || "Failed to save tour");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };


    if (!isAdmin) return <p className="text-center mt-5">You are not authorized to access this page.</p>;

    return (
        <>

            <div className="my-5">
                <h4 className='text-center'>Create Tour</h4>
                <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                    <FormGroup>
                        <Label>Title</Label>
                        <Input name="title" value={formData.title} onChange={handleChange} required />
                    </FormGroup>

                    {/* Country field */}
                    <FormGroup>
                        <Label>Country</Label>
                        <Input
                            type="select"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleCountryChange}
                        >
                            <option value="">Select Country</option>
                            {countriesList.map(c => (
                                <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                            ))}
                        </Input>
                    </FormGroup>

                    {/* State field (only when National or if country has states list) */}

                    <FormGroup>
                        <Label>State</Label>
                        <Input
                            type="select"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        >
                            <option value="">Select State</option>
                            {State.getStatesOfCountry(formData.countryCode).map(s => (
                                <option key={s.isoCode} value={s.name}>{s.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>City</Label>
                        <Input name="city" value={formData.city} onChange={handleChange} required />
                    </FormGroup>


                    {/* Best Time */}
                    <FormGroup>
                        <Label>Best Time to Visit</Label>
                        <div className="d-flex gap-2">
                            <Input type="select" name="from" value={formData.bestTime?.from || ""} onChange={handleBestTime}>
                                <option value="">From</option>
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </Input>
                            <Input type="select" name="to" value={formData.bestTime.to} onChange={handleBestTime}>
                                <option value="">To</option>
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </Input>
                        </div>
                    </FormGroup>

                    {/* Duration */}
                    <FormGroup>
                        <Label>Duration</Label>
                        <div className="d-flex gap-2 align-items-center">
                            <Input
                                type="number"
                                min="0"
                                value={formData.duration.nights}
                                onChange={handleDurationChange}
                            />
                            <span>Nights/</span>
                            <span className='form-control'>
                                {formData.duration.days}
                            </span>
                            <span>Days</span>
                        </div>
                    </FormGroup>

                    {/* Category from DB */}
                    <FormGroup>
                        <Label>Category (Themes)</Label>
                        <div>
                            {themes.map(theme => (
                                <div key={theme._id}>
                                    <Input
                                        type="checkbox"
                                        checked={formData.category.includes(theme._id)}
                                        onChange={() => handleCategoryChange(theme._id)}
                                    /> {theme.name}
                                </div>
                            ))}
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label>Photo</Label>
                        <Input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />
                        {previewURL && (
                            <img
                                src={previewURL}
                                alt="Preview"
                                className="img-thumbnail mt-2"
                                style={{ maxWidth: '200px' }}
                            />
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>Description</Label>
                        <ReactQuill
                            theme="snow"
                            value={formData.desc}
                            onChange={(value) => setFormData(prev => ({ ...prev, desc: value }))}
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    [{ 'align': [] }],
                                    [{ 'color': [] }, { 'background': [] }],
                                    ['clean'],
                                ],
                            }}
                            formats={[
                                'header', 'bold', 'italic', 'underline', 'strike',
                                'list', 'bullet', 'align', 'color', 'background'
                            ]}
                            style={{ height: '200px', marginBottom: '50px' }}
                        />
                    </FormGroup>


                    <FormGroup>
                        <Label>Price (₹)</Label>
                        <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </FormGroup>



                    <FormGroup check className="mb-3">
                        <Label check>
                            <Input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                            Featured Tour
                        </Label>
                    </FormGroup>

                    <Button color="primary" block>
                        {isEdit ? "Update Tour" : "Add Tour"}
                    </Button>
                </Form>
            </div>

            <ToastContainer position="top-center" />
        </>
    );
};

export default CreateTour;
