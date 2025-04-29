import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useRecipeStore } from "../store/recipe";
import SavedRecipeCard from "./SavedRecipeCard";

const SavedRecipes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const { savedRecipes, fetchSavedRecipes } = useRecipeStore();

  useEffect(() => {
    const loadSavedRecipes = async () => {
      if (currentUser) {
        await fetchSavedRecipes(currentUser.uid);
      }
      setIsLoading(false);
    };

    loadSavedRecipes();
  }, [currentUser, fetchSavedRecipes]);

  if (isLoading) {
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!savedRecipes || savedRecipes.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          You haven't saved any recipes yet.
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={8} align="stretch" w="full" py={8}>
      <Heading 
        as="h2" 
        size="xl" 
        textAlign="center"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        Your Saved Recipes
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {savedRecipes.map((savedRecipe) => (
          <SavedRecipeCard
            key={savedRecipe._id}
            savedRecipe={savedRecipe}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default SavedRecipes;