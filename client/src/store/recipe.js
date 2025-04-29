import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [], // Store for fetched recipes
  savedRecipes: [], // Store for user's saved recipes
  
  setRecipes: (recipes) => set({ recipes }),
  setSavedRecipes: (savedRecipes) => set({ savedRecipes }),

  fetchRecipes: async (ingredients) => {
    try {
      const res = await fetch(`/api/v1/recipes/search?ingredients=${ingredients}`);
      const data = await res.json();

      if (data.success) {
        set({ recipes: data.data }); // Update the global state with fetched recipes
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      return { success: false, message: "Failed to fetch recipes." };
    }
  },

  // function to save a recipe
  saveRecipe: async (userId, recipeData, notes = "") => {
    try {
      const res = await fetch("/api/v1/recipes/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          recipeData,
          notes
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        return { success: true, message: "Recipe saved successfully" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error saving recipe:", error.message);
      return { success: false, message: "Failed to save recipe." };
    }
  },

  // function to fetch user's saved recipes
  fetchSavedRecipes: async (userId) => {
    try {
      const res = await fetch(`/api/v1/recipes/saved/${userId}`);
      const data = await res.json();

      if (data.success) {
        set({ savedRecipes: data.data }); // Update the global state with saved recipes
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error fetching saved recipes:", error.message);
      return { success: false, message: "Failed to fetch saved recipes." };
    }
  },
}));