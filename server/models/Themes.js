import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        photo: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Themes", ThemeSchema);
