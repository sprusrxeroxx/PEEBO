import RecipeService from "../../services/recipeService.js";
import { sendSuccess, sendError } from "../../utils/responseHandler.js";

const recipeService = new RecipeService();

/**
 * Save a recipe for a user
 */
export const saveRecipe = async (req, res) => {
  const { userId: firebaseId, recipeData } = req.body;
  
  if (!firebaseId || !recipeData) {
    return sendError(res, "User ID and recipe data are required", 400);
  }

  try {
    const { success, message, data } = await recipeService.saveRecipe(
      firebaseId, 
      recipeData,
      req.body.notes
    );
    
    if (!success) {
      return sendError(res, message, 400);
    }
    
    return sendSuccess(res, data, message, 201);
  } catch (error) {
    console.error("Error in saveRecipe controller:", error.message);
    return sendError(res, "Failed to save recipe", 500);
  }
};

/**
 * Get all saved recipes for a user
 */
export const getSavedRecipes = async (req, res) => {
  const { userId: firebaseId } = req.params;
  
  if (!firebaseId) {
    return sendError(res, "User ID is required", 400);
  }

  try {
    const { success, message, data } = await recipeService.getSavedRecipes(firebaseId);
    
    if (!success) {
      return sendError(res, message, 404);
    }
    
    return sendSuccess(res, data);
  } catch (error) {
    console.error("Error in getSavedRecipes controller:", error.message);
    return sendError(res, "Failed to fetch saved recipes", 500);
  }
};

/**
 * Delete a saved recipe
 */
export const deleteSavedRecipe = async (req, res) => {
  const { id: savedRecipeId } = req.params;
  
  if (!savedRecipeId) {
    return sendError(res, "Saved recipe ID is required", 400);
  }

  try {
    const { success, message, data } = await recipeService.deleteSavedRecipe(savedRecipeId);
    
    if (!success) {
      return sendError(res, message, 404);
    }
    
    return sendSuccess(res, data, message);
  } catch (error) {
    console.error("Error in deleteSavedRecipe controller:", error.message);
    return sendError(res, "Failed to delete saved recipe", 500);
  }
};

/**
 * Update notes for a saved recipe
 */
export const updateRecipeNotes = async (req, res) => {
  const { id: savedRecipeId } = req.params;
  const { notes } = req.body;
  
  if (!savedRecipeId) {
    return sendError(res, "Saved recipe ID is required", 400);
  }

  try {
    const { success, message, data } = await recipeService.updateRecipeNotes(
      savedRecipeId,
      notes
    );
    
    if (!success) {
      return sendError(res, message, 404);
    }
    
    return sendSuccess(res, data, message);
  } catch (error) {
    console.error("Error in updateRecipeNotes controller:", error.message);
    return sendError(res, "Failed to update notes", 500);
  }
};