import React from "react";
import { Box, Heading, Text, VStack, Image, useColorModeValue } from "@chakra-ui/react";

const RecipeCard = ({ recipe }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box
      bg={cardBg}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
    >
      {/* Recipe Image */}
      <Image
        src={recipe.image}
        alt={recipe.title}
        objectFit="cover"
        w="full"
        h="200px"
      />

      {/* Recipe Details */}
      <Box p={6}>
        {/* Recipe Title */}
        <Heading as="h3" size="md" mb={4} color={textColor} textAlign="center">
          {recipe.title}
        </Heading>

        {/* Ingredients */}
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" color={textColor}>
            Ingredients:
          </Text>
          {recipe.missedIngredients.map((ingredient) => (
            <Text key={ingredient.id} fontSize="sm" color={textColor}>
              - {ingredient.amount} {ingredient.unit} {ingredient.name}
            </Text>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default RecipeCard;