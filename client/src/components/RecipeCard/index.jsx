import { Box } from "@chakra-ui/react";
import { useRecipeCard } from "./hooks/useRecipeCard.jsx";
import { useRecipeStyles } from "./styles";
import { RecipeImage } from "./components/RecipeImage";
import { RecipeDetails } from "./components/RecipeDetails";
import { ActionButtons } from "./components/ActionButtons";
import { DetailModal } from "./components/DetailModal";

export default function RecipeCard({ recipe }) {
  const {
    isSaving,
    modalControls,
    recipeMetadata,
    handleSaveRecipe,
    handleSaveAndClose
  } = useRecipeCard(recipe);
  
  const styles = useRecipeStyles();

  return (
    <>
      <Box
        bg={styles.card.bg}
        shadow={styles.card.shadow}
        rounded="lg"    
        overflow="hidden"
        transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        _hover={{ 
          transform: "translateY(-6px)", 
          shadow: styles.card.hoverShadow,
          "& img": { transform: "scale(1.05)" } 
        }}
        borderWidth="1px"
        borderColor={styles.card.borderColor}
        h="100%"
        display="flex"
        flexDirection="column"
      >
        {/* Recipe Image with Badge */}
        <RecipeImage 
          image={recipe.image}
          title={recipe.title}
          usedCount={recipe.usedIngredientCount}
          totalCount={recipeMetadata.totalIngredients}
        />

        {/* Recipe Details */}
        <Box p={{ base: 4, md: 5 }} flex="1" display="flex" flexDirection="column">
          <RecipeDetails 
            title={recipe.title}
            cookTime={recipeMetadata.estimatedTime}
            difficulty="Easy"
            missingCount={recipe.missedIngredientCount}
          />
          
          {/* Action Buttons */}
          <ActionButtons 
            onViewDetails={modalControls.onOpen}
            onSaveRecipe={handleSaveRecipe}
            isSaving={isSaving}
          />
        </Box>
      </Box>

      {/* Recipe Details Modal */}
      <DetailModal 
        isOpen={modalControls.isOpen}
        onClose={modalControls.onClose}
        recipe={recipe}
        onSaveRecipe={handleSaveAndClose}
        isSaving={isSaving}
      />
    </>
  );
}