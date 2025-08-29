import mongoose from "mongoose"

const tourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Themes",
                required: true,
            },
        ],
        bestTime: {
            from: { type: String, required: true },
            to: { type: String, required: true },
        },

        duration: {
            nights: { type: Number, required: true },
            days: { type: Number, required: true },
        },
        photo: {
            type: String,
            required: true,
        },

        desc: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review",
            }
        ],
        featured: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true
    }
);

export default mongoose.model("Tour", tourSchema);