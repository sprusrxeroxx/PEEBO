import { create } from "zustand";
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const useRecipeStore = create((set) => ({
  recipes: [], 
  savedRecipes: [], 
  recipeSteps: [],
  currentStepIndex: 0,
  isLoadingSteps: false,
  
  setRecipes: (recipes) => set({ recipes }),
  setSavedRecipes: (savedRecipes) => set({ savedRecipes }),

  fetchRecipes: async (ingredients) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/search?ingredients=${ingredients}`);
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
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/save`, {
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
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/saved/${userId}`);
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

  // function to delete a saved recipe
  deleteSavedRecipe: async (savedRecipeId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/saved/${savedRecipeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update the state by filtering out the deleted recipe
        set((state) => ({
          savedRecipes: state.savedRecipes.filter(recipe => recipe._id !== savedRecipeId)
        }));
        return { success: true, message: "Recipe removed successfully" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error deleting recipe:", error.message);
      return { success: false, message: "Failed to delete recipe." };
    }
  },

  // function to update recipe notes
  updateRecipeNotes: async (savedRecipeId, notes) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/saved/${savedRecipeId}/notes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ notes })
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update the notes in the state
        set((state) => ({
          savedRecipes: state.savedRecipes.map(recipe => 
            recipe._id === savedRecipeId ? {...recipe, notes} : recipe
          )
        }));
        return { success: true, message: "Notes updated successfully" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error updating notes:", error.message);
      return { success: false, message: "Failed to update notes." };
    }
  },

  // Function to fetch recipe steps
  fetchRecipeSteps: async (recipeId) => {
    set({ isLoadingSteps: true });
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/recipes/${recipeId}/steps`);
      const data = await res.json();
      
      if (data.success) {
        set({ 
          recipeSteps: data.data,
          currentStepIndex: 0,
          isLoadingSteps: false
        });
        return { success: true, data: data.data };
      } else {
        set({ isLoadingSteps: false });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error fetching recipe steps:", error.message);
      set({ isLoadingSteps: false });
      return { success: false, message: "Failed to fetch recipe steps." };
    }
  },
  
  // Navigation functions
  goToNextStep: () => set(state => ({
    currentStepIndex: Math.min(state.currentStepIndex + 1, state.recipeSteps.steps?.length - 1 || 0)
  })),
  
  goToPrevStep: () => set(state => ({
    currentStepIndex: Math.max(state.currentStepIndex - 1, 0)
  })),
  
  resetCookingProgress: () => set({
    recipeSteps: [],
    currentStepIndex: 0
  })
}));