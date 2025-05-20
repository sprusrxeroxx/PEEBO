import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import SavedRecipeCard from "../../SavedRecipeCard";  // Import from existing location
import { useRecipeStyles } from "../styles";

const RecipeGrid = ({ filteredRecipes, searchTerm }) => {
  const styles = useRecipeStyles();
  
  if (filteredRecipes.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color={styles.textColor}>
          No recipes match your search.
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {filteredRecipes.map((savedRecipe) => (
        <SavedRecipeCard
          key={savedRecipe._id}
          savedRecipe={savedRecipe}
        />
      ))}
    </SimpleGrid>
  );
};

export default RecipeGrid;