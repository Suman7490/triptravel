import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
const router = express.Router();


// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

// Get Single user
router.get("/:id", getSingleUser);

// Get All user
router.get("/", getAllUser);

export default router;