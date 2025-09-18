import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import themeRoutes from "./routes/themes.js";
import filterRoutes from "./routes/filterRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* --------------------  CORS CONFIG  -------------------- */
const allowedOrigins = [
    "http://localhost:3000",
    "https://triptravel-opal.vercel.app",
    "https://makemyatra.com",
    "https://www.makemyatra.com",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.warn(`🚫 CORS blocked: ${origin}`); // helpful log
                callback(new Error("CORS not allowed for this origin: " + origin), false);
            }
        },
        credentials: true,
    })
);

/* --------------------  MIDDLEWARE  -------------------- */
app.use(express.json());
app.use(cookieParser());

/* --------------------  ROUTES  -------------------- */
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/themes", themeRoutes);
app.use("/api/v1/filters", filterRoutes);

/* --------------------  STATIC FILES  -------------------- */
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

/* --------------------  404 HANDLER  -------------------- */
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

/* --------------------  ERROR HANDLER  -------------------- */
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});

/* --------------------  DB CONNECTION  -------------------- */
mongoose.set("strictQuery", false);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 15000,
    })
    .then(() => console.log("✅ Database connected"))
    .catch((err) => console.error("❌ DB connection failed:", err.message));

/* --------------------  LOCAL SERVER ONLY  -------------------- */
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`🚀 Server running locally on http://localhost:${port}`);
    });
}

/* --------------------  EXPORT APP (for Vercel)  -------------------- */
export default app;
