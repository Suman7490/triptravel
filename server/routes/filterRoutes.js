import express from "express";
import { getTourByState } from "../controllers/filterController.js";

const router = express.Router();


router.get("/state/:stateName", getTourByState);

export default router;
