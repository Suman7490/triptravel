import express from "express";
import { createTour, updateTour, deleteTour, getSingleTour, getAllTour, getTourBySearch, getFeaturedTour, getTourCount } from './../controllers/tourController.js'
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import upload from "../middleware/upload.js";



const router = express.Router();

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTour", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

router.post('/', verifyToken, verifyAdmin, upload.single('photo'), createTour);
router.put("/:id", verifyAdmin, upload.single('photo'), updateTour);  // Update tour
router.delete("/:id", verifyToken, verifyAdmin, deleteTour);  // Delete tour
router.get("/:id", getSingleTour);  // Get Single tour
router.get("/", getAllTour);  // Get All tour



export default router;