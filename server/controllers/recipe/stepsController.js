import RecipeService from "../../services/recipeService.js";
import { sendSuccess, sendError } from "../../utils/responseHandler.js";

const recipeService = new RecipeService();

/**
 * Get recipe cooking steps
 */
export const getRecipeSteps = async (req, res) => {
  const { id: spoonacularId } = req.params;
  
  if (!spoonacularId) {
    return sendError(res, "Recipe ID is required", 400);
  }

  try {
    const { success, message, data } = await recipeService.getRecipeSteps(spoonacularId);
    
    if (!success) {
      return sendError(res, message, 500);
    }
    
    return sendSuccess(res, data);
  } catch (error) {
    console.error("Error in getRecipeSteps controller:", error.message);
    return sendError(res, "Failed to fetch recipe steps", 500);
  }
};