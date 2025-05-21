import axios from "axios";
import Recipe from "../models/recipe.model.js";
import SavedRecipe from "../models/savedRecipe.model.js";
import User from "../models/user.model.js";
import enrichRecipe from "../services/enrichRecipe.js";

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

    // find the MongoDB user document using the Firebase ID
    const user = await User.findOne({ firebaseId });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please ensure your account is properly set up."
      });
    }

    // Use the enrichment pipeline to get enhanced recipe data
    const enrichedRecipeData = await enrichRecipe(recipeData);

    // Prepare recipe data for saving
    const recipeToSave = {
      title: enrichedRecipeData.title || recipeData.title,
      image: enrichedRecipeData.image || recipeData.image || "",
      spoonacularId: recipeData.id,
      ingredients: recipeData.usedIngredients || [],
      missingIngredients: recipeData.missedIngredients || [],
      
      // Use enriched data
      readyInMinutes: enrichedRecipeData.readyInMinutes || recipeData.usedIngredients.length * 5,
      servings: enrichedRecipeData.servings || 4,
      description: enrichedRecipeData.description || "",
      dishTypes: enrichedRecipeData.dishTypes || [],
      cuisines: enrichedRecipeData.cuisines || [],
      instructions: enrichedRecipeData.instructions || "",
    };

    // Use findOneAndUpdate with upsert to either update an existing recipe or create a new one
    const recipe = await Recipe.findOneAndUpdate(
      { spoonacularId: recipeData.id },
      recipeToSave,
      { new: true, upsert: true }
    );

    // creates an entry in SavedRecipe using the MongoDB user's _id
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

// update recipe notes for a saved recipe
export const updateRecipeNotes = async (req, res) => {
  try {
    const { id: savedRecipeId } = req.params;
    const { notes } = req.body;
    
    if (!savedRecipeId) {
      return res.status(400).json({ 
        success: false, 
        message: "Saved recipe ID is required" 
      });
    }

    // Find and update the saved recipe's notes
    const updatedRecipe = await SavedRecipe.findByIdAndUpdate(
      savedRecipeId,
      { notes },
      { new: true } // Return the updated document
    ).populate('recipeId');
    
    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Saved recipe not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Notes updated successfully",
      data: updatedRecipe
    });
  } catch (error) {
    console.error("Error updating recipe notes:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update notes" 
    });
  }
};

// Get recipe cooking steps
export const getRecipeSteps = async (req, res) => {
  try {
    const { id: spoonacularId } = req.params;
    
    if (!spoonacularId) {
      return res.status(400).json({ 
        success: false, 
        message: "Recipe ID is required" 
      });
    }

    // First, try to find the recipe in our database
    const existingRecipe = await Recipe.findOne({ spoonacularId: Number(spoonacularId) });
    
    // If we have the recipe and it has steps, return them directly
    if (existingRecipe && existingRecipe.steps && existingRecipe.steps.length > 0) {
      return res.status(200).json({
        success: true,
        data: {
          recipeId: spoonacularId,
          title: existingRecipe.title,
          image: existingRecipe.image,
          servings: existingRecipe.servings,
          readyInMinutes: existingRecipe.readyInMinutes,
          steps: existingRecipe.steps,
          source: "database" // For debugging purposes
        }
      });
    }

    // If the recipe isn't in our database or doesn't have steps, fetch from API
    const response = await axios.get(`https://api.spoonacular.com/recipes/${spoonacularId}/information`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
      }
    });

    // Parse the HTML instructions into discrete steps
    let steps = [];
    
    // Check if analyzedInstructions is available (preferred format)
    if (response.data.analyzedInstructions && 
        response.data.analyzedInstructions.length > 0 && 
        response.data.analyzedInstructions[0].steps) {
      
      steps = response.data.analyzedInstructions[0].steps.map(step => ({
        number: step.number,
        instruction: step.step,
        ingredients: step.ingredients || [],
        equipment: step.equipment || []
      }));
    } 
    // Fall back to parsing the HTML instructions if analyzedInstructions is not available
    else if (response.data.instructions) {
      // Simple parsing for HTML instructions using regex
      const instructionText = response.data.instructions
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .trim();
      
      // Split by numbered steps (1. Step one, 2. Step two) or by periods
      const stepMatches = instructionText.match(/\d+\.\s+[^.!?]+[.!?]+/g);
      
      if (stepMatches && stepMatches.length > 0) {
        steps = stepMatches.map((step, index) => ({
          number: index + 1,
          instruction: step.trim(),
          ingredients: [],
          equipment: []
        }));
      } else {
        // Fall back to splitting by sentences if no numbered steps found
        const sentences = instructionText.split(/[.!?]+/).filter(s => s.trim().length > 0);
        steps = sentences.map((sentence, index) => ({
          number: index + 1,
          instruction: sentence.trim(),
          ingredients: [],
          equipment: []
        }));
      }
    }

    // If we found the recipe in our database but it didn't have steps,
    // update it with the steps we just fetched
    if (existingRecipe) {
      existingRecipe.steps = steps;
      await existingRecipe.save();
    } 
    // If the recipe doesn't exist in our database yet, create it with the steps
    else {
      await Recipe.create({
        spoonacularId: Number(spoonacularId),
        title: response.data.title,
        image: response.data.image,
        servings: response.data.servings || 4,
        readyInMinutes: response.data.readyInMinutes || 30,
        instructions: response.data.instructions || "",
        steps: steps,
      });
    }

    // Return the fetched steps to the client
    res.status(200).json({
      success: true,
      data: {
        recipeId: spoonacularId,
        title: response.data.title,
        image: response.data.image,
        servings: response.data.servings,
        readyInMinutes: response.data.readyInMinutes,
        steps,
        source: "api" // For debugging purposes
      }
    });
  } catch (error) {
    console.error("Error fetching recipe steps:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch recipe steps" 
    });
  }
};