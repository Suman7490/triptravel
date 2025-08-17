import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'
import path from 'path'
import { fileURLToPath } from 'url'
import serverless from 'serverless-http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()

// Middlewares
const corsOptions = {
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Routes

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))


let isConnected = false
const connect = async () => {
    if (isConnected) return
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log('Database connected')
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
}

// 👉 Local run
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 4000
    connect().then(() => {
        app.listen(port, () => {
            console.log(`Server running locally on port ${port}`)
        })
    })
} else {
    connect()
}

await connect();
export default serverless(app);
