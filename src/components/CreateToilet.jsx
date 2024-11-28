import React, { useState } from "react";
import axios from "axios";

const form = () => {
    const [form , setForm] = useState({
        place: '',
        rating: '',
        image: null,
        review: '',
        coordinates: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setForm({
            ...form,
            image: file
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('place', form.place)
        formData.append('rating', form.rating)
        formData.append('review', form.review)
        formData.append('coordinates', form.coordinates)
        if (form.image) {
            formData.append('image', form.image)
        }

        try {
            const response = await axios.post('https://toilet-map-api.vercel.app/api/toilets', formData, {
                headers: {
                    "Content-Type" : 'multipart/form-data'
                }
            })
            console.log('success', response.data)
        } catch (error) {
            console.log('error', response.error || response.messagge)

        }
    }

    return (
        <section className="">
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="">
                    <label htmlFor="">place</label>
                    <input type="text" name="place" value={form.place} />
                </div>
                <div className="">
                    <label htmlFor="">rating</label>
                    <input type="text" name="rating" value={form.rating} />
                </div>
                <div className="">
                    <label htmlFor="">review</label>
                    <input type="text" name="review" value={form.review} />
                </div>
                <div className="">
                    <label htmlFor="">coordinates</label>
                    <input type="text" name="coordinates" value={form.coordinates} />
                </div>
                <div className="">
                    <label htmlFor="">image</label>
                    <input type="file" name="image" accept="image/*" value={form.image} />
                </div>
                <button type="submit">Add Review</button>
            </form>
        </section>
    )
}

export default form