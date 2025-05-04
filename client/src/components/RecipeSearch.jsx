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
  Icon,
  useColorModeValue,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton
} from "@chakra-ui/react";
import { useRecipeStore } from "../store/recipe";
import { SearchIcon } from "@chakra-ui/icons";
import { FaLeaf } from "react-icons/fa";

const RecipeSearch = () => {
  // Change from string to separate currentInput and ingredient tags array
  const [currentInput, setCurrentInput] = useState("");
  const [ingredientTags, setIngredientTags] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const toast = useToast();

  // Handle input change and tag creation
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurrentInput(value);

    // If user types comma, create a new tag
    if (value.endsWith(',')) {
      const ingredient = value.trim().replace(/,\s*$/, ''); // Remove trailing comma
      
      // Only add if it's not empty and not already in the list
      if (ingredient && !ingredientTags.includes(ingredient)) {
        setIngredientTags([...ingredientTags, ingredient]);
        setCurrentInput(''); // Clear the input
      } else {
        setCurrentInput(value.replace(/,\s*$/, '')); // Remove trailing comma but keep the text
      }
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setIngredientTags(ingredientTags.filter(tag => tag !== tagToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Add current input as a tag if there's any text
    let allIngredients = [...ingredientTags];
    if (currentInput.trim()) {
      const newTag = currentInput.trim().replace(/,\s*$/, '');
      if (!ingredientTags.includes(newTag)) {
        allIngredients.push(newTag);
        setIngredientTags(allIngredients);
      }
      setCurrentInput('');
    }

    // Check if we have any ingredients
    if (allIngredients.length === 0) {
      setError("Please enter at least one ingredient");
      toast({
        title: "Error",
        description: "Please enter at least one ingredient.",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return;
    }

    // Join all tags into a comma-separated string for the API call
    const ingredientsString = allIngredients.join(',');
    
    setIsSearching(true);
    const { success, message } = await fetchRecipes(ingredientsString);
    setIsSearching(false);

    if (!success) {
      setError(message || "Failed to fetch recipes");
      toast({
        title: "Error",
        description: message || "Failed to fetch recipes.",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  // Colors for the tags
  const tagBg = useColorModeValue("brand.primary", "brand.secondary");
  const tagColor = "white";

  return (
    <VStack spacing={{ base: 4, md: 6 }}>
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Icon as={FaLeaf} color="brand.secondary" mr={{ base: 0, md: 3 }} mb={{ base: 2, md: 0 }} boxSize={{ base: 5, md: 6 }} />
        <Heading 
          as="h2" 
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          fontWeight="bold" 
          color="brand.dark"
          fontFamily="heading"
          letterSpacing="tight"
          textAlign={{ base: "center", md: "left" }}
        >
          What's in Your Kitchen?
        </Heading>
      </Flex>
      
      <Text 
        fontSize={{ base: "sm", md: "md", lg: "lg" }} 
        color="gray.600" 
        textAlign="center" 
        maxW="600px"
        fontFamily="body"
        lineHeight="tall"
        px={{ base: 2, md: 0 }}
      >
        Enter the ingredients you have, separated by commas, and we'll find delicious recipes you can make.
      </Text>
      
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        {/* Display ingredient tags */}
        {ingredientTags.length > 0 && (
          <Box mb={2}>
            <HStack spacing={2} flexWrap="wrap">
              {ingredientTags.map((tag, index) => (
                <Tag 
                  size="md" 
                  key={index} 
                  borderRadius="full" 
                  variant="solid" 
                  bg={tagBg} 
                  color={tagColor}
                  my={1}
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => removeTag(tag)} />
                </Tag>
              ))}
            </HStack>
          </Box>
        )}
        
        {/* Input for adding new ingredients */}
        <InputGroup size={{ base: "md", md: "lg" }}>
          <Input
            placeholder={ingredientTags.length > 0 ? "Add another ingredient..." : "chicken, rice, broccoli..."}
            value={currentInput}
            onChange={handleInputChange}
            bg={useColorModeValue("brand.light", "gray.700")}
            border="1px"
            borderColor={error ? 
              useColorModeValue("red.300", "red.500") : 
              useColorModeValue("gray.300", "gray.600")
            }
            focusBorderColor={error ? 
              useColorModeValue("red.400", "red.300") : 
              useColorModeValue("brand.secondary", "brand.secondary")
            }
            _hover={{ 
              borderColor: error ? 
                useColorModeValue("red.400", "red.300") : 
                useColorModeValue("brand.secondary", "brand.secondary")
            }}
            color={useColorModeValue("gray.800", "white")}
            _focus={{ 
              borderColor: error ? 
                useColorModeValue("red.400", "red.300") : 
                useColorModeValue("brand.secondary", "brand.secondary"),
              boxShadow: `0 0 0 1px ${error ? 
                "var(--chakra-colors-red-400)" : 
                "var(--chakra-colors-brand-secondary)"
              }`,
              transform: "scale(1.01)",
            }}
            pr="4.5rem"
            fontSize={{ base: "sm", md: "md" }}
            height={{ base: "50px", md: "60px" }}
            fontFamily="body"
            transition="all 0.2s"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "search-error" : undefined}
          />
          <InputRightElement width="4.5rem" h="100%">
            <Button 
              h="90%" 
              size="sm" 
              variant="primary"
              isLoading={isSearching}
              type="submit"
              mr={1}
              rightIcon={isSearching ? null : <SearchIcon />}
              fontFamily="heading"
              fontWeight="medium"
              letterSpacing="wide"
              loadingText=""
              aria-label="Search recipes"
            >
              {isSearching ? "" : "Find"}
            </Button>
          </InputRightElement>
        </InputGroup>
        
        {error && (
          <Text 
            color="red.500" 
            fontSize="sm" 
            mt={2} 
            id="search-error"
            textAlign="left"
            pl={2}
          >
            {error}
          </Text>
        )}
      </form>
    </VStack>
  );
};

export default RecipeSearch;