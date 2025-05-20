import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useRecipeStore } from "../../../store/recipe";

const useSavedRecipesData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { currentUser } = useAuth();
  const { savedRecipes, fetchSavedRecipes } = useRecipeStore();

  // Filter recipes based on search term
  const filteredRecipes = savedRecipes.filter(savedRecipe => 
    savedRecipe.recipeId.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch saved recipes when component mounts
  useEffect(() => {
    const loadSavedRecipes = async () => {
      if (currentUser) {
        await fetchSavedRecipes(currentUser.uid);
      }
      setIsLoading(false);
    };

    loadSavedRecipes();
  }, [currentUser, fetchSavedRecipes]);

  return {
    isLoading,
    savedRecipes,
    filteredRecipes,
    searchTerm,
    setSearchTerm
  };
};

export default useSavedRecipesData;