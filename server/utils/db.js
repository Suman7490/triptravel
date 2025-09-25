// db.js
import mongoose from "mongoose";

let isConnected = false; // global cache

export const connectDB = async () => {
    if (isConnected) {
        // Use existing connection
        console.log("⚡ Using existing database connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // 10s timeout
        });

        isConnected = db.connections[0].readyState === 1;
        console.log("✅ Database connected");
    } catch (err) {
        console.error("❌ DB connection failed:", err.message);
        throw err;
    }
};
