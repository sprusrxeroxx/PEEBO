import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRecipeStore } from "../../../store/recipe";

export function useRecipeSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const toast = useToast();
  
  const searchRecipes = async (ingredients) => {
    if (ingredients.length === 0) {
      return { 
        success: false, 
        message: "Please enter at least one ingredient" 
      };
    }
    
    // Join all tags into a comma-separated string for the API call
    const ingredientsString = ingredients.join(',');
    
    setIsSearching(true);
    const result = await fetchRecipes(ingredientsString);
    setIsSearching(false);
    
    if (!result.success) {
      toast({
        title: "Error",
        description: result.message || "Failed to fetch recipes.",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
    
    return result;
  };
  
  return {
    isSearching,
    searchRecipes
  };
}