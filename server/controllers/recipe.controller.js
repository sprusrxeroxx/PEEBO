import axios from "axios";
import Recipe from "../models/recipe.model.js";
import SavedRecipe from "../models/savedRecipe.model.js";
import mongoose from "mongoose";

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

// New function to save a recipe
export const saveRecipe = async (req, res) => {
  try {
    const { userId, recipeData } = req.body;
    
    if (!userId || !recipeData) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID and recipe data are required" 
      });
    }

    // First, save or update the recipe in the Recipe collection
    const recipeToSave = {
      title: recipeData.title,
      description: recipeData.description || "",
      ingredients: recipeData.ingredients || [],
      missingIngredients: recipeData.missedIngredients || [],
      image: recipeData.image || "",
      spoonacularId: recipeData.id // Using the Spoonacular ID as a unique identifier
    };

    // Use findOneAndUpdate with upsert to either update an existing recipe or create a new one
    const recipe = await Recipe.findOneAndUpdate(
      { spoonacularId: recipeData.id },
      recipeToSave,
      { new: true, upsert: true }
    );

    // Now create an entry in SavedRecipe to link the user with the recipe
    const savedRecipe = new SavedRecipe({
      userId,
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
    
    console.error("Error saving recipe:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to save recipe" 
    });
  }
};

// Function to get user's saved recipes
export const getSavedRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    // Find all saved recipes for this user and populate the recipe details
    const savedRecipes = await SavedRecipe.find({ userId })
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