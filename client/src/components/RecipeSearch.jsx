import React, { useState } from "react";
import { Box, Input, Button, VStack, Heading, useToast } from "@chakra-ui/react";
import { useRecipeStore } from "../store/recipe";

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ingredients.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one ingredient.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const { success, message } = await fetchRecipes(ingredients);

    if (!success) {
      toast({
        title: "Error",
        description: message || "Failed to fetch recipes.",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="container.sm" mx="auto" mt={8}>
      <VStack spacing={4}>
        <Heading as="h2" size="lg" textAlign="center">
          Search Recipes by Ingredients
        </Heading>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="row" alignItems="center" width="100%">
            <Input
              placeholder="ex: chicken, rice, broccoli"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <Button type="submit" colorScheme="blue" ml={4}>
              Search
            </Button>
          </Box>
        </form>
      </VStack>
    </Box>
  );
};

export default RecipeSearch;