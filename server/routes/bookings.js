import express from 'express'
import { verifyAdmin, verifyUser, verifyToken } from '../utils/verifyToken.js'
import { createBooking, getAllBooking, getBooking, getBookingCount } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', verifyUser, getBooking)
router.get('/', verifyToken, verifyAdmin, getAllBooking)
router.get('/search/getBookingCount', verifyAdmin, getBookingCount)

export default router