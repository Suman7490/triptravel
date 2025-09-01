// routes/theme.js
import express from "express";
import { createTheme, updateTheme, deleteTheme, getThemes, getToursByTheme } from "../controllers/themeController.js";
import upload from "../middleware/upload.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Upload single image to Cloudinary
router.get("/", getThemes);
router.post("/", verifyToken, verifyAdmin, upload.single("photo"), createTheme);
router.put("/:id", verifyToken, verifyAdmin, upload.single("photo"), updateTheme)
router.delete("/:id", verifyToken, verifyAdmin, deleteTheme);
router.get("/:themeId/tours", getToursByTheme);

export default router;
