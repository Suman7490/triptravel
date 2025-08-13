import React, { useEffect, useState } from 'react';
import CommonSection from '../../shared/CommonSection';
import Newsletter from '../../shared/Newsletter';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const CreateTour = () => {
    const [photo, setPhoto] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        city: '',
        desc: '',
        price: '',
        maxGroupSize: '',
        featured: true,
    });

    // Simulated admin check from cookie/localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // Example, adapt as per your auth
        if (user?.role === 'admin') {
            setIsAdmin(true);
        } else {
            toast.error("Unauthorized access – Admins only");
        }
    }, []);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handlePhotoChange = e => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreviewURL(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Basic Validation
        for (const key in formData) {
            if (!formData[key] && key !== 'featured') {
                return toast.warning(`Please fill in the ${key} field.`);
            }
        }
        if (!photo) return toast.warning('Please upload a photo');

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });
        formDataToSend.append('photo', photo);

        try {
            const res = await fetch(`${BASE_URL}/tours`, {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend,
            });

            const result = await res.json();
            if (res.ok) {
                toast.success('Tour added successfully!');
                setFormData({
                    title: '',
                    city: '',
                    desc: '',
                    price: '',
                    maxGroupSize: '',
                    featured: false,
                });
                setPhoto(null);
                setPreviewURL(null);
            } else {
                toast.error(result.message || 'Failed to add tour');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    if (!isAdmin) return <p className="text-center mt-5">You are not authorized to access this page.</p>;

    return (
        <>
            <CommonSection title="Create Tour" />
            <Container className="my-5">
                <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                    <FormGroup>
                        <Label>Title</Label>
                        <Input name="title" value={formData.title} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>City</Label>
                        <Input name="city" value={formData.city} onChange={handleChange} required />
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

                    {/* <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="desc" value={formData.desc} onChange={handleChange} required />
                    </FormGroup> */}
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

                    <FormGroup>
                        <Label>Max Group Size</Label>
                        <Input type="number" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup check className="mb-3">
                        <Label check>
                            <Input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                            Featured Tour
                        </Label>
                    </FormGroup>

                    <Button color="primary" block>Add Tour</Button>
                </Form>
            </Container>

            <Newsletter />
            <ToastContainer position="top-center" />
        </>
    );
};

export default CreateTour;
