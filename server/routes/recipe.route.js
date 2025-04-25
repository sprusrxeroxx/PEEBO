import express from "express";
import { searchRecipes } from "../controllers/recipe.controller.js";

const router = express.Router();

// Search recipes by ingredients
router.get("/search", searchRecipes);

export default router;