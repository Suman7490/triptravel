import express from "express";
import { createTour, updateTour, deleteTour, getSingleTour, getAllTour, getTourBySearch, getFeaturedTour, getTourCount } from './../controllers/tourController.js'
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import upload from "../middleware/upload.js";



const router = express.Router();
router.post('/', verifyToken, verifyAdmin, upload.single('photo'), createTour);
// router.post("/", verifyAdmin, createTour);  // create new tour
router.put("/:id", verifyAdmin, updateTour);  // Update tour
router.delete("/:id", verifyAdmin, deleteTour);  // Delete tour
router.get("/:id", getSingleTour);  // Get Single tour
router.get("/", getAllTour);  // Get All tour

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTour", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

export default router;