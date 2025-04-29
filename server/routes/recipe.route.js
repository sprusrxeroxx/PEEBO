import express from "express";
import { searchRecipes, saveRecipe, getSavedRecipes } from "../controllers/recipe.controller.js";

const router = express.Router();

// Search recipes by ingredients
router.get("/search", searchRecipes);

// Save a recipe
router.post("/save", saveRecipe);

// Get user's saved recipes
router.get("/saved/:userId", getSavedRecipes);

export default router;