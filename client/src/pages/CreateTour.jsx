import React, { useState } from 'react'
import CommonSection from '../shared/CommonSection';
import Newsletter from './../shared/Newsletter';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { BASE_URL } from '../utils/config';



const CreateTour = (req) => {
    const [photo, setPhoto] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        if (file) {
            setPreviewURL(URL.createObjectURL(file)); // ✅ generate a real preview URL
        }
    };
    const [formData, setFormData] = useState({
        title: '',
        city: '',
        address: '',
        distance: '',
        photo: '',
        desc: '',
        price: '',
        maxGroupSize: '',
        featured: true,
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // const handleSubmit = async e => {
    //     e.preventDefault();

    //     const data = new FormData();
    //     Object.entries(formData).forEach(([key, value]) => {
    //         data.append(key, value);
    //     });
    //     if (photo) {
    //         data.append('photo', photo); // This must match multer field name
    //     }

    //     try {
    //         const res = await fetch(`${BASE_URL}/tours`, {
    //             method: 'POST',
    //             credentials: 'include',
    //             body: data, // DO NOT set Content-Type! Browser will set it automatically
    //         });

    //         const result = await res.json();
    //         if (res.ok) {
    //             alert('Tour added successfully!');
    //             setFormData({
    //                 title: '',
    //                 city: '',
    //                 address: '',
    //                 distance: '',
    //                 desc: '',
    //                 price: '',
    //                 maxGroupSize: '',
    //                 featured: false,
    //             });
    //             setPhoto(null);
    //         } else {
    //             alert(result.message || 'Failed to add tour');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('Something went wrong');
    //     }
    // };

    const handleSubmit = async e => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('distance', formData.distance);
        formDataToSend.append('desc', formData.desc);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('maxGroupSize', formData.maxGroupSize);
        formDataToSend.append('featured', formData.featured);
        formDataToSend.append('photo', photo); // ⬅️ Append the image file

        try {
            const res = await fetch(`${BASE_URL}/tours`, {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend,
            });

            const result = await res.json();
            if (res.ok) {
                alert('Tour added successfully!');
                // reset form...
            } else {
                alert(result.message || 'Failed to add tour');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
        }
    };

    return (
        <>
            <CommonSection title={"Create Tour"} />

            <Container className="my-5">
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input name="title" value={formData.title} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>City</Label>
                        <Input name="city" value={formData.city} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Address</Label>
                        <Input name="address" value={formData.address} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Distance (km)</Label>
                        <Input type="number" name="distance" value={formData.distance} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Photo</Label>
                        {/* <Input type='file' name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} required /> */}
                        <Input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} required />
                        {previewURL && (
                            <img
                                src={previewURL}
                                alt="Preview"
                                style={{ maxWidth: '200px', marginTop: '10px' }}
                            />
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="desc" value={formData.desc} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Price (₹)</Label>
                        <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Max Group Size</Label>
                        <Input type="number" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} required />
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                            Featured Tour
                        </Label>
                    </FormGroup>

                    <Button color="primary" className="mt-3">Add Tour</Button>
                </Form>
            </Container>

            <Newsletter />
        </>
    )
}

export default CreateTour