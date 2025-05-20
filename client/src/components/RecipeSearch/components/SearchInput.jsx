import React from "react";
import { 
  InputGroup, 
  Input, 
  InputRightElement, 
  Button, 
  Text
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRecipeSearchStyles } from "../styles";

const SearchInput = ({ 
  inputRef, 
  currentInput, 
  onInputChange, 
  onKeyDown, 
  isSearching,
  error,
  ingredientTags
}) => {
  const styles = useRecipeSearchStyles();
  
  const hasError = !!error;

  return (
    <>
      <InputGroup size={{ base: "md", md: "lg" }}>
        <Input
          ref={inputRef}
          placeholder={ingredientTags.length > 0 ? "Add another ingredient..." : "chicken, rice, broccoli..."}
          value={currentInput}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          bg={styles.input.bg}
          border="1px"
          borderColor={hasError ? styles.input.error.borderColor : styles.input.borderColor}
          focusBorderColor={hasError ? styles.input.error.focusBorderColor : styles.input.focusBorderColor}
          _hover={{ 
            borderColor: hasError ? 
              styles.input.error.focusBorderColor : 
              styles.input.hoverBorderColor
          }}
          color={styles.input.color}
          _focus={{ 
            borderColor: hasError ? 
              styles.input.error.focusBorderColor : 
              styles.input.focusBorderColor,
            boxShadow: `0 0 0 1px ${hasError ? 
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
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? "search-error" : undefined}
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
      <Text fontSize="xs" color={styles.text.hint} mt={1} textAlign="right" pr={2}>
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
    </>
  );
};

export default SearchInput;