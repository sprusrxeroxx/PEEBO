import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  useColorModeValue,
  Badge,
  Flex,
} from "@chakra-ui/react";

const SavedRecipeCard = ({ savedRecipe }) => {
  const recipe = savedRecipe.recipeId; // The populated recipe data
  const notes = savedRecipe.notes;
  
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  
  // Format the date when the recipe was saved
  const savedDate = new Date(savedRecipe.createdAt).toLocaleDateString();

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
        <Heading as="h3" size="md" mb={2} color={textColor}>
          {recipe.title}
        </Heading>
        
        {/* Saved Date */}
        <Flex justify="space-between" align="center" mb={3}>
          <Badge colorScheme="blue">Saved on: {savedDate}</Badge>
        </Flex>

        {/* User Notes if any */}
        {notes && (
          <VStack align="start" spacing={1} mb={3}>
            <Text fontWeight="bold" fontSize="sm" color={textColor}>
              Your Notes:
            </Text>
            <Box
              p={2}
              bg={useColorModeValue("gray.100", "gray.700")}
              borderRadius="md"
              w="full"
            >
              <Text fontSize="sm" color={textColor}>
                {notes}
              </Text>
            </Box>
          </VStack>
        )}
        
        {/* Ingredients */}
        <VStack align="start" spacing={1} mb={2}>
          <Text fontWeight="bold" fontSize="sm" color={textColor}>
            Ingredients:
          </Text>
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <Text key={index} fontSize="xs" color={textColor}>
              • {ingredient.amount} {ingredient.unit} {ingredient.name || ingredient.title}
            </Text>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default SavedRecipeCard;