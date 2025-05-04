import React, { useState, useRef, useEffect } from "react";
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
import { motion } from "framer-motion";

// Motion variants for animations
const MotionTag = motion(Tag);
const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
};

const RecipeSearch = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [ingredientTags, setIngredientTags] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const toast = useToast();

  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Helper function to handle tag creation
  const createTag = (value) => {
    // Clean up the input value
    const ingredient = value.trim().replace(/[,\s]+$/, '');
    
    // Only add if it's not empty and not already in the list
    if (ingredient && !ingredientTags.includes(ingredient)) {
      setIngredientTags(prev => [...prev, ingredient]);
      setCurrentInput(''); // Clear the input
      return true;
    }
    return false;
  };

  // Handle input change and tag creation
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // If user types comma or space, try to create a new tag
    if (value.endsWith(',')) {
      if (createTag(value.slice(0, -1))) {
        // Tag was created successfully, input is already cleared
        return;
      } else {
        // Tag creation failed, keep current input but remove the comma
        setCurrentInput(value.slice(0, -1));
        return;
      }
    }
    
    // Otherwise just update the input value
    setCurrentInput(value);
  };

  // Handle key down events
  const handleKeyDown = (e) => {
    // Clear error on any key press
    if (error) setError(null);
    
    // Create a tag when Enter is pressed
    if (e.key === 'Enter' && !e.shiftKey && currentInput.trim()) {
      e.preventDefault(); // Prevent form submission
      createTag(currentInput);
    }
    
    // Handle space key for tag creation (only if input isn't empty)
    else if (e.key === ' ' && currentInput.trim() && !currentInput.endsWith(' ')) {
      // Only create tag on space if the input contains more than one word
      const words = currentInput.trim().split(' ');
      if (words.length > 1) {
        e.preventDefault();
        createTag(currentInput);
      }
    }
    
    // Handle Backspace to remove last tag when input is empty
    else if (e.key === 'Backspace' && currentInput === '' && ingredientTags.length > 0) {
      const newTags = [...ingredientTags];
      newTags.pop();
      setIngredientTags(newTags);
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setIngredientTags(ingredientTags.filter(tag => tag !== tagToRemove));
    // Focus back on input after removing a tag
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  // Colors for the tags and UI
  const tagBg = useColorModeValue("brand.primary", "brand.secondary");
  const tagColor = "white";
  const hintColor = useColorModeValue("gray.500", "gray.400");

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
        <Box mb={2} minHeight="40px">
          <HStack spacing={2} flexWrap="wrap">
            {ingredientTags.map((tag, index) => (
              <MotionTag 
                size="md" 
                key={tag} 
                borderRadius="full" 
                variant="solid" 
                bg={tagBg} 
                color={tagColor}
                my={1}
                variants={tagVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                layout
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => removeTag(tag)} />
              </MotionTag>
            ))}
          </HStack>
        </Box>
        
        {/* Input for adding new ingredients */}
        <InputGroup size={{ base: "md", md: "lg" }}>
          <Input
            ref={inputRef}
            placeholder={ingredientTags.length > 0 ? "Add another ingredient..." : "chicken, rice, broccoli..."}
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
        
        {/* Helper text */}
        <Text fontSize="xs" color={hintColor} mt={1} textAlign="right" pr={2}>
          Press Enter or comma to add an ingredient
        </Text>
        
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