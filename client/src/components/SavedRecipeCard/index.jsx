import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import useSavedRecipeCard from "./useSavedRecipeCard";
import RecipeImage from "./components/RecipeImage";
import RecipeMetadata from "./components/RecipeMetadata";
import RecipeNotes from "./components/RecipeNotes";
import ActionButtons from "./components/ActionButtons";
import DeleteModal from "./components/DeleteModal";
import DetailModal from "./components/DetailModal";
import CookingMode from "../CookingMode";

export default function SavedRecipeCard({ savedRecipe }) {
  const {
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
  } = useSavedRecipeCard(savedRecipe);

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <>
      <Box
        bg={cardBg}
        shadow="md"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
        borderWidth="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        position="relative"
      >
        <RecipeImage 
          image={recipe.image} 
          title={recipe.title} 
          onDelete={deleteModal.onOpen} 
        />
        
        <Box p={5}>
          <Heading 
            as="h3" 
            size="md" 
            mb={2} 
            color={textColor}
            noOfLines={2}
            height="60px"
          >
            {recipe.title}
          </Heading>
          
          <RecipeMetadata
            readyInMinutes={recipe.readyInMinutes}
            servings={recipe.servings}
            savedDate={savedDate}
            dishTypes={recipe.dishTypes}
          />
          
          <RecipeNotes
            notes={notes}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setNotes={setNotes}
            onSave={handleUpdateNotes}
          />
          
          <ActionButtons
            onViewDetails={detailModal.onOpen}
            onCook={cookingModal.onOpen}
          />
        </Box>
      </Box>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onDelete={handleDelete}
        title={recipe.title}
        isDeleting={isDeleting}
      />

      <DetailModal
        isOpen={detailModal.isOpen}
        onClose={detailModal.onClose}
        recipe={recipe}
        notes={notes}
        isEditing={isEditing}
        onEditNotes={() => {
          detailModal.onClose();
          setIsEditing(true);
        }}
      />

      <CookingMode
        isOpen={cookingModal.isOpen}
        onClose={cookingModal.onClose}
        recipe={recipe}
      />
    </>
  );
}