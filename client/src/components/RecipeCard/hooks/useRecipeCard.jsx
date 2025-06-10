import { useState } from "react";
import { useToast, Icon, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/AuthContext";
import { useRecipeStore } from "../../../store/recipe";
import { FaBookmark, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"



export function useRecipeCard(recipe) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useAuth();
  const saveRecipe = useRecipeStore((state) => state.saveRecipe);
  const toast = useToast();
  const modalDisclosure = useDisclosure();
  
  // Calculate some derived values
  const totalIngredients = recipe.usedIngredientCount + recipe.missedIngredientCount;
  const estimatedTime = totalIngredients * 5; // 5 mins per ingredient as estimation
  
  const handleSaveRecipe = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to save recipes",
        status: "warning",
        isClosable: true,
        duration: 3000,
        position: "top",
        variant: "subtle",
        icon: <Icon as={FaBookmark} />
      });
      return;
    }
    
    // Check if user is anonymous
    if (currentUser.isAnonymous) {
      toast({
        title: "Account required",
        description: "Please create an account to save recipes",
        status: "warning",
        isClosable: true,
        duration: 5000,
        position: "top",
        variant: "subtle",
        icon: <Icon as={FaUserPlus} />,
      });
      
      // Navigate to sign up page or show sign up modal
      navigate("/signup", { state: { upgradeAnonymous: true } });
      return;
    }

    setIsSaving(true);
    
    try {
      const { success, message } = await saveRecipe(currentUser.uid, recipe);
      
      toast({
        title: success ? "Success" : "Error",
        description: message,
        status: success ? "success" : "error",
        isClosable: true,
        duration: 3000,
        position: "top",
        variant: "subtle",
        icon: success ? <Icon as={FaBookmark} /> : undefined,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save recipe",
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndClose = () => {
    handleSaveRecipe();
    modalDisclosure.onClose();
  };

  return {
    isSaving,
    isAuthenticated: !!currentUser,
    modalControls: modalDisclosure,
    recipeMetadata: {
      totalIngredients,
      estimatedTime
    },
    handleSaveRecipe,
    handleSaveAndClose
  };
}