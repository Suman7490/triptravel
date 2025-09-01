import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import themeRoutes from "./routes/themes.js";
import filterRoutes from "./routes/filterRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


const allowedOrigins = [
    "http://localhost:3000",
];
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("CORS not allowed for this origin: " + origin), false);
        }
    },
    credentials: true,
}));
// API routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use("/api/v1/themes", themeRoutes);
app.use("/api/v1/filters", filterRoutes);

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
// Static file serving (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Database connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000
}
)
    .then(() => console.log("✅ Database connected"))
    .catch(err => console.error("❌ DB connection failed:", err.message));

// 🔑 If running locally, start server with app.listen
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`🚀 Server running locally on http://localhost:${port}`);
    });
}

// Export app for Vercel
export default app;
