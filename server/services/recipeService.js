import Recipe from "../models/recipe.model.js";
import SavedRecipe from "../models/savedRecipe.model.js";
import User from "../models/user.model.js";
import enrichRecipe from "./enrichRecipe.js";
import SpoonacularAPI from "./apiService.js";

export default class RecipeService {
  constructor() {
    this.api = new SpoonacularAPI();
  }

  /**
   * Find a MongoDB user by firebase ID
   */
  async findUserByFirebaseId(firebaseId) {
    return await User.findOne({ firebaseId });
  }
  
  /**
   * Save a recipe to the database
   */
  async saveRecipe(firebaseId, recipeData, notes = "") {
    const user = await this.findUserByFirebaseId(firebaseId);
    
    if (!user) {
      return { 
        success: false, 
        message: "User not found. Please ensure your account is properly set up."
      };
    }

    // Enrich recipe data with additional info
    const enrichedRecipeData = await enrichRecipe(recipeData);

    // Prepare recipe data for saving
    const recipeToSave = {
      title: enrichedRecipeData.title || recipeData.title,
      image: enrichedRecipeData.image || recipeData.image || "",
      spoonacularId: recipeData.id,
      ingredients: recipeData.usedIngredients || [],
      missingIngredients: recipeData.missedIngredients || [],
      readyInMinutes: enrichedRecipeData.readyInMinutes || recipeData.usedIngredients.length * 5,
      servings: enrichedRecipeData.servings || 4,
      description: enrichedRecipeData.description || "",
      dishTypes: enrichedRecipeData.dishTypes || [],
      cuisines: enrichedRecipeData.cuisines || [],
      instructions: enrichedRecipeData.instructions || "",
      steps: enrichedRecipeData.steps || []
    };

    try {
      // Find or create recipe
      const recipe = await Recipe.findOneAndUpdate(
        { spoonacularId: recipeData.id },
        recipeToSave,
        { new: true, upsert: true }
      );

      // Check if user already saved this recipe
      const existingSavedRecipe = await SavedRecipe.findOne({
        userId: user._id,
        recipeId: recipe._id
      });

      if (existingSavedRecipe) {
        return {
          success: false,
          message: "You have already saved this recipe"
        };
      }

      // Create saved recipe entry
      const savedRecipe = new SavedRecipe({
        userId: user._id,
        recipeId: recipe._id,
        notes
      });

      await savedRecipe.save();
      
      return {
        success: true,
        message: "Recipe saved successfully",
        data: savedRecipe
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          success: false,
          message: "You have already saved this recipe"
        };
      }
      
      console.error("Error saving recipe:", error.message);
      return {
        success: false,
        message: "Failed to save recipe"
      };
    }
  }

  /**
   * Get saved recipes for a user
   */
  async getSavedRecipes(firebaseId) {
    const user = await this.findUserByFirebaseId(firebaseId);
    
    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }

    try {
      const savedRecipes = await SavedRecipe.find({ userId: user._id })
        .populate('recipeId')
        .sort({ createdAt: -1 });
        
      return {
        success: true,
        data: savedRecipes
      };
    } catch (error) {
      console.error("Error fetching saved recipes:", error.message);
      return {
        success: false,
        message: "Failed to fetch saved recipes"
      };
    }
  }

  /**
   * Delete a saved recipe
   */
  async deleteSavedRecipe(savedRecipeId) {
    try {
      const deletedRecipe = await SavedRecipe.findByIdAndDelete(savedRecipeId);
      
      if (!deletedRecipe) {
        return {
          success: false,
          message: "Saved recipe not found"
        };
      }

      return {
        success: true,
        message: "Recipe removed successfully",
        data: deletedRecipe
      };
    } catch (error) {
      console.error("Error deleting saved recipe:", error.message);
      return {
        success: false,
        message: "Failed to delete saved recipe"
      };
    }
  }

  /**
   * Update notes for a saved recipe
   */
  async updateRecipeNotes(savedRecipeId, notes) {
    try {
      const updatedRecipe = await SavedRecipe.findByIdAndUpdate(
        savedRecipeId,
        { notes },
        { new: true }
      ).populate('recipeId');
      
      if (!updatedRecipe) {
        return {
          success: false,
          message: "Saved recipe not found"
        };
      }

      return {
        success: true,
        message: "Notes updated successfully",
        data: updatedRecipe
      };
    } catch (error) {
      console.error("Error updating recipe notes:", error.message);
      return {
        success: false,
        message: "Failed to update notes"
      };
    }
  }

  /**
   * Get recipe steps for a specific recipe
   */
  async getRecipeSteps(spoonacularId) {
    try {
      // First try to find the recipe in our database
      const existingRecipe = await Recipe.findOne({ 
        spoonacularId: Number(spoonacularId) 
      });
      
      // If recipe exists with steps, return from database
      if (existingRecipe?.steps?.length > 0) {
        return {
          success: true,
          data: {
            recipeId: spoonacularId,
            title: existingRecipe.title,
            image: existingRecipe.image,
            servings: existingRecipe.servings,
            readyInMinutes: existingRecipe.readyInMinutes,
            steps: existingRecipe.steps,
            source: "database"
          }
        };
      }

      // Otherwise fetch from API
      const apiResponse = await this.api.getRecipeInformation(spoonacularId);
      
      if (!apiResponse.success) {
        return apiResponse;
      }

      // Parse steps from API response
      const steps = this.api.parseRecipeSteps(apiResponse.data);

      // Update existing recipe or create new one
      if (existingRecipe) {
        existingRecipe.steps = steps;
        await existingRecipe.save();
      } else {
        await Recipe.create({
          spoonacularId: Number(spoonacularId),
          title: apiResponse.data.title,
          image: apiResponse.data.image,
          servings: apiResponse.data.servings || 4,
          readyInMinutes: apiResponse.data.readyInMinutes || 30,
          instructions: apiResponse.data.instructions || "",
          steps: steps
        });
      }

      // Return the API data with parsed steps
      return {
        success: true,
        data: {
          recipeId: spoonacularId,
          title: apiResponse.data.title,
          image: apiResponse.data.image,
          servings: apiResponse.data.servings,
          readyInMinutes: apiResponse.data.readyInMinutes,
          steps,
          source: "api"
        }
      };
    } catch (error) {
      console.error("Error fetching recipe steps:", error.message);
      return {
        success: false,
        message: "Failed to fetch recipe steps"
      };
    }
  }
}