import React, { useState } from "react";
import { 
  Box, 
  Input, 
  Button, 
  VStack, 
  Heading, 
  useToast, 
  Text,
  InputGroup,
  InputRightElement,
  Flex,
  Icon
} from "@chakra-ui/react";
import { useRecipeStore } from "../store/recipe";
import { SearchIcon } from "@chakra-ui/icons";
import { FaLeaf } from "react-icons/fa";

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [isSearching, setIsSearching] = useState(false);
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

    setIsSearching(true);
    const { success, message } = await fetchRecipes(ingredients);
    setIsSearching(false);

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
    <VStack spacing={6}>
      <Flex align="center">
        <Icon as={FaLeaf} color="brand.secondary" mr={3} boxSize={6} />
        <Heading 
          as="h2" 
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold" 
          color="brand.dark"
          fontFamily="heading"
          letterSpacing="tight"
        >
          What's in Your Kitchen?
        </Heading>
      </Flex>
      
      <Text 
        fontSize={{ base: "md", md: "lg" }} 
        color="gray.600" 
        textAlign="center" 
        maxW="600px"
        fontFamily="body"
        lineHeight="tall"
      >
        Enter the ingredients you have, separated by commas, and we'll find delicious recipes you can make.
      </Text>
      
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        <InputGroup size="lg">
          <Input
            placeholder="chicken, rice, broccoli..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            bg="brand.light"
            border="1px"
            borderColor="gray.300"
            focusBorderColor="brand.secondary"
            _hover={{ borderColor: "brand.secondary" }}
            pr="4.5rem"
            fontSize="md"
            height="60px"
            fontFamily="body"
          />
          <InputRightElement width="4.5rem" h="100%">
            <Button 
              h="90%" 
              size="sm" 
              variant="transparent"
              isLoading={isSearching}
              type="submit"
              mr={1}
              rightIcon={<SearchIcon />}
              fontFamily="heading"
              fontWeight="medium"
              letterSpacing="wide"
            >
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </VStack>
  );
};

export default RecipeSearch;