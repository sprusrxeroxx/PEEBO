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
  Flex,
  Button,
  Icon,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useRecipeStore } from "../store/recipe";
import SavedRecipeCard from "./SavedRecipeCard";
import { FaBookmark, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const SavedRecipes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useAuth();
  const { savedRecipes, fetchSavedRecipes } = useRecipeStore();
  
  // Filter recipes based on search term
  const filteredRecipes = savedRecipes.filter(savedRecipe => 
    savedRecipe.recipeId.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Spinner size="xl" color="brand.primary" />
      </Center>
    );
  }

  return (
    <VStack spacing={8} align="stretch" w="full" py={8}>
      <Flex align="center" direction="column" mb={4}>
        <Heading 
          as="h1" 
          size="xl" 
          textAlign="center"
          color="brand.dark"
          mb={3}
        >
          <Icon as={FaBookmark} color="brand.secondary" mr={3} display="inline" />
          Your Recipe Collection
        </Heading>
        <Divider width="100px" borderColor="brand.primary" borderWidth="2px" />
        <Text mt={4} textAlign="center" maxW="600px" color="gray.600">
          All your favorite recipes saved in one place for easy access
        </Text>
      </Flex>

      {!savedRecipes || savedRecipes.length === 0 ? (
        <Box 
          textAlign="center" 
          py={10} 
          bg={useColorModeValue("white", "gray.800")} 
          borderRadius="lg" 
          boxShadow="md"
          p={8}
          borderWidth="1px"
          borderColor={useColorModeValue("gray.100", "gray.700")}
        >
          <Icon as={FaBookmark} boxSize={12} mb={6} color={useColorModeValue("gray.300", "gray.600")} />
          <Text fontSize="lg" color={useColorModeValue("gray.500", "gray.400")} mb={4}>
            You haven't saved any recipes yet.
          </Text>
          <Button as={Link} to="/" variant="primary" size="md">
            Discover Recipes
          </Button>
        </Box>
      ) : (
        <>
          {/* Search input for saved recipes */}
          <Box mb={6} maxW="500px" mx="auto" w="full">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color={useColorModeValue("gray.400", "gray.500")} />
              </InputLeftElement>
              <Input
                placeholder="Search your saved recipes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg={useColorModeValue("white", "gray.700")}
                borderColor={useColorModeValue("gray.300", "gray.600")}
                color={useColorModeValue("gray.800", "white")}
                _hover={{
                  borderColor: useColorModeValue("gray.400", "gray.500"),
                }}
                _focus={{
                  borderColor: "brand.secondary",
                  boxShadow: `0 0 0 1px var(--chakra-colors-brand-secondary)`,
                }}
                focusBorderColor={useColorModeValue("brand.primary", "brand.secondary")}
              />
            </InputGroup>
          </Box>

          {/* Display filtered recipes */}
          {filteredRecipes.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {filteredRecipes.map((savedRecipe) => (
                <SavedRecipeCard
                  key={savedRecipe._id}
                  savedRecipe={savedRecipe}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" color={useColorModeValue("gray.500", "gray.400")}>
                No recipes match your search.
              </Text>
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

export default SavedRecipes;