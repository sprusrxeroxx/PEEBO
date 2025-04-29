import React, { useState } from "react";
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Image, 
  useColorModeValue,
  Button,
  useToast,
  Flex
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useRecipeStore } from "../store/recipe";
import { FaBookmark } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useAuth();
  const saveRecipe = useRecipeStore((state) => state.saveRecipe);
  const toast = useToast();
  
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");

  const handleSaveRecipe = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to save recipes",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    setIsSaving(true);
    
    // Use the user's Firebase ID from Auth context
    const userId = currentUser.uid;
    
    const { success, message } = await saveRecipe(userId, recipe);
    
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
    
    setIsSaving(false);
  };

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
        <VStack align="start" spacing={2} mb={4}>
          <Text fontWeight="bold" color={textColor}>
            Missing Ingredients:
          </Text>
          {recipe.missedIngredients.map((ingredient) => (
            <Text key={ingredient.id} fontSize="sm" color={textColor}>
              - {ingredient.amount} {ingredient.unit} {ingredient.name}
            </Text>
          ))}
        </VStack>

        {/* Save Recipe Button */}
        <Flex justifyContent="center" mt={3}>
          <Button
            leftIcon={<FaBookmark />}
            colorScheme="blue"
            size="sm"
            onClick={handleSaveRecipe}
            isLoading={isSaving}
            loadingText="Saving"
            w="full"
          >
            Save Recipe
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RecipeCard;