import React from "react";
import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useRecipeStore } from "../store/recipe";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  if (recipes.length === 0) {
    return (
      <Text fontSize="lg" textAlign="center" color="gray.500">
        No recipes found. Try searching with different ingredients.
      </Text>
    );
  }

  return (
    <VStack spacing={8} mt={8}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default RecipeList;