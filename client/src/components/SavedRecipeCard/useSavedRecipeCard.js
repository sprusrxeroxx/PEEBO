import { useState } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useRecipeStore } from "../../store/recipe";

export default function useSavedRecipeCard(savedRecipe) {
  const { _id, notes: initialNotes = "", createdAt } = savedRecipe;
  const recipe = savedRecipe.recipeId;
  
  // State
  const [notes, setNotes] = useState(initialNotes);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Modal states with useDisclosure
  const deleteModal = useDisclosure();
  const detailModal = useDisclosure();
  const cookingModal = useDisclosure();
  
  // Store actions
  const { deleteSavedRecipe, updateRecipeNotes } = useRecipeStore();
  const toast = useToast();
  
  // Format saved date
  const savedDate = new Date(createdAt).toLocaleDateString();

  // Handlers
  const handleUpdateNotes = async () => {
    try {
      const { success, message } = await updateRecipeNotes(_id, notes);
      
      if (success) {
        setIsEditing(false);
        toast({
          title: "Notes updated",
          description: message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      } else {
        toast({
          title: "Error",
          description: message || "Failed to update notes",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const { success, message } = await deleteSavedRecipe(_id);
      
      if (success) {
        toast({
          title: "Recipe deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      } else {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      }
      
      deleteModal.onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    recipe,
    notes,
    setNotes,
    isEditing,
    setIsEditing,
    isDeleting,
    savedDate,
    deleteModal,
    detailModal,
    cookingModal,
    handleUpdateNotes,
    handleDelete
  };
}