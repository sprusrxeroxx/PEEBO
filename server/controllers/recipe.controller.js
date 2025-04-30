import axios from "axios";
import Recipe from "../models/recipe.model.js";
import SavedRecipe from "../models/savedRecipe.model.js";
import User from "../models/user.model.js";

export const searchRecipes = async (req, res) => {
  const ranking = 1;
  const ignorePantry = true;
  const number = 10;
  const { ingredients } = req.query;

  if (!ingredients) {
    return res.status(400).json({ success: false, message: "Ingredients are required" });
  }

  try {
    const response = await axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
      params: {
        ingredients,
        ranking,
        ignorePantry,
        number,
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Updated function to save a recipe
export const saveRecipe = async (req, res) => {
  try {
    const { userId: firebaseId, recipeData } = req.body;
    
    if (!firebaseId || !recipeData) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID and recipe data are required" 
      });
    }

    // First, find the MongoDB user document using the Firebase ID
    const user = await User.findOne({ firebaseId });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please ensure your account is properly set up."
      });
    }

    // Save or update the recipe in the Recipe collection
    const recipeToSave = {
      title: recipeData.title,
      description: recipeData.description || "",
      ingredients: recipeData.ingredients || [],
      missingIngredients: recipeData.missedIngredients || [],
      image: recipeData.image || "",
      spoonacularId: recipeData.id // Using the Spoonacular ID as a unique identifier
    };

    // Have to implement api recipe enrichment here
    // const apiRecipe = await axios.get(`https://api.spoonacular.com/recipes/${recipeData.id}/information`

    // Use findOneAndUpdate with upsert to either update an existing recipe or create a new one
    const recipe = await Recipe.findOneAndUpdate(
      { spoonacularId: recipeData.id },
      recipeToSave,
      { new: true, upsert: true }
    );

    // Now create an entry in SavedRecipe using the MongoDB user's _id
    const savedRecipe = new SavedRecipe({
      userId: user._id, // Use the MongoDB user _id instead of Firebase ID
      recipeId: recipe._id,
      notes: req.body.notes || ""
    });

    await savedRecipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe saved successfully",
      data: savedRecipe
    });
  } catch (error) {
    // Special handling for duplicate key errors (user has already saved this recipe)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already saved this recipe"
      });
    }
    
    console.error("Error saving recipe:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to save recipe: " + error.message 
    });
  }
};

// Update the function to get user's saved recipes
export const getSavedRecipes = async (req, res) => {
  try {
    const { userId: firebaseId } = req.params;
    
    if (!firebaseId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    // Find the MongoDB user document first
    const user = await User.findOne({ firebaseId });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Find all saved recipes for this user and populate the recipe details
    const savedRecipes = await SavedRecipe.find({ userId: user._id })
      .populate('recipeId')
      .sort({ createdAt: -1 }); // Most recently saved first

    res.status(200).json({
      success: true,
      data: savedRecipes
    });
  } catch (error) {
    console.error("Error fetching saved recipes:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch saved recipes" 
    });
  }
};

// Delete a saved recipe
export const deleteSavedRecipe = async (req, res) => {
  try {
    const { id: savedRecipeId } = req.params;
    
    if (!savedRecipeId) {
      return res.status(400).json({ 
        success: false, 
        message: "Saved recipe ID is required" 
      });
    }

    // Find and delete the saved recipe
    const deletedRecipe = await SavedRecipe.findByIdAndDelete(savedRecipeId);
    
    if (!deletedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Saved recipe not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe removed successfully",
      data: deletedRecipe
    });
  } catch (error) {
    console.error("Error deleting saved recipe:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete saved recipe" 
    });
  }
};