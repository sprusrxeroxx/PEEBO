import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [], // Store for fetched recipes
  setRecipes: (recipes) => set({ recipes }),

  fetchRecipes: async (ingredients) => {
    try {
      const res = await fetch(`/api/v1/recipes/search?ingredients=${ingredients}`);
      const data = await res.json();

      if (data.success) {
        set({ recipes: data.data }); // Update the global state with fetched recipes
        // console.log("Fetched recipes:", data.data.forEach(element => {
        //   for (const ingredient of element.missedIngredients) {
        //     console.log(ingredient);
        //   }
        // }));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      return { success: false, message: "Failed to fetch recipes." };
    }
  },
}));