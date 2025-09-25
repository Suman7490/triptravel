import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import themeRoutes from "./routes/themes.js";
import filterRoutes from "./routes/filterRoutes.js";
import { connectDB } from "./utils/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Always connect before handling routes
connectDB();

const allowedOrigins = [
    "http://localhost:3000",
    "https://api.makemyatra.com",
    "https://makemyatra.com",
    "https://www.makemyatra.com",
];

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("CORS not allowed for this origin: " + origin), false);
            }
        },
        credentials: true,
    })
);

// API routes
app.use("/auth", authRoute);
app.use("/tours", tourRoute);
app.use("/users", userRoute);
app.use("/review", reviewRoute);
app.use("/booking", bookingRoute);
app.use("/themes", themeRoutes);
app.use("/filters", filterRoutes);

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// 🔑 Run locally with app.listen
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`🚀 Server running locally on http://localhost:${port}`);
    });
}

// Export for Vercel
export default app;
