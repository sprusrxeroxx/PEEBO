import express from "express";
import { 
  searchRecipes, 
  saveRecipe, 
  getSavedRecipes,
  deleteSavedRecipe,
  updateRecipeNotes,
  getRecipeSteps
} from "../controllers/recipe.controller.js";

const router = express.Router();

// Search recipes by ingredients
router.get("/search", searchRecipes);

// Save a recipe
router.post("/save", saveRecipe);

// Get user's saved recipes
router.get("/saved/:userId", getSavedRecipes);

// Delete a saved recipe
router.delete("/saved/:id", deleteSavedRecipe);

// Update notes for a saved recipe
router.patch("/saved/:id/notes", updateRecipeNotes);

// Get recipe cooking steps
router.get("/:id/steps", getRecipeSteps);

export default router;