import express from "express";
import { getDistinctCountries, getStatesByCountry } from "../controllers/filterController.js";

const router = express.Router();

router.get("/countries", getDistinctCountries);
router.get("/states/:country", getStatesByCountry);

export default router;
