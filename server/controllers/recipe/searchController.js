import SpoonacularAPI from "../../services/apiService.js";
import { sendSuccess, sendError } from "../../utils/responseHandler.js";

const api = new SpoonacularAPI();

/**
 * Search recipes by ingredients
 */
export const searchRecipes = async (req, res) => {
  const { ingredients } = req.query;

  if (!ingredients) {
    return sendError(res, "Ingredients are required", 400);
  }

  try {
    const { success, data, message } = await api.searchRecipesByIngredients(ingredients);
    
    if (!success) {
      return sendError(res, message, 500);
    }
    
    return sendSuccess(res, data);
  } catch (error) {
    console.error("Error in searchRecipes controller:", error.message);
    return sendError(res, "Server error", 500);
  }
};