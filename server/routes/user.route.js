import express from "express";
import { syncUser, getUser } from "../controllers/user.controller.js";

const router = express.Router();

// Sync user data between Firebase and MongoDB
router.post("/sync", syncUser);

// Get user data by Firebase ID
router.get("/:firebaseId", getUser);

export default router;