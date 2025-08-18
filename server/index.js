import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected')
        console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
        console.log("API Key:", process.env.CLOUDINARY_API_KEY);
        console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");

    } catch (err) {
        console.log('Database connection failed')
    }
}


// ================Middleware==================
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.listen(port, () => {
    connect();
    console.log('Server listening o port', port)
})
