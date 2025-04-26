import React from "react";
import { Box, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";

const RecipeCard = ({ recipe }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box
      bg={cardBg}
      shadow="md"
      rounded="lg"
      p={6}
      transition="all 0.2s"
      _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
    >
      <Heading as="h3" size="md" mb={4} color={textColor}>
        {recipe.title}
      </Heading>
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold" color={textColor}>
          Ingredients:
        </Text>
        {recipe.missedIngredients.map((ingredient) => (<Text key={ingredient.id} fontSize="sm" color={textColor}>-{ingredient.name}</Text>))}
      </VStack>
    </Box>
  );
};

export default RecipeCard;