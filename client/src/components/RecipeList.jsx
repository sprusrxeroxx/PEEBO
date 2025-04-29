import React from "react";
import { 
  SimpleGrid, 
  Text, 
  VStack, 
  Heading, 
  Box,
  Flex,
  Icon,
  Divider
} from "@chakra-ui/react";
import { useRecipeStore } from "../store/recipe";
import RecipeCard from "./RecipeCard";
import { FaUtensils } from "react-icons/fa";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  if (recipes.length === 0) {
    return null;
  }

  return (
    <VStack spacing={8} mt={8} mb={16}>
      <Flex align="center" direction="column">
        <Heading 
          as="h2" 
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold" 
          color="brand.dark"
          textAlign="center"
          mb={3}
          fontFamily="heading"
          letterSpacing="tight"
        >
          Recipe Ideas For You
        </Heading>
        <Divider width="100px" borderColor="brand.secondary" borderWidth="2px" />
      </Flex>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default RecipeList;